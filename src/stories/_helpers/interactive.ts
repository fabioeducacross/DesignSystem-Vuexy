/**
 * Interactive Helpers for Storybook Stories
 * 
 * Utilities for creating interactive demos without relying on Bootstrap JS
 * or external libraries. Uses controlled state via classes and ARIA attributes.
 */

/**
 * Toggle class on element
 */
export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className);
}

/**
 * Add class to element
 */
export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

/**
 * Remove class from element
 */
export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

/**
 * Guard against disabled state
 */
export function guardDisabled(element: HTMLElement, callback: () => void): void {
  if (element.hasAttribute('disabled') || element.classList.contains('disabled')) {
    return;
  }
  callback();
}

/**
 * Set aria-expanded attribute
 */
export function setAriaExpanded(element: HTMLElement, expanded: boolean): void {
  element.setAttribute('aria-expanded', String(expanded));
}

/**
 * Get aria-expanded state
 */
export function getAriaExpanded(element: HTMLElement): boolean {
  return element.getAttribute('aria-expanded') === 'true';
}

/**
 * Toggle aria-expanded
 */
export function toggleAriaExpanded(element: HTMLElement): boolean {
  const current = getAriaExpanded(element);
  setAriaExpanded(element, !current);
  return !current;
}

/**
 * Simple state management for interactive demos
 */
export class SimpleState<T> {
  private value: T;
  private listeners: Array<(newValue: T) => void> = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    this.value = newValue;
    this.listeners.forEach(listener => listener(newValue));
  }

  subscribe(listener: (newValue: T) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

/**
 * Show/hide element
 */
export function toggleVisibility(element: HTMLElement): void {
  if (element.style.display === 'none') {
    element.style.display = '';
  } else {
    element.style.display = 'none';
  }
}

/**
 * Collapse/expand element with transition
 */
export function toggleCollapse(element: HTMLElement): void {
  if (element.classList.contains('show')) {
    element.classList.remove('show');
    element.classList.add('collapsing');
    element.style.height = element.scrollHeight + 'px';
    
    // Force reflow
    element.offsetHeight;
    
    element.style.height = '0';
    
    setTimeout(() => {
      element.classList.remove('collapsing');
      element.classList.add('collapse');
      element.style.height = '';
    }, 350);
  } else {
    element.classList.remove('collapse');
    element.classList.add('collapsing');
    element.style.height = '0';
    
    // Force reflow
    element.offsetHeight;
    
    element.style.height = element.scrollHeight + 'px';
    
    setTimeout(() => {
      element.classList.remove('collapsing');
      element.classList.add('collapse', 'show');
      element.style.height = '';
    }, 350);
  }
}

/**
 * Remove element with fade animation
 */
export function fadeOutAndRemove(element: HTMLElement): void {
  element.style.opacity = '1';
  element.style.transition = 'opacity 0.3s';
  
  element.style.opacity = '0';
  
  setTimeout(() => {
    element.remove();
  }, 300);
}

/**
 * Show toast notification
 */
export function showToast(message: string, variant: string = 'primary'): void {
  const container = document.querySelector('.toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${variant} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Show
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Auto hide after 3s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
  
  // Close button
  const closeBtn = toast.querySelector('.btn-close');
  closeBtn?.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });
}

function createToastContainer(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  document.body.appendChild(container);
  return container;
}

/**
 * Tab navigation helper
 */
export function initTabs(container: HTMLElement): void {
  const tabs = container.querySelectorAll('[role="tab"]');
  const panels = container.querySelectorAll('[role="tabpanel"]');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Deactivate all
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('show', 'active'));
      
      // Activate clicked
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panels[index]?.classList.add('show', 'active');
    });
  });
}

/**
 * Pagination helper
 */
export function initPagination(container: HTMLElement, onChange: (page: number) => void): void {
  const items = container.querySelectorAll('.page-link');
  
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = item.closest('.page-item');
      if (parent?.classList.contains('disabled') || parent?.classList.contains('active')) {
        return;
      }
      
      const page = parseInt(item.textContent || '1', 10);
      onChange(page);
    });
  });
}

/**
 * Dropdown helper (without Bootstrap JS)
 */
export function initSimpleDropdown(button: HTMLElement, menu: HTMLElement): void {
  let isOpen = false;
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    isOpen = !isOpen;
    menu.classList.toggle('show', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
  });
  
  // Close on outside click
  document.addEventListener('click', () => {
    if (isOpen) {
      isOpen = false;
      menu.classList.remove('show');
      button.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Prevent closing when clicking inside menu
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

/**
 * Form validation helper
 */
export function validateForm(form: HTMLFormElement): boolean {
  let isValid = true;
  
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  
  inputs.forEach((input) => {
    const element = input as HTMLInputElement;
    
    if (!element.value.trim()) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      isValid = false;
    } else {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
    }
  });
  
  return isValid;
}

/**
 * Clear form validation
 */
export function clearValidation(form: HTMLFormElement): void {
  const inputs = form.querySelectorAll('.is-valid, .is-invalid');
  inputs.forEach(input => {
    input.classList.remove('is-valid', 'is-invalid');
  });
}
