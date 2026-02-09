/**
 * Vue Parser Tests
 */

import { describe, it, expect } from 'vitest';
import { parseVueCode } from '../src/parsers/vue-parser.js';

describe('Vue Parser', () => {
  it('deveria extrair props tipados', () => {
    const code = `
<template>
  <div>{{ label }}</div>
</template>

<script setup>
defineProps<{
  label: string;
  size?: 'sm' | 'md' | 'lg';
  count: number;
}>();
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.props).toHaveLength(3);
    
    const labelProp = result.component.props.find(p => p.name === 'label');
    expect(labelProp).toBeDefined();
    expect(labelProp?.type).toBe('string');
    expect(labelProp?.required).toBe(true);
    
    const sizeProp = result.component.props.find(p => p.name === 'size');
    expect(sizeProp?.required).toBe(false);
    expect(sizeProp?.type).toBe("'sm' | 'md' | 'lg'");
  });
  
  it('deveria detectar v-model prop', () => {
    const code = `
<script setup>
defineProps<{
  modelValue: string;
  name: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    const modelProp = result.component.props.find(p => p.name === 'modelValue');
    expect(modelProp?.isVModel).toBe(true);
    
    const modelEvent = result.component.events.find(e => e.name === 'update:modelValue');
    expect(modelEvent?.isVModelUpdate).toBe(true);
  });
  
  it('deveria extrair events tipados', () => {
    const code = `
<script setup>
defineEmits<{
  'submit': [];
  'update:value': [value: number];
  'change': [oldValue: string, newValue: string];
}>();
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.events).toHaveLength(3);
    
    const submitEvent = result.component.events.find(e => e.name === 'submit');
    expect(submitEvent).toBeDefined();
    
    const updateEvent = result.component.events.find(e => e.name === 'update:value');
    expect(updateEvent).toBeDefined();
    expect(updateEvent?.payload).toBeDefined();
  });
  
  it('deveria extrair slots nomeados', () => {
    const code = `
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.slots).toHaveLength(3);
    expect(result.component.slots.map(s => s.name)).toContain('header');
    expect(result.component.slots.map(s => s.name)).toContain('default');
    expect(result.component.slots.map(s => s.name)).toContain('footer');
  });
  
  it('deveria extrair apenas slot default se não houver nomeados', () => {
    const code = `
<template>
  <div>
    <slot></slot>
  </div>
</template>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.slots).toHaveLength(1);
    expect(result.component.slots[0].name).toBe('default');
  });
  
  it('deveria lidar com defineProps runtime', () => {
    const code = `
<script setup>
defineProps({
  label: String,
  count: Number,
  active: Boolean
});
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.props).toHaveLength(3);
    expect(result.component.props.map(p => p.name)).toContain('label');
    expect(result.component.props.map(p => p.name)).toContain('count');
    expect(result.component.props.map(p => p.name)).toContain('active');
  });
  
  it('deveria lidar com defineEmits runtime', () => {
    const code = `
<script setup>
defineEmits(['submit', 'cancel', 'update:value']);
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.events).toHaveLength(3);
    expect(result.component.events.map(e => e.name)).toContain('submit');
    expect(result.component.events.map(e => e.name)).toContain('cancel');
    
    const updateEvent = result.component.events.find(e => e.name === 'update:value');
    expect(updateEvent?.isVModelUpdate).toBe(true);
  });
  
  it('deveria retornar warnings se parsing parcial falhar', () => {
    const code = `
<template>
  <div></div>
</template>

<script setup>
// Sintaxe inválida propositalmente para testar error handling
defineProps<{
  broken syntax here
}>();
</script>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    // Deve continuar parsing mesmo com erro
    expect(result.warnings).toBeDefined();
    expect(result.component).toBeDefined();
  });
  
  it('deveria não duplicar slots com mesmo nome', () => {
    const code = `
<template>
  <div>
    <slot name="header"></slot>
    <slot name="header"></slot>
    <slot name="header"></slot>
  </div>
</template>
    `.trim();
    
    const result = parseVueCode(code, 'Test.vue');
    
    expect(result.component.slots).toHaveLength(1);
    expect(result.component.slots[0].name).toBe('header');
  });
});
