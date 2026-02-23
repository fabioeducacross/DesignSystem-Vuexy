<script setup>
  // ⚠️ Import Preservation Rule: Copy exactly as in original file
  // No other imports present in original file

  // Props
  const props = defineProps({
    schoolName: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    classSeries: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <div class="border rounded text-black mb-50" style="padding: 1.25rem; height: 126px">
    <p style="margin-bottom: 0.625rem; line-height: 22px">
      Escola: <span class="font-bold">{{ props.schoolName }}</span>
    </p>
    <p style="margin-bottom: 0.625rem; line-height: 22px">
      Aluno: <span class="font-bold">{{ props.studentName }}</span>
    </p>
    <p class="mb-0" style="line-height: 22px">
      Turma: <span class="font-bold">{{ props.className }}</span>
      <b-badge variant="light-primary" class="ml-50" pill>{{ props.classSeries }}</b-badge>
    </p>
  </div>
</template>