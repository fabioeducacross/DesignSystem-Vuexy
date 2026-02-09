import{c as T,a as F,b as d,d as V}from"./docTemplate-RKjNfURf.js";const q={title:"Educacross Components V2/Modals/AcceptOrRejectAccess",parameters:{layout:"fullscreen",previewTabs:{canvas:{hidden:!0}},viewMode:"docs",docs:{story:{inline:!0,iframeHeight:0},canvas:{sourceState:"none"}},controls:{disable:!0},actions:{disable:!0},toolbar:{zoom:{hidden:!0},eject:{hidden:!0},copy:{hidden:!0}}}},a={render:()=>T({title:"AcceptOrRejectAccess",subtitle:"Modal de decisão para aceitar ou recusar convites de perfil institucional (Professor, Coordenador, Diretor, Gestor de Redes) com validação de termos de uso",badge:"Front-office / Modals",badgeIcon:"door_open",showStats:!0,stats:{Fluxos:"2",Estados:"5",Perfis:"4+",Validação:"✓"},colors:{primary:"#7367f0",secondary:"#9e95f5"},content:`
      ${F({title:"Contexto de Uso",icon:"info",steps:["Usuário acessa o painel de gerenciamento de conta (ManageAccountPage)","Sistema exibe lista de convites pendentes para diferentes perfis institucionais",'Usuário clica em "Aceitar" ou "Recusar" em um convite específico',"Modal AcceptOrRejectAccess é exibido com o fluxo correspondente","Após confirmação, convite é processado e removido da lista de pendentes"]})}

      ${d({title:"Fluxo de Recusa",description:"Modal para recusar convite de perfil institucional",showTitle:!1,wrapPreview:!1,preview:`
          ${e}
          <div class="modal-container">
            <span class="warning-icon">error</span>
            <h1 class="modal-title">
              Deseja <span class="text-danger">recusar</span> esse perfil?
            </h1>
            <div class="profile-info">
              <p>Perfil: <span class="text-primary">Professor</span></p>
              <p>Escola: <span class="text-primary">Escola Devs</span></p>
            </div>
            <div class="actions-container">
              <button class="btn btn-outline-danger">Cancelar</button>
              <button class="btn btn-danger">Recusar perfil</button>
            </div>
          </div>
        `,codes:{html:`<!-- HTML/Vanilla -->
<div class="modal-container">
  <span class="warning-icon">error</span>
  <h1 class="modal-title">
    Deseja <span class="text-danger">recusar</span> esse perfil?
  </h1>
  <div class="profile-info">
    <p>Perfil: <span class="text-primary">Professor</span></p>
    <p>Escola: <span class="text-primary">Escola Devs</span></p>
  </div>
  <div class="actions-container">
    <button class="btn btn-outline-danger" onclick="onCancel()">Cancelar</button>
    <button class="btn btn-danger" onclick="onReject()">Recusar perfil</button>
  </div>
</div>`,vue2:`<!-- Vue 2 -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-danger">recusar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="$emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-danger" @click="$emit('reject')" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Recusar perfil</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profileType: { type: String, required: true },
    schoolName: { type: String, required: true },
    loading: { type: Boolean, default: false }
  }
};
<\/script>`,vue3:`<!-- Vue 3 (Composition API) -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-danger">recusar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-danger" @click="emit('reject')" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Recusar perfil</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profileType: { type: String, required: true },
  schoolName: { type: String, required: true },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['cancel', 'reject']);
<\/script>`,react:`// React
import { useState } from 'react';

