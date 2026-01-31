/**
 * Interactive Helpers for Storybook
 * 
 * Utilities para adicionar interatividade controlada aos componentes
 * sem depender do JS do Vuexy.
 */

/**
 * Simula useState do React para uso em stories HTML
 * Retorna função para criar estado local isolado por story
 */
export const createState = (initialValue) => {
  let value = initialValue;
  const listeners = [];
  
  return {
    get: () => value,
    set: (newValue) => {
      value = typeof newValue === 'function' ? newValue(value) : newValue;
      listeners.forEach(fn => fn(value));
    },
    subscribe: (fn) => {
      listeners.push(fn);
      return () => {
        const index = listeners.indexOf(fn);
        if (index > -1) listeners.splice(index, 1);
      };
    }
  };
};

/**
 * Helper para criar event handler de click
 * Previne comportamento default e executa callback se não estiver disabled
 */
export const createClickHandler = (element, callback, options = {}) => {
  const { disabled = false, preventDefault = true } = options;
  
  return (event) => {
    if (preventDefault) {
      event.preventDefault();
    }
    
    if (disabled || element?.hasAttribute('disabled') || element?.classList.contains('disabled')) {
      return;
    }
    
    callback(event);
  };
};

/**
 * Helper para criar event handler de change/input
 * Atualiza estado e dispara callback
 */
export const createChangeHandler = (callback, options = {}) => {
  const { disabled = false } = options;
  
  return (event) => {
    if (disabled || event.target.disabled) {
      return;
    }
    
    const value = event.target.type === 'checkbox' || event.target.type === 'radio'
      ? event.target.checked
      : event.target.value;
    
    callback(value, event);
  };
};

/**
 * Helper para adicionar suporte a teclado (Enter/Escape)
 */
export const addKeyboardSupport = (element, handlers = {}) => {
  const { onEnter, onEscape, onSpace } = handlers;
  
  const keyHandler = (event) => {
    if (event.key === 'Enter' && onEnter) {
      event.preventDefault();
      onEnter(event);
    } else if (event.key === 'Escape' && onEscape) {
      event.preventDefault();
      onEscape(event);
    } else if (event.key === ' ' && onSpace) {
      event.preventDefault();
      onSpace(event);
    }
  };
  
  element.addEventListener('keydown', keyHandler);
  
  return () => element.removeEventListener('keydown', keyHandler);
};

/**
 * Helper para toggle de classes CSS
 */
export const toggleClass = (element, className, force) => {
  if (force !== undefined) {
    element.classList.toggle(className, force);
  } else {
    element.classList.toggle(className);
  }
};

/**
 * Helper para atualizar múltiplos elementos com mesma classe
 */
export const updateElements = (container, selector, callback) => {
  const elements = container.querySelectorAll(selector);
  elements.forEach(callback);
};

/**
 * Helper para criar ID único para componente
 */
export const createUniqueId = (prefix = 'interactive') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Helper para delay/debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Helper para criar story interativa com cleanup automático
 */
export const createInteractiveStory = (renderFn, initFn, cleanupFn) => {
  return () => {
    const containerId = createUniqueId();
    const markup = renderFn(containerId);
    
    setTimeout(() => {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      const cleanup = initFn(container);
      
      // Store cleanup para ser chamado quando a story for destruída
      if (cleanup && typeof cleanup === 'function') {
        container._cleanup = cleanup;
      }
      
      if (cleanupFn) {
        container._additionalCleanup = cleanupFn;
      }
    }, 100);
    
    return markup;
  };
};

/**
 * Helper para validação de formulário
 */
export const validateField = (field, rules = {}) => {
  const value = field.value?.trim() || '';
  const { required, minLength, maxLength, pattern, custom } = rules;
  
  if (required && !value) {
    return { valid: false, message: 'This field is required' };
  }
  
  if (minLength && value.length < minLength) {
    return { valid: false, message: `Minimum ${minLength} characters required` };
  }
  
  if (maxLength && value.length > maxLength) {
    return { valid: false, message: `Maximum ${maxLength} characters allowed` };
  }
  
  if (pattern && !pattern.test(value)) {
    return { valid: false, message: 'Invalid format' };
  }
  
  if (custom && !custom(value)) {
    return { valid: false, message: 'Validation failed' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Helper para aplicar estado de validação visual
 */
export const applyValidationState = (field, isValid, message = '') => {
  field.classList.remove('is-valid', 'is-invalid');
  field.classList.add(isValid ? 'is-valid' : 'is-invalid');
  
  // Atualizar mensagem de feedback se existir
  const feedback = field.parentElement?.querySelector('.invalid-feedback, .valid-feedback');
  if (feedback) {
    feedback.textContent = message;
  }
};

/**
 * Log helper para debug (pode ser desabilitado em produção)
 */
export const log = (message, data) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Interactive Story] ${message}`, data || '');
  }
};
