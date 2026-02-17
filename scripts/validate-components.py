#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Validação de Componentes Educacross
==============================================

Compara componentes Vue (.vue) do educacross-frontoffice com suas stories (.stories.js)
no Storybook para garantir fidelidade 100%.

Validações realizadas:
- Props: Todas as props do Vue estão documentadas nas stories?
- HTML Structure: A estrutura do template Vue corresponde à story?
- Example Data: Os dados de exemplo são realistas e consistentes?

Uso:
    python scripts/validate-components.py

Saída:
    - scripts/validation-reports/validation-report.json
    - scripts/validation-reports/validation-report.md
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime


# ==============================================================================
# CONFIGURAÇÃO
# ==============================================================================

ROOT_DIR = Path(__file__).parent.parent
VUE_COMPONENTS_DIR = ROOT_DIR / "educacross-frontoffice" / "src" / "components"
STORIES_DIR = ROOT_DIR / "src" / "stories" / "educacross-components-v2"
REPORTS_DIR = ROOT_DIR / "scripts" / "validation-reports"

# Arquivos a ignorar
IGNORE_PATTERNS = ['.bak', '.old', '.disabled', '.stories.old.js']


# ==============================================================================
# ESTRUTURAS DE DADOS
# ==============================================================================

@dataclass
class VueProp:
    """Representa uma prop de componente Vue"""
    name: str
    type: Optional[str] = None
    required: bool = False
    default: Optional[str] = None


@dataclass
class VueComponent:
    """Metadados extraídos de um componente Vue"""
    name: str
    path: str
    props: List[VueProp]
    template_elements: List[str]  # Tags HTML principais
    has_slots: bool
    has_events: bool


@dataclass
class StoryArgType:
    """Representa um argType de Storybook"""
    name: str
    control: Optional[str] = None
    description: Optional[str] = None


@dataclass
class StorybookStory:
    """Metadados extraídos de uma story Storybook"""
    name: str
    path: str
    source_path: Optional[str] = None  # Caminho do Vue component (@source)
    arg_types: List[StoryArgType] = None
    title: Optional[str] = None
    status: Optional[str] = None
    doc_only: bool = False  # Se é componente Doc-Only (documentação apenas)
    doc_only_note: Optional[str] = None  # Nota explicativa do Doc-Only

    def __post_init__(self):
        if self.arg_types is None:
            self.arg_types = []


@dataclass
class ValidationIssue:
    """Representa um problema encontrado na validação"""
    type: str  # 'missing_prop', 'extra_argtype', 'type_mismatch', 'html_diff', 'data_issue'
    severity: str  # 'critical', 'warning', 'info'
    message: str
    suggestion: Optional[str] = None
    prop_name: Optional[str] = None


@dataclass
class ComponentValidation:
    """Resultado da validação de um componente"""
    component_name: str
    story_path: str
    vue_path: Optional[str]
    status: str  # 'passed', 'warning', 'error', 'not_found'
    issues: List[ValidationIssue]
    
    def __post_init__(self):
        if self.issues is None:
            self.issues = []


# ==============================================================================
# PARSERS - VUE COMPONENTS
# ==============================================================================

