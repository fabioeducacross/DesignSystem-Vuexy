import axios from '@/libs/axios'

const resource = '/v1/notifications'

/**
 * @typedef {Object} MediaContent
 * @property {number} type - O tipo do conteúdo de mídia, onde 0 é Imagem e 1 é Vídeo.
 * @property {string|null} content - A URL do conteúdo de mídia, que pode ser nula.
 *
 * @typedef {Object} Notification
 * @property {number} id - O identificador único da notificação.
 * @property {string} title - O título da notificação.
 * @property {string} publishDate - A data de publicação da notificação no formato ISO 8601.
 * @property {string|null} description - Uma descrição opcional da notificação.
 * @property {MediaContent[]} mediaContent - Um array contendo o conteúdo de mídia da notificação.
 * @property {number} status - O status da notificação, onde 0 é None, 1 é Received, e 2 é WasRead.
 *
 * @typedef {Notification[]} GetNotificationsResponse - Um array de objetos Notification.
 */

/**
 * Faz uma requisição GET para o endpoint de notificações para recuperar a lista de notificações.
 *
 * Esta função consulta o endpoint `v1/notifications` e retorna uma promessa que, quando resolvida,
 * fornece um objeto com a lista de notificações. Cada notificação inclui um ID, título, data de publicação,
 * descrição opcional, conteúdo de mídia (que pode ser uma imagem ou vídeo), e o status da notificação.
 *
 * @returns {Promise<AxiosResponse<GetNotificationsResponse>>} Uma promessa que resolve para a resposta do Axios contendo a lista de notificações.
 */
export const getNotifications = () => axios.get(resource)
