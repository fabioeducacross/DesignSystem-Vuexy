<template>
  <div>
    <div class="title-students text-primary mb-8 px-6">Alunos</div>
    <div class="students-container px-6">
      <div
        v-for="(student, index) in students"
        :key="index"
        class="text-students color-patternTwo py-4"
      >
        <span>Nome:</span> <strong> {{ student.Name }} </strong> <br />
        <span>Nome de usuário:</span> <strong> {{ student.UserName }} </strong>
        <br />
        <span>Escola:</span> <strong> {{ student.SchoolName }} </strong> <br />

        <hr class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    students: {
      type: Array,
      default: () => [],
    },
  })
</script>

<style lang="scss" scoped>
  .title-students {
    font-weight: bold;
    font-size: 30px;
    line-height: 34px;
  }

  .students-container {
    height: 28rem;
    overflow-y: auto;
  }

  .text-students {
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
  }
</style>