class VueComponentParser:
    """Parser para extrair metadados de componentes Vue"""
    
    @staticmethod
    def extract_props_from_composition_api(content: str) -> List[VueProp]:
        """Extrai props de componente com Composition API (<script setup>)"""
        props = []
        
        # Pattern: defineProps({ prop: { type: X, required: Y, default: Z } })
        # Suporta tanto objeto quanto array
        props_match = re.search(
            r'defineProps\s*\(\s*\{([^}]+)\}\s*\)',
            content,
            re.DOTALL
        )
        
        if props_match:
            props_block = props_match.group(1)
            
            # Encontrar cada prop individualmente
            prop_pattern = r'(\w+)\s*:\s*\{([^}]+)\}'
            for match in re.finditer(prop_pattern, props_block):
                prop_name = match.group(1)
                prop_config = match.group(2)
                
                # Extrair type
                type_match = re.search(r'type:\s*(\w+)', prop_config)
                prop_type = type_match.group(1) if type_match else None
                
                # Extrair required
                required = 'required: true' in prop_config or 'required:true' in prop_config
                
                # Extrair default
                default_match = re.search(r'default:\s*([^,\n]+)', prop_config)
                default_value = default_match.group(1).strip() if default_match else None
                
                props.append(VueProp(
                    name=prop_name,
                    type=prop_type,
                    required=required,
                    default=default_value
                ))
        
        return props
    
    @staticmethod
    def extract_props_from_options_api(content: str) -> List[VueProp]:
        """Extrai props de componente com Options API"""
        props = []
        
        # Pattern: props: { prop: { type: X, required: Y, default: Z } }
        props_match = re.search(
            r'props\s*:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}',
            content,
            re.DOTALL
        )
        
        if props_match:
            props_block = props_match.group(1)
            
            # Encontrar cada prop
            prop_pattern = r'(\w+)\s*:\s*\{([^}]+)\}'
            for match in re.finditer(prop_pattern, props_block):
                prop_name = match.group(1)
                prop_config = match.group(2)
                
                type_match = re.search(r'type:\s*(\w+)', prop_config)
                prop_type = type_match.group(1) if type_match else None
                
                required = 'required: true' in prop_config
                
                default_match = re.search(r'default:\s*([^,\n]+)', prop_config)
                default_value = default_match.group(1).strip() if default_match else None
                
                props.append(VueProp(
                    name=prop_name,
                    type=prop_type,
                    required=required,
                    default=default_value
                ))
        
        return props
    
    @staticmethod
    def extract_template_elements(content: str) -> List[str]:
        """Extrai elementos HTML principais do template"""
        elements = []
        
        # Encontrar bloco <template>
        template_match = re.search(r'<template>(.*?)</template>', content, re.DOTALL)
        if template_match:
            template = template_match.group(1)
            
            # Extrair tags principais (não tags de fechamento)
            tag_pattern = r'<([\w-]+)(?:\s|>|/)'
            tags = re.findall(tag_pattern, template)
            
            # Manter apenas tags únicas em ordem
            seen = set()
            for tag in tags:
                if tag not in seen:
                    elements.append(tag)
                    seen.add(tag)
        
        return elements
    
    @classmethod
    def parse(cls, file_path: Path) -> Optional[VueComponent]:
        """Parse completo de um arquivo Vue"""
        if not file_path.exists():
            return None
        
        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"⚠️  Erro ao ler {file_path}: {e}")
            return None
        
        # Detectar Composition API ou Options API
        is_composition = '<script setup>' in content
        
        # Extrair props
        if is_composition:
            props = cls.extract_props_from_composition_api(content)
        else:
            props = cls.extract_props_from_options_api(content)
        
        # Extrair elementos do template
        elements = cls.extract_template_elements(content)
        
        # Detectar slots e events (simplificado)
        has_slots = '<slot' in content
        has_events = '$emit' in content or '@' in content
        
        return VueComponent(
            name=file_path.stem,
            path=str(file_path.relative_to(ROOT_DIR)),
            props=props,
            template_elements=elements,
            has_slots=has_slots,
            has_events=has_events
        )


# ==============================================================================
# PARSERS - STORYBOOK STORIES
# ==============================================================================

