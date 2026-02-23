<template>
  <!-- https://feathericons.dev/?search=facebook&iconset=feather -->
  <svg :width="24" :height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 0.924072C5.37188 0.924072 0 6.29595 0 12.9241C0 19.5522 5.37188 24.9241 12 24.9241C18.6281 24.9241 24 19.5522 24 12.9241C24 6.29595 18.6281 0.924072 12 0.924072ZM14.6484 10.8897L14.5125 12.685H12.6703V18.9194H10.3453V12.685H9.10312V10.8897H10.3453V9.68501C10.3453 9.15532 10.3594 8.33501 10.7437 7.82407C11.1516 7.28501 11.7094 6.91938 12.6703 6.91938C14.2359 6.91938 14.8922 7.14439 14.8922 7.14439L14.5828 8.98188C14.5828 8.98188 14.0672 8.83189 13.5844 8.83189C13.1016 8.83189 12.6703 9.00532 12.6703 9.48814V10.8897H14.6484Z"
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
