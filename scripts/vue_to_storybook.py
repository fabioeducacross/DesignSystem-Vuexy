#!/usr/bin/env python3
"""
Vue to Storybook Extractor
--------------------------
Extrai componentes Vue do frontoffice e gera stories pixel-perfect para o Storybook.

Uso:
    python scripts/vue_to_storybook.py --component ESelect
    python scripts/vue_to_storybook.py --all
    python scripts/vue_to_storybook.py --list
"""

import os
import re
import json
import argparse
from pathlib import Path
from dataclasses import dataclass
from typing import Optional, List, Dict

# Configurações
FRONTOFFICE_PATH = Path("educacross-frontoffice/src/components")
OUTPUT_PATH = Path("src/stories/educacross-components-v2")
CSS_VARIABLES = """
:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}
"""


@dataclass
class VueComponent:
    """Representa um componente Vue extraído"""
    name: str
    file_path: Path
    template: str
    script: str
    style: str
    props: List[Dict]
    emits: List[str]
    slots: List[str]


class VueParser:
    """Parser para arquivos .vue"""
    
    @staticmethod
    def extract_section(content: str, tag: str) -> str:
        """Extrai uma seção do arquivo Vue (template, script, style)"""
        # Padrão para capturar conteúdo entre tags
        pattern = rf'<{tag}[^>]*>(.*?)</{tag}>'
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        return match.group(1).strip() if match else ""
    
    @staticmethod
    def extract_props(script: str) -> List[Dict]:
        """Extrai props do script Vue"""
        props = []
        
        # Padrão para defineProps
        props_match = re.search(r'defineProps\s*\(\s*\{([^}]+)\}', script, re.DOTALL)
        if props_match:
            props_content = props_match.group(1)
            # Extrai cada prop
            prop_pattern = r'(\w+)\s*:\s*\{([^}]+)\}'
            for match in re.finditer(prop_pattern, props_content):
                prop_name = match.group(1)
                prop_config = match.group(2)
                
                # Extrai tipo
                type_match = re.search(r'type\s*:\s*(\w+)', prop_config)
                prop_type = type_match.group(1) if type_match else "Any"
                
                # Extrai default
                default_match = re.search(r'default\s*:\s*([^,\n]+)', prop_config)
                default_value = default_match.group(1).strip() if default_match else None
                
                # Extrai required
                required_match = re.search(r'required\s*:\s*(true|false)', prop_config)
                required = required_match.group(1) == 'true' if required_match else False
                
                props.append({
                    'name': prop_name,
                    'type': prop_type,
                    'default': default_value,
                    'required': required
                })
        
        return props
    
    @staticmethod
    def extract_emits(script: str) -> List[str]:
        """Extrai eventos emitidos"""
        emits = []
        emits_match = re.search(r'defineEmits\s*\(\s*\[([^\]]+)\]', script)
        if emits_match:
            emits_content = emits_match.group(1)
            emits = [e.strip().strip("'\"") for e in emits_content.split(',')]
        return emits
    
    @staticmethod
    def extract_slots(template: str) -> List[str]:
        """Extrai slots do template"""
        slots = []
        slot_pattern = r'<slot\s+name=["\']([^"\']+)["\']'
        for match in re.finditer(slot_pattern, template):
            slots.append(match.group(1))
        # Também verifica slot default
        if '<slot>' in template or '<slot/>' in template:
            slots.insert(0, 'default')
        return slots
    
    @classmethod
    def parse_file(cls, file_path: Path) -> Optional[VueComponent]:
        """Faz parse de um arquivo .vue"""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            template = cls.extract_section(content, 'template')
            script = cls.extract_section(content, 'script')
            style = cls.extract_section(content, 'style')
            
            # Remove scoped do style se existir
            style = re.sub(r'<style[^>]*scoped[^>]*>', '', style)
            
            return VueComponent(
                name=file_path.stem,
                file_path=file_path,
                template=template,
                script=script,
                style=style,
                props=cls.extract_props(script),
                emits=cls.extract_emits(script),
                slots=cls.extract_slots(template)
            )
        except Exception as e:
            print(f"❌ Erro ao parsear {file_path}: {e}")
            return None