class StorybookParser:
    """Parser para extrair metadados de stories Storybook"""
    
    @staticmethod
    def extract_source_path(content: str) -> Optional[str]:
        """Extrai o caminho do componente Vue do header comment (@source)"""
        source_match = re.search(r'@source\s+([^\n]+)', content)
        if source_match:
            return source_match.group(1).strip()
        return None
    
    @staticmethod
    def is_doc_only(content: str) -> bool:
        """Verifica se o componente é marcado como Doc-Only"""
        return bool(re.search(r'@category.*Doc-Only', content, re.IGNORECASE))
    
    @staticmethod
    def extract_doc_only_note(content: str) -> Optional[str]:
        """Extrai a nota explicativa do Doc-Only"""
        note_match = re.search(r'@note\s+([^\n]+)', content)
        if note_match:
            return note_match.group(1).strip()
        return None
    
    @staticmethod
    def extract_status(content: str) -> Optional[str]:
        """Extrai o status do componente (@status)"""
        status_match = re.search(r'@status\s+([^\n]+)', content)
        if status_match:
            return status_match.group(1).strip()
        return None
    
    @staticmethod
    def extract_title(content: str) -> Optional[str]:
        """Extrai o título da story"""
        title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", content)
        if title_match:
            return title_match.group(1)
        return None
    
    @staticmethod
    def extract_arg_types(content: str) -> List[StoryArgType]:
        """Extrai argTypes do Storybook"""
        arg_types = []
        
        # Procurar bloco argTypes: { ... }
        argtypes_match = re.search(
            r'argTypes\s*:\s*\{((?:[^{}]|\{[^{}]*\})*)\}',
            content,
            re.DOTALL
        )
        
        if argtypes_match:
            argtypes_block = argtypes_match.group(1)
            
            # Extrair cada argType
            # Pattern: propName: { control: 'text', description: '...' }
            argtype_pattern = r'(\w+)\s*:\s*\{([^}]+)\}'
            
            for match in re.finditer(argtype_pattern, argtypes_block):
                arg_name = match.group(1)
                arg_config = match.group(2)
                
                # Extrair control
                control_match = re.search(r"control:\s*['\"]([^'\"]+)['\"]", arg_config)
                control = control_match.group(1) if control_match else None
                
                # Extrair description
                desc_match = re.search(r"description:\s*['\"]([^'\"]+)['\"]", arg_config)
                description = desc_match.group(1) if desc_match else None
                
                arg_types.append(StoryArgType(
                    name=arg_name,
                    control=control,
                    description=description
                ))
        
        return arg_types
    
    @classmethod
    def parse(cls, file_path: Path) -> Optional[StorybookStory]:
        """Parse completo de uma story Storybook"""
        if not file_path.exists():
            return None
        
        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"⚠️  Erro ao ler {file_path}: {e}")
            return None
        
        return StorybookStory(
            name=file_path.stem.replace('.stories', ''),
            path=str(file_path.relative_to(ROOT_DIR)),
            source_path=cls.extract_source_path(content),
            arg_types=cls.extract_arg_types(content),
            title=cls.extract_title(content),
            status=cls.extract_status(content),
            doc_only=cls.is_doc_only(content),
            doc_only_note=cls.extract_doc_only_note(content)
        )


# ==============================================================================
# VALIDAÇÃO
# ==============================================================================

