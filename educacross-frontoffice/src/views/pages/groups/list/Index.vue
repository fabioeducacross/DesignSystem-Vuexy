<template>
  <section>
    <SimpleTab v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" />
    <GroupsListActions v-model="showOnlyEmptyGroups" :selected-groups="selectedGroups" />
    <GroupsListTable v-model="selectedGroups" :show-only-empty-groups="showOnlyEmptyGroups" />
  </section>
</template>

<script setup>
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import GroupsListActions from '@/views/pages/groups/list/GroupsListActions.vue'
import GroupsListTable from '@/views/pages/groups/list/GroupsListTable.vue'
import { ref } from 'vue'

const showOnlyEmptyGroups = ref(false)
const selectedGroups = ref([])
</script>

<style lang="scss" scoped></style>