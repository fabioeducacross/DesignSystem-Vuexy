#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para Marcar Componentes como Doc-Only
=============================================

Adiciona tag @category Doc-Only nos 12 componentes órfãos
com nota explicativa do motivo.

Execução:
    python scripts/mark-doc-only.py [--dry-run]
"""

import os
import re
from pathlib import Path
import argparse

ROOT_DIR = Path(__file__).parent.parent
STORIES_DIR = ROOT_DIR / "src" / "stories" / "educacross-components-v2"

# Mapeamento dos 12 componentes com explicação do porquê são Doc-Only
DOC_ONLY_COMPONENTS = {
    # Protótipos/Specs (5)
    "EInput": {
        "reason": "Especificação visual. Componente Vue nunca foi implementado.",
        "planned_path": "educacross-frontoffice/src/components/form/EInput.vue"
    },
    "ETextarea": {
        "reason": "Especificação visual. Componente Vue nunca foi implementado.",
        "planned_path": "educacross-frontoffice/src/components/form/ETextarea.vue"
    },
    "FilterChip": {
        "reason": "Padrão de uso documentado. Não componentizado no Vue.",
        "planned_path": None
    },
    "BadgeList": {
        "reason": "Conceito educacional documentado. Não componentizado no Vue.",
        "planned_path": None
    },
    "EditProfileStudentNew": {
        "reason": "Especificação de tela. Não componentizado no Vue.",
        "planned_path": None
    },
    
    # Conceito Composto (1)
    "Sidebar": {
        "reason": "Conceito arquitetural composto por múltiplos arquivos Vue (VerticalNavMenu, VerticalNavMenuItems, etc.).",
        "planned_path": None
    },
    
    # Deletados/Refatorados (3)
    "ProfilePicture": {
        "reason": "Componente foi removido ou consolidado com outros componentes de avatar.",
        "planned_path": None
    },
    "ResourceCard": {
        "reason": "Componente foi removido ou substituído por MediaCard.",
        "planned_path": None
    },
    "StudentAvatar": {
        "reason": "Componente foi removido ou consolidado com outros componentes de avatar.",
        "planned_path": None
    },
    
    # Referências Parciais (3)
    "AppNavbar": {
        "reason": "Documentação de trecho de código de ManageAccount.vue (linhas 6-68). Não é componente reutilizável.",
        "planned_path": None
    },
    "AcceptOrRejectAccess": {
        "reason": "Lógica específica de página. Não componentizado no Vue.",
        "planned_path": None
    },
    "SubjectCard": {
        "reason": "Possível variação de SubjectBand. Necessita análise.",
        "planned_path": None
    }
}


def add_doc_only_category(story_path, component_name, reason, planned_path=None):
    """
    Adiciona @category Doc-Only e nota explicativa no header da story.
    """
    with open(story_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    
    # Encontrar linha com @category existente ou posição para inserir
    category_line_idx = None
    component_line_idx = None
    insert_idx = None
    
    for idx, line in enumerate(lines[:50]):
        if '@category' in line:
            category_line_idx = idx
        if '@component' in line:
            component_line_idx = idx
        if '@source' in line and insert_idx is None:
            insert_idx = idx  # Inserir antes de @source
    
    # Se não tem @source, inserir depois de @component
    if insert_idx is None and component_line_idx is not None:
        insert_idx = component_line_idx + 1
    
    # Se ainda não encontrou posição, inserir no início do comentário (linha 5)
    if insert_idx is None:
        insert_idx = 5
    
    # Se já tem @category, substituir
    if category_line_idx is not None:
        old_category = lines[category_line_idx].strip()
        if 'Doc-Only' not in old_category:
            # Adicionar Doc-Only à categoria existente
            lines[category_line_idx] = lines[category_line_idx].replace(
                '@category',
                '@category Doc-Only /'
            )
    else:
        # Adicionar nova linha @category
        indent = " * "
        lines.insert(insert_idx, f"{indent}@category Doc-Only")
        insert_idx += 1
    
    # Adicionar @note com explicação
    note_exists = any('@note' in line for line in lines[:50])
    if not note_exists:
        indent = " * "
        note_text = f"{indent}@note {reason}"
        
        # Se tem planned_path, adicionar também
        if planned_path:
            note_text += f"\n{indent}@planned {planned_path}"
        
        lines.insert(insert_idx + 1, note_text)
    
    return '\n'.join(lines)


def process_component(component_name, config, dry_run=False):
    """
    Processa um componente específico.
    """
    story_path = STORIES_DIR / f"{component_name}.stories.js"
    
    if not story_path.exists():
        return {
            "status": "ERROR",
            "message": f"Arquivo não encontrado: {story_path}"
        }
    
    # Ler conteúdo original
    with open(story_path, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Verificar se já tem Doc-Only
    if '@category Doc-Only' in original_content or '@category' in original_content and 'Doc-Only' in original_content:
        return {
            "status": "SKIP",
            "message": "Já possui @category Doc-Only"
        }
    
    # Aplicar modificação
    new_content = add_doc_only_category(
        story_path,
        component_name,
        config['reason'],
        config.get('planned_path')
    )
    
    # Salvar (se não for dry-run)
    if not dry_run:
        with open(story_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return {
        "status": "SUCCESS",
        "component": component_name,
        "reason": config['reason'],
        "dry_run": dry_run
    }


def main():
    parser = argparse.ArgumentParser(description='Marca componentes órfãos como Doc-Only')
    parser.add_argument('--dry-run', action='store_true',
                       help='Simula marcação sem modificar arquivos')
    args = parser.parse_args()
    
    print("=" * 80)
    print("MARCAÇÃO DE COMPONENTES COMO DOC-ONLY")
    print("=" * 80)
    print()
    
    if args.dry_run:
        print("⚠️  MODO DRY-RUN: Nenhum arquivo será modificado")
        print()
    
    results = []
    
    # Processar por categoria
    categories = {
        "Protótipos/Specs": ["EInput", "ETextarea", "FilterChip", "BadgeList", "EditProfileStudentNew"],
        "Conceito Composto": ["Sidebar"],
        "Deletados/Refatorados": ["ProfilePicture", "ResourceCard", "StudentAvatar"],
        "Referências Parciais": ["AppNavbar", "AcceptOrRejectAccess", "SubjectCard"]
    }
    
    for category, components in categories.items():
        print(f"📁 {category}")
        print("-" * 80)
        
        for component in components:
            config = DOC_ONLY_COMPONENTS[component]
            result = process_component(component, config, dry_run=args.dry_run)
            results.append(result)
            
            if result['status'] == 'SUCCESS':
                print(f"  ✅ {component}")
                print(f"     Razão: {config['reason'][:60]}...")
            elif result['status'] == 'SKIP':
                print(f"  ⏭️  {component} - {result['message']}")
            else:
                print(f"  ❌ {component} - {result['message']}")
        
        print()
    
    # Resumo
    print("=" * 80)
    print("RESUMO")
    print("=" * 80)
    print()
    
    success_count = len([r for r in results if r['status'] == 'SUCCESS'])
    skip_count = len([r for r in results if r['status'] == 'SKIP'])
    error_count = len([r for r in results if r['status'] == 'ERROR'])
    
    print(f"✅ Marcados: {success_count}/{len(DOC_ONLY_COMPONENTS)}")
    print(f"⏭️  Pulados: {skip_count}")
    print(f"❌ Erros: {error_count}")
    print()
    
    if args.dry_run:
        print("⚠️  DRY-RUN: Execute novamente sem --dry-run para aplicar")
    else:
        print("✅ Marcação aplicada!")
        print()
        print("📊 Próximo passo: Re-executar validação")
        print("   python scripts/validate-components.py")
    
    print()
    print("💡 Tag @category Doc-Only indica:")
    print("   - Componente é documentação/especificação")
    print("   - Não existe arquivo .vue correspondente")
    print("   - Transparência total para desenvolvedores")


if __name__ == '__main__':
    main()
