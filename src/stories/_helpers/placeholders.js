/**
 * Placeholders SVG para Design System
 * Uso: import { AvatarPlaceholder, ThumbnailPlaceholder } from '../_helpers/placeholders'
 */

/**
 * Avatar Placeholder com iniciais
 * @param {string} initials - Iniciais (ex: "JD", "AB")
 * @param {string} bg - Cor de fundo (hex, ex: "#696cff")
 * @param {number} size - Tamanho em pixels (default: 40)
 */
export const AvatarPlaceholder = (initials = 'DS', bg = '#696cff', size = 40) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect width='${size}' height='${size}' fill='${encodeURIComponent(bg)}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='${Math.floor(size * 0.4)}' fill='white' text-anchor='middle' dy='.35em'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

/**
 * Thumbnail Placeholder (miniatura de imagem)
 * @param {number} width - Largura em pixels
 * @param {number} height - Altura em pixels
 * @param {string} text - Texto a exibir (default: dimensões)
 */
export const ThumbnailPlaceholder = (width = 200, height = 150, text = null) => {
  const displayText = text || `${width}×${height}`;
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23e7e7ff'/%3E%3Cpath d='M${width * 0.3} ${height * 0.4} L${width * 0.5} ${height * 0.6} L${width * 0.7} ${height * 0.35} L${width * 0.8} ${height * 0.7} L${width * 0.2} ${height * 0.7} Z' fill='%23696cff' opacity='0.3'/%3E%3Ccircle cx='${width * 0.3}' cy='${height * 0.3}' r='${Math.min(width, height) * 0.08}' fill='%23696cff' opacity='0.5'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='14' fill='%23696cff' text-anchor='middle' dy='.35em'%3E${displayText}%3C/text%3E%3C/svg%3E`;
};

/**
 * Banner Placeholder (hero/carousel)
 * @param {number} width - Largura em pixels
 * @param {number} height - Altura em pixels
 */
export const BannerPlaceholder = (width = 800, height = 400) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23444564;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='24' font-weight='bold' fill='white' text-anchor='middle' dy='.35em'%3E${width}×${height}%3C/text%3E%3C/svg%3E`;
};

/**
 * Empty State Illustration
 * @param {number} size - Tamanho em pixels (default: 200)
 */
export const EmptyStateIllustration = (size = 200) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size * 0.4}' fill='%23f5f5f9'/%3E%3Cpath d='M${size * 0.35} ${size * 0.45} L${size * 0.65} ${size * 0.45} L${size * 0.65} ${size * 0.55} L${size * 0.35} ${size * 0.55} Z' fill='%23d1d1e0'/%3E%3Cpath d='M${size * 0.4} ${size * 0.35} L${size * 0.6} ${size * 0.35} L${size * 0.6} ${size * 0.4} L${size * 0.4} ${size * 0.4} Z' fill='%23b8b8d2'/%3E%3Cpath d='M${size * 0.4} ${size * 0.6} L${size * 0.6} ${size * 0.6} L${size * 0.6} ${size * 0.65} L${size * 0.4} ${size * 0.65} Z' fill='%23b8b8d2'/%3E%3C/svg%3E`;
};

/**
 * Product Placeholder (ecommerce)
 * @param {number} size - Tamanho em pixels (default: 150)
 */
export const ProductPlaceholder = (size = 150) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect width='${size}' height='${size}' fill='%23ffffff'/%3E%3Crect x='${size * 0.15}' y='${size * 0.15}' width='${size * 0.7}' height='${size * 0.7}' rx='8' fill='%23f0f0f7'/%3E%3Cpath d='M${size * 0.35} ${size * 0.4} L${size * 0.5} ${size * 0.3} L${size * 0.65} ${size * 0.4} L${size * 0.65} ${size * 0.6} L${size * 0.35} ${size * 0.6} Z' fill='%23696cff' opacity='0.4'/%3E%3Ccircle cx='${size * 0.4}' cy='${size * 0.7}' r='${size * 0.05}' fill='%23696cff' opacity='0.6'/%3E%3Ccircle cx='${size * 0.6}' cy='${size * 0.7}' r='${size * 0.05}' fill='%23696cff' opacity='0.6'/%3E%3C/svg%3E`;
};

/**
 * Card Image Placeholder
 * @param {number} width - Largura em pixels
 * @param {number} height - Altura em pixels  
 */
export const CardImagePlaceholder = (width = 350, height = 200) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f8f7fa'/%3E%3Cg transform='translate(${width/2 - 30}, ${height/2 - 30})'%3E%3Crect x='10' y='20' width='40' height='30' rx='2' fill='%23d4d2e1'/%3E%3Ccircle cx='20' cy='30' r='5' fill='%23696cff' opacity='0.5'/%3E%3Cpath d='M15 40 L25 32 L35 38 L45 30 L45 50 L15 50 Z' fill='%23696cff' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E`;
};

// Avatares pré-configurados com cores diferentes
export const AvatarPresets = {
  primary: (initials, size) => AvatarPlaceholder(initials, '#696cff', size),
  success: (initials, size) => AvatarPlaceholder(initials, '#56ca00', size),
  warning: (initials, size) => AvatarPlaceholder(initials, '#ffb400', size),
  danger: (initials, size) => AvatarPlaceholder(initials, '#ff4c51', size),
  info: (initials, size) => AvatarPlaceholder(initials, '#16b1ff', size),
  secondary: (initials, size) => AvatarPlaceholder(initials, '#8592a3', size),
};
