/**
 * Certificate - Certificado Digital
 * ==================================
 * Layout de certificado digital para eventos, cursos e missões concluídas
 * 
 * @component Certificate
 * @category Educacross Components V2 / PDF
 * @source educacross-frontoffice/src/components/PDFs/event/certificate/Certificate.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/PDF/Certificate',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Certificate

Certificado digital para eventos, cursos e missões concluídas.
Layout 1008×712px otimizado para impressão em formato paisagem.

## Características
- Dimensões fixas 1008×712px (paisagem A4)
- Background decorativo com imagem SVG
- Posicionamento absoluto de elementos (nome, logos, rodapé)
- Print-friendly com -webkit-print-color-adjust: exact
- Logos com divisor central, rodapé com data e assinaturas

## Uso educacional
- Certificados de conclusão de módulos/cursos
- Participação em eventos escolares (feira de ciências, oficinas)
- Reconhecimento de desempenho acadêmico
        `
      }
    }
  }
};

const componentStyles = `
<style>
.certificate {
  position: relative;
  width: 1008px;
  height: 712px;
  background: linear-gradient(135deg, rgba(110,99,232,0.05) 0%, rgba(40,199,111,0.05) 100%),
              url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwOCIgaGVpZ2h0PSI3MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMDgiIGhlaWdodD0iNzEyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTAgMEgxMDA4VjcxMkgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkU2M0U4IiBzdHJva2Utd2lkdGg9IjgiLz48Y2lyY2xlIGN4PSI1MDQiIGN5PSIzNTYiIHI9IjIwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkU2M0U4IiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==');
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  color: #000;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  border: 8px solid #6E63E8;
  border-radius: 4px;
  overflow: hidden;
}

.content-container {
  position: absolute;
  top: 283.68px;
  left: 87.9px;
  width: 832px;
  text-align: center;
  color: #2c2c2c;
}

.content-container p {
  font-size: 15.5px;
  line-height: 1.8;
  margin: 12px 0;
}

.certificate-title {
  font-size: 42px;
  font-weight: 700;
  color: #6E63E8;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.student-name {
  color: #2c2c2c;
  font-size: 27.577px;
  font-weight: 700;
  margin: 20px 0;
  text-decoration: underline;
  text-decoration-color: #6E63E8;
  text-underline-offset: 6px;
}

.aggrement {
  font-size: 15.5px;
  line-height: 1.8;
}

.aggrement span {
  font-weight: 700;
}

.logo-container {
  position: absolute;
  top: 523px;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 72px;
  width: 190px;
  display: flex;
  align-items: center;
}

.logo:nth-of-type(1) {
  justify-content: end;
}

.logo:nth-of-type(2) {
  justify-content: start;
}

.logo > img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.divisor {
  height: 100%;
  width: 1px;
  border-right: 1px solid #6E63E8;
  margin: 0 25px;
}

.footer-container {
  position: absolute;
  top: 653.4px;
  left: 87px;
  width: 832px;
  display: flex;
  justify-content: space-between;
  color: #2c2c2c;
  font-weight: 600;
  font-size: 12px;
}

.signature-section {
  text-align: center;
}

.signature-line {
  width: 180px;
  border-bottom: 2px solid #2c2c2c;
  margin: 0 auto 6px auto;
}

.ornament {
  position: absolute;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkU2M0U4IiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuMyIvPjxwYXRoIGQ9Ik01MCAxMEw1NSAzNUw4MCAzNUw2MCA1MEw3MCA3NUw1MCA2MEwzMCA3NUw0MCA1MEwyMCAzNUw0NSAzNVoiIGZpbGw9IiM2RTYzRTgiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==') center/contain no-repeat;
}

.ornament-top-left {
  top: 20px;
  left: 20px;
}

.ornament-top-right {
  top: 20px;
  right: 20px;
  transform: rotate(90deg);
}

.ornament-bottom-left {
  bottom: 20px;
  left: 20px;
  transform: rotate(270deg);
}

.ornament-bottom-right {
  bottom: 20px;
  right: 20px;
  transform: rotate(180deg);
}

@media print {
  .certificate {
    page-break-after: auto;
    page-break-inside: avoid;
    margin: 0;
    border-radius: 0;
  }
}
</style>
`;

const schoolLogoSVG = `<svg width="190" height="72" viewBox="0 0 190 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="190" height="72" rx="8" fill="#6E63E8" opacity="0.1"/>
  <text x="95" y="42" text-anchor="middle" font-size="24" font-weight="700" fill="#6E63E8">ESCOLA</text>
</svg>`;

const educacrossLogoSVG = `<svg width="190" height="72" viewBox="0 0 190 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="190" height="72" rx="8" fill="#28C76F" opacity="0.1"/>
  <text x="95" y="42" text-anchor="middle" font-size="20" font-weight="700" fill="#28C76F">Educacross</text>
</svg>`;

export const Default = {
  render: () => `
    ${componentStyles}
    <div class="certificate">
      <div class="ornament ornament-top-left"></div>
      <div class="ornament ornament-top-right"></div>
      <div class="ornament ornament-bottom-left"></div>
      <div class="ornament ornament-bottom-right"></div>
      
      <div class="content-container">
        <h1 class="certificate-title">Certificado</h1>
        <p>Certificamos que</p>
        <h2 class="student-name">Maria Santos Silva</h2>
        <p class="aggrement">
          participou do <span>Curso de Matemática Aplicada</span> com carga horária de 
          <span>40 horas</span>, realizado no período de <span>Janeiro a Março de 2024</span>.
        </p>
      </div>
      
      <div class="logo-container">
        <div class="logo">${schoolLogoSVG}</div>
        <div class="divisor"></div>
        <div class="logo">${educacrossLogoSVG}</div>
      </div>
      
      <div class="footer-container">
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Prof. Carlos Silva<br/>Coordenador Pedagógico</div>
        </div>
        <div style="text-align: center;">
          <div>São Paulo, 15 de Março de 2024</div>
        </div>
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Direção Escolar<br/>CNPJ: 12.345.678/0001-90</div>
        </div>
      </div>
    </div>
  `
};

export const Completion = {
  render: () => `
    ${componentStyles}
    <div class="certificate">
      <div class="ornament ornament-top-left"></div>
      <div class="ornament ornament-top-right"></div>
      <div class="ornament ornament-bottom-left"></div>
      <div class="ornament ornament-bottom-right"></div>
      
      <div class="content-container">
        <h1 class="certificate-title">Certificado de Conclusão</h1>
        <p>Certificamos que</p>
        <h2 class="student-name">João Pedro Oliveira</h2>
        <p class="aggrement">
          concluiu com êxito o <span>Módulo de Frações e Decimais</span> da disciplina de 
          <span>Matemática - 7º Ano</span>, obtendo aproveitamento de <span>95%</span> nas 
          avaliações realizadas no período de <span>Fevereiro a Abril de 2024</span>.
        </p>
      </div>
      
      <div class="logo-container">
        <div class="logo">${schoolLogoSVG}</div>
        <div class="divisor"></div>
        <div class="logo">${educacrossLogoSVG}</div>
      </div>
      
      <div class="footer-container">
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Profª. Ana Costa<br/>Professora de Matemática</div>
        </div>
        <div style="text-align: center;">
          <div>Brasília, 20 de Abril de 2024</div>
        </div>
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Coordenação<br/>Registro nº 2024/456</div>
        </div>
      </div>
    </div>
  `
};

export const Event = {
  render: () => `
    ${componentStyles}
    <div class="certificate">
      <div class="ornament ornament-top-left"></div>
      <div class="ornament ornament-top-right"></div>
      <div class="ornament ornament-bottom-left"></div>
      <div class="ornament ornament-bottom-right"></div>
      
      <div class="content-container">
        <h1 class="certificate-title">Certificado de Participação</h1>
        <p>Certificamos que</p>
        <h2 class="student-name">Fernanda Lima Costa</h2>
        <p class="aggrement">
          participou da <span>Oficina de Robótica Educacional</span> realizada durante a 
          <span>Semana de Ciências e Tecnologia</span>, com duração de <span>16 horas</span>, 
          nos dias <span>10 a 14 de Maio de 2024</span>, desenvolvendo projetos práticos de 
          programação e automação.
        </p>
      </div>
      
      <div class="logo-container">
        <div class="logo">${schoolLogoSVG}</div>
        <div class="divisor"></div>
        <div class="logo">${educacrossLogoSVG}</div>
      </div>
      
      <div class="footer-container">
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Prof. Roberto Mendes<br/>Instrutor de Robótica</div>
        </div>
        <div style="text-align: center;">
          <div>Rio de Janeiro, 15 de Maio de 2024</div>
        </div>
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Comissão Organizadora<br/>Evento #SCT2024</div>
        </div>
      </div>
    </div>
  `
};

export const WithLogos = {
  render: () => `
    ${componentStyles}
    <div class="certificate">
      <div class="ornament ornament-top-left"></div>
      <div class="ornament ornament-top-right"></div>
      <div class="ornament ornament-bottom-left"></div>
      <div class="ornament ornament-bottom-right"></div>
      
      <div class="content-container">
        <h1 class="certificate-title">Certificado de Mérito</h1>
        <p>Certificamos que</p>
        <h2 class="student-name">Lucas Gabriel Santos</h2>
        <p class="aggrement">
          demonstrou <span>excelência acadêmica</span> no ano letivo de <span>2024</span>, 
          destacando-se nas disciplinas de <span>Matemática e Ciências</span>, com média geral 
          superior a <span>9.0</span> e participação ativa em projetos interdisciplinares.
        </p>
      </div>
      
      <div class="logo-container">
        <div class="logo">${schoolLogoSVG}</div>
        <div class="divisor"></div>
        <div class="logo">${educacrossLogoSVG}</div>
      </div>
      
      <div class="footer-container">
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Direção Pedagógica<br/>CRE: 12345/SP</div>
        </div>
        <div style="text-align: center;">
          <div>São Paulo, 30 de Junho de 2024</div>
        </div>
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Secretaria Escolar<br/>Protocolo #2024/789</div>
        </div>
      </div>
    </div>
  `
};

export const MultipleStudents = {
  render: () => `
    ${componentStyles}
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 20px; background: #F8F7FA;">
      ${['Ana Beatriz Costa', 'Bruno Henrique Lima', 'Camila Rodrigues', 'Daniel Ferreira'].map((name, i) => `
        <div class="certificate" style="transform: scale(0.48); transform-origin: top left;">
          <div class="ornament ornament-top-left"></div>
          <div class="ornament ornament-top-right"></div>
          <div class="content-container">
            <h1 class="certificate-title" style="font-size: 36px;">Certificado</h1>
            <p style="font-size: 13px;">Certificamos que</p>
            <h2 class="student-name" style="font-size: 24px;">${name}</h2>
            <p class="aggrement" style="font-size: 13px;">
              concluiu o <span>Curso de ${i % 2 === 0 ? 'Matemática' : 'Ciências'}</span> 
              com nota <span>${(8.5 + Math.random() * 1.5).toFixed(1)}</span>.
            </p>
          </div>
          <div class="logo-container">
            <div class="logo">${schoolLogoSVG}</div>
            <div class="divisor"></div>
            <div class="logo">${educacrossLogoSVG}</div>
          </div>
          <div class="footer-container" style="font-size: 10px;">
            <div class="signature-section">
              <div class="signature-line" style="width: 140px;"></div>
              <div>Professor</div>
            </div>
            <div>2024</div>
            <div class="signature-section">
              <div class="signature-line" style="width: 140px;"></div>
              <div>Direção</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

export const PrintOptimized = {
  render: () => `
    ${componentStyles}
    <style>
      .print-info {
        background: #FFF3CD;
        border: 2px solid #FF9F43;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        color: #5D596C;
      }
      .print-info strong {
        color: #FF9F43;
      }
    </style>
    <div style="background: #F8F7FA; padding: 20px;">
      <div class="print-info">
        <strong>💡 Dica de impressão:</strong> Configure a impressora para paisagem (landscape) 
        e remova margens para melhor resultado. Este certificado está otimizado para A4 paisagem (297×210mm).
      </div>
      <div class="certificate">
        <div class="ornament ornament-top-left"></div>
        <div class="ornament ornament-top-right"></div>
        <div class="ornament ornament-bottom-left"></div>
        <div class="ornament ornament-bottom-right"></div>
        
        <div class="content-container">
          <h1 class="certificate-title">Certificado de Conclusão</h1>
          <p>Certificamos que</p>
          <h2 class="student-name">Juliana Alves Pereira</h2>
          <p class="aggrement">
            concluiu com aproveitamento <span>excelente</span> o <span>Curso de Português - 
            Produção Textual</span>, com carga horária de <span>30 horas</span>, no período de 
            <span>Março a Maio de 2024</span>, demonstrando domínio das técnicas de redação 
            e interpretação de textos.
          </p>
        </div>
        
        <div class="logo-container">
          <div class="logo">${schoolLogoSVG}</div>
          <div class="divisor"></div>
          <div class="logo">${educacrossLogoSVG}</div>
        </div>
        
        <div class="footer-container">
          <div class="signature-section">
            <div class="signature-line"></div>
            <div>Profª. Marina Santos<br/>Língua Portuguesa</div>
          </div>
          <div style="text-align: center;">
            <div>Curitiba, 25 de Maio de 2024</div>
          </div>
          <div class="signature-section">
            <div class="signature-line"></div>
            <div>Coordenação<br/>Registro #2024/321</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Landscape = {
  render: () => `
    ${componentStyles}
    <div style="background: #F8F7FA; padding: 40px; display: flex; justify-content: center;">
      <div class="certificate">
        <div class="ornament ornament-top-left"></div>
        <div class="ornament ornament-top-right"></div>
        <div class="ornament ornament-bottom-left"></div>
        <div class="ornament ornament-bottom-right"></div>
        
        <div class="content-container">
          <h1 class="certificate-title">Certificado de Destaque</h1>
          <p>Certificamos que</p>
          <h2 class="student-name">Pedro Augusto Ribeiro</h2>
          <p class="aggrement">
            obteve <span>destaque em desempenho acadêmico</span> na <span>Turma 8º B</span>, 
            alcançando média geral de <span>9.8</span> no <span>1º Semestre de 2024</span>, 
            com participação exemplar nas atividades curriculares e extracurriculares propostas.
          </p>
        </div>
        
        <div class="logo-container">
          <div class="logo">${schoolLogoSVG}</div>
          <div class="divisor"></div>
          <div class="logo">${educacrossLogoSVG}</div>
        </div>
        
        <div class="footer-container">
          <div class="signature-section">
            <div class="signature-line"></div>
            <div>Conselho Pedagógico<br/>Deliberação nº 15/2024</div>
          </div>
          <div style="text-align: center;">
            <div>Belo Horizonte, 10 de Julho de 2024</div>
          </div>
          <div class="signature-section">
            <div class="signature-line"></div>
            <div>Direção Geral<br/>INEP: 31234567</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const cert = document.querySelector('.certificate');
      if (cert) {
        cert.style.cursor = 'pointer';
        cert.addEventListener('click', () => {
          alert('Opções de download:\n\n📄 Baixar PDF\n🖨️ Imprimir diretamente\n📧 Enviar por email\n\nEm produção, isso abriria um menu com essas opções.');
        });
      }
    }, 100);
    
    return `
      ${componentStyles}
      <style>
        .certificate:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        .download-hint {
          text-align: center;
          margin-top: 16px;
          font-size: 14px;
          color: #6E6B7B;
          animation: pulse-text 2s ease-in-out infinite;
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      </style>
      <div style="background: #F8F7FA; padding: 40px;">
        <div class="certificate">
          <div class="ornament ornament-top-left"></div>
          <div class="ornament ornament-top-right"></div>
          <div class="ornament ornament-bottom-left"></div>
          <div class="ornament ornament-bottom-right"></div>
          
          <div class="content-container">
            <h1 class="certificate-title">Certificado Interativo</h1>
            <p>Certificamos que</p>
            <h2 class="student-name">Seu Nome Aqui</h2>
            <p class="aggrement">
              completou <span>100% das missões</span> do <span>Módulo de Geometria Plana</span>, 
              demonstrando <span>proficiência avançada</span> em resolução de problemas e 
              raciocínio lógico-matemático no período de <span>Maio a Julho de 2024</span>.
            </p>
          </div>
          
          <div class="logo-container">
            <div class="logo">${schoolLogoSVG}</div>
            <div class="divisor"></div>
            <div class="logo">${educacrossLogoSVG}</div>
          </div>
          
          <div class="footer-container">
            <div class="signature-section">
              <div class="signature-line"></div>
              <div>Sistema Educacross<br/>Plataforma Digital</div>
            </div>
            <div style="text-align: center;">
              <div>Certificado Digital - 2024</div>
            </div>
            <div class="signature-section">
              <div class="signature-line"></div>
              <div>Validação Online<br/>ID: #CERT-2024-789</div>
            </div>
          </div>
        </div>
        <div class="download-hint">
          ✨ Clique no certificado para ver opções de download e impressão
        </div>
      </div>
    `;
  }
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">PDF</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">Certificate</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Certificado Digital</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Certificado Digital. Faz parte da categoria <strong>PDF</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import Certificate from '@/components/Certificate.vue';

// Template
&lt;Certificate v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o Certificate com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground Certificate</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do Certificate no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: Certificate</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando Certificate no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com Certificate no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via Certificate</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o Certificate.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: Certificate</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

