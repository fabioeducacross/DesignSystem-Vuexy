#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para Listar e Analisar Componentes Órfãos
=================================================

Lista os 29 componentes "not_found" e busca mais informações:
- Tag @source na story
- Possíveis matches no educacross-frontoffice
- Sugestões de correção
"""

import os
import re
import json
from pathlib import Path
from difflib import SequenceMatcher

ROOT_DIR = Path(__file__).parent.parent
VUE_COMPONENTS_DIR = ROOT_DIR / "educacross-frontoffice" / "src" / "components"
STORIES_DIR = ROOT_DIR / "src" / "stories" / "educacross-components-v2"
REPORT_PATH = ROOT_DIR / "scripts" / "validation-reports" / "validation-report.json"


def extract_source_tag(story_path):
    """Extrai tag @source do header da story."""
    try:
        with open(story_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Buscar @source no header (primeiros 50 linhas)
            header = '\n'.join(content.split('\n')[:50])
            match = re.search(r'@source\s+(.+)', header)
            if match:
                return match.group(1).strip()
    except:
        pass
    return None


def find_vue_files():
    """Lista todos os arquivos .vue no educacross-frontoffice."""
    vue_files = []
    if VUE_COMPONENTS_DIR.exists():
        for vue_file in VUE_COMPONENTS_DIR.rglob("*.vue"):
            relative_path = vue_file.relative_to(ROOT_DIR)
            vue_files.append({
                'name': vue_file.stem,
                'path': str(relative_path).replace('\\', '/')
            })
    return vue_files


def similarity(a, b):
    """Calcula similaridade entre dois textos."""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def find_similar_components(component_name, vue_files, threshold=0.6):
    """Encontra componentes Vue similares ao nome da story."""
    matches = []
    for vue in vue_files:
        score = similarity(component_name, vue['name'])
        if score >= threshold:
            matches.append({
                'vue_name': vue['name'],
                'vue_path': vue['path'],
                'similarity': round(score * 100, 1)
            })
    return sorted(matches, key=lambda x: x['similarity'], reverse=True)[:3]


def analyze_orphans():
    """Analisa os componentes órfãos."""
    # Carregar relatório
    with open(REPORT_PATH, 'r', encoding='utf-8') as f:
        report = json.load(f)
    
    # Filtrar not_found
    not_found = [c for c in report['components'] if c['status'] == 'not_found']
    
    # Listar todos os componentes Vue
    vue_files = find_vue_files()
    
    print("=" * 80)
    print("ANÁLISE DOS 29 COMPONENTES ÓRFÃOS")
    print("=" * 80)
    print()
    
    results = []
    
    for idx, component in enumerate(not_found, 1):
        name = component['name']
        story_path = Path(component['story_path'])
        
        # Extrair @source
        source_tag = extract_source_tag(ROOT_DIR / story_path)
        
        # Buscar similares
        similar = find_similar_components(name, vue_files)
        
        result = {
            'index': idx,
            'name': name,
            'story_file': story_path.name,
            'source_tag': source_tag or "❌ Não encontrado",
            'similar_components': similar
        }
        results.append(result)
        
        # Imprimir
        print(f"[{idx}/29] {name}")
        print(f"  Story: {story_path.name}")
        print(f"  @source: {result['source_tag']}")
        
        if similar:
            print(f"  Possíveis matches:")
            for match in similar:
                print(f"    - {match['vue_name']} ({match['similarity']}%) → {match['vue_path']}")
        else:
            print(f"  ⚠️  Nenhum match similar encontrado")
        
        print()
    
    # Categorização automática
    print("=" * 80)
    print("CATEGORIZAÇÃO AUTOMÁTICA")
    print("=" * 80)
    print()
    
    no_source = [r for r in results if r['source_tag'] == "❌ Não encontrado"]
    has_source = [r for r in results if r['source_tag'] != "❌ Não encontrado"]
    has_similar = [r for r in results if r['similar_components']]
    no_similar = [r for r in results if not r['similar_components']]
    
    print(f"📊 Sem tag @source: {len(no_source)} componentes")
    print(f"📌 Com tag @source: {len(has_source)} componentes")
    print(f"🔍 Com matches similares: {len(has_similar)} componentes")
    print(f"⚠️  Sem matches similares: {len(no_similar)} componentes")
    print()
    
    # Grupos
    print("=" * 80)
    print("GRUPOS SUGERIDOS")
    print("=" * 80)
    print()
    
    print("🔴 GRUPO 1: ÓRFÃOS CONFIRMADOS (sem @source, sem match similar)")
    orphans = [r for r in results if r['source_tag'] == "❌ Não encontrado" and not r['similar_components']]
    for r in orphans:
        print(f"  - {r['name']}")
    print(f"  Total: {len(orphans)} componentes")
    print()
    
    print("🟡 GRUPO 2: TYPO/CAMINHO ERRADO (com @source mas arquivo não existe)")
    typos = [r for r in results if r['source_tag'] != "❌ Não encontrado"]
    for r in typos:
        print(f"  - {r['name']} → @source: {r['source_tag'][:60]}...")
    print(f"  Total: {len(typos)} componentes")
    print()
    
    print("🟢 GRUPO 3: MISMATCH DE NOME (sem @source mas tem match similar)")
    mismatches = [r for r in results if r['source_tag'] == "❌ Não encontrado" and r['similar_components']]
    for r in mismatches:
        best_match = r['similar_components'][0]
        print(f"  - {r['name']} → Possível: {best_match['vue_name']} ({best_match['similarity']}%)")
    print(f"  Total: {len(mismatches)} componentes")
    print()
    
    # Salvar análise
    output_path = ROOT_DIR / "scripts" / "validation-reports" / "orphans-analysis.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({
            'generated_at': report['generated_at'],
            'total_orphans': len(not_found),
            'categories': {
                'orphans_confirmed': len(orphans),
                'typos_or_wrong_path': len(typos),
                'name_mismatch': len(mismatches)
            },
            'components': results
        }, f, indent=2, ensure_ascii=False)
    
    print("=" * 80)
    print(f"✅ Análise completa salva em: {output_path}")
    print("=" * 80)


if __name__ == '__main__':
    analyze_orphans()
