import store from '@/store'
import { computed } from 'vue'

const moduleName = 'educationSystemMissionPlus'

export function useEducationSystemMissionPlus() {
  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: value => store.commit(`${moduleName}/loading`, value),
  })

  const tableStrongWeak = computed({
    get: () => store.getters[`${moduleName}/tableStrongWeak`],
    set: value => store.commit(`${moduleName}/tableStrongWeak`, value),
  })

  const rounds = computed({
    get: () => store.getters[`${moduleName}/rounds`],
    set: value => store.commit(`${moduleName}/rounds`, value),
  })

  const name = computed({
    get: () => store.getters[`${moduleName}/name`],
    set: value => store.commit(`${moduleName}/name`, value),
  })

  const serieName = computed({
    get: () => store.getters[`${moduleName}/serieName`],
    set: value => store.commit(`${moduleName}/serieName`, value),
  })

  const className = computed({
    get: () => store.getters[`${moduleName}/className`],
    set: value => store.commit(`${moduleName}/className`, value),
  })

  const student = computed({
    get: () => store.getters[`${moduleName}/student`],
    set: value => store.commit(`${moduleName}/student`, value),
  })

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const fetch = () => {
    store.dispatch(`${moduleName}/fetch`)
  }

  return {
    student,
    moduleName,
    loading,
    tableStrongWeak,
    rounds,
    name,
    serieName,
    className,
    cards,
    fetch,
    educationSystemName,
  }
}