class ComponentValidator:
    """Valida correspondência entre componente Vue e story Storybook"""
    
    @staticmethod
    def validate_props(vue_comp: VueComponent, story: StorybookStory) -> List[ValidationIssue]:
        """Valida se todas as props do Vue estão documentadas na story"""
        issues = []
        
        vue_prop_names = {prop.name for prop in vue_comp.props}
        story_argtype_names = {arg.name for arg in story.arg_types}
        
        # Props faltantes na story
        missing = vue_prop_names - story_argtype_names
        for prop_name in missing:
            vue_prop = next(p for p in vue_comp.props if p.name == prop_name)
            issues.append(ValidationIssue(
                type='missing_prop',
                severity='warning' if not vue_prop.required else 'critical',
                message=f"Prop '{prop_name}' existe no Vue mas não está documentada nos argTypes",
                suggestion=f"Adicionar aos argTypes:\n{prop_name}: {{\n  control: 'text',\n  description: '(descrição da prop)'\n}}",
                prop_name=prop_name
            ))
        
        # ArgTypes extras (não existem no Vue)
        extra = story_argtype_names - vue_prop_names
        for arg_name in extra:
            issues.append(ValidationIssue(
                type='extra_argtype',
                severity='info',
                message=f"ArgType '{arg_name}' existe na story mas não é uma prop do Vue",
                suggestion=f"Verificar se '{arg_name}' é realmente necessário ou se há erro de digitação",
                prop_name=arg_name
            ))
        
        return issues
    
    @staticmethod
    def validate_html_structure(vue_comp: VueComponent, story: StorybookStory) -> List[ValidationIssue]:
        """Valida similaridade na estrutura HTML"""
        issues = []
        
        # Simplificado: verificar se elementos principais do Vue aparecem na story
        # (uma validação mais robusta exigiria analisar o render() da story)
        
        # Por enquanto, apenas informativo
        if len(vue_comp.template_elements) > 0:
            issues.append(ValidationIssue(
                type='html_structure',
                severity='info',
                message=f"Componente Vue usa {len(vue_comp.template_elements)} elementos HTML principais: {', '.join(vue_comp.template_elements[:5])}",
                suggestion="Verificar manualmente se a story renderiza estrutura similar"
            ))
        
        return issues
    
    @staticmethod
    def validate_example_data(vue_comp: VueComponent, story: StorybookStory) -> List[ValidationIssue]:
        """Valida se dados de exemplo são realistas"""
        issues = []
        
        # Simplificado: verificar se props required têm valores default realistas
        for prop in vue_comp.props:
            if prop.required and not prop.default:
                issues.append(ValidationIssue(
                    type='data_issue',
                    severity='info',
                    message=f"Prop obrigatória '{prop.name}' não tem valor default - verificar exemplos na story",
                    suggestion=f"Garantir que a story fornece valor realista para '{prop.name}'",
                    prop_name=prop.name
                ))
        
        return issues
    
    @classmethod
    def validate(cls, vue_comp: VueComponent, story: StorybookStory) -> ComponentValidation:
        """Executa validação completa"""
        issues = []
        
        # Validações
        issues.extend(cls.validate_props(vue_comp, story))
        issues.extend(cls.validate_html_structure(vue_comp, story))
        issues.extend(cls.validate_example_data(vue_comp, story))
        
        # Determinar status geral
        has_critical = any(issue.severity == 'critical' for issue in issues)
        has_warning = any(issue.severity == 'warning' for issue in issues)
        
        if has_critical:
            status = 'error'
        elif has_warning:
            status = 'warning'
        else:
            status = 'passed'
        
        return ComponentValidation(
            component_name=vue_comp.name,
            story_path=story.path,
            vue_path=vue_comp.path,
            status=status,
            issues=issues
        )


# ==============================================================================
# RELATÓRIOS
# ==============================================================================

