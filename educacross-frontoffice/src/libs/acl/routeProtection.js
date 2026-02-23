import ability from './ability'

export const canNavigate = to => ability.can(to.meta.action || 'read', to.meta.resource)

export const _ = undefined
