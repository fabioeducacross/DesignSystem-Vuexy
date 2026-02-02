const n={title:"Educacross V2/AlbumCover",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## AlbumCover

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
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


.album-cover-container {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
}

.fullscreen-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Regular album cover styles */
.mb-50 {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
}

@media (max-width: 768px) {
  .fullscreen-image-container {
    max-height: 30vh;
  }
}

@media (max-width: 480px) {
  .fullscreen-image {
    max-height: 25vh;
  }
}
`,s=`
<div class="">
    <b-img src="@/assets/images/educateca/Img.svg" fluid class="" />
  </div>
`,e={render:()=>`
    <style>${t}</style>
    ${s}
  `};var a,r,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,n as default};
