/**
 * Helper para aguardar resolução de todas as promises pendentes
 * Substitui setTimeout arbitrários nos testes
 *
 * @returns {Promise<void>}
 */
export const flushPromises = () =>
  new Promise(resolve => {
    // setImmediate não funciona consistentemente no Jest/JSDOM
    // Usar setTimeout com 0ms permite que promises sejam resolvidas
    setTimeout(resolve, 0)
  })

/**
 * Aguarda o próximo tick do Vue
 * Útil para testes que precisam aguardar atualizações de reatividade
 *
 * @param {Object} vm - Instância do Vue
 * @returns {Promise<void>}
 */
export const nextTick = vm => vm.$nextTick()
