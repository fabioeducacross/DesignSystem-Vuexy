/**
 * ConditionalValueDisplay - Conditional Content Display
 * ======================================================
 * Componente para exibir conteúdo condicional (disponível, indisponível, loading)
 * 
 * @component ConditionalValueDisplay
 * @category Educacross Components V2 / Feedback
 * @source educacross-frontoffice (perfis, relatórios, dados opcionais)
 * @priority P2 - Common UI
 * @status EXPANDED
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Feedback/ConditionalValueDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ConditionalValueDisplay - Exibição Condicional de Dados

Componente para mostrar valores que podem estar disponíveis, indisponíveis (não informado), em carregamento (calculando) ou vazios.

### Casos de Uso

**Professor**: Visualizar perfis de alunos com campos opcionais (telefone responsável, endereço), consultar relatórios com dados pendentes de correção

**Coordenador**: Relatórios com informações incompletas, dashboards com dados em processamento, análises com valores condicionais

**Aluno**: Ver perfil próprio com dados opcionais, aguardar resultados em processamento, identificar informações pendentes
        `
      }
    }
  }
};

const css = `<style>
  .conditional-display {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    background: #F8F8F8;
    font-size: 14px;
  }
  
  .conditional-label {
    color: #6E6B7B;
    font-weight: 500;
  }
  
  .conditional-value {
    font-weight: 600;
    color: #5E5873;
  }
  
  .conditional-icon {
    font-size: 16px;
  }
  
  /* States */
  .conditional-hidden {
    opacity: 0.5;
    font-style: italic;
  }
  
  .conditional-empty .conditional-value {
    color: #EA5455;
  }
  
  .conditional-loading .conditional-value {
    color: #00CFE8;
  }
  
  /* Badge variant */
  .conditional-badge {
    padding: 4px 10px;
    background: #6E63E8;
    color: #fff;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }
  
  /* Inline variant */
  .conditional-inline {
    background: transparent;
    padding: 0;
  }
  
  /* Hover effect */
  .conditional-display:hover {
    background: #E8E8E8;
    transition: background 0.2s;
  }
  
  .conditional-inline:hover {
    background: transparent;
  }
</style>
`;

export const Default = {
  render: () => `
    ${css}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="conditional-display">
        <i class="bi bi-check-circle conditional-icon" style="color: #28C76F;"></i>
        <span class="conditional-label">Nota:</span>
        <span class="conditional-value">8.5</span>
      </div>
      
      <div class="conditional-display conditional-hidden">
        <i class="bi bi-dash-circle conditional-icon"></i>
        <span class="conditional-label">Nota:</span>
        <span class="conditional-value">Não disponível</span>
      </div>
      
      <div class="conditional-display conditional-loading">
        <i class="bi bi-arrow-clockwise conditional-icon" style="animation: spin 1s linear infinite;"></i>
        <span class="conditional-label">Nota:</span>
        <span class="conditional-value">Calculando...</span>
      </div>
      
      <div class="conditional-display conditional-empty">
        <i class="bi bi-x-circle conditional-icon"></i>
        <span class="conditional-label">Nota:</span>
        <span class="conditional-value">-</span>
      </div>
    </div>
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  `
};

export const ComValor = {
  render: () => `
    ${css}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="conditional-display">
        <span class="conditional-label">Pontuação:</span>
        <span class="conditional-value">850 pontos</span>
      </div>
      
      <div class="conditional-display">
        <span class="conditional-label">Taxa de acerto:</span>
        <span class="conditional-value" style="color: #28C76F;">87%</span>
      </div>
      
      <div class="conditional-display">
        <span class="conditional-label">Tempo gasto:</span>
        <span class="conditional-value">15 minutos</span>
      </div>
      
      <div class="conditional-display">
        <span class="conditional-label">XP ganho:</span>
        <span class="conditional-value" style="color: #6E63E8;">+250 XP</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Exibindo valores quando disponíveis. Resultado de missão completa.
    </p>
  `
};

export const SemValor = {
  render: () => `
    ${css}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="conditional-display conditional-hidden">
        <span class="conditional-label">Pontuação:</span>
        <span class="conditional-value">Aguardando resultado</span>
      </div>
      
      <div class="conditional-display conditional-loading">
        <i class="bi bi-arrow-clockwise conditional-icon" style="animation: spin 1s linear infinite;"></i>
        <span class="conditional-label">Taxa de acerto:</span>
        <span class="conditional-value">Calculando...</span>
      </div>
      
      <div class="conditional-display conditional-empty">
        <span class="conditional-label">Tempo gasto:</span>
        <span class="conditional-value">-</span>
      </div>
      
      <div class="conditional-display conditional-hidden">
        <span class="conditional-label">XP ganho:</span>
        <span class="conditional-value">Não finalizado</span>
      </div>
    </div>
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Estados de carregamento, dados indisponíveis ou missão não finalizada.
    </p>
  `
};

export const PerfilDoAluno = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 550px;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #6E63E8, #28C76F); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 32px; font-weight: 700;">JS</div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #5E5873;">João Silva</h3>
          <p style="margin: 0; font-size: 14px; color: #6E6B7B;">5º Ano A • Matrícula 2024001</p>
        </div>
      </div>
      
      <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #6E6B7B; text-transform: uppercase;">Informações de Contato</h4>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div class="conditional-display">
          <span class="conditional-label">Email:</span>
          <span class="conditional-value">joao.silva@educacross.com</span>
        </div>
        
        <div class="conditional-display">
          <span class="conditional-label">Telefone:</span>
          <span class="conditional-value">(11) 98765-4321</span>
        </div>
        
        <div class="conditional-display conditional-hidden">
          <span class="conditional-label">Endereço:</span>
          <span class="conditional-value">Não informado</span>
        </div>
      </div>
      
      <h4 style="margin: 24px 0 12px; font-size: 14px; font-weight: 600; color: #6E6B7B; text-transform: uppercase;">Responsável</h4>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div class="conditional-display">
          <span class="conditional-label">Nome:</span>
          <span class="conditional-value">Maria Silva</span>
        </div>
        
        <div class="conditional-display conditional-hidden">
          <span class="conditional-label">Telefone:</span>
          <span class="conditional-value">Não cadastrado</span>
        </div>
        
        <div class="conditional-display conditional-hidden">
          <span class="conditional-label">Email:</span>
          <span class="conditional-value">Não informado</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Perfil de aluno com dados opcionais. Secretaria consultando informações de contato.
    </p>
  `
};