export default function RejectAccess({ profileType, schoolName, onReject, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    setLoading(true);
    try {
      await onReject();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-container">
      <span className="warning-icon">error</span>
      <h1 className="modal-title">
        Deseja <span className="text-danger">recusar</span> esse perfil?
      </h1>
      <div className="profile-info">
        <p>Perfil: <span className="text-primary">{profileType}</span></p>
        <p>Escola: <span className="text-primary">{schoolName}</span></p>
      </div>
      <div className="actions-container">
        <button className="btn btn-outline-danger" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
        <button className="btn btn-danger" onClick={handleReject} disabled={loading}>
          {loading && <span className="spinner"></span>}
          <span style={{ opacity: loading ? 0 : 1 }}>Recusar perfil</span>
        </button>
      </div>
    </div>
  );
}`}})}

      ${d({title:"Fluxo de Aceitação",description:"Modal para aceitar convite com validação de termos obrigatória",showTitle:!1,wrapPreview:!1,preview:`
          ${e}
          <div class="modal-container">
            <span class="warning-icon">error</span>
            <h1 class="modal-title">
              Deseja <span class="text-success">aceitar</span> esse perfil?
            </h1>
            <div class="profile-info">
              <p>Perfil: <span class="text-primary">Coordenador</span></p>
              <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
            </div>
            <div class="terms-container">
              <div class="custom-checkbox">
                <input type="checkbox" id="demo-terms" checked>
                <label for="demo-terms">
                  Declaro que li e aceito os 
                  <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
                  e
                  <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
                </label>
              </div>
            </div>
            <div class="actions-container">
              <button class="btn btn-outline-danger">Cancelar</button>
              <button class="btn btn-primary">Vincular perfil</button>
            </div>
          </div>
        `,codes:{html:`<!-- HTML/Vanilla -->
<div class="modal-container">
  <span class="warning-icon">error</span>
  <h1 class="modal-title">
    Deseja <span class="text-success">aceitar</span> esse perfil?
  </h1>
  <div class="profile-info">
    <p>Perfil: <span class="text-primary">Coordenador</span></p>
    <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
  </div>
  <div class="terms-container">
    <div class="custom-checkbox">
      <input type="checkbox" id="terms" onchange="toggleSubmit(this.checked)">
      <label for="terms">
        Declaro que li e aceito os 
        <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
        e
        <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
      </label>
    </div>
  </div>
  <div class="actions-container">
    <button class="btn btn-outline-danger" onclick="onCancel()">Cancelar</button>
    <button class="btn btn-primary" id="submit-btn" disabled onclick="onAccept()">Vincular perfil</button>
  </div>
</div>

<script>
function toggleSubmit(checked) {
  document.getElementById('submit-btn').disabled = !checked;
}
<\/script>`,vue2:`<!-- Vue 2 -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-success">aceitar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="terms-container">
      <div class="custom-checkbox">
        <input type="checkbox" id="terms" v-model="termsAccepted" :disabled="loading">
        <label for="terms">
          Declaro que li e aceito os 
          <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
          e
          <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
        </label>
      </div>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="$emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-primary" @click="$emit('accept')" :disabled="!termsAccepted || loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Vincular perfil</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profileType: { type: String, required: true },
    schoolName: { type: String, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      termsAccepted: false
    };
  }
};
<\/script>`,vue3:`<!-- Vue 3 (Composition API) -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-success">aceitar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="terms-container">
      <div class="custom-checkbox">
        <input type="checkbox" id="terms" v-model="termsAccepted" :disabled="loading">
        <label for="terms">
          Declaro que li e aceito os 
          <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
          e
          <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
        </label>
      </div>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-primary" @click="emit('accept')" :disabled="!termsAccepted || loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Vincular perfil</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  profileType: { type: String, required: true },
  schoolName: { type: String, required: true },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['cancel', 'accept']);
const termsAccepted = ref(false);
<\/script>`,react:`// React
import { useState } from 'react';

