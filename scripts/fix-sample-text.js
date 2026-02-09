/**
 * Script para substituir "Sample Text" por conteúdo contextual
 * Analisa o nome do componente e gera conteúdo apropriado
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'stories', 'educacross-components-v2');

// Mapeamento de contexto por nome de componente
const contextReplacements = {
  // Geral - substituições universais
  'Sample Text': [
    'Exemplo',
    'Conteúdo',
    'Texto',
    'Descrição',
    'Informação',
    'Detalhe',
    'Item',
    'Opção',
    'Valor',
    'Dado'
  ]
};

// Substituições específicas por componente (mais inteligentes)
const componentSpecificContent = {
  'Certificate': ['Certificado de Conclusão', 'João Silva', 'Matemática Básica', 'Data: 01/02/2026', 'Nota: 95%', 'Turma A', 'Professor: Maria Santos', 'Parabéns!'],
  'Card': ['Título do Card', 'Descrição breve do conteúdo', 'Ação Principal', 'Ver Mais', 'Detalhes', 'Categoria', 'Subtítulo'],
  'CardsList': ['Lista de Cards', 'Item 1', 'Item 2', 'Item 3'],
  'CellStatus': ['Ativo', 'Pendente', 'Concluído', 'Em Progresso', 'Cancelado'],
  'ChangeProficiency': ['Nível Básico', 'Nível Intermediário', 'Nível Avançado'],
  'MissionDetails': ['Missão: Aprender Frações', 'Objetivo', 'Descrição da Atividade', 'Prazo: 15/02/2026', 'Pontuação: 100pts', 'Dificuldade: Média', 'Status: Em andamento'],
  'MissionDetailsPlus': ['Missão Avançada', 'Detalhes Extras', 'Requisitos', 'Recompensas', 'Bônus', 'Conquistas', 'Progresso'],
  'ProgressBar': ['75%', 'Progresso', 'Concluído', '3 de 4'],
  'ProgressBarHorizontal': ['Progresso Total', 'Etapa 1', 'Etapa 2', 'Etapa 3'],
  'ProgressBarVertical': ['Nível 1', 'Nível 2', 'Nível 3'],
  'Tab': ['Aba 1', 'Aba 2', 'Aba 3', 'Conteúdo da Aba'],
  'TabRouter': ['Início', 'Atividades', 'Relatórios', 'Configurações', 'Perfil', 'Ajuda', 'Sair', 'Dashboard'],
  'Question': ['Qual é a resposta correta?', 'Alternativa A', 'Alternativa B', 'Alternativa C'],
  'Legend': ['Legenda', 'Básico', 'Proficiente', 'Avançado'],
  'Student': ['Nome do Aluno', 'Turma', 'Escola', 'Desempenho', 'Média', 'Frequência', 'Atividades', 'Notas', 'Observações', 'Histórico', 'Relatório', 'Perfil', 'Contato'],
  'Performance': ['Desempenho Geral', '85%', 'Excelente', 'Bom', 'Regular', 'Precisa Melhorar', 'Meta Atingida', 'Acima da Média', 'Pontuação', 'Resultado', 'Análise', 'Comparativo', 'Evolução', 'Período', 'Matéria', 'Competência', 'Habilidade'],
  'Subject': ['Matemática', 'Português', 'Ciências'],
  'Guide': ['Guia de Estudos', 'Compartilhar', 'Deletar'],
  'Select': ['Selecione uma opção', 'Opção 1', 'Opção 2'],
  'Expand': ['Expandir', 'Filtros', 'Opções Avançadas'],
  'List': ['Item da Lista', 'Nome', 'Data', 'Ações'],
  'Help': ['Central de Ajuda', 'Como podemos ajudar?'],
  'Cancel': ['Cancelar Missão', 'Tem certeza?'],
  'Delete': ['Confirmar Exclusão', 'Esta ação não pode ser desfeita'],
  'Share': ['Compartilhar', 'Copiar Link'],
  'Collapse': ['Clique para expandir', 'Detalhes'],
  'Check': ['Marcar como concluído', 'Selecionar'],
  'Redirect': ['Redirecionando...', 'Aguarde'],
  'PDF': ['Documento PDF', 'Relatório', 'Página 1 de 10', 'Educacross', 'Gerado em: 01/02/2026', 'Confidencial', 'Escola ABC', 'Período: Janeiro 2026', 'Turma: 5º Ano A', 'Total de Alunos: 30', 'Média da Turma: 7.5', 'Aproveitamento: 85%', 'Observações', 'Assinatura', 'Carimbo', 'Versão 1.0', 'Impresso em'],
  'Player': ['Reproduzir Vídeo'],
  'Badge': ['Conquista Desbloqueada'],
  'Sidebar': ['Menu Lateral', 'Navegação', 'Proficiência', 'Configurações'],
  'Descriptor': ['Tag de Descrição', 'Categoria'],
  'Alert': ['Atenção!', 'Limite atingido'],
  'Locale': ['Português (BR)', 'English', 'Español'],
  'Ranking': ['1º Lugar', '2º Lugar', '3º Lugar'],
  'Access': ['Acessar', 'Entrar', 'Login'],
  'FAQ': ['Perguntas Frequentes', 'Como funciona?']
};

// Função para obter conteúdo específico para um componente
function getReplacementsForComponent(fileName) {
  const baseName = fileName.replace('.stories.js', '');
  
  // Procurar por correspondência parcial no nome
  for (const [key, values] of Object.entries(componentSpecificContent)) {
    if (baseName.toLowerCase().includes(key.toLowerCase())) {
      return values;
    }
  }
  
  // Fallback para substituições genéricas
  return contextReplacements['Sample Text'];
}

// Processar arquivos
let processedCount = 0;
let fixedCount = 0;

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.stories.js'));

console.log(`\n🔍 Substituindo "Sample Text" em ${files.length} arquivos...\n`);

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Contar ocorrências de "Sample Text"
  const matches = content.match(/Sample Text/g);
  
  if (matches) {
    const replacements = getReplacementsForComponent(file);
    let index = 0;
    
    // Substituir cada ocorrência por um valor diferente
    content = content.replace(/Sample Text/g, () => {
      const replacement = replacements[index % replacements.length];
      index++;
      return replacement;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file} (${matches.length} substituições)`);
    fixedCount++;
  }
  
  processedCount++;
});

console.log(`\n========================================`);
console.log(`📊 RESULTADO:`);
console.log(`   Arquivos analisados: ${processedCount}`);
console.log(`   Arquivos corrigidos: ${fixedCount}`);
console.log(`========================================\n`);
