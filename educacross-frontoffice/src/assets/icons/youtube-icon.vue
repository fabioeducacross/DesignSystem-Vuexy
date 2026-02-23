<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.4016 14.405L14.3297 12.1392L10.4016 9.87341V14.405Z" fill="#82868B" />
    <path
      d="M12 0.345123C5.37188 0.345123 0 5.62276 0 12.1346C0 18.6464 5.37188 23.9241 12 23.9241C18.6281 23.9241 24 18.6464 24 12.1346C24 5.62276 18.6281 0.345123 12 0.345123ZM18 14.2438C18 16.2747 15.9328 16.2747 15.9328 16.2747H8.06719C6 16.2747 6 14.2438 6 14.2438V10.03C6 7.99907 8.06719 7.99907 8.06719 7.99907H15.9328C18 7.99907 18 10.03 18 10.03V14.2438Z"
      fill="#82868B"
    />
  </svg>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      size: {
        type: String,
        default: '14px',
      },
    },
  })
</script>