class ReportGenerator:
    """Gera relatórios de validação em JSON e Markdown"""
    
    @staticmethod
    def generate_json_report(validations: List[ComponentValidation], output_path: Path):
        """Gera relatório JSON"""
        summary = {
            'total_components': len(validations),
            'passed': sum(1 for v in validations if v.status == 'passed'),
            'doc_only': sum(1 for v in validations if v.status == 'doc_only'),
            'warnings': sum(1 for v in validations if v.status == 'warning'),
            'errors': sum(1 for v in validations if v.status == 'error'),
            'not_found': sum(1 for v in validations if v.status == 'not_found'),
            'total_validated': sum(1 for v in validations if v.status in ['passed', 'doc_only'])
        }
        
        report = {
            'generated_at': datetime.now().isoformat(),
            'summary': summary,
            'components': [
                {
                    'name': v.component_name,
                    'story_path': v.story_path,
                    'vue_path': v.vue_path,
                    'status': v.status,
                    'issues': [
                        {
                            'type': issue.type,
                            'severity': issue.severity,
                            'message': issue.message,
                            'suggestion': issue.suggestion,
                            'prop_name': issue.prop_name
                        }
                        for issue in v.issues
                    ]
                }
                for v in validations
            ]
        }
        
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Relatório JSON gerado: {output_path}")
    
    @staticmethod
    def generate_markdown_report(validations: List[ComponentValidation], output_path: Path):
        """Gera relatório Markdown"""
        summary = {
            'total': len(validations),
            'passed': sum(1 for v in validations if v.status == 'passed'),
            'doc_only': sum(1 for v in validations if v.status == 'doc_only'),
            'warnings': sum(1 for v in validations if v.status == 'warning'),
            'errors': sum(1 for v in validations if v.status == 'error'),
            'not_found': sum(1 for v in validations if v.status == 'not_found'),
            'total_validated': sum(1 for v in validations if v.status in ['passed', 'doc_only'])
        }
        
        lines = [
            "# Relatório de Validação de Componentes Educacross",
            "",
            f"**Gerado em**: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}",
            "",
            "## 📊 Sumário Executivo",
            "",
            f"- ✅ **Aprovados**: {summary['passed']}/{summary['total']} ({summary['passed']/summary['total']*100:.1f}%)",
            f"- ⚠️  **Avisos**: {summary['warnings']}/{summary['total']} ({summary['warnings']/summary['total']*100:.1f}%)",
            f"- ❌ **Erros**: {summary['errors']}/{summary['total']} ({summary['errors']/summary['total']*100:.1f}%)",
            f"- 🔍 **Não Encontrados**: {summary['not_found']}/{summary['total']}",
            "",
            "---",
            ""
        ]
        
        # Componentes com erros
        errors = [v for v in validations if v.status == 'error']
        if errors:
            lines.append(f"## ❌ Componentes com Erros Críticos ({len(errors)})")
            lines.append("")
            for v in errors:
                lines.append(f"### {v.component_name}")
                lines.append(f"- **Story**: `{v.story_path}`")
                lines.append(f"- **Vue**: `{v.vue_path}`")
                lines.append("")
                
                critical_issues = [i for i in v.issues if i.severity == 'critical']
                for issue in critical_issues:
                    lines.append(f"**{issue.type}**: {issue.message}")
                    if issue.suggestion:
                        lines.append(f"```")
                        lines.append(issue.suggestion)
                        lines.append(f"```")
                    lines.append("")
                lines.append("---")
                lines.append("")
        
        # Componentes com avisos
        warnings = [v for v in validations if v.status == 'warning']
        if warnings:
            lines.append(f"## ⚠️  Componentes com Avisos ({len(warnings)})")
            lines.append("")
            for v in warnings[:10]:  # Limitar a 10 para não ficar muito grande
                lines.append(f"### {v.component_name}")
                lines.append(f"- **Story**: `{v.story_path}`")
                lines.append("")
                
                warning_issues = [i for i in v.issues if i.severity == 'warning']
                for issue in warning_issues:
                    lines.append(f"- {issue.message}")
                lines.append("")
            
            if len(warnings) > 10:
                lines.append(f"*...e mais {len(warnings) - 10} componentes com avisos (veja relatório JSON completo)*")
                lines.append("")
        
        # Componentes aprovados
        passed = [v for v in validations if v.status == 'passed']
        if passed:
            lines.append(f"## ✅ Componentes Aprovados ({len(passed)})")
            lines.append("")
            lines.append(", ".join([v.component_name for v in passed[:20]]))
            if len(passed) > 20:
                lines.append(f"\n\n*...e mais {len(passed) - 20} componentes aprovados*")
            lines.append("")
        
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print(f"✅ Relatório Markdown gerado: {output_path}")


# ==============================================================================
# MAIN
# ==============================================================================

def find_vue_component(source_path: str) -> Optional[Path]:
    """Encontra arquivo Vue baseado no @source da story"""
    if not source_path:
        return None
    
    # Remover prefixo 'educacross-frontoffice/' se existir
    clean_path = source_path.replace('educacross-frontoffice/', '')
    clean_path = clean_path.replace('educacross-frontoffice\\', '')
    
    full_path = ROOT_DIR / 'educacross-frontoffice' / clean_path
    
    if full_path.exists():
        return full_path
    
    return None


def should_ignore(file_path: Path) -> bool:
    """Verifica se arquivo deve ser ignorado"""
    return any(pattern in file_path.name for pattern in IGNORE_PATTERNS)


