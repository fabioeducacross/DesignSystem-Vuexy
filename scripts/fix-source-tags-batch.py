#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Correção Automática de Tags @source - Lote 1
========================================================

Corrige automaticamente as tags @source dos 17 componentes com match 100%.

Execução:
    python scripts/fix-source-tags-batch.py [--dry-run]
"""

import os
import re
import json
from pathlib import Path
import argparse

ROOT_DIR = Path(__file__).parent.parent
STORIES_DIR = ROOT_DIR / "src" / "stories" / "educacross-components-v2"
ANALYSIS_PATH = ROOT_DIR / "scripts" / "validation-reports" / "orphans-analysis.json"

# Mapeamento manual dos 17 componentes com match 100%
CORRECTIONS = {
    # Formato: "ComponentName": "caminho/correto/Component.vue"
    "DynamicMediaCard": "educacross-frontoffice/src/components/card/DynamicMediaCard.vue",
    "EvaluationsHtmlContentRenderer": "educacross-frontoffice/src/components/evaluations/shared/EvaluationsHtmlContentRenderer.vue",
    "GuidesLimitAlert": "educacross-frontoffice/src/components/missions/GuidesLimitAlert.vue",
    "ListTablePagination": "educacross-frontoffice/src/components/table/ListTablePagination.vue",
    "ListTableRanking": "educacross-frontoffice/src/components/table/ListTableRanking.vue",
    "ListTableSelect": "educacross-frontoffice/src/components/table/ListTableSelect.vue",
    "MediaCardIcon": "educacross-frontoffice/src/components/card/MediaCardIcon.vue",
    "MissionBookDetails": "educacross-frontoffice/src/components/mission-plus/MissionBookDetails.vue",
    "PerformanceCell": "educacross-frontoffice/src/components/cells/PerformanceCell.vue",
    "ProgressBarHorizontal": "educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue",
    "QuestionDetail": "educacross-frontoffice/src/components/evaluations/questionDetail/QuestionDetail.vue",
    "QuestionsListDetail": "educacross-frontoffice/src/components/evaluations/questionsListDetail/QuestionsListDetail.vue",
    "QuestionStatus": "educacross-frontoffice/src/components/question/QuestionStatus.vue",
    "SelectLocale": "educacross-frontoffice/src/components/locale/SelectLocale.vue",
    "SimpleTab": "educacross-frontoffice/src/components/tab/SimpleTab.vue",
    "StudentGameDetailsModal": "educacross-frontoffice/src/components/modal/StudentGameDetailsModal.vue",
    "Tab": "educacross-frontoffice/src/components/tab/Tab.vue",
}


def find_source_tag_in_header(content):
    """
    Encontra a tag @source no header (primeiros 50 linhas).
    Retorna: (linha_completa, numero_da_linha, match_object) ou (None, None, None)
    """
    lines = content.split('\n')
    for idx, line in enumerate(lines[:50]):
        match = re.search(r'(@source\s+.+)', line)
        if match:
            return line, idx, match
    return None, None, None


def replace_or_add_source_tag(content, component_name, correct_path):
    """
    Substitui a tag @source existente ou adiciona uma nova.
    """
    lines = content.split('\n')
    
    # Procurar @source existente
    source_line, source_idx, match = find_source_tag_in_header(content)
    
    if source_line:
        # Substituir linha existente
        old_tag = match.group(1)
        new_tag = f"@source {correct_path}"
        lines[source_idx] = lines[source_idx].replace(old_tag, new_tag)
        action = "REPLACED"
    else:
        # Adicionar nova tag no header (após @component se existir, ou após o comentário inicial)
        insert_idx = 0
        for idx, line in enumerate(lines[:30]):
            if '@component' in line:
                insert_idx = idx + 1
                break
            elif line.strip().startswith('*') and not line.strip().startswith('/**'):
                insert_idx = idx + 1
        
        # Inserir nova linha
        indent = " * "
        lines.insert(insert_idx, f"{indent}@source {correct_path}")
        action = "ADDED"
    
    return '\n'.join(lines), action


def fix_story(story_name, correct_path, dry_run=False):
    """
    Corrige a tag @source de uma story específica.
    """
    story_path = STORIES_DIR / f"{story_name}.stories.js"
    
    if not story_path.exists():
        return {"status": "ERROR", "message": f"Arquivo não encontrado: {story_path}"}
    
    # Ler conteúdo
    with open(story_path, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Aplicar correção
    new_content, action = replace_or_add_source_tag(original_content, story_name, correct_path)
    
    # Salvar (se não for dry-run)
    if not dry_run:
        with open(story_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return {
        "status": "SUCCESS",
        "action": action,
        "story": story_name,
        "new_source": correct_path,
        "dry_run": dry_run
    }


def main():
    parser = argparse.ArgumentParser(description='Corrige tags @source em batch')
    parser.add_argument('--dry-run', action='store_true', 
                       help='Simula correções sem modificar arquivos')
    args = parser.parse_args()
    
    print("=" * 80)
    print("CORREÇÃO AUTOMÁTICA DE TAGS @SOURCE - LOTE 1")
    print("=" * 80)
    print()
    
    if args.dry_run:
        print("⚠️  MODO DRY-RUN: Nenhum arquivo será modificado")
        print()
    
    results = []
    
    for idx, (component_name, correct_path) in enumerate(CORRECTIONS.items(), 1):
        print(f"[{idx}/17] {component_name}...")
        result = fix_story(component_name, correct_path, dry_run=args.dry_run)
        results.append(result)
        
        if result['status'] == 'SUCCESS':
            action_symbol = "✏️" if result['action'] == 'REPLACED' else "➕"
            print(f"  {action_symbol} {result['action']}: @source {correct_path}")
        else:
            print(f"  ❌ ERRO: {result['message']}")
        print()
    
    # Resumo
    print("=" * 80)
    print("RESUMO")
    print("=" * 80)
    print()
    
    success_count = len([r for r in results if r['status'] == 'SUCCESS'])
    replaced_count = len([r for r in results if r.get('action') == 'REPLACED'])
    added_count = len([r for r in results if r.get('action') == 'ADDED'])
    error_count = len([r for r in results if r['status'] == 'ERROR'])
    
    print(f"✅ Sucesso: {success_count}/{len(CORRECTIONS)}")
    print(f"✏️  Substituídas: {replaced_count}")
    print(f"➕ Adicionadas: {added_count}")
    print(f"❌ Erros: {error_count}")
    print()
    
    if args.dry_run:
        print("⚠️  DRY-RUN: Execute novamente sem --dry-run para aplicar as correções")
    else:
        print("✅ Correções aplicadas!")
        print()
        print("📊 Próximo passo: Re-executar validação")
        print("   python scripts/validate-components.py")
    
    # Salvar log
    log_path = ROOT_DIR / "scripts" / "validation-reports" / "fix-batch-1-log.json"
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump({
            "executed_at": str(Path(__file__).stat().st_mtime),
            "dry_run": args.dry_run,
            "total_corrections": len(CORRECTIONS),
            "success": success_count,
            "replaced": replaced_count,
            "added": added_count,
            "errors": error_count,
            "results": results
        }, f, indent=2, ensure_ascii=False)
    
    print(f"📄 Log salvo em: {log_path}")


if __name__ == '__main__':
    main()
