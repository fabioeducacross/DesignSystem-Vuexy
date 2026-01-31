/**
 * Bootstrap JS Loader Helpers
 * 
 * On-demand loading of Bootstrap JS components when inevitable.
 * Use sparingly - prefer controlled state via classes/ARIA when possible.
 */

declare global {
  interface Window {
    bootstrap?: {
      Tooltip: any;
      Popover: any;
      Modal: any;
      Dropdown: any;
      Offcanvas: any;
      Collapse: any;
      Toast: any;
    };
  }
}

/**
 * Ensure Bootstrap JS is loaded
 */
export async function ensureBootstrapLoaded(): Promise<boolean> {
  if (window.bootstrap) {
    return true;
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/vuexy/js/bootstrap.js';
    script.onload = () => {
      console.log('✅ Bootstrap JS carregado on-demand');
      resolve(true);
    };
    script.onerror = () => {
      console.error('❌ Falha ao carregar Bootstrap JS');
      reject(new Error('Failed to load Bootstrap JS'));
    };
    document.head.appendChild(script);
  });
}

/**
 * Initialize tooltips on elements
 */
export async function initTooltips(selector: string = '[data-bs-toggle="tooltip"]'): Promise<void> {
  await ensureBootstrapLoaded();
  
  if (!window.bootstrap?.Tooltip) {
    console.warn('Bootstrap Tooltip não disponível');
    return;
  }
  
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    new window.bootstrap!.Tooltip(element);
  });
  
  console.log(`✅ ${elements.length} tooltips inicializados`);
}

/**
 * Initialize popovers on elements
 */
export async function initPopovers(selector: string = '[data-bs-toggle="popover"]'): Promise<void> {
  await ensureBootstrapLoaded();
  
  if (!window.bootstrap?.Popover) {
    console.warn('Bootstrap Popover não disponível');
    return;
  }
  
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    new window.bootstrap!.Popover(element);
  });
  
  console.log(`✅ ${elements.length} popovers inicializados`);
}

/**
 * Initialize dropdowns on elements
 */
export async function initDropdowns(selector: string = '[data-bs-toggle="dropdown"]'): Promise<void> {
  await ensureBootstrapLoaded();
  
  if (!window.bootstrap?.Dropdown) {
    console.warn('Bootstrap Dropdown não disponível');
    return;
  }
  
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    new window.bootstrap!.Dropdown(element);
  });
  
  console.log(`✅ ${elements.length} dropdowns inicializados`);
}

/**
 * Initialize modal
 */
export async function initModal(element: HTMLElement): Promise<any> {
  await ensureBootstrapLoaded();
  
  if (!window.bootstrap?.Modal) {
    console.warn('Bootstrap Modal não disponível');
    return null;
  }
  
  return new window.bootstrap.Modal(element);
}

/**
 * Initialize offcanvas
 */
export async function initOffcanvas(element: HTMLElement): Promise<any> {
  await ensureBootstrapLoaded();
  
  if (!window.bootstrap?.Offcanvas) {
    console.warn('Bootstrap Offcanvas não disponível');
    return null;
  }
  
  return new window.bootstrap.Offcanvas(element);
}

/**
 * Initialize collapse
 */
export async function initCollapse(element: HTMLElement): Promise<any> {
  await ensureBootstrapLoaded();
  
  if (!window.bootstrap?.Collapse) {
    console.warn('Bootstrap Collapse não disponível');
    return null;
  }
  
  return new window.bootstrap.Collapse(element, { toggle: false });
}