class TemplateConverter:
    """Converte template Vue para HTML estático"""
    
    # Mapeamento de componentes Vue para HTML equivalente
    VUE_TO_HTML_MAP = {
        # Bootstrap Vue
        'BCard': 'div class="card"',
        'BCardHeader': 'div class="card-header"',
        'BCardBody': 'div class="card-body"',
        'BCardFooter': 'div class="card-footer"',
        'BCardTitle': 'h5 class="card-title"',
        'BCardText': 'p class="card-text"',
        'BButton': 'button class="btn btn-primary"',
        'BBtn': 'button class="btn btn-primary"',
        'BTable': 'table class="table"',
        'BThead': 'thead',
        'BTbody': 'tbody',
        'BTr': 'tr',
        'BTh': 'th',
        'BTd': 'td',
        'BFormInput': 'input class="form-control" type="text"',
        'BFormSelect': 'select class="form-select"',
        'BFormCheckbox': 'input class="form-check-input" type="checkbox"',
        'BFormGroup': 'div class="mb-3"',
        'BInputGroup': 'div class="input-group"',
        'BInputGroupPrepend': 'span class="input-group-text"',
        'BInputGroupAppend': 'span class="input-group-text"',
        'BRow': 'div class="row"',
        'BCol': 'div class="col"',
        'BContainer': 'div class="container"',
        'BModal': 'div class="modal" style="display: block; position: relative;"',
        'BModalHeader': 'div class="modal-header"',
        'BModalBody': 'div class="modal-body"',
        'BModalFooter': 'div class="modal-footer"',
        'BDropdown': 'div class="dropdown"',
        'BDropdownItem': 'a class="dropdown-item" href="#"',
        'BCollapse': 'div class="collapse show"',
        'BAccordion': 'div class="accordion"',
        'BAccordionItem': 'div class="accordion-item"',
        'BBadge': 'span class="badge bg-primary"',
        'BSpinner': 'div class="spinner-border spinner-border-sm"',
        'BProgress': 'div class="progress"',
        'BProgressBar': 'div class="progress-bar" style="width: 50%"',
        'BAlert': 'div class="alert alert-primary"',
        'BTooltip': 'span',
        'BPopover': 'span',
        'BNav': 'ul class="nav"',
        'BNavItem': 'li class="nav-item"',
        'BNavLink': 'a class="nav-link" href="#"',
        'BTabs': 'div class="nav nav-tabs"',
        'BTab': 'div class="tab-pane active"',
        'BPagination': 'nav class="pagination"',
        'BImg': 'img',
        'BLink': 'a href="#"',
        'BIcon': 'i class="ti ti-star"',
        
        # Vue Select
        'VSelect': 'select class="form-select"',
        'vSelect': 'select class="form-select"',
        
        # ApexCharts
        'VueApexCharts': 'div class="apex-chart-placeholder" style="width: 100%; height: 250px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;"',
        'apexchart': 'div class="apex-chart-placeholder" style="width: 100%; height: 250px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;"',
        
        # Router
        'RouterLink': 'a href="#"',
        'router-link': 'a href="#"',
        'RouterView': 'div class="router-view"',
        
        # Transitions
        'Transition': 'div',
        'TransitionGroup': 'div',
        'transition': 'div',
        
        # Teleport
        'Teleport': 'div',
        
        # Keep Alive
        'KeepAlive': 'div',
        
        # Suspense
        'Suspense': 'div',
        
        # Fragment
        'template': 'div',
        
        # Custom Educacross components
        'ESelect': 'select class="form-select e-select"',
        'EFormCheck': 'div class="form-check"',
        'MediaCard': 'div class="card media-card"',
        'LegendCard': 'div class="card legend-card"',
        'BadgeStatus': 'span class="badge"',
        'ProgressBarHorizontal': 'div class="progress"',
        'AppCollapse': 'div class="accordion"',
        'AppCollapseItem': 'div class="accordion-item"',
        'ListTable': 'div class="table-responsive"',
        'TabCards': 'div class="tab-cards"',
        'Divider': 'hr class="divider"',
        'VerticalDivider': 'div class="vr"',
        
        # Icons
        'Icon': 'i class="ti ti-star"',
    }
    
    @classmethod
    def vue_to_html(cls, template: str, sample_data: Dict = None) -> str:
        """Converte sintaxe Vue para HTML estático"""
        html = template
        
        # Remove v-if, v-else, v-show (mantém o elemento)
        html = re.sub(r'\s+v-if="[^"]*"', '', html)
        html = re.sub(r'\s+v-else-if="[^"]*"', '', html)
        html = re.sub(r'\s+v-else', '', html)
        html = re.sub(r'\s+v-show="[^"]*"', '', html)
        
        # Remove v-for (mantém o elemento uma vez)
        html = re.sub(r'\s+v-for="[^"]*"', '', html)
        html = re.sub(r'\s+:key="[^"]*"', '', html)
        
        # Remove v-model
        html = re.sub(r'\s+v-model="[^"]*"', '', html)
        
        # Converte :class para class (preserva valor se possível)
        html = re.sub(r':class="[^"]*"', 'class=""', html)
        
        # Converte :style para style
        html = re.sub(r':style="[^"]*"', 'style=""', html)
        
        # Converte v-bind:attr para attr
        html = re.sub(r'v-bind:(\w+)="[^"]*"', r'\1=""', html)
        
        # Converte :attr para attr (binding)
        html = re.sub(r':(\w+)="[^"]*"', r'\1=""', html)
        
        # Remove event handlers (@click, @input, etc)
        html = re.sub(r'\s+@[\w.-]+="[^"]*"', '', html)
        html = re.sub(r'\s+v-on:[\w.-]+="[^"]*"', '', html)
        
        # Remove v-html e v-text
        html = re.sub(r'\s+v-html="[^"]*"', '', html)
        html = re.sub(r'\s+v-text="[^"]*"', '', html)
        
        # Remove ref
        html = re.sub(r'\s+ref="[^"]*"', '', html)
        
        # CONVERTE COMPONENTES VUE PARA HTML
        for vue_comp, html_equiv in cls.VUE_TO_HTML_MAP.items():
            # Opening tag with attributes
            html = re.sub(
                rf'<{vue_comp}(\s[^>]*)?>',
                f'<{html_equiv}>',
                html,
                flags=re.IGNORECASE
            )
            # Self-closing tag
            html = re.sub(
                rf'<{vue_comp}(\s[^>]*)?\s*/>',
                f'<{html_equiv}></{html_equiv.split()[0]}>',
                html,
                flags=re.IGNORECASE
            )
            # Closing tag
            html = re.sub(
                rf'</{vue_comp}>',
                f'</{html_equiv.split()[0]}>',
                html,
                flags=re.IGNORECASE
            )
        
        # Converte componentes desconhecidos para div
        # Padrão: PascalCase ou kebab-case custom components
        html = re.sub(r'<([A-Z][a-zA-Z0-9]+)(\s[^>]*)?>(?!</)', r'<div class="\1"\2>', html)
        html = re.sub(r'<([A-Z][a-zA-Z0-9]+)\s*/>', r'<div class="\1"></div>', html)
        html = re.sub(r'</([A-Z][a-zA-Z0-9]+)>', r'</div>', html)
        
        # Remove slots (substitui por placeholder)
        html = re.sub(r'<slot\s*/>', '<div class="slot-placeholder">[Slot Content]</div>', html)
        html = re.sub(r'<slot[^>]*>([^<]*)</slot>', r'<div class="slot-placeholder">\1</div>', html)
        html = re.sub(r'<slot[^>]*>', '<div class="slot-placeholder">', html)
        html = re.sub(r'</slot>', '</div>', html)
        
        # IMPORTANTE: Remove TODA a interpolação Vue {{ ... }}
        html = re.sub(r'\{\{[^}]*\}\}', 'Sample Text', html)
        
        # Remove template literals JavaScript
        html = re.sub(r'`[^`]*\$\{[^}]*\}[^`]*`', '""', html)
        
        # Remove referências a $t (i18n)
        html = re.sub(r"\$t\(['\"][^'\"]+['\"]\)", 'Texto', html)
        
        # Escapa backticks
        html = html.replace('`', "'")
        
        # Remove expressões ternárias órfãs
        html = re.sub(r'\?\s*[\'"][^\']*[\'"]\s*:\s*[\'"][^\']*[\'"]', '', html)
        
        # Limpa atributos vazios duplicados
        html = re.sub(r'class=""\s+class="', 'class="', html)
        html = re.sub(r'style=""\s+style="', 'style="', html)
        
        # Remove linhas vazias excessivas
        html = re.sub(r'\n\s*\n\s*\n', '\n\n', html)
        
        return html
    
    @staticmethod
    def scss_to_css(scss: str) -> str:
        """Converte SCSS básico para CSS (simplificado)"""
        css = scss
        
        # Remove variáveis SCSS ($var)
        css = re.sub(r'\$[\w-]+', 'inherit', css)
        
        # Remove @import
        css = re.sub(r'@import\s+[^;]+;', '', css)
        
        # Remove @use
        css = re.sub(r'@use\s+[^;]+;', '', css)
        
        # Remove @include (mixins)
        css = re.sub(r'@include\s+[\w-]+\([^)]*\)\s*;?', '', css)
        
        # Remove @function e @mixin definitions
        css = re.sub(r'@function\s+[\w-]+\([^)]*\)\s*\{[^}]*\}', '', css)
        css = re.sub(r'@mixin\s+[\w-]+\([^)]*\)\s*\{[^}]*\}', '', css)
        
        # Remove @if, @else, @for, @each, @while
        css = re.sub(r'@if\s+[^{]+\{[^}]*\}', '', css)
        css = re.sub(r'@else\s*\{[^}]*\}', '', css)
        css = re.sub(r'@for\s+[^{]+\{[^}]*\}', '', css)
        css = re.sub(r'@each\s+[^{]+\{[^}]*\}', '', css)
        
        return css


