typeof window<"u"&&["/vuexy/css/core.css","/vuexy/fonts/bootstrap-icons.css","/vuexy/fonts/iconify-icons.css"].forEach(t=>{const e=document.createElement("link");e.rel="stylesheet",e.href=t,document.head.appendChild(e)});const c={parameters:{controls:{matchers:{color:/(background|color)$/i,date:/Date$/i},expanded:!0,sort:"requiredFirst"},backgrounds:{default:"light",values:[{name:"light",value:"#F8F8F8"},{name:"white",value:"#FFFFFF"},{name:"dark",value:"#2F2B3D"},{name:"primary",value:"#7367f0"}]},docs:{source:{type:"code",language:"html",format:!0,excludeDecorators:!0},canvas:{sourceState:"shown"}},layout:"padded",viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}},tablet:{name:"Tablet",styles:{width:"768px",height:"1024px"}},desktop:{name:"Desktop",styles:{width:"1440px",height:"900px"}}}},options:{storySort:{order:["Getting Started","MCP Setup Guide","Foundations",["Colors","Typography","Icons","Images","Spacing"],"Atoms","Molecules","Organisms","Templates","Pages","*"]}}},decorators:[(o,t)=>{const e=document.createElement("div");if(t.title.includes("Templates")||t.title.includes("Pages")||t.name==="Interactive"||t.name==="Documentation"||t.viewMode==="docs"){const n=o();if(typeof n=="string"){const r=document.createElement("div");return r.innerHTML=n,r.querySelector(".doc-page")&&setTimeout(()=>{var i;(i=document.body)==null||i.classList.add("sb-doc-page-active")},0),r}return n}e.style.cssText=`
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        background-color: #FAFAFA;
        border-radius: 8px;
      `,e.className="storybook-component-wrapper";const s=document.createElement("div");s.style.cssText=`
        width: 100%;
        max-width: 1200px;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      `;const a=o();return typeof a=="string"?s.innerHTML=a:s.appendChild(a),e.appendChild(s),e}]};export{c as default};