export const RelatorioComDadosPendentes = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 700px;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
        Relatório de Desempenho - Turma 5º A
      </h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #E8E8E8;">
            <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Aluno</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Média</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Presença</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { nome: 'Ana Silva', media: '8.5', presenca: '95%', status: 'available' },
            { nome: 'Bruno Costa', media: '7.2', presenca: null, status: 'pending' },
            { nome: 'Carlos Mendes', media: null, presenca: '88%', status: 'loading' },
            { nome: 'Diana Santos', media: '9.0', presenca: '92%', status: 'available' },
            { nome: 'Eduardo Lima', media: null, presenca: null, status: 'empty' }
          ].map(aluno => `
            <tr style="border-bottom: 1px solid #F3F2F7;">
              <td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">${aluno.nome}</td>
              <td style="padding: 12px; text-align: center;">
                ${aluno.media 
                  ? `<span style="font-weight: 700; color: #28C76F;">${aluno.media}</span>` 
                  : aluno.status === 'loading'
                    ? '<span class="conditional-loading" style="font-size: 12px; color: #00CFE8;">Calculando...</span>'
                    : '<span class="conditional-hidden" style="font-size: 12px;">Pendente</span>'}
              </td>
              <td style="padding: 12px; text-align: center;">
                ${aluno.presenca 
                  ? `<span style="font-weight: 700; color: #6E63E8;">${aluno.presenca}</span>` 
                  : '<span class="conditional-hidden" style="font-size: 12px;">Não registrada</span>'}
              </td>
              <td style="padding: 12px; text-align: center;">
                ${aluno.status === 'available' 
                  ? '<i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px;"></i>' 
                  : aluno.status === 'loading'
                    ? '<i class="bi bi-arrow-clockwise" style="color: #00CFE8; font-size: 18px; animation: spin 1s linear infinite;"></i>'
                    : '<i class="bi bi-exclamation-circle-fill" style="color: #FF9F43; font-size: 18px;"></i>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Relatório com dados pendentes e em processamento. Coordenadora aguardando cálculos finais.
    </p>
  `
};

export const DashboardComMetricas = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 850px;">
      <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #5E5873;">
        Dashboard de Desempenho - Matemática
      </h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <div style="background: #F8F8F8; border-radius: 8px; padding: 16px;">
          <div style="font-size: 12px; color: #6E6B7B; margin-bottom: 8px; font-weight: 600;">MÉDIA GERAL</div>
          <div style="font-size: 32px; font-weight: 700; color: #28C76F; margin-bottom: 8px;">8.2</div>
          <div class="conditional-display conditional-inline">
            <i class="bi bi-arrow-up" style="color: #28C76F;"></i>
            <span class="conditional-value" style="color: #28C76F;">+0.5 vs. mês anterior</span>
          </div>
        </div>
        
        <div style="background: #F8F8F8; border-radius: 8px; padding: 16px;">
          <div style="font-size: 12px; color: #6E6B7B; margin-bottom: 8px; font-weight: 600;">TAXA DE APROVAÇÃO</div>
          <div style="font-size: 32px; font-weight: 700; color: #6E63E8; margin-bottom: 8px;">92%</div>
          <div class="conditional-display conditional-inline">
            <i class="bi bi-arrow-right" style="color: #FF9F43;"></i>
            <span class="conditional-value" style="color: #FF9F43;">Estável</span>
          </div>
        </div>
        
        <div style="background: #F8F8F8; border-radius: 8px; padding: 16px;">
          <div style="font-size: 12px; color: #6E6B7B; margin-bottom: 8px; font-weight: 600;">TEMPO MÉDIO</div>
          <div style="font-size: 32px; font-weight: 700; color: #00CFE8; margin-bottom: 8px;">18min</div>
          <div class="conditional-display conditional-inline conditional-loading">
            <i class="bi bi-arrow-clockwise" style="animation: spin 1s linear infinite;"></i>
            <span class="conditional-value">Atualizando...</span>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E8E8E8;">
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #6E6B7B;">Métricas Adicionais</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div class="conditional-display">
            <span class="conditional-label">Alunos ativos:</span>
            <span class="conditional-value">28/30</span>
          </div>
          
          <div class="conditional-display">
            <span class="conditional-label">Missões concluídas:</span>
            <span class="conditional-value">156</span>
          </div>
          
          <div class="conditional-display conditional-hidden">
            <span class="conditional-label">Desempenho semanal:</span>
            <span class="conditional-value">Aguardando fechamento</span>
          </div>
          
          <div class="conditional-display conditional-loading">
            <i class="bi bi-arrow-clockwise conditional-icon" style="animation: spin 1s linear infinite;"></i>
            <span class="conditional-label">Ranking atualizado:</span>
            <span class="conditional-value">Processando...</span>
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard com métricas em tempo real. Professor monitorando indicadores de desempenho.
    </p>
  `
};