def main():
    """Função principal"""
    print("🔍 Iniciando validação de componentes Educacross...")
    print(f"📁 Stories: {STORIES_DIR}")
    print(f"📁 Componentes Vue: {VUE_COMPONENTS_DIR}")
    print()
    
    # Coletar todas as stories
    story_files = list(STORIES_DIR.glob("*.stories.js"))
    story_files = [f for f in story_files if not should_ignore(f)]
    
    print(f"📚 Encontradas {len(story_files)} stories para validar")
    print()
    
    validations = []
    
    for story_file in story_files:
        print(f"🔍 Validando: {story_file.name}...", end=' ')
        
        # Parse story
        story = StorybookParser.parse(story_file)
        if not story:
            print("❌ Erro ao parsear story")
            continue
        
        # Encontrar componente Vue correspondente
        vue_file = find_vue_component(story.source_path) if story.source_path else None
        
        # Se é Doc-Only, considerar como válido
        if story.doc_only:
            validations.append(ComponentValidation(
                component_name=story.name,
                story_path=story.path,
                vue_path=None,
                status='doc_only',
                issues=[ValidationIssue(
                    type='doc_only',
                    severity='info',
                    message=f"📚 Doc-Only: {story.doc_only_note or 'Componente de documentação apenas'}",
                    suggestion="Este componente é documentação/especificação visual, sem arquivo .vue correspondente"
                )]
            ))
            print("📚 DOC-ONLY")
            continue
        
        if not vue_file:
            validations.append(ComponentValidation(
                component_name=story.name,
                story_path=story.path,
                vue_path=None,
                status='not_found',
                issues=[ValidationIssue(
                    type='not_found',
                    severity='critical',
                    message=f"Componente Vue não encontrado. @source: {story.source_path}",
                    suggestion="Verificar se o caminho @source está correto no header da story"
                )]
            ))
            print("⚠️  Componente Vue não encontrado")
            continue
        
        # Parse componente Vue
        vue_comp = VueComponentParser.parse(vue_file)
        if not vue_comp:
            print("❌ Erro ao parsear Vue")
            continue
        
        # Validar
        validation = ComponentValidator.validate(vue_comp, story)
        validations.append(validation)
        
        # Emoji status
        status_emoji = {
            'passed': '✅',
            'warning': '⚠️ ',
            'error': '❌',
            'not_found': '🔍',
            'doc_only': '📚'
        }
        print(f"{status_emoji.get(validation.status, '❓')} {validation.status.upper()}")
    
    print()
    print("=" * 60)
    print("📊 RESUMO DA VALIDAÇÃO")
    print("=" * 60)
    
    summary = {
        'total': len(validations),
        'passed': sum(1 for v in validations if v.status == 'passed'),
        'doc_only': sum(1 for v in validations if v.status == 'doc_only'),
        'warnings': sum(1 for v in validations if v.status == 'warning'),
        'errors': sum(1 for v in validations if v.status == 'error'),
        'not_found': sum(1 for v in validations if v.status == 'not_found')
    }
    
    print(f"Total de componentes: {summary['total']}")
    print(f"✅ Aprovados: {summary['passed']} ({summary['passed']/summary['total']*100:.1f}%)")
    print(f"📚 Doc-Only: {summary['doc_only']} ({summary['doc_only']/summary['total']*100:.1f}%)")
    print(f"⚠️  Avisos: {summary['warnings']} ({summary['warnings']/summary['total']*100:.1f}%)")
    print(f"❌ Erros: {summary['errors']} ({summary['errors']/summary['total']*100:.1f}%)")
    print(f"🔍 Não encontrados: {summary['not_found']}")
    print()
    print(f"🎯 Total Validados: {summary['passed'] + summary['doc_only']}/{summary['total']} ({(summary['passed'] + summary['doc_only'])/summary['total']*100:.1f}%)")
    print()
    
    # Gerar relatórios
    print("📝 Gerando relatórios...")
    ReportGenerator.generate_json_report(
        validations,
        REPORTS_DIR / 'validation-report.json'
    )
    ReportGenerator.generate_markdown_report(
        validations,
        REPORTS_DIR / 'validation-report.md'
    )
    
    print()
    print("✅ Validação concluída!")
    print(f"📄 Relatórios salvos em: {REPORTS_DIR}")


if __name__ == '__main__':
    main()
