#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Helper Script - Encontrar Componentes Vue para Stories
========================================================

Lê o relatório de validação e busca componentes Vue correspondentes
para as stories que têm status 'not_found'.

Gera lista de sugestões de @source tags.
"""

import json
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
REPORT_FILE = ROOT_DIR / "scripts" / "validation-reports" / "validation-report.json"
VUE_DIR = ROOT_DIR / "educacross-frontoffice" / "src" / "components"

def find_vue_component_by_name(name: str) -> list:
    """Busca componente Vue por nome (fuzzy search)"""
    matches = []
    
    # Buscar arquivo exato
    for vue_file in VUE_DIR.rglob("*.vue"):
        if vue_file.stem.lower() == name.lower():
            rel_path = vue_file.relative_to(ROOT_DIR / "educacross-frontoffice")
            matches.append({
                'path': str(rel_path).replace('\\', '/'),
                'confidence': 'exact',
                'file': vue_file.name
            })
    
    # Se não encontrou, buscar similar
    if not matches:
        for vue_file in VUE_DIR.rglob("*.vue"):
            if name.lower() in vue_file.stem.lower():
                rel_path = vue_file.relative_to(ROOT_DIR / "educacross-frontoffice")
                matches.append({
                    'path': str(rel_path).replace('\\', '/'),
                    'confidence': 'similar',
                    'file': vue_file.name
                })
    
    return matches

def main():
    # Ler relatório
    with open(REPORT_FILE, 'r', encoding='utf-8') as f:
        report = json.load(f)
    
    not_found = [c for c in report['components'] if c['status'] == 'not_found']
    
    print(f"📋 Stories que precisam de @source tag: {len(not_found)}")
    print("=" * 80)
    print()
    
    suggestions = []
    no_match = []
    
    for component in not_found:
        name = component['name']
        story_path = component['story_path']
        
        print(f"🔍 Buscando: {name}")
        
        matches = find_vue_component_by_name(name)
        
        if matches:
            for match in matches[:3]:  # Máximo 3 sugestões
                confidence_emoji = "✅" if match['confidence'] == 'exact' else "⚠️"
                print(f"  {confidence_emoji} {match['file']} → {match['path']}")
                
                suggestions.append({
                    'story': name,
                    'story_path': story_path,
                    'vue_path': f"educacross-frontoffice/{match['path']}",
                    'confidence': match['confidence']
                })
        else:
            print(f"  ❌ Nenhum componente encontrado")
            no_match.append({'story': name, 'story_path': story_path})
        
        print()
    
    print("=" * 80)
    print("📊 RESUMO")
    print("=" * 80)
    print(f"✅ Com sugestão: {len(suggestions)}")
    print(f"❌ Sem sugestão: {len(no_match)}")
    print()
    
    # Salvar sugestões
    output_file = ROOT_DIR / "scripts" / "validation-reports" / "source-suggestions.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'suggestions': suggestions,
            'no_match': no_match
        }, f, indent=2, ensure_ascii=False)
    
    print(f"💾 Sugestões salvas em: {output_file}")
    
    # Mostrar componentes sem match
    if no_match:
        print()
        print("❌ COMPONENTES SEM MATCH (podem não existir no Vue):")
        print("-" * 80)
        for item in no_match:
            print(f"  - {item['story']}")

if __name__ == '__main__':
    main()
