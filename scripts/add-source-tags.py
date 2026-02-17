#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para Adicionar Tags @source Automaticamente
===================================================

Lê source-suggestions.json e adiciona tag @source nos headers das stories.
"""

import json
import re
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
SUGGESTIONS_FILE = ROOT_DIR / "scripts" / "validation-reports" / "source-suggestions.json"

def add_source_tag(story_file: Path, vue_path: str) -> bool:
    """Adiciona tag @source no header da story"""
    
    if not story_file.exists():
        print(f"  ❌ Arquivo não encontrado: {story_file}")
        return False
    
    # Ler conteúdo
    content = story_file.read_text(encoding='utf-8')
    
    # Verificar se já tem @source
    if '@source' in content:
        print(f"  ⏭️  Já tem @source")
        return False
    
    # Encontrar o header comment (primeiro /** ... */)
    header_match = re.search(r'/\*\*(.*?)\*/', content, re.DOTALL)
    
    if not header_match:
        print(f"  ❌ Header comment não encontrado")
        return False
    
    header = header_match.group(0)
    
    # Encontrar linha com @component
    component_line_match = re.search(r' \* @component .+\n', header)
    
    if not component_line_match:
        print(f"  ⚠️  @component tag não encontrada, adicionando após título")
        # Adicionar após a primeira linha de comentário
        first_line_end = header.find('\n', 3)  # Pula "/**"
        if first_line_end > 0:
            # Inserir depois da primeira linha
            new_header = (
                header[:first_line_end + 1] +
                f" * @source {vue_path}\n" +
                header[first_line_end + 1:]
            )
        else:
            print(f"  ❌ Não foi possível encontrar local para inserir")
            return False
    else:
        # Adicionar @source logo após @component
        component_line = component_line_match.group(0)
        component_line_pos = header.find(component_line)
        insert_pos = component_line_pos + len(component_line)
        
        new_header = (
            header[:insert_pos] +
            f" * @source {vue_path}\n" +
            header[insert_pos:]
        )
    
    # Substituir no conteúdo
    new_content = content.replace(header, new_header, 1)
    
    # Salvar
    story_file.write_text(new_content, encoding='utf-8')
    print(f"  ✅ Tag @source adicionada")
    return True

def main():
    # Ler sugestões
    with open(SUGGESTIONS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    suggestions = data['suggestions']
    
    # Filtrar apenas 'exact' confidence
    exact_suggestions = [s for s in suggestions if s['confidence'] == 'exact']
    
    # Remover duplicatas (mesmo story_path)
    seen = set()
    unique_suggestions = []
    for s in exact_suggestions:
        if s['story_path'] not in seen:
            unique_suggestions.append(s)
            seen.add(s['story_path'])
    
    print(f"📝 Adicionando @source em {len(unique_suggestions)} stories")
    print("=" * 80)
    print()
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for suggestion in unique_suggestions:
        story_name = suggestion['story']
        story_path = Path(suggestion['story_path'].replace('\\', '/'))
        vue_path = suggestion['vue_path']
        
        print(f"📄 {story_name}")
        print(f"   Story: {story_path.name}")
        print(f"   Vue: {vue_path}")
        
        story_file = ROOT_DIR / story_path
        
        result = add_source_tag(story_file, vue_path)
        
        if result:
            success_count += 1
        elif '@source' in story_file.read_text(encoding='utf-8'):
            skip_count += 1
        else:
            error_count += 1
        
        print()
    
    print("=" * 80)
    print("📊 RESUMO")
    print("=" * 80)
    print(f"✅ Adicionados: {success_count}")
    print(f"⏭️  Já tinham: {skip_count}")
    print(f"❌ Erros: {error_count}")
    print()
    print("✅ Concluído! Execute 'npm run validate-components' para verificar.")

if __name__ == '__main__':
    main()