export default function AcceptAccess({ profileType, schoolName, onAccept, onCancel }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!termsAccepted) return;
    setLoading(true);
    try {
      await onAccept();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-container">
      <span className="warning-icon">error</span>
      <h1 className="modal-title">
        Deseja <span className="text-success">aceitar</span> esse perfil?
      </h1>
      <div className="profile-info">
        <p>Perfil: <span className="text-primary">{profileType}</span></p>
        <p>Escola: <span className="text-primary">{schoolName}</span></p>
      </div>
      <div className="terms-container">
        <div className="custom-checkbox">
          <input 
            type="checkbox" 
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="terms">
            Declaro que li e aceito os{' '}
            <a href="https://educacross.com.br/termos-de-uso/" target="_blank" rel="noreferrer">
              termos de uso
            </a>
            {' '}e{' '}
            <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank" rel="noreferrer">
              política de privacidade
            </a>
          </label>
        </div>
      </div>
      <div className="actions-container">
        <button className="btn btn-outline-danger" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleAccept} disabled={!termsAccepted || loading}>
          {loading && <span className="spinner"></span>}
          <span style={{ opacity: loading ? 0 : 1 }}>Vincular perfil</span>
        </button>
      </div>
    </div>
  );
}`}})}

      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">check_circle</span>
          <span>Estados do Componente</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 20px;">
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #EA5455;">
            <strong style="color: #EA5455;">Recusa Inicial</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Modal com botões ativos para cancelar ou confirmar recusa</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #EA5455;">
            <strong style="color: #EA5455;">Recusa Loading</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Spinner no botão "Recusar perfil" + disabled durante processamento</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28C76F;">
            <strong style="color: #28C76F;">Aceitação Inicial</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Checkbox desmarcado, botão "Vincular perfil" desabilitado</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28C76F;">
            <strong style="color: #28C76F;">Termos Aceitos</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Checkbox marcado, botão "Vincular perfil" habilitado</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28C76F;">
            <strong style="color: #28C76F;">Aceitação Loading</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Spinner no botão "Vincular perfil" + todos os campos disabled</p>
          </div>
        </div>
      </div>

      ${V([{name:"profileType",type:"String",default:"-",description:"Tipo do perfil institucional (Professor, Coordenador, Diretor, Gestor de Redes)"},{name:"schoolName",type:"String",default:"-",description:"Nome da instituição de ensino vinculada ao convite"},{name:"mode",type:"String",default:"accept",description:'Fluxo do modal: "accept" (aceitar) ou "reject" (recusar)'},{name:"loading",type:"Boolean",default:"false",description:"Estado de carregamento durante processamento da ação"},{name:"termsAccepted",type:"Boolean",default:"false",description:"(Fluxo aceitação) Indica se termos foram aceitos para habilitar botão de vincular"},{name:"onAccept",type:"Function",default:"-",description:"Callback executado ao confirmar aceitação do convite"},{name:"onReject",type:"Function",default:"-",description:"Callback executado ao confirmar recusa do convite"},{name:"onCancel",type:"Function",default:"-",description:"Callback executado ao cancelar ação (fechar modal)"}])}
    `,features:[{icon:"swap_horiz",title:"Dual Flow",description:"Dois fluxos distintos (aceitar/recusar) com validações específicas para cada"},{icon:"gavel",title:"Validação de Termos",description:"Checkbox obrigatório no fluxo de aceitação com links para termos e política"},{icon:"school",title:"Multi-perfil",description:"Suporta todos os perfis institucionais (Professor, Coordenador, Diretor, Gestor)"},{icon:"sync",title:"Loading States",description:"Feedback visual com spinner durante processamento das ações"},{icon:"block",title:"Validação de Estado",description:"Botão de vincular desabilitado até aceitar termos de uso"},{icon:"open_in_new",title:"Links Externos",description:"Termos de uso e política de privacidade abrem em nova aba"}],relatedComponents:[{title:"ManageAccountPage",icon:"account_box",description:"Painel de gerenciamento onde os convites são listados",path:"?path=/docs/front-office-templates-manageaccountpage--docs"},{title:"AppNavbar",icon:"menu",description:"Barra de navegação com acesso ao gerenciamento de conta",path:"?path=/docs/front-office-navigation-appnavbar--docs"}]})},e=`<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
  background: #fff;
  border-radius: 0.428rem;
}

.warning-icon {
  font-size: 80px;
  color: #FF9F43;
  font-family: 'Material Symbols Outlined';
  font-weight: 400;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.714rem;
  font-weight: 500;
  color: #5E5873;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.text-danger { color: #EA5455; }
.text-success { color: #28C76F; }

.profile-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-info p {
  margin: 0.25rem 0;
  font-size: 1rem;
  color: #5E5873;
}

.text-primary {
  color: #7367F0;
  font-weight: 700;
}

.actions-container {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  justify-content: center;
}

.btn {
  padding: 0.714rem 1.5rem;
  border-radius: 0.428rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline-danger {
  background: transparent;
  border: 1px solid #EA5455;
  color: #EA5455;
}

.btn-outline-danger:hover:not(:disabled) {
  background: #EA5455;
  color: #fff;
  box-shadow: 0 8px 25px -8px #EA5455;
}

.btn-danger {
  background: #EA5455;
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  background: #D64747;
  box-shadow: 0 8px 25px -8px #EA5455;
}

.btn-primary {
  background: #7367F0;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #5E50EE;
  box-shadow: 0 8px 25px -8px #7367F0;
}

.terms-container {
  margin-bottom: 1.5rem;
  width: 100%;
}

.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}

.custom-checkbox input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #7367F0;
}

.custom-checkbox label {
  font-size: 0.857rem;
  color: #5E5873;
  line-height: 1.5;
  cursor: pointer;
}

.custom-checkbox a {
  color: #7367F0;
  text-decoration: underline;
  font-weight: 700;
}

.custom-checkbox a:hover {
  color: #5E50EE;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Loading state */
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading .spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>`,n={name:"Recusar Perfil",parameters:{docs:{disable:!0}},render:()=>`
    ${e}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-danger">recusar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Professor</span></p>
        <p>Escola: <span class="text-primary">Escola Devs</span></p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">Cancelar</button>
        <button class="btn btn-danger">Recusar perfil</button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Contexto:</strong> Responsável recusando convite de escola para ser Professor.<br>
      <strong>Ação:</strong> Clique em "Recusar perfil" remove o convite da lista permanentemente.
    </p>
  `},s={name:"Recusar Perfil (Loading)",parameters:{docs:{disable:!0}},render:()=>`
    ${e}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-danger">recusar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Professor</span></p>
        <p>Escola: <span class="text-primary">Escola Devs</span></p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger" disabled>Cancelar</button>
        <button class="btn btn-danger" disabled>
          <span class="spinner"></span>
          <span style="opacity: 0;">Recusar perfil</span>
        </button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Processando recusa do convite. Spinner no botão + disabled.
    </p>
  `},t={name:"Aceitar Perfil",parameters:{docs:{disable:!0}},render:()=>(setTimeout(()=>{const c=document.getElementById("accept-terms"),l=document.getElementById("submit-accept");c&&l&&c.addEventListener("change",B=>{l.disabled=!B.target.checked})},100),`
      ${e}
      <div class="modal-container">
        <span class="warning-icon">error</span>
        
        <h1 class="modal-title">
          Deseja <span class="text-success">aceitar</span> esse perfil?
        </h1>
        
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Coordenador</span></p>
          <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
        </div>
        
        <div class="terms-container">
          <div class="custom-checkbox">
            <input type="checkbox" id="accept-terms">
            <label for="accept-terms">
              Declaro que li e aceito os 
              <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
              e
              <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
            </label>
          </div>
        </div>
        
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-primary" id="submit-accept" disabled>Vincular perfil</button>
        </div>
      </div>
      
      <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
        <strong>Contexto:</strong> Responsável aceitando convite para ser Coordenador da escola.<br>
        <strong>Validação:</strong> Botão "Vincular perfil" só ativa após marcar o checkbox.<br>
        <strong>Interação:</strong> Clique no checkbox para habilitar o botão.
      </p>
    `)},o={name:"Aceitar Perfil (Termos Aceitos)",parameters:{docs:{disable:!0}},render:()=>`
    ${e}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-success">aceitar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Coordenador</span></p>
        <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
      </div>
      
      <div class="terms-container">
        <div class="custom-checkbox">
          <input type="checkbox" id="accept-terms-checked" checked>
          <label for="accept-terms-checked">
            Declaro que li e aceito os 
            <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
            e
            <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
          </label>
        </div>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">Cancelar</button>
        <button class="btn btn-primary">Vincular perfil</button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Usuário aceitou os termos. Botão habilitado para vincular perfil.
    </p>
  `},r={name:"Aceitar Perfil (Loading)",parameters:{docs:{disable:!0}},render:()=>`
    ${e}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-success">aceitar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Coordenador</span></p>
        <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
      </div>
      
      <div class="terms-container">
        <div class="custom-checkbox">
          <input type="checkbox" checked disabled>
          <label style="opacity: 0.6;">
            Declaro que li e aceito os 
            <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
            e
            <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
          </label>
        </div>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger" disabled>Cancelar</button>
        <button class="btn btn-primary" disabled>
          <span class="spinner"></span>
          <span style="opacity: 0;">Vincular perfil</span>
        </button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Processando vinculação do perfil. Spinner no botão + todos os campos disabled.
    </p>
  `},i={name:"Todos os Perfis",parameters:{docs:{disable:!0}},render:()=>`
    ${e}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 2rem; padding: 2rem;">
      <!-- Professor - Recusa -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-danger">recusar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Professor</span></p>
          <p>Escola: <span class="text-primary">Escola Devs</span></p>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-danger">Recusar perfil</button>
        </div>
      </div>

      <!-- Coordenador - Aceitação -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-success">aceitar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Coordenador</span></p>
          <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
        </div>
        <div class="terms-container">
          <div class="custom-checkbox">
            <input type="checkbox" checked>
            <label>
              Declaro que li e aceito os 
              <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
              e
              <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
            </label>
          </div>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-primary">Vincular perfil</button>
        </div>
      </div>

      <!-- Diretor - Recusa -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-danger">recusar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Diretor</span></p>
          <p>Escola: <span class="text-primary">Escola Municipal Santos</span></p>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-danger">Recusar perfil</button>
        </div>
      </div>

      <!-- Gestor de Redes - Aceitação -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-success">aceitar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Gestor de Redes</span></p>
          <p>Escola: <span class="text-primary">Rede Educacional ABC</span></p>
        </div>
        <div class="terms-container">
          <div class="custom-checkbox">
            <input type="checkbox" checked>
            <label>
              Declaro que li e aceito os 
              <a href="#">termos de uso</a>
              e
              <a href="#">política de privacidade</a>
            </label>
          </div>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-primary">Vincular perfil</button>
        </div>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Contexto:</strong> Diferentes perfis institucionais (Professor, Coordenador, Diretor, Gestor de Redes).<br>
      <strong>Uso:</strong> Modal exibido no painel de convites da ManageAccountPage.
    </p>
  `};var p,m,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => createDocPage({
    title: 'AcceptOrRejectAccess',
    subtitle: 'Modal de decisão para aceitar ou recusar convites de perfil institucional (Professor, Coordenador, Diretor, Gestor de Redes) com validação de termos de uso',
    badge: 'Front-office / Modals',
    badgeIcon: 'door_open',
    showStats: true,
    stats: {
      'Fluxos': '2',
      'Estados': '5',
      'Perfis': '4+',
      'Validação': '✓'
    },
    colors: {
      primary: '#7367f0',
      secondary: '#9e95f5'
    },
    content: \`
      \${createUsageSection({
      title: 'Contexto de Uso',
      icon: 'info',
      steps: ['Usuário acessa o painel de gerenciamento de conta (ManageAccountPage)', 'Sistema exibe lista de convites pendentes para diferentes perfis institucionais', 'Usuário clica em "Aceitar" ou "Recusar" em um convite específico', 'Modal AcceptOrRejectAccess é exibido com o fluxo correspondente', 'Após confirmação, convite é processado e removido da lista de pendentes']
    })}

      \${createExampleCard({
      title: 'Fluxo de Recusa',
      description: 'Modal para recusar convite de perfil institucional',
      showTitle: false,
      wrapPreview: false,
      preview: \`
          \${styles}
          <div class="modal-container">
            <span class="warning-icon">error</span>
            <h1 class="modal-title">
              Deseja <span class="text-danger">recusar</span> esse perfil?
            </h1>
            <div class="profile-info">
              <p>Perfil: <span class="text-primary">Professor</span></p>
              <p>Escola: <span class="text-primary">Escola Devs</span></p>
            </div>
            <div class="actions-container">
              <button class="btn btn-outline-danger">Cancelar</button>
              <button class="btn btn-danger">Recusar perfil</button>
            </div>
          </div>
        \`,
      codes: {
        html: \`<!-- HTML/Vanilla -->
<div class="modal-container">
  <span class="warning-icon">error</span>
  <h1 class="modal-title">
    Deseja <span class="text-danger">recusar</span> esse perfil?
  </h1>
  <div class="profile-info">
    <p>Perfil: <span class="text-primary">Professor</span></p>
    <p>Escola: <span class="text-primary">Escola Devs</span></p>
  </div>
  <div class="actions-container">
    <button class="btn btn-outline-danger" onclick="onCancel()">Cancelar</button>
    <button class="btn btn-danger" onclick="onReject()">Recusar perfil</button>
  </div>
</div>\`,
        vue2: \`<!-- Vue 2 -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-danger">recusar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="$emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-danger" @click="$emit('reject')" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Recusar perfil</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profileType: { type: String, required: true },
    schoolName: { type: String, required: true },
    loading: { type: Boolean, default: false }
  }
};
<\/script>\`,
        vue3: \`<!-- Vue 3 (Composition API) -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-danger">recusar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-danger" @click="emit('reject')" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Recusar perfil</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profileType: { type: String, required: true },
  schoolName: { type: String, required: true },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['cancel', 'reject']);
<\/script>\`,
        react: \`// React
import { useState } from 'react';

export default function RejectAccess({ profileType, schoolName, onReject, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    setLoading(true);
    try {
      await onReject();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-container">
      <span className="warning-icon">error</span>
      <h1 className="modal-title">
        Deseja <span className="text-danger">recusar</span> esse perfil?
      </h1>
      <div className="profile-info">
        <p>Perfil: <span className="text-primary">{profileType}</span></p>
        <p>Escola: <span className="text-primary">{schoolName}</span></p>
      </div>
      <div className="actions-container">
        <button className="btn btn-outline-danger" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
        <button className="btn btn-danger" onClick={handleReject} disabled={loading}>
          {loading && <span className="spinner"></span>}
          <span style={{ opacity: loading ? 0 : 1 }}>Recusar perfil</span>
        </button>
      </div>
    </div>
  );
}\`
      }
    })}

      \${createExampleCard({
      title: 'Fluxo de Aceitação',
      description: 'Modal para aceitar convite com validação de termos obrigatória',
      showTitle: false,
      wrapPreview: false,
      preview: \`
          \${styles}
          <div class="modal-container">
            <span class="warning-icon">error</span>
            <h1 class="modal-title">
              Deseja <span class="text-success">aceitar</span> esse perfil?
            </h1>
            <div class="profile-info">
              <p>Perfil: <span class="text-primary">Coordenador</span></p>
              <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
            </div>
            <div class="terms-container">
              <div class="custom-checkbox">
                <input type="checkbox" id="demo-terms" checked>
                <label for="demo-terms">
                  Declaro que li e aceito os 
                  <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
                  e
                  <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
                </label>
              </div>
            </div>
            <div class="actions-container">
              <button class="btn btn-outline-danger">Cancelar</button>
              <button class="btn btn-primary">Vincular perfil</button>
            </div>
          </div>
        \`,
      codes: {
        html: \`<!-- HTML/Vanilla -->
<div class="modal-container">
  <span class="warning-icon">error</span>
  <h1 class="modal-title">
    Deseja <span class="text-success">aceitar</span> esse perfil?
  </h1>
  <div class="profile-info">
    <p>Perfil: <span class="text-primary">Coordenador</span></p>
    <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
  </div>
  <div class="terms-container">
    <div class="custom-checkbox">
      <input type="checkbox" id="terms" onchange="toggleSubmit(this.checked)">
      <label for="terms">
        Declaro que li e aceito os 
        <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
        e
        <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
      </label>
    </div>
  </div>
  <div class="actions-container">
    <button class="btn btn-outline-danger" onclick="onCancel()">Cancelar</button>
    <button class="btn btn-primary" id="submit-btn" disabled onclick="onAccept()">Vincular perfil</button>
  </div>
</div>

<script>
function toggleSubmit(checked) {
  document.getElementById('submit-btn').disabled = !checked;
}
<\/script>\`,
        vue2: \`<!-- Vue 2 -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-success">aceitar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="terms-container">
      <div class="custom-checkbox">
        <input type="checkbox" id="terms" v-model="termsAccepted" :disabled="loading">
        <label for="terms">
          Declaro que li e aceito os 
          <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
          e
          <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
        </label>
      </div>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="$emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-primary" @click="$emit('accept')" :disabled="!termsAccepted || loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Vincular perfil</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profileType: { type: String, required: true },
    schoolName: { type: String, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      termsAccepted: false
    };
  }
};
<\/script>\`,
        vue3: \`<!-- Vue 3 (Composition API) -->
<template>
  <div class="modal-container">
    <span class="warning-icon">error</span>
    <h1 class="modal-title">
      Deseja <span class="text-success">aceitar</span> esse perfil?
    </h1>
    <div class="profile-info">
      <p>Perfil: <span class="text-primary">{{ profileType }}</span></p>
      <p>Escola: <span class="text-primary">{{ schoolName }}</span></p>
    </div>
    <div class="terms-container">
      <div class="custom-checkbox">
        <input type="checkbox" id="terms" v-model="termsAccepted" :disabled="loading">
        <label for="terms">
          Declaro que li e aceito os 
          <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
          e
          <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
        </label>
      </div>
    </div>
    <div class="actions-container">
      <button class="btn btn-outline-danger" @click="emit('cancel')" :disabled="loading">
        Cancelar
      </button>
      <button class="btn btn-primary" @click="emit('accept')" :disabled="!termsAccepted || loading">
        <span v-if="loading" class="spinner"></span>
        <span :style="{ opacity: loading ? 0 : 1 }">Vincular perfil</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  profileType: { type: String, required: true },
  schoolName: { type: String, required: true },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['cancel', 'accept']);
const termsAccepted = ref(false);
<\/script>\`,
        react: \`// React
import { useState } from 'react';

export default function AcceptAccess({ profileType, schoolName, onAccept, onCancel }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!termsAccepted) return;
    setLoading(true);
    try {
      await onAccept();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-container">
      <span className="warning-icon">error</span>
      <h1 className="modal-title">
        Deseja <span className="text-success">aceitar</span> esse perfil?
      </h1>
      <div className="profile-info">
        <p>Perfil: <span className="text-primary">{profileType}</span></p>
        <p>Escola: <span className="text-primary">{schoolName}</span></p>
      </div>
      <div className="terms-container">
        <div className="custom-checkbox">
          <input 
            type="checkbox" 
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="terms">
            Declaro que li e aceito os{' '}
            <a href="https://educacross.com.br/termos-de-uso/" target="_blank" rel="noreferrer">
              termos de uso
            </a>
            {' '}e{' '}
            <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank" rel="noreferrer">
              política de privacidade
            </a>
          </label>
        </div>
      </div>
      <div className="actions-container">
        <button className="btn btn-outline-danger" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleAccept} disabled={!termsAccepted || loading}>
          {loading && <span className="spinner"></span>}
          <span style={{ opacity: loading ? 0 : 1 }}>Vincular perfil</span>
        </button>
      </div>
    </div>
  );
}\`
      }
    })}

      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">check_circle</span>
          <span>Estados do Componente</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 20px;">
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #EA5455;">
            <strong style="color: #EA5455;">Recusa Inicial</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Modal com botões ativos para cancelar ou confirmar recusa</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #EA5455;">
            <strong style="color: #EA5455;">Recusa Loading</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Spinner no botão "Recusar perfil" + disabled durante processamento</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28C76F;">
            <strong style="color: #28C76F;">Aceitação Inicial</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Checkbox desmarcado, botão "Vincular perfil" desabilitado</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28C76F;">
            <strong style="color: #28C76F;">Termos Aceitos</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Checkbox marcado, botão "Vincular perfil" habilitado</p>
          </div>
          <div style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28C76F;">
            <strong style="color: #28C76F;">Aceitação Loading</strong>
            <p style="color: #6c757d; font-size: 0.875rem; margin: 8px 0 0 0;">Spinner no botão "Vincular perfil" + todos os campos disabled</p>
          </div>
        </div>
      </div>

      \${createPropsTable([{
      name: 'profileType',
      type: 'String',
      default: '-',
      description: 'Tipo do perfil institucional (Professor, Coordenador, Diretor, Gestor de Redes)'
    }, {
      name: 'schoolName',
      type: 'String',
      default: '-',
      description: 'Nome da instituição de ensino vinculada ao convite'
    }, {
      name: 'mode',
      type: 'String',
      default: 'accept',
      description: 'Fluxo do modal: "accept" (aceitar) ou "reject" (recusar)'
    }, {
      name: 'loading',
      type: 'Boolean',
      default: 'false',
      description: 'Estado de carregamento durante processamento da ação'
    }, {
      name: 'termsAccepted',
      type: 'Boolean',
      default: 'false',
      description: '(Fluxo aceitação) Indica se termos foram aceitos para habilitar botão de vincular'
    }, {
      name: 'onAccept',
      type: 'Function',
      default: '-',
      description: 'Callback executado ao confirmar aceitação do convite'
    }, {
      name: 'onReject',
      type: 'Function',
      default: '-',
      description: 'Callback executado ao confirmar recusa do convite'
    }, {
      name: 'onCancel',
      type: 'Function',
      default: '-',
      description: 'Callback executado ao cancelar ação (fechar modal)'
    }])}
    \`,
    features: [{
      icon: 'swap_horiz',
      title: 'Dual Flow',
      description: 'Dois fluxos distintos (aceitar/recusar) com validações específicas para cada'
    }, {
      icon: 'gavel',
      title: 'Validação de Termos',
      description: 'Checkbox obrigatório no fluxo de aceitação com links para termos e política'
    }, {
      icon: 'school',
      title: 'Multi-perfil',
      description: 'Suporta todos os perfis institucionais (Professor, Coordenador, Diretor, Gestor)'
    }, {
      icon: 'sync',
      title: 'Loading States',
      description: 'Feedback visual com spinner durante processamento das ações'
    }, {
      icon: 'block',
      title: 'Validação de Estado',
      description: 'Botão de vincular desabilitado até aceitar termos de uso'
    }, {
      icon: 'open_in_new',
      title: 'Links Externos',
      description: 'Termos de uso e política de privacidade abrem em nova aba'
    }],
    relatedComponents: [{
      title: 'ManageAccountPage',
      icon: 'account_box',
      description: 'Painel de gerenciamento onde os convites são listados',
      path: '?path=/docs/front-office-templates-manageaccountpage--docs'
    }, {
      title: 'AppNavbar',
      icon: 'menu',
      description: 'Barra de navegação com acesso ao gerenciamento de conta',
      path: '?path=/docs/front-office-navigation-appnavbar--docs'
    }]
  })
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var b,f,g;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Recusar Perfil',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => \`
    \${styles}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-danger">recusar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Professor</span></p>
        <p>Escola: <span class="text-primary">Escola Devs</span></p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">Cancelar</button>
        <button class="btn btn-danger">Recusar perfil</button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Contexto:</strong> Responsável recusando convite de escola para ser Professor.<br>
      <strong>Ação:</strong> Clique em "Recusar perfil" remove o convite da lista permanentemente.
    </p>
  \`
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var v,x,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Recusar Perfil (Loading)',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => \`
    \${styles}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-danger">recusar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Professor</span></p>
        <p>Escola: <span class="text-primary">Escola Devs</span></p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger" disabled>Cancelar</button>
        <button class="btn btn-danger" disabled>
          <span class="spinner"></span>
          <span style="opacity: 0;">Recusar perfil</span>
        </button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Processando recusa do convite. Spinner no botão + disabled.
    </p>
  \`
}`,...(h=(x=s.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var y,E,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Aceitar Perfil',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => {
    setTimeout(() => {
      const checkbox = document.getElementById('accept-terms');
      const submitBtn = document.getElementById('submit-accept');
      if (checkbox && submitBtn) {
        checkbox.addEventListener('change', e => {
          submitBtn.disabled = !e.target.checked;
        });
      }
    }, 100);
    return \`
      \${styles}
      <div class="modal-container">
        <span class="warning-icon">error</span>
        
        <h1 class="modal-title">
          Deseja <span class="text-success">aceitar</span> esse perfil?
        </h1>
        
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Coordenador</span></p>
          <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
        </div>
        
        <div class="terms-container">
          <div class="custom-checkbox">
            <input type="checkbox" id="accept-terms">
            <label for="accept-terms">
              Declaro que li e aceito os 
              <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
              e
              <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
            </label>
          </div>
        </div>
        
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-primary" id="submit-accept" disabled>Vincular perfil</button>
        </div>
      </div>
      
      <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
        <strong>Contexto:</strong> Responsável aceitando convite para ser Coordenador da escola.<br>
        <strong>Validação:</strong> Botão "Vincular perfil" só ativa após marcar o checkbox.<br>
        <strong>Interação:</strong> Clique no checkbox para habilitar o botão.
      </p>
    \`;
  }
}`,...(k=(E=t.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var C,w,A;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Aceitar Perfil (Termos Aceitos)',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => \`
    \${styles}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-success">aceitar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Coordenador</span></p>
        <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
      </div>
      
      <div class="terms-container">
        <div class="custom-checkbox">
          <input type="checkbox" id="accept-terms-checked" checked>
          <label for="accept-terms-checked">
            Declaro que li e aceito os 
            <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
            e
            <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
          </label>
        </div>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">Cancelar</button>
        <button class="btn btn-primary">Vincular perfil</button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Usuário aceitou os termos. Botão habilitado para vincular perfil.
    </p>
  \`
}`,...(A=(w=o.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var P,D,N;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Aceitar Perfil (Loading)',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => \`
    \${styles}
    <div class="modal-container">
      <span class="warning-icon">error</span>
      
      <h1 class="modal-title">
        Deseja <span class="text-success">aceitar</span> esse perfil?
      </h1>
      
      <div class="profile-info">
        <p>Perfil: <span class="text-primary">Coordenador</span></p>
        <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
      </div>
      
      <div class="terms-container">
        <div class="custom-checkbox">
          <input type="checkbox" checked disabled>
          <label style="opacity: 0.6;">
            Declaro que li e aceito os 
            <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
            e
            <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
          </label>
        </div>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger" disabled>Cancelar</button>
        <button class="btn btn-primary" disabled>
          <span class="spinner"></span>
          <span style="opacity: 0;">Vincular perfil</span>
        </button>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Processando vinculação do perfil. Spinner no botão + todos os campos disabled.
    </p>
  \`
}`,...(N=(D=r.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var R,j,S;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'Todos os Perfis',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => \`
    \${styles}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 2rem; padding: 2rem;">
      <!-- Professor - Recusa -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-danger">recusar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Professor</span></p>
          <p>Escola: <span class="text-primary">Escola Devs</span></p>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-danger">Recusar perfil</button>
        </div>
      </div>

      <!-- Coordenador - Aceitação -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-success">aceitar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Coordenador</span></p>
          <p>Escola: <span class="text-primary">Colégio Nova Jornada</span></p>
        </div>
        <div class="terms-container">
          <div class="custom-checkbox">
            <input type="checkbox" checked>
            <label>
              Declaro que li e aceito os 
              <a href="https://educacross.com.br/termos-de-uso/" target="_blank">termos de uso</a>
              e
              <a href="https://www.educacross.com.br/politica-de-privacidade/" target="_blank">política de privacidade</a>
            </label>
          </div>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-primary">Vincular perfil</button>
        </div>
      </div>

      <!-- Diretor - Recusa -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-danger">recusar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Diretor</span></p>
          <p>Escola: <span class="text-primary">Escola Municipal Santos</span></p>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-danger">Recusar perfil</button>
        </div>
      </div>

      <!-- Gestor de Redes - Aceitação -->
      <div class="modal-container">
        <span class="warning-icon">error</span>
        <h1 class="modal-title">
          Deseja <span class="text-success">aceitar</span> esse perfil?
        </h1>
        <div class="profile-info">
          <p>Perfil: <span class="text-primary">Gestor de Redes</span></p>
          <p>Escola: <span class="text-primary">Rede Educacional ABC</span></p>
        </div>
        <div class="terms-container">
          <div class="custom-checkbox">
            <input type="checkbox" checked>
            <label>
              Declaro que li e aceito os 
              <a href="#">termos de uso</a>
              e
              <a href="#">política de privacidade</a>
            </label>
          </div>
        </div>
        <div class="actions-container">
          <button class="btn btn-outline-danger">Cancelar</button>
          <button class="btn btn-primary">Vincular perfil</button>
        </div>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Contexto:</strong> Diferentes perfis institucionais (Professor, Coordenador, Diretor, Gestor de Redes).<br>
      <strong>Uso:</strong> Modal exibido no painel de convites da ManageAccountPage.
    </p>
  \`
}`,...(S=(j=i.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};const L=["Documentation","RejectProfile","RejectProfileLoading","AcceptProfile","AcceptProfileChecked","AcceptProfileLoading","AllVariants"];export{t as AcceptProfile,o as AcceptProfileChecked,r as AcceptProfileLoading,i as AllVariants,a as Documentation,n as RejectProfile,s as RejectProfileLoading,L as __namedExportsOrder,q as default};
