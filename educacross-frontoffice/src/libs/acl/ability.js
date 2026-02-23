import { initialAbility } from './config'
import { Ability } from '@casl/ability'

const ability = new Ability([])
export const abilityInstitution = new Ability([])

export function updateAbility(newAbility) {
  if (!newAbility) {
    ability.update(initialAbility)
    return initialAbility
  }

  newAbility = newAbility.filter(item => item)
  newAbility = initialAbility.concat(newAbility)

  ability.update(newAbility)
  return newAbility
}

export function updateInstitutionAbility(newAbility) {
  if (!newAbility) {
    abilityInstitution.update(initialAbility)
    return initialAbility
  }

  newAbility = newAbility.filter(item => item)
  newAbility = initialAbility.concat(newAbility)

  abilityInstitution.update(newAbility)
  return newAbility
}

export const getAbilities = (abilities, moduleParam) => {
  if (!Object.values(abilities).length) return []

  const generalPermissions = abilities.generalPermissions ?? []
  const modulePermissions = abilities.modulePermissions ?? {}

  if (moduleParam) {
    const paramModulePermissions = modulePermissions[moduleParam] ?? []
    return [...generalPermissions, ...paramModulePermissions]
  }

  const uniqueSet = new Set()

  return [
    ...generalPermissions,
    ...Object.values(modulePermissions)
      .flat()
      .filter(item => {
        const key = `${item.action}_${item.subject}`

        if (!uniqueSet.has(key)) {
          uniqueSet.add(key)
          return true
        }

        return false
      }),
  ]
}

export default ability
