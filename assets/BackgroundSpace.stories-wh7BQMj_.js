const sa={title:"Educacross Components V2/Feedback/BackgroundSpace",tags:["autodocs"],parameters:{docs:{description:{component:`
# BackgroundSpace

Componente de **estado vazio** (empty state) com ícone grande, título, texto descritivo e ação opcional.

## Quando usar

- ✅ Listas vazias (missões, alunos, atividades, resultados)
- ✅ Tabelas sem dados para exibir (relatórios, buscas)
- ✅ Filtros sem resultados (busca vazia)
- ✅ Páginas de erro (404 Not Found, erro de conexão)
- ✅ Cards/sidebars sem conteúdo (compact variant)
- ✅ Primeiro uso de features (onboarding vazio)

## Variantes

- **Default**: Grid icon cinza + "Nenhum dado disponível"
- **SemMissoes**: Layers icon + "Nenhuma missão encontrada" + botão "Criar Missão" roxo
- **SemAlunos**: People icon + "Nenhum aluno na turma" + botão "Adicionar Alunos" verde
- **SemResultados**: Download icon + "Nenhum resultado disponível" + texto aguardar
- **SemAtividades**: Calendar icon + "Nenhuma atividade agendada"
- **CompactVariant**: Icon 80px, padding 40px, min-height 300px (para cards)
- **PaginaNaoEncontrada**: X-circle 160px + "404" 48px + botão "Voltar"
- **ErroConexao**: Circle-slash icon + título vermelho "Erro de conexão" + botão "Tentar Novamente"
- **AllIcons**: Grid 3×2 com 6 ícones diferentes (Missões, Alunos, Atividades, Resultados, Relatórios, Busca)

## Características visuais

- **Icon**: 120×120px (default), 80×80px (compact), opacity 0.3 cinza
- **Title**: font-size 20px, font-weight 600, color #5E5873
- **Text**: font-size 14px, color #6E6B7B, max-width 400px, line-height 1.6
- **Button**: padding 10×24px, border-radius 6px, cores variadas (roxo #6E63E8, verde #28C76F, vermelho #EA5455)
- **Container**: flex column center, padding 60×20px (default) / 40×20px (compact), min-height 400px (default) / 300px (compact)
        `}}}},a=`<style>
.background-space {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 400px;
  text-align: center;
}

.background-space.compact {
  padding: 40px 20px;
  min-height: 300px;
}

.bg-space-icon {
  font-size: 120px;
  color: #D8D6DE;
  opacity: 0.3;
  margin-bottom: 20px;
}

.background-space.compact .bg-space-icon {
  font-size: 80px;
}

.bg-space-title {
  font-size: 20px;
  font-weight: 600;
  color: #5E5873;
  margin: 0 0 12px;
}

.bg-space-text {
  font-size: 14px;
  color: #6E6B7B;
  max-width: 400px;
  line-height: 1.6;
  margin: 0;
}

.bg-space-button {
  margin-top: 20px;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: opacity .2s;
}

.bg-space-button:hover {
  opacity: 0.9;
}

.bg-space-button.primary {
  background: #6E63E8;
}

.bg-space-button.success {
  background: #28C76F;
}

.bg-space-button.danger {
  background: #EA5455;
}
</style>`,s={render:()=>`
    ${a}
    <div class="background-space">
      <i class="bi bi-grid bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum dado disponível</h3>
      <p class="bg-space-text">Não há informações para exibir no momento.</p>
    </div>
  `},e={render:()=>`
    ${a}
    <div class="background-space">
      <i class="bi bi-layers bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhuma missão encontrada</h3>
      <p class="bg-space-text">
        Você ainda não criou nenhuma missão para esta turma. 
        Crie sua primeira missão para começar a avaliar os alunos.
      </p>
      <button class="bg-space-button primary" onclick="alert('Navegar para criação de missão')">
        <i class="bi bi-plus-circle" style="margin-right: 6px"></i>
        Criar Missão
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Professor sem missões criadas (ação CTA roxo).
    </p>
  `},o={render:()=>`
    ${a}
    <div class="background-space">
      <i class="bi bi-people bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum aluno na turma</h3>
      <p class="bg-space-text">
        Esta turma ainda não possui alunos cadastrados. 
        Adicione alunos para começar a trabalhar com a turma.
      </p>
      <button class="bg-space-button success" onclick="alert('Abrir modal adicionar alunos')">
        <i class="bi bi-person-plus" style="margin-right: 6px"></i>
        Adicionar Alunos
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Turma sem alunos (ação CTA verde).
    </p>
  `},n={render:()=>`
    ${a}
    <div class="background-space">
      <i class="bi bi-download bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum resultado disponível</h3>
      <p class="bg-space-text">
        Os resultados desta missão ainda não estão disponíveis. 
        Aguarde a aplicação da missão pelos alunos.
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Missão aplicada mas sem resultados (aguardar aplicação).
    </p>
  `},i={render:()=>`
    ${a}
    <div class="background-space">
      <i class="bi bi-calendar-x bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhuma atividade agendada</h3>
      <p class="bg-space-text">
        Não há atividades agendadas para os próximos dias. 
        Agende uma nova atividade para aparecer aqui.
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Calendário sem atividades futuras.
    </p>
  `},t={render:()=>`
    ${a}
    <div style="max-width: 400px; padding: 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <div class="background-space compact">
        <i class="bi bi-info-circle bg-space-icon"></i>
        <h3 class="bg-space-title">Nenhum dado</h3>
        <p class="bg-space-text" style="font-size: 13px">
          Selecione um filtro para visualizar os dados.
        </p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Compact (icon 80px, padding 40px, min-height 300px) para cards menores.
    </p>
  `},r={render:()=>`
    ${a}
    <style>
      .error-404 .bg-space-icon {
        font-size: 160px;
        opacity: 0.2;
      }
      .error-404 .bg-space-title {
        font-size: 48px;
        margin-bottom: 8px;
      }
      .error-404 .bg-space-subtitle {
        font-size: 20px;
        font-weight: 600;
        color: #5E5873;
        margin: 0 0 12px;
      }
    </style>
    
    <div class="background-space error-404">
      <i class="bi bi-x-circle bg-space-icon"></i>
      <h1 class="bg-space-title">404</h1>
      <h3 class="bg-space-subtitle">Página não encontrada</h3>
      <p class="bg-space-text">
        A página que você está procurando não existe ou foi movida.
      </p>
      <button class="bg-space-button primary" onclick="history.back()">
        <i class="bi bi-arrow-left" style="margin-right: 6px"></i>
        Voltar
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Página 404 Not Found (icon 160px, "404" 48px).
    </p>
  `},c={render:()=>`
    ${a}
    <style>
      .error-connection .bg-space-title {
        color: #EA5455;
      }
    </style>
    
    <div class="background-space error-connection">
      <i class="bi bi-wifi-off bg-space-icon"></i>
      <h3 class="bg-space-title">Erro de conexão</h3>
      <p class="bg-space-text">
        Não foi possível conectar ao servidor. 
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <button class="bg-space-button danger" onclick="location.reload()">
        <i class="bi bi-arrow-clockwise" style="margin-right: 6px"></i>
        Tentar Novamente
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Erro de conexão (título vermelho + botão "Tentar Novamente").
    </p>
  `},p={render:()=>`
    ${a}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px">
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-layers bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Missões</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-people bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Alunos</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-calendar-x bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Atividades</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-download bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Resultados</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-file-bar-graph bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Relatórios</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-search bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Busca</p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Showcase:</strong> 6 ícones disponíveis para empty states (layers, people, calendar, download, file-bar-graph, search).
    </p>
  `};var d,l,x,g,b;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="background-space">
      <i class="bi bi-grid bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum dado disponível</h3>
      <p class="bg-space-text">Não há informações para exibir no momento.</p>
    </div>
  \`
}`,...(x=(l=s.parameters)==null?void 0:l.docs)==null?void 0:x.source},description:{story:`Story: Default

Empty state padrão com grid icon + "Nenhum dado disponível".

Educational context: Lista vazia genérica (sem dados).`,...(b=(g=s.parameters)==null?void 0:g.docs)==null?void 0:b.description}}};var m,u,E,v,y;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="background-space">
      <i class="bi bi-layers bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhuma missão encontrada</h3>
      <p class="bg-space-text">
        Você ainda não criou nenhuma missão para esta turma. 
        Crie sua primeira missão para começar a avaliar os alunos.
      </p>
      <button class="bg-space-button primary" onclick="alert('Navegar para criação de missão')">
        <i class="bi bi-plus-circle" style="margin-right: 6px"></i>
        Criar Missão
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Professor sem missões criadas (ação CTA roxo).
    </p>
  \`
}`,...(E=(u=e.parameters)==null?void 0:u.docs)==null?void 0:E.source},description:{story:`Story: SemMissoes

Empty state missões com layers icon + botão "Criar Missão" roxo.

Educational context: Professor sem missões criadas na turma.`,...(y=(v=e.parameters)==null?void 0:v.docs)==null?void 0:y.description}}};var h,f,D,z,k;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="background-space">
      <i class="bi bi-people bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum aluno na turma</h3>
      <p class="bg-space-text">
        Esta turma ainda não possui alunos cadastrados. 
        Adicione alunos para começar a trabalhar com a turma.
      </p>
      <button class="bg-space-button success" onclick="alert('Abrir modal adicionar alunos')">
        <i class="bi bi-person-plus" style="margin-right: 6px"></i>
        Adicionar Alunos
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Turma sem alunos (ação CTA verde).
    </p>
  \`
}`,...(D=(f=o.parameters)==null?void 0:f.docs)==null?void 0:D.source},description:{story:`Story: SemAlunos

Empty state alunos com people icon + botão "Adicionar Alunos" verde.

Educational context: Turma sem alunos cadastrados.`,...(k=(z=o.parameters)==null?void 0:z.docs)==null?void 0:k.description}}};var A,C,B,S,N;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="background-space">
      <i class="bi bi-download bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum resultado disponível</h3>
      <p class="bg-space-text">
        Os resultados desta missão ainda não estão disponíveis. 
        Aguarde a aplicação da missão pelos alunos.
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Missão aplicada mas sem resultados (aguardar aplicação).
    </p>
  \`
}`,...(B=(C=n.parameters)==null?void 0:C.docs)==null?void 0:B.source},description:{story:`Story: SemResultados

Empty state resultados com download icon + texto aguardar aplicação.

Educational context: Missão aplicada mas sem resultados disponíveis ainda.`,...(N=(S=n.parameters)==null?void 0:S.docs)==null?void 0:N.description}}};var w,$,F,P,T;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="background-space">
      <i class="bi bi-calendar-x bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhuma atividade agendada</h3>
      <p class="bg-space-text">
        Não há atividades agendadas para os próximos dias. 
        Agende uma nova atividade para aparecer aqui.
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Calendário sem atividades futuras.
    </p>
  \`
}`,...(F=($=i.parameters)==null?void 0:$.docs)==null?void 0:F.source},description:{story:`Story: SemAtividades

Empty state atividades com calendar icon + "Nenhuma atividade agendada".

Educational context: Calendário vazio (sem atividades futuras).`,...(T=(P=i.parameters)==null?void 0:P.docs)==null?void 0:T.description}}};var V,M,R,I,q;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 400px; padding: 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <div class="background-space compact">
        <i class="bi bi-info-circle bg-space-icon"></i>
        <h3 class="bg-space-title">Nenhum dado</h3>
        <p class="bg-space-text" style="font-size: 13px">
          Selecione um filtro para visualizar os dados.
        </p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Compact (icon 80px, padding 40px, min-height 300px) para cards menores.
    </p>
  \`
}`,...(R=(M=t.parameters)==null?void 0:M.docs)==null?void 0:R.source},description:{story:`Story: CompactVariant

Empty state compacto: icon 80px, padding 40px, min-height 300px (para cards/sidebars).

Educational context: Card vazio em dashboard (uso em containers menores).`,...(q=(I=t.parameters)==null?void 0:I.docs)==null?void 0:q.description}}};var G,L,O,_,X;r.parameters={...r.parameters,docs:{...(G=r.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .error-404 .bg-space-icon {
        font-size: 160px;
        opacity: 0.2;
      }
      .error-404 .bg-space-title {
        font-size: 48px;
        margin-bottom: 8px;
      }
      .error-404 .bg-space-subtitle {
        font-size: 20px;
        font-weight: 600;
        color: #5E5873;
        margin: 0 0 12px;
      }
    </style>
    
    <div class="background-space error-404">
      <i class="bi bi-x-circle bg-space-icon"></i>
      <h1 class="bg-space-title">404</h1>
      <h3 class="bg-space-subtitle">Página não encontrada</h3>
      <p class="bg-space-text">
        A página que você está procurando não existe ou foi movida.
      </p>
      <button class="bg-space-button primary" onclick="history.back()">
        <i class="bi bi-arrow-left" style="margin-right: 6px"></i>
        Voltar
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Página 404 Not Found (icon 160px, "404" 48px).
    </p>
  \`
}`,...(O=(L=r.parameters)==null?void 0:L.docs)==null?void 0:O.source},description:{story:`Story: PaginaNaoEncontrada

Página 404 com X-circle icon 160px + "404" 48px + botão "Voltar".

Educational context: Página não encontrada (erro 404).`,...(X=(_=r.parameters)==null?void 0:_.docs)==null?void 0:X.description}}};var j,Q,H,J,K;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .error-connection .bg-space-title {
        color: #EA5455;
      }
    </style>
    
    <div class="background-space error-connection">
      <i class="bi bi-wifi-off bg-space-icon"></i>
      <h3 class="bg-space-title">Erro de conexão</h3>
      <p class="bg-space-text">
        Não foi possível conectar ao servidor. 
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <button class="bg-space-button danger" onclick="location.reload()">
        <i class="bi bi-arrow-clockwise" style="margin-right: 6px"></i>
        Tentar Novamente
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Erro de conexão (título vermelho + botão "Tentar Novamente").
    </p>
  \`
}`,...(H=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:H.source},description:{story:`Story: ErroConexao

Erro de conexão com circle-slash icon + título vermelho + botão "Tentar Novamente" vermelho.

Educational context: Falha de conexão (API offline, timeout).`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};var U,W,Y,Z,aa;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px">
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-layers bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Missões</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-people bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Alunos</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-calendar-x bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Atividades</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-download bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Resultados</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-file-bar-graph bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Relatórios</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-search bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Busca</p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Showcase:</strong> 6 ícones disponíveis para empty states (layers, people, calendar, download, file-bar-graph, search).
    </p>
  \`
}`,...(Y=(W=p.parameters)==null?void 0:W.docs)==null?void 0:Y.source},description:{story:`Story: AllIcons

Grid 3×2 com 6 ícones diferentes (Missões layers, Alunos people, Atividades calendar, 
Resultados download, Relatórios file-bar-graph, Busca search).

Educational context: Showcase de ícones disponíveis para empty states.`,...(aa=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:aa.description}}};const ea=["Default","SemMissoes","SemAlunos","SemResultados","SemAtividades","CompactVariant","PaginaNaoEncontrada","ErroConexao","AllIcons"];export{p as AllIcons,t as CompactVariant,s as Default,c as ErroConexao,r as PaginaNaoEncontrada,o as SemAlunos,i as SemAtividades,e as SemMissoes,n as SemResultados,ea as __namedExportsOrder,sa as default};
