#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Análise Detalhada dos 12 Componentes Restantes
================================================

Verifica manualmente cada um dos 12 componentes para decidir:
- Componente existe? Onde?
- Tag @source pode ser corrigida?
- É realmente órfão?
"""

import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
VUE_DIR = ROOT_DIR / "educacross-frontoffice" / "src" / "components"
STORIES_DIR = ROOT_DIR / "src" / "stories" / "educacross-components-v2"

REMAINING = [
    "AcceptOrRejectAccess",
    "AppNavbar",
    "BadgeList",
    "EditProfileStudentNew",
    "EInput",
    "ETextarea",
    "FilterChip",
    "ProfilePicture",
    "ResourceCard",
    "Sidebar",
    "StudentAvatar",
    "SubjectCard"
]

def search_vue_file(component_name):
    """Busca arquivo .vue recursivamente."""
    matches = []
    if VUE_DIR.exists():
        for vue_file in VUE_DIR.rglob(f"{component_name}.vue"):
            relative = vue_file.relative_to(ROOT_DIR)
            matches.append(str(relative).replace('\\', '/'))
    return matches

def search_similar_vue_files(component_name):
    """Busca arquivos similares."""
    matches = []
    if VUE_DIR.exists():
        for vue_file in VUE_DIR.rglob("*.vue"):
            if component_name.lower() in vue_file.stem.lower():
                relative = vue_file.relative_to(ROOT_DIR)
                matches.append((vue_file.stem, str(relative).replace('\\', '/')))
    return matches

def get_story_source_tag(story_name):
    """Lê tag @source da story."""
    story_path = STORIES_DIR / f"{story_name}.stories.js"
    if story_path.exists():
        with open(story_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()[:50]
            for line in lines:
                if '@source' in line:
                    return line.strip()
    return None

def main():
    print("=" * 80)
    print("ANÁLISE DETALHADA DOS 12 COMPONENTES RESTANTES")
    print("=" * 80)
    print()
    
    fixable = []
    orphans = []
    manual_check = []
    
    for idx, component in enumerate(REMAINING, 1):
        print(f"[{idx}/12] {component}")
        print("-" * 80)
        
        # Buscar tag @source
        source_tag = get_story_source_tag(component)
        print(f"  @source atual: {source_tag or '❌ Não encontrado'}")
        
        # Buscar match exato
        exact_matches = search_vue_file(component)
        if exact_matches:
            print(f"  ✅ MATCH EXATO encontrado:")
            for match in exact_matches:
                print(f"     → {match}")
            fixable.append({
                'component': component,
                'vue_path': exact_matches[0],
                'action': 'FIX_SOURCE_TAG'
            })
        else:
            # Buscar similares
            similar = search_similar_vue_files(component)
            if similar:
                print(f"  🔍 Possíveis matches:")
                for name, path in similar[:3]:
                    print(f"     → {name}: {path}")
                manual_check.append({
                    'component': component,
                    'similar': similar,
                    'action': 'MANUAL_CHECK'
                })
            else:
                print(f"  ❌ ÓRFÃO: Nenhum arquivo Vue encontrado")
                orphans.append({
                    'component': component,
                    'action': 'ORPHAN'
                })
        
        print()
    
    # Resumo
    print("=" * 80)
    print("RESUMO E RECOMENDAÇÕES")
    print("=" * 80)
    print()
    
    print(f"✅ FIXÁVEIS ({len(fixable)}): Tag @source pode ser adicionada/corrigida")
    for item in fixable:
        print(f"   - {item['component']} → {item['vue_path']}")
    print()
    
    print(f"🔍 VERIFICAÇÃO MANUAL ({len(manual_check)}): Precisam decisão humana")
    for item in manual_check:
        print(f"   - {item['component']} (ver {len(item['similar'])} matches similares acima)")
    print()
    
    print(f"❌ ÓRFÃOS CONFIRMADOS ({len(orphans)}): Sem componente Vue correspondente")
    for item in orphans:
        print(f"   - {item['component']}")
    print()
    
    # Próximos passos
    print("=" * 80)
    print("PRÓXIMOS PASSOS")
    print("=" * 80)
    print()
    
    if fixable:
        print(f"1. Corrigir {len(fixable)} componentes fixáveis automaticamente")
        print(f"   → Criar script de correção ou fazer manualmente")
        print()
    
    if manual_check:
        print(f"2. Verificar manualmente {len(manual_check)} componentes")
        print(f"   → Comparar story com componentes similares")
        print(f"   → Decidir se é o match correto ou se são diferentes")
        print()
    
    if orphans:
        print(f"3. Decidir o que fazer com {len(orphans)} órfãos:")
        print(f"   Opção A: Remover stories (Storybook limpo)")
        print(f"   Opção B: Marcar como @category Doc-Only (preservar exemplos)")
        print()
    
    # Projeção
    print("=" * 80)
    print("PROJEÇÃO DE RESULTADO")
    print("=" * 80)
    print()
    
    current = 113
    if_all_fixable = current + len(fixable)
    if_manual_ok = if_all_fixable + len(manual_check)
    
    print(f"Atual: {current}/125 (90.4%)")
    print(f"Se corrigir fixáveis: {if_all_fixable}/125 ({if_all_fixable/125*100:.1f}%)")
    print(f"Se resolver manuais: {if_manual_ok}/125 ({if_manual_ok/125*100:.1f}%)")
    print()
    print(f"Órfãos reais: {len(orphans)}")
    print(f"  → Remover: {if_manual_ok}/{if_manual_ok} (100%)")
    print(f"  → Doc-Only: {if_manual_ok}/125 ({if_manual_ok/125*100:.1f}%) + {len(orphans)} docs")
    print()


if __name__ == '__main__':
    main()
