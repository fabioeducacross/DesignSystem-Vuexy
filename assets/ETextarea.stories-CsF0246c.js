import{c as xe,b as y,d as me}from"./docTemplate-RKjNfURf.js";const be={title:"Educacross Components V2/Forms/ETextarea",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
Componente de textarea para textos longos em formulários educacionais.

### Features
- ✅ Textarea com redimensionamento vertical
- ✅ Contador de caracteres (maxLength)
- ✅ Auto-resize conforme conteúdo
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Estados de validação: default, valid, invalid, warning
- ✅ Estados: default, hover, focus, disabled, readonly
- ✅ Acessibilidade completa (ARIA, keyboard)
- ✅ Focus ring visível
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `}}},argTypes:{value:{control:"text",description:"Valor do textarea",table:{type:{summary:"string"}}},placeholder:{control:"text",description:"Texto placeholder",table:{type:{summary:"string"}}},rows:{control:"number",description:"Número de linhas visíveis",table:{type:{summary:"number"},defaultValue:{summary:"4"}}},maxLength:{control:"number",description:"Máximo de caracteres",table:{type:{summary:"number"}}},size:{control:"select",options:["sm","md","lg"],description:"Tamanho do componente",table:{type:{summary:"string"},defaultValue:{summary:"md"}}},state:{control:"select",options:["default","valid","invalid","warning"],description:"Estado de validação",table:{type:{summary:"string"},defaultValue:{summary:"default"}}},disabled:{control:"boolean",description:"Desabilita interação",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Apenas leitura",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},showCounter:{control:"boolean",description:"Exibe contador de caracteres",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},autoResize:{control:"boolean",description:"Redimensiona automaticamente",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},o=`
<style>
  .e-textarea-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  
  .e-textarea {
    width: 100%;
    min-height: var(--min-height);
    padding: var(--padding);
    font-size: var(--font-size);
    font-family: Inter, sans-serif;
    line-height: 1.6;
    color: #5E5873;
    background-color: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: vertical;
  }
  
  .e-textarea::placeholder {
    color: #B8C2CC;
  }
  
  .e-textarea:hover:not(:disabled):not([readonly]) {
    border-color: #6E63E8;
  }
  
  .e-textarea:focus {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 4px rgba(110, 99, 232, 0.25);
  }
  
  .e-textarea:disabled {
    background-color: #F8F8F8;
    cursor: not-allowed;
    opacity: 0.6;
    resize: none;
  }
  
  .e-textarea[readonly] {
    background-color: #FAFAFA;
    cursor: default;
    resize: none;
  }
  
  .e-textarea.state-valid {
    border-color: #28C76F;
  }
  
  .e-textarea.state-valid:focus {
    box-shadow: 0 0 0 4px rgba(40, 199, 111, 0.25);
  }
  
  .e-textarea.state-invalid {
    border-color: #EA5455;
  }
  
  .e-textarea.state-invalid:focus {
    box-shadow: 0 0 0 4px rgba(234, 84, 85, 0.25);
  }
  
  .e-textarea.state-warning {
    border-color: #FF9F43;
  }
  
  .e-textarea.state-warning:focus {
    box-shadow: 0 0 0 4px rgba(255, 159, 67, 0.25);
  }
  
  .e-textarea.auto-resize {
    resize: none;
    overflow: hidden;
  }
  
  .e-textarea-feedback {
    font-size: 12px;
    line-height: 1.4;
  }
  
  .e-textarea-feedback.valid {
    color: #28C76F;
  }
  
  .e-textarea-feedback.invalid {
    color: #EA5455;
  }
  
  .e-textarea-feedback.warning {
    color: #FF9F43;
  }
  
  .e-textarea-counter {
    font-size: 11px;
    color: #B8C2CC;
    text-align: right;
  }
  
  .e-textarea-counter.warning {
    color: #FF9F43;
  }
  
  .e-textarea-counter.danger {
    color: #EA5455;
    font-weight: 600;
  }
  
  /* Sizes */
  .size-sm {
    --padding: 8px 12px;
    --font-size: 13px;
    --min-height: 80px;
  }
  
  .size-md {
    --padding: 10px 14px;
    --font-size: 14px;
    --min-height: 100px;
  }
  
  .size-lg {
    --padding: 12px 16px;
    --font-size: 16px;
    --min-height: 120px;
  }
</style>
`,a=e=>{const v=`textarea-${Math.random().toString(36).substr(2,9)}`,ce=["e-textarea",e.state&&e.state!=="default"?`state-${e.state}`:"",e.autoResize?"auto-resize":""].filter(Boolean).join(" "),E=(e.value||"").length,w=e.maxLength||0,f=w?E/w*100:0;let h="";return f>=100?h="danger":f>=90&&(h="warning"),`
    ${o}
    <div class="e-textarea-wrapper size-${e.size||"md"}">
      <textarea
        id="${v}"
        class="${ce}"
        placeholder="${e.placeholder||""}"
        rows="${e.rows||4}"
        ${e.disabled?"disabled":""}
        ${e.readonly?"readonly":""}
        ${e.maxLength?`maxlength="${e.maxLength}"`:""}
        aria-invalid="${e.state==="invalid"}"
        ${e.feedback?`aria-describedby="${v}-feedback"`:""}
        role="textbox"
        aria-multiline="true"
      >${e.value||""}</textarea>
      
      ${e.feedback?`
        <span id="${v}-feedback" class="e-textarea-feedback ${e.state}">
          ${e.feedback}
        </span>
      `:""}
      
      ${e.showCounter&&e.maxLength?`
        <span class="e-textarea-counter ${h}">
          ${E}/${e.maxLength} caracteres${f>=100?" - limite atingido!":""}
        </span>
      `:""}
    </div>
  `},t={args:{placeholder:"Digite seu texto aqui...",rows:4,size:"md",state:"default",disabled:!1,readonly:!1,showCounter:!1,autoResize:!1},render:a},n={render:()=>`
    ${o}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 13px; font-weight: 500;">
          Small (80px min-height)
        </label>
        ${a({size:"sm",placeholder:"Textarea pequeno para notas rápidas...",rows:3})}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Medium (100px min-height)
        </label>
        ${a({size:"md",placeholder:"Textarea médio para respostas padrão...",rows:4})}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 16px; font-weight: 500;">
          Large (120px min-height)
        </label>
        ${a({size:"lg",placeholder:"Textarea grande para textos longos e redações...",rows:5})}
      </div>
    </div>
  `},r={args:{placeholder:"Digite até 200 caracteres...",maxLength:200,showCounter:!0,value:"O aluno demonstrou excelente compreensão dos conceitos apresentados durante a aula de matemática sobre frações.",rows:4},render:a},i={render:()=>`
    ${o}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Normal (50% do limite)
        </label>
        ${a({maxLength:100,showCounter:!0,value:"Texto com 50 caracteres aproximadamente aqui...",placeholder:"Máximo 100 caracteres",rows:3})}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Atenção (90% do limite - amarelo)
        </label>
        ${a({maxLength:100,showCounter:!0,value:"Texto longo que está chegando próximo ao limite máximo de caracteres permitidos neste campo aqui",placeholder:"Máximo 100 caracteres",rows:3})}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Limite atingido (100% - vermelho)
        </label>
        ${a({maxLength:100,showCounter:!0,value:"Texto completamente no limite máximo permitido aqui ocupando todos os cem caracteres disponíveis fim",placeholder:"Máximo 100 caracteres",rows:3})}
      </div>
    </div>
  `},s={render:()=>`
    ${o}
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Valid
        </label>
        ${a({state:"valid",value:"O aluno apresentou uma resposta completa e bem fundamentada, demonstrando compreensão profunda do tema.",feedback:"Observação salva com sucesso!",rows:3})}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Invalid
        </label>
        ${a({state:"invalid",value:"Texto muito curto",feedback:"A resposta deve ter no mínimo 50 caracteres",rows:3})}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Warning
        </label>
        ${a({state:"warning",value:"Resposta razoável mas poderia ser mais detalhada.",feedback:"Considere adicionar mais detalhes à sua resposta",rows:3})}
      </div>
    </div>
  `},d={args:{disabled:!0,value:"Este campo está desabilitado e não pode ser editado.",placeholder:"Campo desabilitado",rows:3},render:a},l={args:{readonly:!0,value:"Este é um campo somente leitura. O conteúdo pode ser copiado mas não editado. Útil para exibir informações que não devem ser modificadas.",rows:3},render:a},p={render:()=>`
    ${o}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 20px; padding: 16px; background: #F8F9FA; border-left: 4px solid #6E63E8; border-radius: 4px;">
        <h3 style="margin: 0 0 8px 0; color: #5E5873; font-size: 16px; font-weight: 600;">
          📝 Questão 1 - Matemática
        </h3>
        <p style="margin: 0; color: #6E6B7B; font-size: 14px; line-height: 1.6;">
          Explique com suas palavras o conceito de frações e dê três exemplos práticos de situações do dia a dia onde utilizamos frações.
        </p>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Sua Resposta: <span style="color: #EA5455;">*</span>
        </label>
        ${a({placeholder:"Escreva sua resposta aqui... (mínimo 100 caracteres)",maxLength:1e3,showCounter:!0,value:`Frações são formas de representar partes de um todo. Por exemplo:

1. Quando dividimos uma pizza em 8 pedaços e comemos 3, consumimos 3/8 da pizza.

2. Se em uma turma de 30 alunos, 15 são meninas, temos 15/30 (ou 1/2) da turma composta por meninas.

3. Ao medir ingredientes para um bolo, usamos 1/2 xícara de açúcar, que é metade da xícara inteira.`,rows:8,size:"md",state:"valid"})}
      </div>
      
      <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 13px; color: #6E6B7B;">
          <i class="bi bi-info-circle" style="margin-right: 4px;"></i>
          Responda com atenção. Você pode revisar antes de enviar.
        </div>
        <div style="display: flex; gap: 8px;">
          <button style="padding: 8px 16px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #5E5873; font-size: 14px; cursor: pointer;">
            Salvar Rascunho
          </button>
          <button style="padding: 8px 16px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
            Enviar Resposta
          </button>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    ${o}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        👨‍🏫 Parecer Individual - Ana Silva (5º A)
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Desempenho Acadêmico
          </label>
          ${a({placeholder:"Descreva o desempenho do aluno...",maxLength:500,showCounter:!0,value:"A aluna demonstra excelente compreensão dos conteúdos de Matemática, especialmente em operações com frações. Participa ativamente das aulas e ajuda os colegas com dificuldades.",rows:4,state:"valid"})}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Aspectos Socioemocionais
          </label>
          ${a({placeholder:"Observações sobre comportamento e relacionamento...",maxLength:500,showCounter:!0,value:"Boa integração com a turma. Demonstra empatia e colabora nas atividades em grupo. Ocasionalmente dispersa-se em atividades longas.",rows:4})}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Recomendações e Encaminhamentos
          </label>
          ${a({placeholder:"Sugestões para desenvolvimento do aluno...",maxLength:500,showCounter:!0,value:"Incentivar a participação em olimpíadas de matemática para desenvolver ainda mais seu potencial.",rows:4})}
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 12px; background: #FFF4E6; border-radius: 6px; border-left: 4px solid #FF9F43;">
        <div style="color: #FF9F43; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
          <i class="bi bi-exclamation-triangle" style="margin-right: 4px;"></i>
          Lembrete:
        </div>
        <div style="color: #6E6B7B; font-size: 13px;">
          Este parecer será compartilhado com a coordenação e disponível para os responsáveis.
        </div>
      </div>
    </div>
  `},x={render:()=>`
    ${o}
    <div style="max-width: 650px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 4px 0; color: #5E5873; font-size: 16px; font-weight: 600;">
          Missão: Frações - Conceitos Básicos
        </h3>
        <div style="color: #6E6B7B; font-size: 13px;">
          Aluno: Carlos Oliveira • Turma: 5º B • Data: 02/02/2026
        </div>
      </div>
      
      <div style="margin-bottom: 20px; padding: 16px; background: #F0F4FF; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #5E5873; font-weight: 500; font-size: 14px;">Pontuação:</span>
          <span style="color: #28C76F; font-weight: 600; font-size: 16px;">85/100</span>
        </div>
        <div style="width: 100%; height: 6px; background: #E0E0E0; border-radius: 3px; overflow: hidden;">
          <div style="width: 85%; height: 100%; background: #28C76F;"></div>
        </div>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Feedback do Professor <span style="color: #EA5455;">*</span>
        </label>
        ${a({placeholder:"Escreva um feedback construtivo para o aluno...",maxLength:800,showCounter:!0,value:`Parabéns, Carlos! Você demonstrou boa compreensão dos conceitos básicos de frações.

Pontos fortes:
✓ Identificação correta de numerador e denominador
✓ Comparação de frações com mesmo denominador
✓ Organização na apresentação das respostas

Pontos a melhorar:
• Atenção aos cálculos de simplificação
• Revisar equivalência de frações

Sugestão: Pratique mais exercícios de simplificação usando o MDC. Continue assim! 🌟`,rows:10,size:"md"})}
      </div>
      
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <button style="flex: 1; padding: 10px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #5E5873; font-size: 14px; cursor: pointer;">
          Salvar Rascunho
        </button>
        <button style="flex: 1; padding: 10px; background: #28C76F; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
          Enviar Feedback
        </button>
      </div>
    </div>
  `},m={render:()=>`
    ${o}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        📢 Novo Comunicado para Turma 5º A
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Assunto <span style="color: #EA5455;">*</span>
          </label>
          <input 
            type="text" 
            value="Feira de Ciências - Orientações" 
            placeholder="Título do comunicado"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 1px solid #D8D6DE; border-radius: 6px;"
          />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Mensagem <span style="color: #EA5455;">*</span>
          </label>
          ${a({placeholder:"Digite o comunicado aqui...",maxLength:1500,showCounter:!0,value:`Caros alunos e responsáveis,

Informamos que a Feira de Ciências 2026 será realizada no dia 15/03/2026, das 14h às 17h, no ginásio da escola.

Orientações importantes:

1. Cada grupo deve preparar um painel explicativo (tamanho A1)
2. Trazer materiais para demonstração do experimento
3. Prazo de entrega do projeto escrito: 08/03/2026
4. Apresentação oral: 5 minutos por grupo

Estamos à disposição para esclarecer dúvidas.

Atenciosamente,
Prof. Maria Santos`,rows:12,size:"md"})}
        </div>
        
        <div style="padding: 12px; background: #E8F5E9; border-radius: 6px; border-left: 4px solid #28C76F;">
          <div style="color: #28C76F; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
            <i class="bi bi-check-circle" style="margin-right: 4px;"></i>
            Dica:
          </div>
          <div style="color: #5E5873; font-size: 13px;">
            Seja claro e objetivo. Use tópicos para melhor organização.
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="checkbox" id="notify" checked style="width: 16px; height: 16px;" />
          <label for="notify" style="color: #5E5873; font-size: 13px;">
            Enviar notificação por email
          </label>
        </div>
        <button style="padding: 10px 24px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
          Publicar Comunicado
        </button>
      </div>
    </div>
  `},u={render:()=>(setTimeout(()=>{const e=document.querySelector(".auto-resize");e&&(e.addEventListener("input",function(){this.style.height="auto",this.style.height=this.scrollHeight+"px"}),e.style.height="auto",e.style.height=e.scrollHeight+"px")},100),`
      ${o}
      <div style="max-width: 600px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
        <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
          <strong style="color: #28C76F;">✨ Auto-resize:</strong>
          <div style="margin-top: 4px; color: #5E5873; font-size: 13px;">
            Este textarea cresce automaticamente conforme você digita. Útil para campos onde o tamanho do conteúdo é variável.
          </div>
        </div>
        
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Digite para ver o efeito:
        </label>
        ${a({placeholder:"Digite várias linhas de texto e veja o campo crescer automaticamente...",autoResize:!0,rows:2,value:`Este é um exemplo de textarea com auto-resize.

Quando você adiciona mais linhas, o campo cresce automaticamente para acomodar o conteúdo.

Isso melhora a experiência do usuário, pois não é necessário scroll interno.`})}
      </div>
    `)},b={render:()=>`
    ${o}
    <div style="max-width: 600px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
      <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
        <strong style="color: #28C76F;">♿ Acessibilidade:</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #5E5873; font-size: 13px;">
          <li>Use <kbd>Tab</kbd> para navegar até o textarea</li>
          <li>Focus ring visível ao focar</li>
          <li>Labels associados com aria-describedby</li>
          <li><kbd>Ctrl</kbd> + <kbd>Enter</kbd> pode submeter formulário</li>
          <li>Redimensionamento apenas vertical (não quebra layout)</li>
        </ul>
      </div>
      
      <div>
        <label for="accessible-textarea" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Textarea Acessível
        </label>
        ${a({placeholder:"Campo totalmente acessível por teclado e leitores de tela",rows:4,maxLength:300,showCounter:!0,feedback:"Mensagem de ajuda visível via aria-describedby"})}
      </div>
    </div>
  `},g={render:()=>xe({title:"ETextarea",subtitle:"Textarea para textos longos em formulários educacionais",badge:"Forms / Core UI",colors:{primary:"#6E63E8",secondary:"#28C76F"},stats:[{label:"Tamanhos",value:"3",description:"sm (80px), md (100px), lg (120px) min-height"},{label:"Auto-resize",value:"Sim",description:"Expande automaticamente com conteúdo"},{label:"Contador",value:"Opcional",description:"Mostra caracteres restantes"},{label:"Validação",value:"3 estados",description:"valid, invalid, warning"}],content:`
${y({title:"Textarea Básico",description:"Textarea padrão com placeholder",preview:'<div style="padding: 20px; max-width: 500px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Observações sobre o Aluno</label><textarea placeholder="Digite suas observações aqui..." rows="4" style="width: 100%; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; line-height: 1.6; resize: vertical; font-family: inherit;"></textarea></div>',code:`<ETextarea
  v-model="observations"
  placeholder="Digite suas observações aqui..."
  rows="4"
/>`})}

${y({title:"Com Contador de Caracteres",description:"Mostra caracteres restantes",preview:'<div style="padding: 20px; max-width: 500px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Feedback da Atividade</label><div style="position: relative;"><textarea placeholder="Escreva seu feedback..." rows="4" maxlength="200" style="width: 100%; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; line-height: 1.6; resize: vertical; font-family: inherit;">Excelente trabalho!</textarea><div style="text-align: right; margin-top: 4px; font-size: 12px; color: #A8AAAE;"><span style="color: #6E63E8; font-weight: 500;">20</span> / 200 caracteres</div></div></div>',code:`<ETextarea
  v-model="feedback"
  :max-length="200"
  :show-counter="true"
  rows="4"
/>`})}

${y({title:"Com Validação",description:"Estados de valid/invalid com feedback",preview:'<div style="padding: 20px; max-width: 500px; display: flex; gap: 16px;"><div style="flex: 1;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Resposta Válida</label><textarea rows="3" style="width: 100%; padding: 10px 14px; border: 2px solid #28C76F; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #F0FDF4; line-height: 1.6; resize: vertical; font-family: inherit;">Resposta completa e detalhada.</textarea><small style="display: block; margin-top: 4px; color: #28C76F; font-size: 12px;">✔ Resposta aceita</small></div><div style="flex: 1;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Resposta Inválida</label><textarea rows="3" style="width: 100%; padding: 10px 14px; border: 2px solid #EA5455; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #FEF2F2; line-height: 1.6; resize: vertical; font-family: inherit;">Muito curta</textarea><small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">⚠ Mínimo 50 caracteres</small></div></div>',code:`<ETextarea
  v-model="answer"
  state="invalid"
  feedback="Mínimo 50 caracteres"
/>`})}

${me([{name:"value",type:"String",default:"''",description:"Valor do textarea (v-model)"},{name:"rows",type:"Number",default:"3",description:"Número de linhas visíveis"},{name:"maxLength",type:"Number",default:"null",description:"Máximo de caracteres"},{name:"state",type:"String",default:"''",description:"Estado: 'valid', 'invalid', 'warning'"},{name:"showCounter",type:"Boolean",default:"false",description:"Mostra contador de caracteres"}])}
    `,features:[{icon:"arrows-expand",title:"Auto-resize",description:"Expande automaticamente com conteúdo"},{icon:"calculator",title:"Contador",description:"Mostra caracteres restantes opcionalmente"},{icon:"check-circle",title:"Validação",description:"Estados valid/invalid/warning com feedback"},{icon:"universal-access",title:"Acessível",description:"ARIA, keyboard, line-height 1.6 para leitura"}],relatedComponents:[{name:"EInput",path:"/story/front-office-forms-einput--default"},{name:"EFormCheck",path:"/story/front-office-forms-eformcheck--default"}]})};var z,F,k;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    placeholder: 'Digite seu texto aqui...',
    rows: 4,
    size: 'md',
    state: 'default',
    disabled: false,
    readonly: false,
    showCounter: false,
    autoResize: false
  },
  render: renderTextarea
}`,...(k=(F=t.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var C,A,D;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 13px; font-weight: 500;">
          Small (80px min-height)
        </label>
        \${renderTextarea({
    size: 'sm',
    placeholder: 'Textarea pequeno para notas rápidas...',
    rows: 3
  })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Medium (100px min-height)
        </label>
        \${renderTextarea({
    size: 'md',
    placeholder: 'Textarea médio para respostas padrão...',
    rows: 4
  })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 16px; font-weight: 500;">
          Large (120px min-height)
        </label>
        \${renderTextarea({
    size: 'lg',
    placeholder: 'Textarea grande para textos longos e redações...',
    rows: 5
  })}
      </div>
    </div>
  \`
}`,...(D=(A=n.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var $,T,S;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    placeholder: 'Digite até 200 caracteres...',
    maxLength: 200,
    showCounter: true,
    value: 'O aluno demonstrou excelente compreensão dos conceitos apresentados durante a aula de matemática sobre frações.',
    rows: 4
  },
  render: renderTextarea
}`,...(S=(T=r.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var L,M,R;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Normal (50% do limite)
        </label>
        \${renderTextarea({
    maxLength: 100,
    showCounter: true,
    value: 'Texto com 50 caracteres aproximadamente aqui...',
    placeholder: 'Máximo 100 caracteres',
    rows: 3
  })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Atenção (90% do limite - amarelo)
        </label>
        \${renderTextarea({
    maxLength: 100,
    showCounter: true,
    value: 'Texto longo que está chegando próximo ao limite máximo de caracteres permitidos neste campo aqui',
    placeholder: 'Máximo 100 caracteres',
    rows: 3
  })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Limite atingido (100% - vermelho)
        </label>
        \${renderTextarea({
    maxLength: 100,
    showCounter: true,
    value: 'Texto completamente no limite máximo permitido aqui ocupando todos os cem caracteres disponíveis fim',
    placeholder: 'Máximo 100 caracteres',
    rows: 3
  })}
      </div>
    </div>
  \`
}`,...(R=(M=i.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var B,q,P;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Valid
        </label>
        \${renderTextarea({
    state: 'valid',
    value: 'O aluno apresentou uma resposta completa e bem fundamentada, demonstrando compreensão profunda do tema.',
    feedback: 'Observação salva com sucesso!',
    rows: 3
  })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Invalid
        </label>
        \${renderTextarea({
    state: 'invalid',
    value: 'Texto muito curto',
    feedback: 'A resposta deve ter no mínimo 50 caracteres',
    rows: 3
  })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Warning
        </label>
        \${renderTextarea({
    state: 'warning',
    value: 'Resposta razoável mas poderia ser mais detalhada.',
    feedback: 'Considere adicionar mais detalhes à sua resposta',
    rows: 3
  })}
      </div>
    </div>
  \`
}`,...(P=(q=s.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var O,V,I;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: 'Este campo está desabilitado e não pode ser editado.',
    placeholder: 'Campo desabilitado',
    rows: 3
  },
  render: renderTextarea
}`,...(I=(V=d.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var j,N,Q;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    readonly: true,
    value: 'Este é um campo somente leitura. O conteúdo pode ser copiado mas não editado. Útil para exibir informações que não devem ser modificadas.',
    rows: 3
  },
  render: renderTextarea
}`,...(Q=(N=l.parameters)==null?void 0:N.docs)==null?void 0:Q.source}}};var U,H,W;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 20px; padding: 16px; background: #F8F9FA; border-left: 4px solid #6E63E8; border-radius: 4px;">
        <h3 style="margin: 0 0 8px 0; color: #5E5873; font-size: 16px; font-weight: 600;">
          📝 Questão 1 - Matemática
        </h3>
        <p style="margin: 0; color: #6E6B7B; font-size: 14px; line-height: 1.6;">
          Explique com suas palavras o conceito de frações e dê três exemplos práticos de situações do dia a dia onde utilizamos frações.
        </p>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Sua Resposta: <span style="color: #EA5455;">*</span>
        </label>
        \${renderTextarea({
    placeholder: 'Escreva sua resposta aqui... (mínimo 100 caracteres)',
    maxLength: 1000,
    showCounter: true,
    value: 'Frações são formas de representar partes de um todo. Por exemplo:\\n\\n1. Quando dividimos uma pizza em 8 pedaços e comemos 3, consumimos 3/8 da pizza.\\n\\n2. Se em uma turma de 30 alunos, 15 são meninas, temos 15/30 (ou 1/2) da turma composta por meninas.\\n\\n3. Ao medir ingredientes para um bolo, usamos 1/2 xícara de açúcar, que é metade da xícara inteira.',
    rows: 8,
    size: 'md',
    state: 'valid'
  })}
      </div>
      
      <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 13px; color: #6E6B7B;">
          <i class="bi bi-info-circle" style="margin-right: 4px;"></i>
          Responda com atenção. Você pode revisar antes de enviar.
        </div>
        <div style="display: flex; gap: 8px;">
          <button style="padding: 8px 16px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #5E5873; font-size: 14px; cursor: pointer;">
            Salvar Rascunho
          </button>
          <button style="padding: 8px 16px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
            Enviar Resposta
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(W=(H=p.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};var _,K,G;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        👨‍🏫 Parecer Individual - Ana Silva (5º A)
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Desempenho Acadêmico
          </label>
          \${renderTextarea({
    placeholder: 'Descreva o desempenho do aluno...',
    maxLength: 500,
    showCounter: true,
    value: 'A aluna demonstra excelente compreensão dos conteúdos de Matemática, especialmente em operações com frações. Participa ativamente das aulas e ajuda os colegas com dificuldades.',
    rows: 4,
    state: 'valid'
  })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Aspectos Socioemocionais
          </label>
          \${renderTextarea({
    placeholder: 'Observações sobre comportamento e relacionamento...',
    maxLength: 500,
    showCounter: true,
    value: 'Boa integração com a turma. Demonstra empatia e colabora nas atividades em grupo. Ocasionalmente dispersa-se em atividades longas.',
    rows: 4
  })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Recomendações e Encaminhamentos
          </label>
          \${renderTextarea({
    placeholder: 'Sugestões para desenvolvimento do aluno...',
    maxLength: 500,
    showCounter: true,
    value: 'Incentivar a participação em olimpíadas de matemática para desenvolver ainda mais seu potencial.',
    rows: 4
  })}
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 12px; background: #FFF4E6; border-radius: 6px; border-left: 4px solid #FF9F43;">
        <div style="color: #FF9F43; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
          <i class="bi bi-exclamation-triangle" style="margin-right: 4px;"></i>
          Lembrete:
        </div>
        <div style="color: #6E6B7B; font-size: 13px;">
          Este parecer será compartilhado com a coordenação e disponível para os responsáveis.
        </div>
      </div>
    </div>
  \`
}`,...(G=(K=c.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var J,X,Y;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 650px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 4px 0; color: #5E5873; font-size: 16px; font-weight: 600;">
          Missão: Frações - Conceitos Básicos
        </h3>
        <div style="color: #6E6B7B; font-size: 13px;">
          Aluno: Carlos Oliveira • Turma: 5º B • Data: 02/02/2026
        </div>
      </div>
      
      <div style="margin-bottom: 20px; padding: 16px; background: #F0F4FF; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #5E5873; font-weight: 500; font-size: 14px;">Pontuação:</span>
          <span style="color: #28C76F; font-weight: 600; font-size: 16px;">85/100</span>
        </div>
        <div style="width: 100%; height: 6px; background: #E0E0E0; border-radius: 3px; overflow: hidden;">
          <div style="width: 85%; height: 100%; background: #28C76F;"></div>
        </div>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Feedback do Professor <span style="color: #EA5455;">*</span>
        </label>
        \${renderTextarea({
    placeholder: 'Escreva um feedback construtivo para o aluno...',
    maxLength: 800,
    showCounter: true,
    value: 'Parabéns, Carlos! Você demonstrou boa compreensão dos conceitos básicos de frações.\\n\\nPontos fortes:\\n✓ Identificação correta de numerador e denominador\\n✓ Comparação de frações com mesmo denominador\\n✓ Organização na apresentação das respostas\\n\\nPontos a melhorar:\\n• Atenção aos cálculos de simplificação\\n• Revisar equivalência de frações\\n\\nSugestão: Pratique mais exercícios de simplificação usando o MDC. Continue assim! 🌟',
    rows: 10,
    size: 'md'
  })}
      </div>
      
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <button style="flex: 1; padding: 10px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #5E5873; font-size: 14px; cursor: pointer;">
          Salvar Rascunho
        </button>
        <button style="flex: 1; padding: 10px; background: #28C76F; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
          Enviar Feedback
        </button>
      </div>
    </div>
  \`
}`,...(Y=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;m.parameters={...m.parameters,docs:{...(Z=m.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        📢 Novo Comunicado para Turma 5º A
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Assunto <span style="color: #EA5455;">*</span>
          </label>
          <input 
            type="text" 
            value="Feira de Ciências - Orientações" 
            placeholder="Título do comunicado"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 1px solid #D8D6DE; border-radius: 6px;"
          />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Mensagem <span style="color: #EA5455;">*</span>
          </label>
          \${renderTextarea({
    placeholder: 'Digite o comunicado aqui...',
    maxLength: 1500,
    showCounter: true,
    value: 'Caros alunos e responsáveis,\\n\\nInformamos que a Feira de Ciências 2026 será realizada no dia 15/03/2026, das 14h às 17h, no ginásio da escola.\\n\\nOrientações importantes:\\n\\n1. Cada grupo deve preparar um painel explicativo (tamanho A1)\\n2. Trazer materiais para demonstração do experimento\\n3. Prazo de entrega do projeto escrito: 08/03/2026\\n4. Apresentação oral: 5 minutos por grupo\\n\\nEstamos à disposição para esclarecer dúvidas.\\n\\nAtenciosamente,\\nProf. Maria Santos',
    rows: 12,
    size: 'md'
  })}
        </div>
        
        <div style="padding: 12px; background: #E8F5E9; border-radius: 6px; border-left: 4px solid #28C76F;">
          <div style="color: #28C76F; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
            <i class="bi bi-check-circle" style="margin-right: 4px;"></i>
            Dica:
          </div>
          <div style="color: #5E5873; font-size: 13px;">
            Seja claro e objetivo. Use tópicos para melhor organização.
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="checkbox" id="notify" checked style="width: 16px; height: 16px;" />
          <label for="notify" style="color: #5E5873; font-size: 13px;">
            Enviar notificação por email
          </label>
        </div>
        <button style="padding: 10px 24px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
          Publicar Comunicado
        </button>
      </div>
    </div>
  \`
}`,...(ae=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var oe,te,ne;u.parameters={...u.parameters,docs:{...(oe=u.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const textarea = document.querySelector('.auto-resize');
      if (textarea) {
        textarea.addEventListener('input', function () {
          this.style.height = 'auto';
          this.style.height = this.scrollHeight + 'px';
        });
        // Trigger inicial
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 100);
    return \`
      \${styles}
      <div style="max-width: 600px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
        <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
          <strong style="color: #28C76F;">✨ Auto-resize:</strong>
          <div style="margin-top: 4px; color: #5E5873; font-size: 13px;">
            Este textarea cresce automaticamente conforme você digita. Útil para campos onde o tamanho do conteúdo é variável.
          </div>
        </div>
        
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Digite para ver o efeito:
        </label>
        \${renderTextarea({
      placeholder: 'Digite várias linhas de texto e veja o campo crescer automaticamente...',
      autoResize: true,
      rows: 2,
      value: 'Este é um exemplo de textarea com auto-resize.\\n\\nQuando você adiciona mais linhas, o campo cresce automaticamente para acomodar o conteúdo.\\n\\nIsso melhora a experiência do usuário, pois não é necessário scroll interno.'
    })}
      </div>
    \`;
  }
}`,...(ne=(te=u.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var re,ie,se;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 600px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
      <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
        <strong style="color: #28C76F;">♿ Acessibilidade:</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #5E5873; font-size: 13px;">
          <li>Use <kbd>Tab</kbd> para navegar até o textarea</li>
          <li>Focus ring visível ao focar</li>
          <li>Labels associados com aria-describedby</li>
          <li><kbd>Ctrl</kbd> + <kbd>Enter</kbd> pode submeter formulário</li>
          <li>Redimensionamento apenas vertical (não quebra layout)</li>
        </ul>
      </div>
      
      <div>
        <label for="accessible-textarea" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Textarea Acessível
        </label>
        \${renderTextarea({
    placeholder: 'Campo totalmente acessível por teclado e leitores de tela',
    rows: 4,
    maxLength: 300,
    showCounter: true,
    feedback: 'Mensagem de ajuda visível via aria-describedby'
  })}
      </div>
    </div>
  \`
}`,...(se=(ie=b.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var de,le,pe;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => createDocPage({
    title: 'ETextarea',
    subtitle: 'Textarea para textos longos em formulários educacionais',
    badge: 'Forms / Core UI',
    colors: {
      primary: '#6E63E8',
      secondary: '#28C76F'
    },
    stats: [{
      label: 'Tamanhos',
      value: '3',
      description: 'sm (80px), md (100px), lg (120px) min-height'
    }, {
      label: 'Auto-resize',
      value: 'Sim',
      description: 'Expande automaticamente com conteúdo'
    }, {
      label: 'Contador',
      value: 'Opcional',
      description: 'Mostra caracteres restantes'
    }, {
      label: 'Validação',
      value: '3 estados',
      description: 'valid, invalid, warning'
    }],
    content: \`
\${createExampleCard({
      title: 'Textarea Básico',
      description: 'Textarea padrão com placeholder',
      preview: '<div style="padding: 20px; max-width: 500px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Observações sobre o Aluno</label><textarea placeholder="Digite suas observações aqui..." rows="4" style="width: 100%; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; line-height: 1.6; resize: vertical; font-family: inherit;"></textarea></div>',
      code: '<ETextarea\\n  v-model="observations"\\n  placeholder="Digite suas observações aqui..."\\n  rows="4"\\n/>'
    })}

\${createExampleCard({
      title: 'Com Contador de Caracteres',
      description: 'Mostra caracteres restantes',
      preview: '<div style="padding: 20px; max-width: 500px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Feedback da Atividade</label><div style="position: relative;"><textarea placeholder="Escreva seu feedback..." rows="4" maxlength="200" style="width: 100%; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; line-height: 1.6; resize: vertical; font-family: inherit;">Excelente trabalho!</textarea><div style="text-align: right; margin-top: 4px; font-size: 12px; color: #A8AAAE;"><span style="color: #6E63E8; font-weight: 500;">20</span> / 200 caracteres</div></div></div>',
      code: '<ETextarea\\n  v-model="feedback"\\n  :max-length="200"\\n  :show-counter="true"\\n  rows="4"\\n/>'
    })}

\${createExampleCard({
      title: 'Com Validação',
      description: 'Estados de valid/invalid com feedback',
      preview: '<div style="padding: 20px; max-width: 500px; display: flex; gap: 16px;"><div style="flex: 1;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Resposta Válida</label><textarea rows="3" style="width: 100%; padding: 10px 14px; border: 2px solid #28C76F; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #F0FDF4; line-height: 1.6; resize: vertical; font-family: inherit;">Resposta completa e detalhada.</textarea><small style="display: block; margin-top: 4px; color: #28C76F; font-size: 12px;">✔ Resposta aceita</small></div><div style="flex: 1;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Resposta Inválida</label><textarea rows="3" style="width: 100%; padding: 10px 14px; border: 2px solid #EA5455; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #FEF2F2; line-height: 1.6; resize: vertical; font-family: inherit;">Muito curta</textarea><small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">⚠ Mínimo 50 caracteres</small></div></div>',
      code: '<ETextarea\\n  v-model="answer"\\n  state="invalid"\\n  feedback="Mínimo 50 caracteres"\\n/>'
    })}

\${createPropsTable([{
      name: 'value',
      type: 'String',
      default: "''",
      description: 'Valor do textarea (v-model)'
    }, {
      name: 'rows',
      type: 'Number',
      default: '3',
      description: 'Número de linhas visíveis'
    }, {
      name: 'maxLength',
      type: 'Number',
      default: 'null',
      description: 'Máximo de caracteres'
    }, {
      name: 'state',
      type: 'String',
      default: "''",
      description: "Estado: 'valid', 'invalid', 'warning'"
    }, {
      name: 'showCounter',
      type: 'Boolean',
      default: 'false',
      description: 'Mostra contador de caracteres'
    }])}
    \`,
    features: [{
      icon: 'arrows-expand',
      title: 'Auto-resize',
      description: 'Expande automaticamente com conteúdo'
    }, {
      icon: 'calculator',
      title: 'Contador',
      description: 'Mostra caracteres restantes opcionalmente'
    }, {
      icon: 'check-circle',
      title: 'Validação',
      description: 'Estados valid/invalid/warning com feedback'
    }, {
      icon: 'universal-access',
      title: 'Acessível',
      description: 'ARIA, keyboard, line-height 1.6 para leitura'
    }],
    relatedComponents: [{
      name: 'EInput',
      path: '/story/front-office-forms-einput--default'
    }, {
      name: 'EFormCheck',
      path: '/story/front-office-forms-eformcheck--default'
    }]
  })
}`,...(pe=(le=g.parameters)==null?void 0:le.docs)==null?void 0:pe.source}}};const ge=["Default","AllSizes","WithMaxLength","CharacterCount","ValidationStates","Disabled","Readonly","RespostaDissertativa","ObservacoesDoProfessor","FeedbackDeAtividade","ComunicadoParaTurma","AutoResize","KeyboardAccessibility","Documentation"];export{n as AllSizes,u as AutoResize,i as CharacterCount,m as ComunicadoParaTurma,t as Default,d as Disabled,g as Documentation,x as FeedbackDeAtividade,b as KeyboardAccessibility,c as ObservacoesDoProfessor,l as Readonly,p as RespostaDissertativa,s as ValidationStates,r as WithMaxLength,ge as __namedExportsOrder,be as default};
