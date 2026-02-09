/**
 * Mascots Helper - Educacross Brand Mascots
 * =========================================
 * 
 * Helper functions for rendering Belinha mascot images
 * from educacross-frontoffice assets.
 */

/**
 * Get mascot image HTML
 * @param {string} emotion - Mascot emotion (copy-link, success, success2, doubt, enable-script)
 * @param {Object} options - Image options (class, style, alt)
 * @returns {string} HTML img tag
 */
export function getMascotImage(emotion = 'copy-link', options = {}) {
  const {
    className = 'mascot-image',
    style = '',
    alt = 'Belinha mascote'
  } = options;

  const emotionMap = {
    'copy-link': 'belinha-school-copy_link.png',
    'success': 'belinha-school-success.png',
    'success2': 'belinha-school-success2.png',
    'doubt': 'belinha-school-doubt.png',
    'enable-script': 'belinha-school-enable-script.png',
  };

  const imageName = emotionMap[emotion] || emotionMap['copy-link'];
  const imagePath = `/educacross-assets/belinha/${imageName}`;

  return `<img src="${imagePath}" class="${className}" style="${style}" alt="${alt}" />`;
}

/**
 * Get mascot for CopyLink component
 */
export function getCopyLinkMascot(options = {}) {
  return getMascotImage('copy-link', {
    ...options,
    alt: 'Belinha - copiar link'
  });
}

/**
 * Get mascot for DeleteGuide component  
 */
export function getDeleteGuideMascot(options = {}) {
  return getMascotImage('enable-script', {
    ...options,
    alt: 'Belinha - excluir missão'
  });
}

/**
 * Get mascot for ShareGuide component
 */
export function getShareGuideMascot(options = {}) {
  return getMascotImage('success2', {
    ...options,
    alt: 'Belinha - compartilhar'
  });
}

/**
 * Get mascot for success feedback
 */
export function getSuccessMascot(options = {}) {
  return getMascotImage('success', {
    ...options,
    alt: 'Belinha - sucesso'
  });
}

/**
 * Get mascot for doubt/help feedback
 */
export function getDoubtMascot(options = {}) {
  return getMascotImage('doubt', {
    ...options,
    alt: 'Belinha - dúvida'
  });
}