class StoryGenerator:
    """Gera arquivos .stories.js para Storybook"""
    
    STORY_TEMPLATE = '''/**
 * {component_name} - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component {component_name}
 * @source {source_path}
 * @generated {timestamp}
 * 
 * Props: {props_summary}
 * Slots: {slots_summary}
 * Emits: {emits_summary}
 */

export default {{
  title: 'Educacross V2/{component_name}',
  tags: ['autodocs'],
  parameters: {{
    layout: 'centered',
    docs: {{
      description: {{
        component: `
## {component_name}

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
{props_docs}

### Slots
{slots_docs}

### Events
{emits_docs}
        `
      }}
    }}
  }}
}};

// Estilos inline do componente
const componentStyles = `
{css_variables}

{component_styles}
`;

// Template base
const baseTemplate = `
{html_template}
`;

// Story: Default
export const Default = {{
  render: () => `
    <style>${{componentStyles}}</style>
    ${{baseTemplate}}
  `
}};

{additional_stories}
'''
    
    @classmethod
    def generate(cls, component: VueComponent) -> str:
        """Gera o conteúdo do arquivo .stories.js"""
        from datetime import datetime
        
        # Converte template e estilo
        html = TemplateConverter.vue_to_html(component.template)
        css = TemplateConverter.scss_to_css(component.style)
        
        # Gera documentação das props
        props_summary = ', '.join([p['name'] for p in component.props]) or 'None'
        props_docs = '\n'.join([
            f"- **{p['name']}** ({p['type']}): {'Required' if p['required'] else 'Optional'}"
            for p in component.props
        ]) or '- Nenhuma prop definida'
        
        # Documentação de slots e emits
        slots_summary = ', '.join(component.slots) or 'None'
        slots_docs = '\n'.join([f"- **{s}**" for s in component.slots]) or '- Nenhum slot definido'
        
        emits_summary = ', '.join(component.emits) or 'None'
        emits_docs = '\n'.join([f"- **{e}**" for e in component.emits]) or '- Nenhum evento definido'
        
        # Gera stories adicionais baseado nas props
        additional_stories = cls._generate_variant_stories(component)
        
        # Preenche o template
        story_content = cls.STORY_TEMPLATE.format(
            component_name=component.name,
            source_path=str(component.file_path),
            timestamp=datetime.now().isoformat(),
            props_summary=props_summary,
            props_docs=props_docs,
            slots_summary=slots_summary,
            slots_docs=slots_docs,
            emits_summary=emits_summary,
            emits_docs=emits_docs,
            css_variables=CSS_VARIABLES,
            component_styles=css,
            html_template=html,
            additional_stories=additional_stories
        )
        
        return story_content
    
    @classmethod
    def _generate_variant_stories(cls, component: VueComponent) -> str:
        """Gera stories variantes baseado nas props"""
        variants = []
        
        # Se tem prop 'loading', gera variante Loading
        if any(p['name'] == 'loading' for p in component.props):
            variants.append('''
// Story: Loading State
export const Loading = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="loading-state">
      ${baseTemplate.replace('class="', 'class="loading ')}
    </div>
  `
};
''')
        
        # Se tem prop 'disabled', gera variante Disabled
        if any(p['name'] == 'disabled' for p in component.props):
            variants.append('''
// Story: Disabled State
export const Disabled = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="disabled-state">
      ${baseTemplate}
    </div>
  `
};
''')
        
        # Se tem prop 'variant' ou 'type', gera variantes
        variant_prop = next((p for p in component.props if p['name'] in ['variant', 'type', 'color']), None)
        if variant_prop:
            variants.append('''
// Story: Variants
export const Variants = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <div class="variant-primary">${baseTemplate}</div>
      <div class="variant-success">${baseTemplate}</div>
      <div class="variant-danger">${baseTemplate}</div>
      <div class="variant-warning">${baseTemplate}</div>
    </div>
  `
};
''')
        
        # Se tem prop 'size', gera variantes de tamanho
        if any(p['name'] == 'size' for p in component.props):
            variants.append('''
// Story: Sizes
export const Sizes = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div class="size-sm">${baseTemplate}</div>
      <div class="size-md">${baseTemplate}</div>
      <div class="size-lg">${baseTemplate}</div>
    </div>
  `
};
''')
        
        return '\n'.join(variants)


