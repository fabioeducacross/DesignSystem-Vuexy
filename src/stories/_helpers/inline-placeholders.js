/**
 * Placeholders SVG Inline - Para usar diretamente em HTML sem imports
 * Use data URIs diretamente nos src das imagens
 */

// AVATARES - Cores diferentes para distinguir usuários
export const AVATAR_PRIMARY = (initials = 'JD', size = 40) => 
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.floor(size*0.35)}' fill='white' text-anchor='middle' dy='.35em'%3E${initials}%3C/text%3E%3C/svg%3E`;

export const AVATAR_SUCCESS = (initials = 'JS', size = 40) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.floor(size*0.35)}' fill='white' text-anchor='middle' dy='.35em'%3E${initials}%3C/text%3E%3C/svg%3E`;

export const AVATAR_WARNING = (initials = 'MB', size = 40) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.floor(size*0.35)}' fill='white' text-anchor='middle' dy='.35em'%3E${initials}%3C/text%3E%3C/svg%3E`;

export const AVATAR_DANGER = (initials = 'RP', size = 40) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='%23ff4c51'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.floor(size*0.35)}' fill='white' text-anchor='middle' dy='.35em'%3E${initials}%3C/text%3E%3C/svg%3E`;

export const AVATAR_INFO = (initials = 'SK', size = 40) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='%2316b1ff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.floor(size*0.35)}' fill='white' text-anchor='middle' dy='.35em'%3E${initials}%3C/text%3E%3C/svg%3E`;

// PRODUTOS - Para e-commerce, cart, etc
export const PRODUCT_PLACEHOLDER = (size = 150) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Crect width='${size}' height='${size}' fill='%23f5f5f9'/%3E%3Cpath d='M${size*0.4},${size*0.33} L${size*0.6},${size*0.33} L${size*0.6},${size*0.53} L${size*0.53},${size*0.67} L${size*0.47},${size*0.67} L${size*0.4},${size*0.53} Z' fill='%23dbdade'/%3E%3Ccircle cx='${size*0.5}' cy='${size*0.4}' r='${size*0.053}' fill='%23696cff'/%3E%3Ctext x='50%25' y='85%25' font-family='Arial' font-size='${Math.floor(size*0.08)}' fill='%2399a1b7' text-anchor='middle'%3E${size}x${size}%3C/text%3E%3C/svg%3E`;

// BANNERS/SLIDES - Para carousels, heroes
export const BANNER_PLACEHOLDER = (width = 800, height = 400, index = 1) => {
  const gradients = [
    ['%23696cff', '%238e92fd'], // Primary
    ['%2356ca00', '%2371dd37'], // Success
    ['%23ffb400', '%23ffc107'], // Warning
  ];
  const [color1, color2] = gradients[(index - 1) % 3];
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${color1};stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:${color2};stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='url(%23grad${index})'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${Math.floor(height*0.06)}' fill='white' text-anchor='middle' dy='.35em'%3E${width}x${height}%3C/text%3E%3C/svg%3E`;
};

// ILUSTRAÇÕES - Para auth pages, error pages
export const ILLUSTRATION_PLACEHOLDER = (width = 200, height = 200, type = 'auth') => {
  const types = {
    auth: `%3Ccircle cx='100' cy='80' r='30' fill='%23e7e7ff'/%3E%3Crect x='70' y='110' width='60' height='70' rx='5' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='12' fill='%23696cff' text-anchor='middle'%3EAuth%3C/text%3E`,
    error: `%3Ctext x='50%25' y='40%25' font-family='Arial' font-size='60' fill='%23e7e7ff' text-anchor='middle'%3E404%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='14' fill='%2399a1b7' text-anchor='middle'%3EPage Not Found%3C/text%3E`,
    profile: `%3Crect x='0' y='0' width='${width}' height='${height*0.4}' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='20%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EProfile Banner%3C/text%3E`,
  };
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='%23f5f5f9'/%3E${types[type] || types.auth}%3C/svg%3E`;
};

// Strings prontas para substituição direta (sem function call)
export const AVATARS = {
  // Tamanho 40px (padrão)
  PRIMARY_40: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E`,
  SUCCESS_40: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E`,
  WARNING_40: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E`,
  DANGER_40: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ff4c51'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ERP%3C/text%3E%3C/svg%3E`,
  INFO_40: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2316b1ff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ESK%3C/text%3E%3C/svg%3E`,
  
  // Tamanho 32px (buttons, tooltips)
  PRIMARY_32: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='11' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E`,
  SUCCESS_32: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='11' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E`,
  WARNING_32: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='11' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E`,
  
  // Tamanho 80px (profile, large avatars)
  PRIMARY_80: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='28' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E`,
};

export const PRODUCTS = {
  SMALL_60: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23f5f5f9'/%3E%3Cpath d='M24,20 L36,20 L36,32 L32,40 L28,40 L24,32 Z' fill='%23dbdade'/%3E%3Ccircle cx='30' cy='24' r='3' fill='%23696cff'/%3E%3C/svg%3E`,
  MEDIUM_100: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f9'/%3E%3Cpath d='M40,33 L60,33 L60,53 L53,67 L47,67 L40,53 Z' fill='%23dbdade'/%3E%3Ccircle cx='50' cy='40' r='5' fill='%23696cff'/%3E%3C/svg%3E`,
  LARGE_150: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%23f5f5f9'/%3E%3Cpath d='M60,50 L90,50 L90,80 L80,100 L70,100 L60,80 Z' fill='%23dbdade'/%3E%3Ccircle cx='75' cy='60' r='8' fill='%23696cff'/%3E%3Ctext x='50%25' y='85%25' font-family='Arial' font-size='12' fill='%2399a1b7' text-anchor='middle'%3E150x150%3C/text%3E%3C/svg%3E`,
};

export const BANNERS = {
  // Carousel comum
  SLIDE_1: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E`,
  SLIDE_2: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E`,
  SLIDE_3: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E`,
  
  // Profile banner
  PROFILE_BANNER: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='300'%3E%3Cdefs%3E%3ClinearGradient id='profGrad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='300' fill='url(%23profGrad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dy='.35em'%3EProfile Banner%3C/text%3E%3C/svg%3E`,
};

export const ILLUSTRATIONS = {
  AUTH_LOGIN: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3ELogin%3C/text%3E%3C/svg%3E`,
  AUTH_REGISTER: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3ERegister%3C/text%3E%3C/svg%3E`,
  AUTH_FORGOT: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3EForgot%3C/text%3E%3C/svg%3E`,
  ERROR_404: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23f5f5f9'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial' font-size='120' fill='%23e7e7ff' text-anchor='middle'%3E404%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='24' fill='%2399a1b7' text-anchor='middle'%3EPage Not Found%3C/text%3E%3C/svg%3E`,
};
