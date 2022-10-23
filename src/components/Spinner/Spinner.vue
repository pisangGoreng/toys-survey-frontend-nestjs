<template>
  <!-- make Parent relative to make this spinner full width & height -->
  <div
    v-if="isShow"
    class="flex absolute h-full w-full z-50 bg-gray-300 bg-opacity-75 justify-center items-center"
  >
    <pulse-loader :loading="true" />
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue"
export default {
  props: {
    isShow: { required: true, type: Boolean, default: () => true },
  },
  components: {
    PulseLoader,
  },
}
</script>
