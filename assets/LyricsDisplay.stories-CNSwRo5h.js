const o={title:"Educacross V2/LyricsDisplay",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## LyricsDisplay

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **toggle-fullscreen**
        `}}}},t=`

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}


.lyrics-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(42, 42, 42, 0.8) 100%);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .lyrics-wrapper {
    transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
    flex: 1;
  }

  .lyric-line {
    text-align: left;
    margin: 1.2rem 0;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-weight: 500;
    line-height: 1.4;
    /* Responsive font size */
    font-size: clamp(1rem, 3.5vw, 1rem);
    color: rgba(255, 255, 255, 0.5);
    user-select: none;
    position: relative;
  }

  .lyric-line:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: translateX(4px);
  }

  .lyric-line.upcoming {
    color: rgba(150, 150, 150, 0.6);
    font-weight: 400;
    opacity: 0.7;
  }

  .lyric-line.passed {
    color: rgba(120, 120, 120, 0.5);
    font-weight: 400;
    opacity: 0.6;
    text-decoration-color: rgba(120, 120, 120, 0.3);
  }

  .lyric-line.active {
    color: #ffffff;
    font-weight: 700;
    font-size: clamp(1.1rem, 4vw, 1rem);
    margin: 0 0 1.5rem 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .lyric-line.active:hover {
    transform: scale(1.02) translateX(4px);
  }

  /* Controls overlay */
  .lyrics-controls {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
    align-items: center;
  }

  .control-btn {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 20px;
    padding: 0;
  }

  .control-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .control-btn span {
    font-size: 1.2rem;
  }

  /* Fullscreen styles */
  .fullscreen-lyrics {
    background: transparent;
    padding: 3rem;
    min-height: auto;
    height: 100%;
    justify-content: flex-start;
    box-shadow: none;
    overflow: hidden;
    position: relative;
  }

  .fullscreen-lyrics .lyrics-wrapper {
    padding: 3rem 0;
    transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .fullscreen-lyrics .lyric-line {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.5;
    margin: 2rem 0;
    color: rgba(255, 255, 255, 0.6);
  }

  .fullscreen-lyrics .lyric-line.upcoming {
    color: rgba(150, 150, 150, 0.5);
    opacity: 0.7;
  }

  .fullscreen-lyrics .lyric-line.passed {
    color: rgba(120, 120, 120, 0.4);
    opacity: 0.6;
    text-decoration-color: rgba(120, 120, 120, 0.3);
  }

  .fullscreen-lyrics .lyric-line.active {
    font-size: clamp(1.8rem, 6vw, 3rem);
    color: #ffffff;
    margin: 2.5rem 0;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 2px 20px rgba(0, 0, 0, 0.8);
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .lyrics-container {
      padding: 1rem;
      border-radius: 8px;
    }

    .lyrics-wrapper {
      padding: 1rem 0;
    }

    .lyric-line {
      margin: 0.8rem 0;
      font-size: clamp(0.9rem, 4vw, 1.4rem);
    }

    .lyric-line.active {
      font-size: clamp(1rem, 5vw, 1.6rem);
      margin: 1rem 0;
    }

    .lyrics-controls {
      bottom: 10px;
      right: 10px;
    }

    .control-btn {
      width: 35px;
      height: 35px;
    }
  }

  @media (max-width: 480px) {
    .lyrics-container {
      padding: 0.75rem;
    }

    .lyrics-wrapper {
      padding: 0.5rem 0;
    }

    .lyric-line {
      margin: 0.6rem 0;
    }

    .lyric-line.active {
      margin: 0.8rem 0;
    }
  }

  /* Scroll indicator */
  .lyrics-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, rgba(30, 30, 30, 0.8) 0%, transparent 100%);
    pointer-events: none;
    z-index: 5;
  }

  .lyrics-container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(0deg, rgba(30, 30, 30, 0.8) 0%, transparent 100%);
    pointer-events: none;
    z-index: 5;
  }

  .fullscreen-lyrics::before,
  .fullscreen-lyrics::after {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  }

  .fullscreen-lyrics::after {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  }

  /* Smooth upward animation for active lyrics */
  @keyframes activateUp {
    0% {
      transform: translateY(15px);
      opacity: 0.7;
      filter: blur(1px);
    }
    50% {
      transform: translateY(-5px);
      opacity: 0.9;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
      filter: blur(0);
    }
  }

  /* Enhanced animation for fullscreen mode */
  .fullscreen-lyrics .lyric-line.active {
    animation: activateUpFullscreen 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* Add padding for smooth scrolling */
  .lyrics-padding {
    height: 50vh;
    width: 100%;
    flex-shrink: 0;
  }

  .fullscreen-padding {
    height: 60vh;
  }

  @keyframes activateUpFullscreen {
    0% {
      transform: translateY(25px) scale(0.95);
      opacity: 0.6;
      filter: blur(2px);
    }
    60% {
      transform: translateY(-8px) scale(1.02);
      opacity: 0.9;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }
`,n=`
<div
    class="lyrics-container"
    class=""
  >
    <div class="lyrics-wrapper" style="">
      <div
        class="lyric-line"
        class=""
      ></div>

      <!-- Extra padding for smooth scrolling -->
      <div class="lyrics-padding" class=""></div>
    </div>

    <!-- Spotify-style controls overlay -->
    <div class="lyrics-controls">
      <b-button
        variant="link"
        class="control-btn fullscreen-btn"
      >
        <span class="material-symbols-outlined">pan_zoom</span>
      </b-button>
    </div>
  </div>
`,e={render:()=>`
    <style>${t}</style>
    ${n}
  `};var r,i,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,o as default};