class ComponentDiscovery:
    """Descobre componentes Vue no frontoffice"""
    
    @staticmethod
    def find_all_components(base_path: Path) -> List[Path]:
        """Encontra todos os arquivos .vue"""
        components = []
        
        if not base_path.exists():
            print(f"⚠️  Caminho não encontrado: {base_path}")
            return components
        
        for vue_file in base_path.rglob("*.vue"):
            # Ignora arquivos de teste
            if '.test.' not in vue_file.name and '.spec.' not in vue_file.name:
                components.append(vue_file)
        
        return sorted(components, key=lambda x: x.name)
    
    @staticmethod
    def categorize_components(components: List[Path]) -> Dict[str, List[Path]]:
        """Categoriza componentes por pasta/tipo"""
        categories = {}
        
        for comp in components:
            # Pega o nome da pasta pai como categoria
            parent = comp.parent.name
            if parent not in categories:
                categories[parent] = []
            categories[parent].append(comp)
        
        return categories


def main():
    parser = argparse.ArgumentParser(description='Extrai componentes Vue para Storybook')
    parser.add_argument('--component', '-c', help='Nome do componente específico')
    parser.add_argument('--all', '-a', action='store_true', help='Processa todos os componentes')
    parser.add_argument('--list', '-l', action='store_true', help='Lista componentes disponíveis')
    parser.add_argument('--dry-run', '-d', action='store_true', help='Simula sem criar arquivos')
    parser.add_argument('--output', '-o', default=str(OUTPUT_PATH), help='Pasta de saída')
    
    args = parser.parse_args()
    
    # Configura caminhos
    output_path = Path(args.output)
    
    print("\n" + "=" * 60)
    print("   🔄 Vue to Storybook Extractor")
    print("=" * 60 + "\n")
    
    # Descobre componentes
    print("📁 Buscando componentes em:", FRONTOFFICE_PATH)
    components = ComponentDiscovery.find_all_components(FRONTOFFICE_PATH)
    
    if not components:
        print("❌ Nenhum componente encontrado!")
        return
    
    print(f"✅ Encontrados {len(components)} componentes\n")
    
    # Lista componentes
    if args.list:
        categories = ComponentDiscovery.categorize_components(components)
        for category, comps in categories.items():
            print(f"\n📂 {category}/")
            for c in comps:
                print(f"   └── {c.name}")
        return
    
    # Processa componente específico
    if args.component:
        target = None
        for c in components:
            if c.stem.lower() == args.component.lower():
                target = c
                break
        
        if not target:
            print(f"❌ Componente '{args.component}' não encontrado!")
            print("💡 Use --list para ver componentes disponíveis")
            return
        
        components = [target]
    
    # Processa componentes
    if not args.all and not args.component:
        print("⚠️  Use --all para processar todos ou --component <nome>")
        return
    
    # Cria pasta de saída
    if not args.dry_run:
        output_path.mkdir(parents=True, exist_ok=True)
    
    success_count = 0
    error_count = 0
    
    for comp_path in components:
        print(f"🔄 Processando: {comp_path.name}...", end=" ")
        
        # Parse do componente
        component = VueParser.parse_file(comp_path)
        if not component:
            print("❌ Erro no parse")
            error_count += 1
            continue
        
        # Gera story
        story_content = StoryGenerator.generate(component)
        
        # Salva arquivo
        output_file = output_path / f"{component.name}.stories.js"
        
        if args.dry_run:
            print(f"✅ (dry-run) -> {output_file}")
        else:
            try:
                output_file.write_text(story_content, encoding='utf-8')
                print(f"✅ -> {output_file.name}")
                success_count += 1
            except Exception as e:
                print(f"❌ Erro ao salvar: {e}")
                error_count += 1
    
    # Resumo
    print("\n" + "=" * 60)
    print(f"   📊 RESUMO")
    print("=" * 60)
    print(f"   ✅ Sucesso: {success_count}")
    print(f"   ❌ Erros: {error_count}")
    print(f"   📂 Saída: {output_path}")
    print("=" * 60 + "\n")
    
    if success_count > 0 and not args.dry_run:
        print("💡 Próximos passos:")
        print("   1. npm run build-storybook")
        print("   2. npx playwright test --grep 'Educacross V2'")


if __name__ == "__main__":
    main()
