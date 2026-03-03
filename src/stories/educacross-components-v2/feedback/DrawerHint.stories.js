/**
 * DrawerHint - Faixa informativa contextual em drawers
 * =======================================================
 *
 * Componente de aviso compacto para uso dentro de painéis laterais (drawers).
 * Criado no FrontOffice do Educacross — ainda não existe em produção.
 *
 * @component DrawerHint
 * @category Educacross Components V2
 * @source FrontOffice/src/modules/sistema-de-ensino/components/TrilhasAZDrawer.vue
 * @priority P2
 * @status PROTOTYPE
 * @since 2026-03-01
 */

const componentStyles = `
<style>
  .drawer-hint {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    padding: 10px 12px;
    border-radius: 6px;
    background: rgba(110, 99, 232, 0.08);
    color: #6e63e8;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  }

  .drawer-hint-icon {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .drawer-hint--neutral {
    background: rgba(0, 207, 232, 0.08);
    color: #00cfe8;
  }

  .hint-title {
    font-size: 12px;
    font-weight: 600;
    color: #5e5873;
    margin: 0 0 3px 0;
  }

  .hint-desc {
    font-size: 11px;
    font-weight: 400;
    line-height: 17px;
    color: #6e6b7b;
    margin: 0;
  }

  .demo-container {
    padding: 24px;
    background: #f8f7fa;
    border-radius: 12px;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .demo-label {
    font-size: 11px;
    font-weight: 600;
    color: #b9b9c3;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 6px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
`;

export default {
  title: 'Educacross Components V2/Feedback/DrawerHint',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# DrawerHint

Faixa informativa compacta para uso dentro de painéis laterais (drawers).
Orienta a ação do usuário ou comunica um estado sem interromper o fluxo.

## Variantes

| Variante | Classe | Cor | Quando usar |
|----------|--------|-----|-------------|
| **Primário** | \`.drawer-hint\` | \`--ec-primary\` (#6E63E8) | Instrução de ação obrigatória, primeiro uso |
| **Neutro / Info** | \`.drawer-hint drawer-hint--neutral\` | \`--info\` (#00CFE8) | Informação contextual, estado neutro |

## Regras de uso

- Sempre usar ícone \`info\` (Material Symbols) como primeiro elemento
- Texto \`font-weight: 600\`, \`font-size: 12px\`
- Para mensagens longas: usar estrutura interna com \`<div>\` + \`<p>\`
- **Não usar** dentro de páginas — para avisos de página, usar \`BAlert\` (GuidesLimitAlert)

## Referências

- [FrontOffice] \`TrilhasAZDrawer.vue\` — referência base
- [FrontOffice] \`MissionReport.vue\` — uso com título + descrição
- [Wiki] \`documentation/docs/design-system/componentes-de-aviso.md\`
        `,
      },
    },
  },
};

/**
 * Variante primária — instrução de ação obrigatória (cor --ec-primary)
 */
export const Primary = {
  name: 'Primary — Ação obrigatória',
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Primário (--ec-primary)</div>
      <div class="drawer-hint">
        <span class="material-symbols-outlined drawer-hint-icon">info</span>
        Primeiro envio desta missão: selecione os alunos para habilitar e enviar.
      </div>
    </div>
  `,
};

/**
 * Variante neutra/info — estado informativo sem urgência (cor --info)
 */
export const Neutral = {
  name: 'Neutral — Informativo',
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Neutro / Info (--info)</div>
      <div class="drawer-hint drawer-hint--neutral">
        <span class="material-symbols-outlined drawer-hint-icon">info</span>
        Reenvio da missão: selecione os alunos para enviar novamente.
      </div>
    </div>
  `,
};

/**
 * Variante neutra com título + descrição — para mensagens mais longas
 */
export const NeutralComDescricao = {
  name: 'Neutral — Com título e descrição',
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Com título e descrição (drawer de rendimento)</div>
      <div class="drawer-hint drawer-hint--neutral">
        <span class="material-symbols-outlined drawer-hint-icon">info</span>
        <div>
          <p class="hint-title">Alguns tipos de mídia ainda não têm dados</p>
          <p class="hint-desc">O rendimento é calculado somente após os alunos interagirem com atividades desse tipo. Continue acompanhando ao longo da missão.</p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Todas as variantes juntas para comparação visual
 */
export const AllVariants = {
  name: 'Todas as variantes',
  render: () => `
    ${componentStyles}
    <div class="demo-container" style="max-width:480px">
      <div>
        <div class="demo-label">Primário — ação obrigatória</div>
        <div class="drawer-hint">
          <span class="material-symbols-outlined drawer-hint-icon">info</span>
          Primeiro envio desta missão: selecione os alunos para habilitar e enviar.
        </div>
      </div>
      <div>
        <div class="demo-label">Neutro — texto simples</div>
        <div class="drawer-hint drawer-hint--neutral">
          <span class="material-symbols-outlined drawer-hint-icon">info</span>
          Reenvio da missão: selecione os alunos para enviar novamente.
        </div>
      </div>
      <div>
        <div class="demo-label">Neutro — título + descrição</div>
        <div class="drawer-hint drawer-hint--neutral">
          <span class="material-symbols-outlined drawer-hint-icon">info</span>
          <div>
            <p class="hint-title">Alguns tipos de mídia ainda não têm dados</p>
            <p class="hint-desc">O rendimento é calculado somente após os alunos interagirem com atividades desse tipo. Continue acompanhando ao longo da missão.</p>
          </div>
        </div>
      </div>
    </div>
  `,
};
