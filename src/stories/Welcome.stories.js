export default {
  title: '📚 Getting Started/Welcome',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
};

export const Welcome = () => {
  return `
    <div style="
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem 2rem;
      font-family: 'Public Sans', sans-serif;
      color: #6E6B7B;
    ">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <div style="
          display: inline-block;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #7367f0 0%, #9055fd 100%);
          border-radius: 12px;
          margin-bottom: 2rem;
        ">
          <h1 style="
            margin: 0;
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
          ">Educacross Design System</h1>
        </div>
        <p style="
          font-size: 1.25rem;
          color: #B9B9C3;
          margin: 0;
        ">Powered by Vuexy Theme</p>
      </div>

      <!-- Description -->
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(115, 103, 240, 0.1);
        margin-bottom: 2rem;
      ">
        <h2 style="
          color: #5E5873;
          font-size: 1.5rem;
          margin-top: 0;
          margin-bottom: 1rem;
        ">Bem-vindo ao nosso Design System</h2>
        <p style="line-height: 1.6; margin-bottom: 1rem;">
          Esta biblioteca de componentes foi desenvolvida com base no tema <strong>Vuexy</strong>, 
          oferecendo uma coleção completa de elementos de UI prontos para uso em projetos web.
        </p>
        <p style="line-height: 1.6; margin: 0;">
          Todos os componentes seguem as melhores práticas de acessibilidade, 
          responsividade e padrões de código modernos.
        </p>
      </div>

      <!-- Quick Links -->
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      ">
        <div style="
          background: linear-gradient(135deg, #7367f0 0%, #9055fd 100%);
          padding: 1.5rem;
          border-radius: 12px;
          color: white;
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          ">🎨</div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem;">Foundations</h3>
          <p style="margin: 0; opacity: 0.9; font-size: 0.875rem;">
            Cores, tipografia, ícones e imagens
          </p>
        </div>

        <div style="
          background: linear-gradient(135deg, #00bad1 0%, #00d4bd 100%);
          padding: 1.5rem;
          border-radius: 12px;
          color: white;
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          ">🧩</div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem;">Components</h3>
          <p style="margin: 0; opacity: 0.9; font-size: 0.875rem;">
            70+ componentes organizados e prontos
          </p>
        </div>

        <div style="
          background: linear-gradient(135deg, #28c76f 0%, #48da89 100%);
          padding: 1.5rem;
          border-radius: 12px;
          color: white;
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          ">📖</div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem;">Interactive</h3>
          <p style="margin: 0; opacity: 0.9; font-size: 0.875rem;">
            Stories interativas com controles ao vivo
          </p>
        </div>
      </div>

      <!-- Features -->
      <div style="
        background: #F8F8F8;
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
      ">
        <h2 style="
          color: #5E5873;
          font-size: 1.25rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
        ">✨ Principais Recursos</h2>
        <ul style="
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.75rem;
        ">
          <li style="display: flex; align-items: center;">
            <span style="
              color: #7367f0;
              margin-right: 0.75rem;
              font-weight: bold;
            ">✓</span>
            <span>4 bibliotecas de ícones (8000+ ícones)</span>
          </li>
          <li style="display: flex; align-items: center;">
            <span style="
              color: #7367f0;
              margin-right: 0.75rem;
              font-weight: bold;
            ">✓</span>
            <span>Sistema de placeholders SVG inline (zero dependências)</span>
          </li>
          <li style="display: flex; align-items: center;">
            <span style="
              color: #7367f0;
              margin-right: 0.75rem;
              font-weight: bold;
            ">✓</span>
            <span>Atomic Design: Atoms → Molecules → Organisms → Templates</span>
          </li>
          <li style="display: flex; align-items: center;">
            <span style="
              color: #7367f0;
              margin-right: 0.75rem;
              font-weight: bold;
            ">✓</span>
            <span>Responsivo e acessível (WCAG 2.1)</span>
          </li>
          <li style="display: flex; align-items: center;">
            <span style="
              color: #7367f0;
              margin-right: 0.75rem;
              font-weight: bold;
            ">✓</span>
            <span>Bootstrap 5.3 + jQuery 3.7</span>
          </li>
        </ul>
      </div>

      <!-- Getting Started -->
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(115, 103, 240, 0.1);
      ">
        <h2 style="
          color: #5E5873;
          font-size: 1.25rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
        ">🚀 Como Começar</h2>
        <ol style="
          line-height: 1.8;
          padding-left: 1.5rem;
          margin: 0;
        ">
          <li>Navegue pelo menu lateral para explorar componentes</li>
          <li>Use a aba <strong>Canvas</strong> para ver o componente renderizado</li>
          <li>Use a aba <strong>Controls</strong> para testar interativamente</li>
          <li>Copie o código HTML da seção <strong>Show code</strong></li>
          <li>Integre no seu projeto com os assets do Vuexy</li>
        </ol>
      </div>

      <!-- Footer -->
      <div style="
        text-align: center;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #E7E7E7;
      ">
        <p style="
          color: #B9B9C3;
          font-size: 0.875rem;
          margin: 0;
        ">
          Desenvolvido com ❤️ pela equipe Educacross<br>
          <a href="https://educacross.com" style="
            color: #7367f0;
            text-decoration: none;
            font-weight: 600;
          ">educacross.com</a>
        </p>
      </div>
    </div>
  `;
};

Welcome.parameters = {
  docs: {
    description: {
      story: 'Página inicial do Design System Educacross baseado no tema Vuexy.',
    },
  },
};
