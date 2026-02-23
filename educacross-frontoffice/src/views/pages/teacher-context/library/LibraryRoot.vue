<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab">
    <router-view />
  </TabRouter>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import ability from '@/libs/acl/ability'
  import useFilters from '@/store/filters/useFilters.js'
  import { ref, watch } from 'vue'

  const { subject } = useFilters()

  const currentTab = ref(0)
  const tabs = ref([])

  const genTabs = () => {
    tabs.value = []

    tabs.value.push({
      title: 'Jogos',
      route: {
        name: 'MeetGames',
      },
    })

    if (ability.can(ACTION.READ, PERMISSION.MODULE.BOOKLIBRARY)) {
      tabs.value.push({
        title: 'Livros',
        route: {
          name: 'MeetBooks',
        },
      })
    }

    if (ability.can(ACTION.READ, PERMISSION.MODULE.MEET_VIDEOS)) {
      tabs.value.push({
        title: 'Vídeos',
        route: {
          name: 'MeetVideos',
        },
      })
    }

    if (ability.can(ACTION.READ, PERMISSION.MODULE.MEET_SONGS)) {
      tabs.value.push({
        title: 'Músicas',
        route: {
          name: 'MeetMusics',
        },
      })
    }

    if (ability.can(ACTION.READ, PERMISSION.MODULE.MEET_KARAOKE)) {
      tabs.value.push({
        title: 'Karaokê',
        route: {
          name: 'MeetKaraoke',
        },
      })
    }
  }

  watch(
    [subject],
    () => {
      genTabs()
    },
    { deep: true },
  )

  genTabs()
</script>