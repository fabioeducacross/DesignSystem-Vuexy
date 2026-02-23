<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect :width="width" :height="height" rx="10" fill="#6C757D" fill-opacity="0.12" />
      <path
        d="M44 24H20C18.5333 24 17.3333 25.2 17.3333 26.6667V37.3333C17.3333 38.8 18.5333 40 20 40H44C45.4667 40 46.6667 38.8 46.6667 37.3333V26.6667C46.6667 25.2 45.4667 24 44 24ZM44 37.3333H20V26.6667H44V37.3333ZM24 36H26.6667V33.3333H29.3333V30.6667H26.6667V28H24V30.6667H21.3333V33.3333H24V36Z"
        fill="#7367F0"
      />
      <path
        d="M35.3333 36C36.4379 36 37.3333 35.1046 37.3333 34C37.3333 32.8954 36.4379 32 35.3333 32C34.2288 32 33.3333 32.8954 33.3333 34C33.3333 35.1046 34.2288 36 35.3333 36Z"
        fill="#7367F0"
      />
      <path
        d="M40.6667 32C41.7712 32 42.6667 31.1046 42.6667 30C42.6667 28.8954 41.7712 28 40.6667 28C39.5621 28 38.6667 28.8954 38.6667 30C38.6667 31.1046 39.5621 32 40.6667 32Z"
        fill="#7367F0"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      activate: { type: Boolean, default: true },
      width: { type: Number, default: 92 },
      height: { type: Number, default: 92 },
    },
  }
</script>
