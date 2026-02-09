import{c as F,b as s,d as A}from"./docTemplate-RKjNfURf.js";const C={title:"Educacross Components V2/Forms / EInput",tags:[],parameters:{layout:"padded",docs:{description:{component:`
Componente de input básico com validação para formulários educacionais.

### Features
- ✅ 7 tipos de input (text, email, number, password, tel, url, search)
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Estados de validação: default, valid, invalid, warning
- ✅ Ícones opcionais (esquerda/direita)
- ✅ Estados: default, hover, focus, disabled, readonly
- ✅ Contador de caracteres (maxLength)
- ✅ Acessibilidade completa (ARIA, keyboard)
- ✅ Focus ring visível
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `}}},argTypes:{value:{control:"text",description:"Valor do input",table:{type:{summary:"string"}}},placeholder:{control:"text",description:"Texto placeholder",table:{type:{summary:"string"}}},type:{control:"select",options:["text","email","number","password","tel","url","search"],description:"Tipo de input",table:{type:{summary:"string"},defaultValue:{summary:"text"}}},size:{control:"select",options:["sm","md","lg"],description:"Tamanho do componente",table:{type:{summary:"string"},defaultValue:{summary:"md"}}},state:{control:"select",options:["default","valid","invalid","warning"],description:"Estado de validação",table:{type:{summary:"string"},defaultValue:{summary:"default"}}},disabled:{control:"boolean",description:"Desabilita interação",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Apenas leitura",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},icon:{control:"text",description:"Ícone Bootstrap Icons (ex: search, person)",table:{type:{summary:"string"}}},iconPosition:{control:"select",options:["left","right"],description:"Posição do ícone",table:{type:{summary:"string"},defaultValue:{summary:"left"}}},maxLength:{control:"number",description:"Máximo de caracteres",table:{type:{summary:"number"}}}}},o={name:"📖 Documentation",render:()=>F({title:"EInput",subtitle:"Input básico com validação para formulários educacionais",badge:"Forms / Core UI",colors:{primary:"#6E63E8",secondary:"#28C76F"},stats:[{label:"Tipos",value:"7",description:"text, email, number, password, tel, url, search"},{label:"Tamanhos",value:"3",description:"sm (32px), md (38px), lg (46px)"},{label:"Estados",value:"4",description:"default, valid, invalid, warning"},{label:"Acessibilidade",value:"WCAG AA",description:"Contraste, ARIA, keyboard navigation"}],content:`
${s({title:"Input Básico",description:"Input text padrão com placeholder e ícone",preview:'<div style="max-width: 400px;"><div style="margin-bottom: 4px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Nome Completo</label><div style="position: relative;"><i class="bi bi-person" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #A8AAAE; font-size: 18px;"></i><input type="text" placeholder="Digite seu nome" style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; outline: none; transition: border-color 0.2s;" /></div></div></div>',codes:{html:`<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Nome Completo</label>
  <div class="input-icon-wrapper">
    <i class="bi bi-person input-icon-left"></i>
    <input 
      type="text" 
      class="form-control input-with-icon-left" 
      placeholder="Digite seu nome"
      id="nameInput"
    />
  </div>
</div>

<script>
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('input', (e) => {
  console.log('Nome:', e.target.value);
});
<\/script>`,vue2:`<!-- Vue 2 - Options API -->
<template>
  <div class="form-group">
    <label class="form-label">Nome Completo</label>
    <EInput
      v-model="name"
      type="text"
      placeholder="Digite seu nome"
      icon="person"
      icon-position="left"
      size="md"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  watch: {
    name(newValue) {
      console.log('Nome:', newValue);
    }
  }
}
<\/script>`,vue3:`<!-- Vue 3 - Composition API -->
<script setup>
import { ref, watch } from 'vue';
import EInput from '@/components/EInput.vue';

const name = ref('');

watch(name, (newValue) => {
  console.log('Nome:', newValue);
});
<\/script>

<template>
  <div class="form-group">
    <label class="form-label">Nome Completo</label>
    <EInput
      v-model="name"
      type="text"
      placeholder="Digite seu nome"
      icon="person"
      icon-position="left"
      size="md"
    />
  </div>
</template>`,react:`// React + TypeScript
import { useState } from 'react';
import { EInput } from '@/components/EInput';

export default function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (value: string) => {
    setName(value);
    console.log('Nome:', value);
  };

  return (
    <div className="form-group">
      <label className="form-label">Nome Completo</label>
      <EInput
        value={name}
        onChange={handleChange}
        type="text"
        placeholder="Digite seu nome"
        icon="person"
        iconPosition="left"
        size="md"
      />
    </div>
  );
}`}})}

${s({title:"Estados de Validação",description:"Input com feedback visual de valid/invalid",preview:'<div style="display: flex; gap: 16px; flex-wrap: wrap;"><div style="flex: 1; min-width: 200px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Email Válido</label><input type="email" value="user@example.com" style="width: 100%; height: 38px; padding: 10px 14px; border: 2px solid #28C76F; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #F0FDF4;" readonly /></div><div style="flex: 1; min-width: 200px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Email Inválido</label><input type="email" value="invalid-email" style="width: 100%; height: 38px; padding: 10px 14px; border: 2px solid #EA5455; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #FEF2F2;" /><small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">Digite um email válido</small></div></div>',codes:{html:`<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Email</label>
  <input 
    type="email" 
    class="form-control is-valid" 
    value="user@example.com"
    id="emailInputValid"
  />
  <div class="valid-feedback">Email válido!</div>
</div>

<div class="form-group">
  <label class="form-label">Email</label>
  <input 
    type="email" 
    class="form-control is-invalid" 
    value="invalid-email"
    id="emailInputInvalid"
  />
  <div class="invalid-feedback">Digite um email válido</div>
</div>

<script>
const validateEmail = (input) => {
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value);
  input.classList.toggle('is-valid', isValid);
  input.classList.toggle('is-invalid', !isValid);
};

document.getElementById('emailInputValid').addEventListener('input', (e) => {
  validateEmail(e.target);
});
<\/script>`,vue2:`<!-- Vue 2 - Options API -->
<template>
  <div>
    <div class="form-group">
      <label class="form-label">Email Válido</label>
      <EInput
        v-model="validEmail"
        type="email"
        state="valid"
        feedback="Email válido!"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Email Inválido</label>
      <EInput
        v-model="invalidEmail"
        type="email"
        state="invalid"
        feedback="Digite um email válido"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validEmail: 'user@example.com',
      invalidEmail: 'invalid-email'
    }
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return emailRegex.test(email) ? 'valid' : 'invalid';
    }
  }
}
<\/script>`,vue3:`<!-- Vue 3 - Composition API -->
<script setup>
import { ref, computed } from 'vue';
import EInput from '@/components/EInput.vue';

const validEmail = ref('user@example.com');
const invalidEmail = ref('invalid-email');

const validateEmail = (email: string): 'valid' | 'invalid' => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email) ? 'valid' : 'invalid';
};

const validEmailState = computed(() => validateEmail(validEmail.value));
const invalidEmailState = computed(() => validateEmail(invalidEmail.value));
<\/script>

<template>
  <div>
    <div class="form-group">
      <label class="form-label">Email Válido</label>
      <EInput
        v-model="validEmail"
        type="email"
        :state="validEmailState"
        feedback="Email válido!"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Email Inválido</label>
      <EInput
        v-model="invalidEmail"
        type="email"
        :state="invalidEmailState"
        feedback="Digite um email válido"
      />
    </div>
  </div>
</template>`,react:`// React + TypeScript
import { useState, useCallback } from 'react';
import { EInput } from '@/components/EInput';

type ValidationState = 'valid' | 'invalid' | '';

export default function EmailValidation() {
  const [validEmail, setValidEmail] = useState('user@example.com');
  const [invalidEmail, setInvalidEmail] = useState('invalid-email');

  const validateEmail = useCallback((email: string): ValidationState => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email) ? 'valid' : 'invalid';
  }, []);

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Email Válido</label>
        <EInput
          value={validEmail}
          onChange={setValidEmail}
          type="email"
          state={validateEmail(validEmail)}
          feedback="Email válido!"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email Inválido</label>
        <EInput
          value={invalidEmail}
          onChange={setInvalidEmail}
          type="email"
          state={validateEmail(invalidEmail)}
          feedback="Digite um email válido"
        />
      </div>
    </div>
  );
}`}})}

${s({title:"Com Ícone Direito",description:"Input de busca com ícone à direita",preview:'<div style="max-width: 400px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Buscar Aluno</label><div style="position: relative;"><input type="search" placeholder="Buscar por nome ou matrícula" style="width: 100%; height: 38px; padding: 10px 42px 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C;" /><i class="bi bi-search" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #A8AAAE; font-size: 18px;"></i></div></div>',codes:{html:`<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Buscar Aluno</label>
  <div class="input-icon-wrapper">
    <input 
      type="search" 
      class="form-control input-with-icon-right" 
      placeholder="Buscar por nome ou matrícula"
      id="searchInput"
    />
    <i class="bi bi-search input-icon-right"></i>
  </div>
</div>

<script>
let debounceTimer;
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log('Buscando:', e.target.value);
    // Chamada da API de busca aqui
  }, 300);
});
<\/script>`,vue2:`<!-- Vue 2 - Options API -->
<template>
  <div class="form-group">
    <label class="form-label">Buscar Aluno</label>
    <EInput
      v-model="search"
      type="search"
      placeholder="Buscar por nome ou matrícula"
      icon="search"
      icon-position="right"
      @input="handleSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      debounceTimer: null
    }
  },
  methods: {
    handleSearch(value) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        console.log('Buscando:', value);
        // Chamada da API de busca
        this.performSearch(value);
      }, 300);
    },
    async performSearch(query) {
      // Implementação da busca
      const results = await this.$api.searchStudents(query);
      console.log('Resultados:', results);
    }
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer);
  }
}
<\/script>`,vue3:`<!-- Vue 3 - Composition API -->
<script setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import EInput from '@/components/EInput.vue';

const search = ref('');

const performSearch = async (query: string) => {
  if (!query.trim()) return;
  
  console.log('Buscando:', query);
  // Chamada da API de busca
  const results = await fetch(\`/api/students?q=\${encodeURIComponent(query)}\`);
  const data = await results.json();
  console.log('Resultados:', data);
};

const debouncedSearch = useDebounceFn((value: string) => {
  performSearch(value);
}, 300);

const handleSearch = (value: string) => {
  debouncedSearch(value);
};
<\/script>

<template>
  <div class="form-group">
    <label class="form-label">Buscar Aluno</label>
    <EInput
      v-model="search"
      type="search"
      placeholder="Buscar por nome ou matrícula"
      icon="search"
      icon-position="right"
      @input="handleSearch"
    />
  </div>
</template>`,react:`// React + TypeScript
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EInput } from '@/components/EInput';

interface Student {
  id: string;
  name: string;
  enrollment: string;
}

export default function StudentSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(\`/api/students?q=\${encodeURIComponent(query)}\`);
      const data = await response.json();
      setResults(data);
      console.log('Resultados:', data);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useDebouncedCallback(performSearch, 300);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <div className="form-group">
      <label className="form-label">Buscar Aluno</label>
      <EInput
        value={search}
        onChange={handleChange}
        type="search"
        placeholder="Buscar por nome ou matrícula"
        icon="search"
        iconPosition="right"
      />
      {loading && <div className="spinner">Buscando...</div>}
    </div>
  );
}`}})}

${A([{name:"value",type:"String",default:"''",description:"Valor do input (v-model)"},{name:"type",type:"String",default:"'text'",description:"Tipo: text, email, number, password, tel, url, search"},{name:"placeholder",type:"String",default:"''",description:"Texto placeholder"},{name:"state",type:"String",default:"''",description:"Estado de validação: 'valid', 'invalid', 'warning'"},{name:"size",type:"String",default:"'md'",description:"Tamanho: 'sm' (32px), 'md' (38px), 'lg' (46px)"},{name:"icon",type:"String",default:"''",description:"Ícone Bootstrap Icons (ex: search, person, envelope)"},{name:"icon-position",type:"String",default:"'left'",description:"Posição do ícone: 'left' ou 'right'"},{name:"disabled",type:"Boolean",default:"false",description:"Desabilita interação"},{name:"readonly",type:"Boolean",default:"false",description:"Apenas leitura"},{name:"maxLength",type:"Number",default:"null",description:"Máximo de caracteres permitidos"}])}
    `,features:[{icon:"check_circle",title:"Validação Integrada",description:"Estados valid/invalid/warning com feedback visual"},{icon:"text_fields",title:"7 Tipos de Input",description:"text, email, number, password, tel, url, search"},{icon:"straighten",title:"3 Tamanhos",description:"sm (32px), md (38px), lg (46px)"},{icon:"emoji_emotions",title:"Ícones Opcionais",description:"Bootstrap Icons à esquerda ou direita"},{icon:"accessibility_new",title:"Acessível",description:"ARIA labels, keyboard navigation, contraste WCAG AA"},{icon:"speed",title:"Performance",description:"Componente leve sem dependências pesadas"}],relatedComponents:[{name:"EFormCheck",path:"/story/front-office-forms-eformcheck--default"},{name:"ESelect",path:"/story/front-office-forms-eselect--default"},{name:"ETextarea",path:"/story/front-office-forms-etextarea--default"}]})},t={name:"🎨 Playground",args:{value:"",placeholder:"Digite aqui...",type:"text",size:"md",state:"",disabled:!1,readonly:!1,icon:"",iconPosition:"left",maxLength:null},argTypes:{value:{control:"text",description:"Valor do input"},placeholder:{control:"text",description:"Texto placeholder"},type:{control:"select",options:["text","email","number","password","tel","url","search"],description:"Tipo de input"},size:{control:"select",options:["sm","md","lg"],description:"Tamanho do input"},state:{control:"select",options:["","valid","invalid","warning"],description:"Estado de validação"},icon:{control:"text",description:"Ícone Bootstrap Icons (ex: search, person, envelope)"},iconPosition:{control:"radio",options:["left","right"],description:"Posição do ícone"},disabled:{control:"boolean",description:"Desabilita interação"},readonly:{control:"boolean",description:"Apenas leitura"},maxLength:{control:"number",description:"Máximo de caracteres"}},render:e=>{const h={sm:"32px",md:"38px",lg:"46px"},n={sm:"8px 12px",md:"10px 14px",lg:"12px 16px"},E={sm:"13px",md:"14px",lg:"16px"},D={valid:"border: 2px solid #28C76F; background-color: #F0FDF4;",invalid:"border: 2px solid #EA5455; background-color: #FEF2F2;",warning:"border: 2px solid #FF9F43; background-color: #FFF8F0;","":"border: 1px solid #D8D6DE;"},i=e.icon&&e.icon.trim()!=="",w=i&&e.iconPosition==="left"?"42px":n[e.size].split(" ")[1],z=i&&e.iconPosition==="right"?"42px":n[e.size].split(" ")[1];return`
      <div style="max-width: 500px; padding: 20px; font-family: Inter, sans-serif;">
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Interactive Playground
        </label>
        <div style="position: relative;">
          ${i&&e.iconPosition==="left"?`<i class="bi bi-${e.icon}" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px; pointer-events: none;"></i>`:""}
          <input 
            type="${e.type}"
            placeholder="${e.placeholder}"
            value="${e.value}"
            ${e.disabled?"disabled":""}
            ${e.readonly?"readonly":""}
            ${e.maxLength?`maxlength="${e.maxLength}"`:""}
            style="
              width: 100%; 
              height: ${h[e.size]}; 
              padding: ${n[e.size].split(" ")[0]} ${z} ${n[e.size].split(" ")[0]} ${w};
              ${D[e.state]}
              border-radius: 6px;
              font-size: ${E[e.size]};
              color: #5E5873;
              outline: none;
              transition: all 0.2s;
              font-family: Inter, sans-serif;
              ${e.disabled?"background-color: #F8F8F8; cursor: not-allowed; opacity: 0.6;":""}
              ${e.readonly?"background-color: #F8F8F8;":""}
            "
          />
          ${i&&e.iconPosition==="right"?`<i class="bi bi-${e.icon}" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px; pointer-events: none;"></i>`:""}
        </div>
        ${e.state==="valid"?'<small style="display: block; margin-top: 4px; color: #28C76F; font-size: 12px;">✓ Valor válido</small>':""}
        ${e.state==="invalid"?'<small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">✗ Valor inválido</small>':""}
        ${e.state==="warning"?'<small style="display: block; margin-top: 4px; color: #FF9F43; font-size: 12px;">⚠ Atenção necessária</small>':""}
        ${e.maxLength?`<small style="display: block; margin-top: 4px; color: #A8AAAE; font-size: 12px; text-align: right;">${e.value.length} / ${e.maxLength} caracteres</small>`:""}
      </div>
    `}},a={name:"🎭 Use Cases",render:()=>`
    <div style="display: flex; flex-direction: column; gap: 48px; padding: 20px; font-family: Inter, sans-serif; max-width: 800px;">
      
      <!-- Caso 1: Cadastro de Aluno -->
      <div style="border: 1px solid #E5E5E5; border-radius: 8px; padding: 24px; background: #FAFAFA;">
        <h3 style="margin: 0 0 16px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <i class="bi bi-pencil-square" style="color: #6E63E8; font-size: 22px;"></i>
          Caso 1: Cadastro de Aluno
        </h3>
        <p style="margin: 0 0 20px 0; color: #6E6B7B; font-size: 14px;">
          Professor cadastra novo aluno na turma com nome completo, email e matrícula.
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Nome Completo <span style="color: #EA5455;">*</span>
            </label>
            <div style="position: relative;">
              <i class="bi bi-person" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
              <input 
                type="text" 
                placeholder="Ex: Maria Silva Santos"
                style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
              />
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Email <span style="color: #EA5455;">*</span>
            </label>
            <div style="position: relative;">
              <i class="bi bi-envelope" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
              <input 
                type="email" 
                placeholder="maria@escola.com.br"
                style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
              />
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Matrícula
            </label>
            <input 
              type="text" 
              placeholder="2024001234"
              maxlength="10"
              style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
            />
            <small style="display: block; margin-top: 4px; color: #A8AAAE; font-size: 12px;">Máximo 10 caracteres</small>
          </div>
        </div>
      </div>
      
      <!-- Caso 2: Busca de Turma -->
      <div style="border: 1px solid #E5E5E5; border-radius: 8px; padding: 24px; background: #FAFAFA;">
        <h3 style="margin: 0 0 16px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <i class="bi bi-search" style="color: #6E63E8; font-size: 22px;"></i>
          Caso 2: Busca de Turma
        </h3>
        <p style="margin: 0 0 20px 0; color: #6E6B7B; font-size: 14px;">
          Coordenador busca turma por nome ou código para visualizar relatórios.
        </p>
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Buscar Turma
          </label>
          <div style="position: relative;">
            <input 
              type="search" 
              placeholder="Digite o nome ou código da turma..."
              style="width: 100%; height: 38px; padding: 10px 42px 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
            />
            <i class="bi bi-search" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
          </div>
          <small style="display: block; margin-top: 4px; color: #A8AAAE; font-size: 12px;">
            Ex: "Turma 5A", "MAT-2024-01"
          </small>
        </div>
      </div>
      
      <!-- Caso 3: Formulário de Missão -->
      <div style="border: 1px solid #E5E5E5; border-radius: 8px; padding: 24px; background: #FAFAFA;">
        <h3 style="margin: 0 0 16px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <i class="bi bi-bullseye" style="color: #6E63E8; font-size: 22px;"></i>
          Caso 3: Formulário de Missão
        </h3>
        <p style="margin: 0 0 20px 0; color: #6E6B7B; font-size: 14px;">
          Professor cria nova missão com título e pontuação máxima.
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Título da Missão <span style="color: #EA5455;">*</span>
            </label>
            <div style="position: relative;">
              <i class="bi bi-bookmark" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
              <input 
                type="text" 
                placeholder="Ex: Matemática - Frações e Operações"
                style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
              />
            </div>
          </div>
          
          <div style="display: flex; gap: 16px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
                Pontuação <span style="color: #EA5455;">*</span>
              </label>
              <div style="position: relative;">
                <i class="bi bi-star" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
                <input 
                  type="number" 
                  placeholder="100"
                  min="0"
                  max="1000"
                  style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
                />
              </div>
            </div>
            
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
                Tempo (minutos)
              </label>
              <div style="position: relative;">
                <i class="bi bi-clock" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
                <input 
                  type="number" 
                  placeholder="60"
                  min="1"
                  style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `},l={name:"♿ Accessibility",render:()=>`
    <div style="padding: 20px; max-width: 700px; font-family: Inter, sans-serif;">
      <h2 style="margin: 0 0 24px 0; color: #4B465C; font-size: 24px; font-weight: 600;">
        ♿ Testes de Acessibilidade WCAG AA
      </h2>
      
      <!-- Keyboard Navigation -->
      <div style="margin-bottom: 40px; padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">keyboard</span>
          Navegação por Teclado
        </h3>
        <p style="margin: 0 0 16px 0; color: #6E6B7B; font-size: 14px;">
          Use <kbd style="padding: 2px 6px; background: #FFF; border: 1px solid #D8D6DE; border-radius: 4px; font-family: monospace;">Tab</kbd> para focar, 
          <kbd style="padding: 2px 6px; background: #FFF; border: 1px solid #D8D6DE; border-radius: 4px; font-family: monospace;">Shift+Tab</kbd> para voltar
        </p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <input 
            type="text" 
            placeholder="Input 1 - Pressione Tab para navegar"
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            onfocus="this.style.border='2px solid #6E63E8'; this.style.boxShadow='0 0 0 4px rgba(110, 99, 232, 0.25)';"
            onblur="this.style.border='1px solid #D8D6DE'; this.style.boxShadow='none';"
          />
          <input 
            type="text" 
            placeholder="Input 2 - Navegável por teclado"
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            onfocus="this.style.border='2px solid #6E63E8'; this.style.boxShadow='0 0 0 4px rgba(110, 99, 232, 0.25)';"
            onblur="this.style.border='1px solid #D8D6DE'; this.style.boxShadow='none';"
          />
          <input 
            type="text" 
            placeholder="Input 3 - Focus visível (anel azul)"
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            onfocus="this.style.border='2px solid #6E63E8'; this.style.boxShadow='0 0 0 4px rgba(110, 99, 232, 0.25)';"
            onblur="this.style.border='1px solid #D8D6DE'; this.style.boxShadow='none';"
          />
        </div>
      </div>
      
      <!-- ARIA Labels -->
      <div style="margin-bottom: 40px; padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">label</span>
          ARIA Labels e Associações
        </h3>
        <p style="margin: 0 0 16px 0; color: #6E6B7B; font-size: 14px;">
          Labels associados via ID para screen readers
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label id="email-label" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Email (obrigatório)
            </label>
            <input 
              type="email"
              aria-labelledby="email-label"
              aria-required="true"
              aria-describedby="email-help"
              placeholder="seu@email.com"
              style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            />
            <small id="email-help" style="display: block; margin-top: 4px; color: #6E6B7B; font-size: 12px;">
              Digite um email válido para receber notificações
            </small>
          </div>
          
          <div>
            <label id="password-label" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Senha
            </label>
            <input 
              type="password"
              aria-labelledby="password-label"
              aria-required="true"
              aria-describedby="password-requirements"
              placeholder="Mínimo 8 caracteres"
              style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            />
            <small id="password-requirements" style="display: block; margin-top: 4px; color: #6E6B7B; font-size: 12px;">
              Mínimo 8 caracteres, incluindo letras e números
            </small>
          </div>
        </div>
      </div>
      
      <!-- Contraste -->
      <div style="margin-bottom: 40px; padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">palette</span>
          Contraste WCAG AA (Ratios Mínimos)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Texto no fundo branco</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#5E5873 - Ratio 7.5:1 ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Border padrão</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#D8D6DE - Ratio 3:1 ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Focus ring (primário)</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#6E63E8 - Ratio 4.5:1 ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Placeholder text</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#B8C2CC - Ratio 3.2:1 ✓</span>
          </div>
        </div>
      </div>
      
      <!-- Screen Readers -->
      <div style="padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">volume_up</span>
          Suporte a Screen Readers
        </h3>
        <div style="margin-bottom: 16px;">
          <label for="screen-reader-test" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Input com feedback acessível
          </label>
          <input 
            id="screen-reader-test"
            type="text"
            aria-label="Campo de texto totalmente acessível"
            aria-describedby="sr-help"
            placeholder="Digite aqui..."
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
          />
          <div id="sr-help" style="display: block; margin-top: 8px; padding: 12px; background: #E7F3FF; border-left: 3px solid #00CFE8; border-radius: 4px;">
            <strong style="color: #4B465C; font-size: 13px;">Screen Reader irá anunciar:</strong>
            <ul style="margin: 8px 0 0 20px; color: #6E6B7B; font-size: 13px; line-height: 1.6;">
              <li>"Campo de texto totalmente acessível"</li>
              <li>"Digite aqui" (placeholder)</li>
              <li>Estado atual: vazio/preenchido</li>
              <li>Mensagens de erro via aria-describedby</li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  `};var r,p,d;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: '📖 Documentation',
  render: () => createDocPage({
    title: 'EInput',
    subtitle: 'Input básico com validação para formulários educacionais',
    badge: 'Forms / Core UI',
    colors: {
      primary: '#6E63E8',
      secondary: '#28C76F'
    },
    stats: [{
      label: 'Tipos',
      value: '7',
      description: 'text, email, number, password, tel, url, search'
    }, {
      label: 'Tamanhos',
      value: '3',
      description: 'sm (32px), md (38px), lg (46px)'
    }, {
      label: 'Estados',
      value: '4',
      description: 'default, valid, invalid, warning'
    }, {
      label: 'Acessibilidade',
      value: 'WCAG AA',
      description: 'Contraste, ARIA, keyboard navigation'
    }],
    content: \`
\${createExampleCard({
      title: 'Input Básico',
      description: 'Input text padrão com placeholder e ícone',
      preview: '<div style="max-width: 400px;"><div style="margin-bottom: 4px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Nome Completo</label><div style="position: relative;"><i class="bi bi-person" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #A8AAAE; font-size: 18px;"></i><input type="text" placeholder="Digite seu nome" style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; outline: none; transition: border-color 0.2s;" /></div></div></div>',
      codes: {
        html: \`<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Nome Completo</label>
  <div class="input-icon-wrapper">
    <i class="bi bi-person input-icon-left"></i>
    <input 
      type="text" 
      class="form-control input-with-icon-left" 
      placeholder="Digite seu nome"
      id="nameInput"
    />
  </div>
</div>

<script>
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('input', (e) => {
  console.log('Nome:', e.target.value);
});
<\/script>\`,
        vue2: \`<!-- Vue 2 - Options API -->
<template>
  <div class="form-group">
    <label class="form-label">Nome Completo</label>
    <EInput
      v-model="name"
      type="text"
      placeholder="Digite seu nome"
      icon="person"
      icon-position="left"
      size="md"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  watch: {
    name(newValue) {
      console.log('Nome:', newValue);
    }
  }
}
<\/script>\`,
        vue3: \`<!-- Vue 3 - Composition API -->
<script setup>
import { ref, watch } from 'vue';
import EInput from '@/components/EInput.vue';

const name = ref('');

watch(name, (newValue) => {
  console.log('Nome:', newValue);
});
<\/script>

<template>
  <div class="form-group">
    <label class="form-label">Nome Completo</label>
    <EInput
      v-model="name"
      type="text"
      placeholder="Digite seu nome"
      icon="person"
      icon-position="left"
      size="md"
    />
  </div>
</template>\`,
        react: \`// React + TypeScript
import { useState } from 'react';
import { EInput } from '@/components/EInput';

export default function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (value: string) => {
    setName(value);
    console.log('Nome:', value);
  };

  return (
    <div className="form-group">
      <label className="form-label">Nome Completo</label>
      <EInput
        value={name}
        onChange={handleChange}
        type="text"
        placeholder="Digite seu nome"
        icon="person"
        iconPosition="left"
        size="md"
      />
    </div>
  );
}\`
      }
    })}

\${createExampleCard({
      title: 'Estados de Validação',
      description: 'Input com feedback visual de valid/invalid',
      preview: '<div style="display: flex; gap: 16px; flex-wrap: wrap;"><div style="flex: 1; min-width: 200px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Email Válido</label><input type="email" value="user@example.com" style="width: 100%; height: 38px; padding: 10px 14px; border: 2px solid #28C76F; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #F0FDF4;" readonly /></div><div style="flex: 1; min-width: 200px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Email Inválido</label><input type="email" value="invalid-email" style="width: 100%; height: 38px; padding: 10px 14px; border: 2px solid #EA5455; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #FEF2F2;" /><small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">Digite um email válido</small></div></div>',
      codes: {
        html: \`<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Email</label>
  <input 
    type="email" 
    class="form-control is-valid" 
    value="user@example.com"
    id="emailInputValid"
  />
  <div class="valid-feedback">Email válido!</div>
</div>

<div class="form-group">
  <label class="form-label">Email</label>
  <input 
    type="email" 
    class="form-control is-invalid" 
    value="invalid-email"
    id="emailInputInvalid"
  />
  <div class="invalid-feedback">Digite um email válido</div>
</div>

<script>
const validateEmail = (input) => {
  const isValid = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/.test(input.value);
  input.classList.toggle('is-valid', isValid);
  input.classList.toggle('is-invalid', !isValid);
};

document.getElementById('emailInputValid').addEventListener('input', (e) => {
  validateEmail(e.target);
});
<\/script>\`,
        vue2: \`<!-- Vue 2 - Options API -->
<template>
  <div>
    <div class="form-group">
      <label class="form-label">Email Válido</label>
      <EInput
        v-model="validEmail"
        type="email"
        state="valid"
        feedback="Email válido!"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Email Inválido</label>
      <EInput
        v-model="invalidEmail"
        type="email"
        state="invalid"
        feedback="Digite um email válido"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validEmail: 'user@example.com',
      invalidEmail: 'invalid-email'
    }
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
      return emailRegex.test(email) ? 'valid' : 'invalid';
    }
  }
}
<\/script>\`,
        vue3: \`<!-- Vue 3 - Composition API -->
<script setup>
import { ref, computed } from 'vue';
import EInput from '@/components/EInput.vue';

const validEmail = ref('user@example.com');
const invalidEmail = ref('invalid-email');

const validateEmail = (email: string): 'valid' | 'invalid' => {
  const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
  return emailRegex.test(email) ? 'valid' : 'invalid';
};

const validEmailState = computed(() => validateEmail(validEmail.value));
const invalidEmailState = computed(() => validateEmail(invalidEmail.value));
<\/script>

<template>
  <div>
    <div class="form-group">
      <label class="form-label">Email Válido</label>
      <EInput
        v-model="validEmail"
        type="email"
        :state="validEmailState"
        feedback="Email válido!"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Email Inválido</label>
      <EInput
        v-model="invalidEmail"
        type="email"
        :state="invalidEmailState"
        feedback="Digite um email válido"
      />
    </div>
  </div>
</template>\`,
        react: \`// React + TypeScript
import { useState, useCallback } from 'react';
import { EInput } from '@/components/EInput';

type ValidationState = 'valid' | 'invalid' | '';

export default function EmailValidation() {
  const [validEmail, setValidEmail] = useState('user@example.com');
  const [invalidEmail, setInvalidEmail] = useState('invalid-email');

  const validateEmail = useCallback((email: string): ValidationState => {
    const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
    return emailRegex.test(email) ? 'valid' : 'invalid';
  }, []);

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Email Válido</label>
        <EInput
          value={validEmail}
          onChange={setValidEmail}
          type="email"
          state={validateEmail(validEmail)}
          feedback="Email válido!"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email Inválido</label>
        <EInput
          value={invalidEmail}
          onChange={setInvalidEmail}
          type="email"
          state={validateEmail(invalidEmail)}
          feedback="Digite um email válido"
        />
      </div>
    </div>
  );
}\`
      }
    })}

\${createExampleCard({
      title: 'Com Ícone Direito',
      description: 'Input de busca com ícone à direita',
      preview: '<div style="max-width: 400px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Buscar Aluno</label><div style="position: relative;"><input type="search" placeholder="Buscar por nome ou matrícula" style="width: 100%; height: 38px; padding: 10px 42px 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C;" /><i class="bi bi-search" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #A8AAAE; font-size: 18px;"></i></div></div>',
      codes: {
        html: \`<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Buscar Aluno</label>
  <div class="input-icon-wrapper">
    <input 
      type="search" 
      class="form-control input-with-icon-right" 
      placeholder="Buscar por nome ou matrícula"
      id="searchInput"
    />
    <i class="bi bi-search input-icon-right"></i>
  </div>
</div>

<script>
let debounceTimer;
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log('Buscando:', e.target.value);
    // Chamada da API de busca aqui
  }, 300);
});
<\/script>\`,
        vue2: \`<!-- Vue 2 - Options API -->
<template>
  <div class="form-group">
    <label class="form-label">Buscar Aluno</label>
    <EInput
      v-model="search"
      type="search"
      placeholder="Buscar por nome ou matrícula"
      icon="search"
      icon-position="right"
      @input="handleSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      debounceTimer: null
    }
  },
  methods: {
    handleSearch(value) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        console.log('Buscando:', value);
        // Chamada da API de busca
        this.performSearch(value);
      }, 300);
    },
    async performSearch(query) {
      // Implementação da busca
      const results = await this.$api.searchStudents(query);
      console.log('Resultados:', results);
    }
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer);
  }
}
<\/script>\`,
        vue3: \`<!-- Vue 3 - Composition API -->
<script setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import EInput from '@/components/EInput.vue';

const search = ref('');

const performSearch = async (query: string) => {
  if (!query.trim()) return;
  
  console.log('Buscando:', query);
  // Chamada da API de busca
  const results = await fetch(\\\`/api/students?q=\\\${encodeURIComponent(query)}\\\`);
  const data = await results.json();
  console.log('Resultados:', data);
};

const debouncedSearch = useDebounceFn((value: string) => {
  performSearch(value);
}, 300);

const handleSearch = (value: string) => {
  debouncedSearch(value);
};
<\/script>

<template>
  <div class="form-group">
    <label class="form-label">Buscar Aluno</label>
    <EInput
      v-model="search"
      type="search"
      placeholder="Buscar por nome ou matrícula"
      icon="search"
      icon-position="right"
      @input="handleSearch"
    />
  </div>
</template>\`,
        react: \`// React + TypeScript
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EInput } from '@/components/EInput';

interface Student {
  id: string;
  name: string;
  enrollment: string;
}

export default function StudentSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(\\\`/api/students?q=\\\${encodeURIComponent(query)}\\\`);
      const data = await response.json();
      setResults(data);
      console.log('Resultados:', data);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useDebouncedCallback(performSearch, 300);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <div className="form-group">
      <label className="form-label">Buscar Aluno</label>
      <EInput
        value={search}
        onChange={handleChange}
        type="search"
        placeholder="Buscar por nome ou matrícula"
        icon="search"
        iconPosition="right"
      />
      {loading && <div className="spinner">Buscando...</div>}
    </div>
  );
}\`
      }
    })}

\${createPropsTable([{
      name: 'value',
      type: 'String',
      default: "''",
      description: 'Valor do input (v-model)'
    }, {
      name: 'type',
      type: 'String',
      default: "'text'",
      description: 'Tipo: text, email, number, password, tel, url, search'
    }, {
      name: 'placeholder',
      type: 'String',
      default: "''",
      description: 'Texto placeholder'
    }, {
      name: 'state',
      type: 'String',
      default: "''",
      description: "Estado de validação: 'valid', 'invalid', 'warning'"
    }, {
      name: 'size',
      type: 'String',
      default: "'md'",
      description: "Tamanho: 'sm' (32px), 'md' (38px), 'lg' (46px)"
    }, {
      name: 'icon',
      type: 'String',
      default: "''",
      description: 'Ícone Bootstrap Icons (ex: search, person, envelope)'
    }, {
      name: 'icon-position',
      type: 'String',
      default: "'left'",
      description: "Posição do ícone: 'left' ou 'right'"
    }, {
      name: 'disabled',
      type: 'Boolean',
      default: 'false',
      description: 'Desabilita interação'
    }, {
      name: 'readonly',
      type: 'Boolean',
      default: 'false',
      description: 'Apenas leitura'
    }, {
      name: 'maxLength',
      type: 'Number',
      default: 'null',
      description: 'Máximo de caracteres permitidos'
    }])}
    \`,
    features: [{
      icon: 'check_circle',
      title: 'Validação Integrada',
      description: 'Estados valid/invalid/warning com feedback visual'
    }, {
      icon: 'text_fields',
      title: '7 Tipos de Input',
      description: 'text, email, number, password, tel, url, search'
    }, {
      icon: 'straighten',
      title: '3 Tamanhos',
      description: 'sm (32px), md (38px), lg (46px)'
    }, {
      icon: 'emoji_emotions',
      title: 'Ícones Opcionais',
      description: 'Bootstrap Icons à esquerda ou direita'
    }, {
      icon: 'accessibility_new',
      title: 'Acessível',
      description: 'ARIA labels, keyboard navigation, contraste WCAG AA'
    }, {
      icon: 'speed',
      title: 'Performance',
      description: 'Componente leve sem dependências pesadas'
    }],
    relatedComponents: [{
      name: 'EFormCheck',
      path: '/story/front-office-forms-eformcheck--default'
    }, {
      name: 'ESelect',
      path: '/story/front-office-forms-eselect--default'
    }, {
      name: 'ETextarea',
      path: '/story/front-office-forms-etextarea--default'
    }]
  })
}`,...(d=(p=o.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var c,m,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: '🎨 Playground',
  args: {
    value: '',
    placeholder: 'Digite aqui...',
    type: 'text',
    size: 'md',
    state: '',
    disabled: false,
    readonly: false,
    icon: '',
    iconPosition: 'left',
    maxLength: null
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Valor do input'
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'password', 'tel', 'url', 'search'],
      description: 'Tipo de input'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do input'
    },
    state: {
      control: 'select',
      options: ['', 'valid', 'invalid', 'warning'],
      description: 'Estado de validação'
    },
    icon: {
      control: 'text',
      description: 'Ícone Bootstrap Icons (ex: search, person, envelope)'
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do ícone'
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interação'
    },
    readonly: {
      control: 'boolean',
      description: 'Apenas leitura'
    },
    maxLength: {
      control: 'number',
      description: 'Máximo de caracteres'
    }
  },
  render: args => {
    const sizeMap = {
      sm: '32px',
      md: '38px',
      lg: '46px'
    };
    const paddingMap = {
      sm: '8px 12px',
      md: '10px 14px',
      lg: '12px 16px'
    };
    const fontSizeMap = {
      sm: '13px',
      md: '14px',
      lg: '16px'
    };
    const stateStyles = {
      valid: 'border: 2px solid #28C76F; background-color: #F0FDF4;',
      invalid: 'border: 2px solid #EA5455; background-color: #FEF2F2;',
      warning: 'border: 2px solid #FF9F43; background-color: #FFF8F0;',
      '': 'border: 1px solid #D8D6DE;'
    };
    const hasIcon = args.icon && args.icon.trim() !== '';
    const iconPaddingLeft = hasIcon && args.iconPosition === 'left' ? '42px' : paddingMap[args.size].split(' ')[1];
    const iconPaddingRight = hasIcon && args.iconPosition === 'right' ? '42px' : paddingMap[args.size].split(' ')[1];
    return \`
      <div style="max-width: 500px; padding: 20px; font-family: Inter, sans-serif;">
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Interactive Playground
        </label>
        <div style="position: relative;">
          \${hasIcon && args.iconPosition === 'left' ? \`<i class="bi bi-\${args.icon}" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px; pointer-events: none;"></i>\` : ''}
          <input 
            type="\${args.type}"
            placeholder="\${args.placeholder}"
            value="\${args.value}"
            \${args.disabled ? 'disabled' : ''}
            \${args.readonly ? 'readonly' : ''}
            \${args.maxLength ? \`maxlength="\${args.maxLength}"\` : ''}
            style="
              width: 100%; 
              height: \${sizeMap[args.size]}; 
              padding: \${paddingMap[args.size].split(' ')[0]} \${iconPaddingRight} \${paddingMap[args.size].split(' ')[0]} \${iconPaddingLeft};
              \${stateStyles[args.state]}
              border-radius: 6px;
              font-size: \${fontSizeMap[args.size]};
              color: #5E5873;
              outline: none;
              transition: all 0.2s;
              font-family: Inter, sans-serif;
              \${args.disabled ? 'background-color: #F8F8F8; cursor: not-allowed; opacity: 0.6;' : ''}
              \${args.readonly ? 'background-color: #F8F8F8;' : ''}
            "
          />
          \${hasIcon && args.iconPosition === 'right' ? \`<i class="bi bi-\${args.icon}" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px; pointer-events: none;"></i>\` : ''}
        </div>
        \${args.state === 'valid' ? '<small style="display: block; margin-top: 4px; color: #28C76F; font-size: 12px;">✓ Valor válido</small>' : ''}
        \${args.state === 'invalid' ? '<small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">✗ Valor inválido</small>' : ''}
        \${args.state === 'warning' ? '<small style="display: block; margin-top: 4px; color: #FF9F43; font-size: 12px;">⚠ Atenção necessária</small>' : ''}
        \${args.maxLength ? \`<small style="display: block; margin-top: 4px; color: #A8AAAE; font-size: 12px; text-align: right;">\${args.value.length} / \${args.maxLength} caracteres</small>\` : ''}
      </div>
    \`;
  }
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var x,b,v;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: '🎭 Use Cases',
  render: () => \`
    <div style="display: flex; flex-direction: column; gap: 48px; padding: 20px; font-family: Inter, sans-serif; max-width: 800px;">
      
      <!-- Caso 1: Cadastro de Aluno -->
      <div style="border: 1px solid #E5E5E5; border-radius: 8px; padding: 24px; background: #FAFAFA;">
        <h3 style="margin: 0 0 16px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <i class="bi bi-pencil-square" style="color: #6E63E8; font-size: 22px;"></i>
          Caso 1: Cadastro de Aluno
        </h3>
        <p style="margin: 0 0 20px 0; color: #6E6B7B; font-size: 14px;">
          Professor cadastra novo aluno na turma com nome completo, email e matrícula.
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Nome Completo <span style="color: #EA5455;">*</span>
            </label>
            <div style="position: relative;">
              <i class="bi bi-person" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
              <input 
                type="text" 
                placeholder="Ex: Maria Silva Santos"
                style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
              />
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Email <span style="color: #EA5455;">*</span>
            </label>
            <div style="position: relative;">
              <i class="bi bi-envelope" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
              <input 
                type="email" 
                placeholder="maria@escola.com.br"
                style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
              />
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Matrícula
            </label>
            <input 
              type="text" 
              placeholder="2024001234"
              maxlength="10"
              style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
            />
            <small style="display: block; margin-top: 4px; color: #A8AAAE; font-size: 12px;">Máximo 10 caracteres</small>
          </div>
        </div>
      </div>
      
      <!-- Caso 2: Busca de Turma -->
      <div style="border: 1px solid #E5E5E5; border-radius: 8px; padding: 24px; background: #FAFAFA;">
        <h3 style="margin: 0 0 16px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <i class="bi bi-search" style="color: #6E63E8; font-size: 22px;"></i>
          Caso 2: Busca de Turma
        </h3>
        <p style="margin: 0 0 20px 0; color: #6E6B7B; font-size: 14px;">
          Coordenador busca turma por nome ou código para visualizar relatórios.
        </p>
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Buscar Turma
          </label>
          <div style="position: relative;">
            <input 
              type="search" 
              placeholder="Digite o nome ou código da turma..."
              style="width: 100%; height: 38px; padding: 10px 42px 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
            />
            <i class="bi bi-search" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
          </div>
          <small style="display: block; margin-top: 4px; color: #A8AAAE; font-size: 12px;">
            Ex: "Turma 5A", "MAT-2024-01"
          </small>
        </div>
      </div>
      
      <!-- Caso 3: Formulário de Missão -->
      <div style="border: 1px solid #E5E5E5; border-radius: 8px; padding: 24px; background: #FAFAFA;">
        <h3 style="margin: 0 0 16px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <i class="bi bi-bullseye" style="color: #6E63E8; font-size: 22px;"></i>
          Caso 3: Formulário de Missão
        </h3>
        <p style="margin: 0 0 20px 0; color: #6E6B7B; font-size: 14px;">
          Professor cria nova missão com título e pontuação máxima.
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Título da Missão <span style="color: #EA5455;">*</span>
            </label>
            <div style="position: relative;">
              <i class="bi bi-bookmark" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
              <input 
                type="text" 
                placeholder="Ex: Matemática - Frações e Operações"
                style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
              />
            </div>
          </div>
          
          <div style="display: flex; gap: 16px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
                Pontuação <span style="color: #EA5455;">*</span>
              </label>
              <div style="position: relative;">
                <i class="bi bi-star" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
                <input 
                  type="number" 
                  placeholder="100"
                  min="0"
                  max="1000"
                  style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
                />
              </div>
            </div>
            
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
                Tempo (minutos)
              </label>
              <div style="position: relative;">
                <i class="bi bi-clock" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6E6B7B; font-size: 18px;"></i>
                <input 
                  type="number" 
                  placeholder="60"
                  min="1"
                  style="width: 100%; height: 38px; padding: 10px 14px 10px 42px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #5E5873; outline: none;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  \`
}`,...(v=(b=a.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var f,g,y;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: '♿ Accessibility',
  render: () => \`
    <div style="padding: 20px; max-width: 700px; font-family: Inter, sans-serif;">
      <h2 style="margin: 0 0 24px 0; color: #4B465C; font-size: 24px; font-weight: 600;">
        ♿ Testes de Acessibilidade WCAG AA
      </h2>
      
      <!-- Keyboard Navigation -->
      <div style="margin-bottom: 40px; padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">keyboard</span>
          Navegação por Teclado
        </h3>
        <p style="margin: 0 0 16px 0; color: #6E6B7B; font-size: 14px;">
          Use <kbd style="padding: 2px 6px; background: #FFF; border: 1px solid #D8D6DE; border-radius: 4px; font-family: monospace;">Tab</kbd> para focar, 
          <kbd style="padding: 2px 6px; background: #FFF; border: 1px solid #D8D6DE; border-radius: 4px; font-family: monospace;">Shift+Tab</kbd> para voltar
        </p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <input 
            type="text" 
            placeholder="Input 1 - Pressione Tab para navegar"
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            onfocus="this.style.border='2px solid #6E63E8'; this.style.boxShadow='0 0 0 4px rgba(110, 99, 232, 0.25)';"
            onblur="this.style.border='1px solid #D8D6DE'; this.style.boxShadow='none';"
          />
          <input 
            type="text" 
            placeholder="Input 2 - Navegável por teclado"
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            onfocus="this.style.border='2px solid #6E63E8'; this.style.boxShadow='0 0 0 4px rgba(110, 99, 232, 0.25)';"
            onblur="this.style.border='1px solid #D8D6DE'; this.style.boxShadow='none';"
          />
          <input 
            type="text" 
            placeholder="Input 3 - Focus visível (anel azul)"
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            onfocus="this.style.border='2px solid #6E63E8'; this.style.boxShadow='0 0 0 4px rgba(110, 99, 232, 0.25)';"
            onblur="this.style.border='1px solid #D8D6DE'; this.style.boxShadow='none';"
          />
        </div>
      </div>
      
      <!-- ARIA Labels -->
      <div style="margin-bottom: 40px; padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">label</span>
          ARIA Labels e Associações
        </h3>
        <p style="margin: 0 0 16px 0; color: #6E6B7B; font-size: 14px;">
          Labels associados via ID para screen readers
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label id="email-label" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Email (obrigatório)
            </label>
            <input 
              type="email"
              aria-labelledby="email-label"
              aria-required="true"
              aria-describedby="email-help"
              placeholder="seu@email.com"
              style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            />
            <small id="email-help" style="display: block; margin-top: 4px; color: #6E6B7B; font-size: 12px;">
              Digite um email válido para receber notificações
            </small>
          </div>
          
          <div>
            <label id="password-label" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Senha
            </label>
            <input 
              type="password"
              aria-labelledby="password-label"
              aria-required="true"
              aria-describedby="password-requirements"
              placeholder="Mínimo 8 caracteres"
              style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
            />
            <small id="password-requirements" style="display: block; margin-top: 4px; color: #6E6B7B; font-size: 12px;">
              Mínimo 8 caracteres, incluindo letras e números
            </small>
          </div>
        </div>
      </div>
      
      <!-- Contraste -->
      <div style="margin-bottom: 40px; padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">palette</span>
          Contraste WCAG AA (Ratios Mínimos)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Texto no fundo branco</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#5E5873 - Ratio 7.5:1 ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Border padrão</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#D8D6DE - Ratio 3:1 ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Focus ring (primário)</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#6E63E8 - Ratio 4.5:1 ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px; background: #FFF; border-radius: 4px;">
            <span style="color: #5E5873; font-size: 14px;">Placeholder text</span>
            <span style="color: #28C76F; font-weight: 600; font-size: 14px;">#B8C2CC - Ratio 3.2:1 ✓</span>
          </div>
        </div>
      </div>
      
      <!-- Screen Readers -->
      <div style="padding: 20px; background: #F8F9FA; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0; color: #4B465C; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: #6E63E8; font-size: 24px;">volume_up</span>
          Suporte a Screen Readers
        </h3>
        <div style="margin-bottom: 16px;">
          <label for="screen-reader-test" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Input com feedback acessível
          </label>
          <input 
            id="screen-reader-test"
            type="text"
            aria-label="Campo de texto totalmente acessível"
            aria-describedby="sr-help"
            placeholder="Digite aqui..."
            style="width: 100%; height: 38px; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; outline: none;"
          />
          <div id="sr-help" style="display: block; margin-top: 8px; padding: 12px; background: #E7F3FF; border-left: 3px solid #00CFE8; border-radius: 4px;">
            <strong style="color: #4B465C; font-size: 13px;">Screen Reader irá anunciar:</strong>
            <ul style="margin: 8px 0 0 20px; color: #6E6B7B; font-size: 13px; line-height: 1.6;">
              <li>"Campo de texto totalmente acessível"</li>
              <li>"Digite aqui" (placeholder)</li>
              <li>Estado atual: vazio/preenchido</li>
              <li>Mensagens de erro via aria-describedby</li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  \`
}`,...(y=(g=l.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const k=["Documentation","Playground","UseCases","Accessibility"];export{l as Accessibility,o as Documentation,t as Playground,a as UseCases,k as __namedExportsOrder,C as default};
