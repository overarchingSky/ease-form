<template>
  <div class="ease-form-error-default">
    {{ errors }}
  </div>
</template>
<script lang="ts">
export default {
  name: 'ease-form-default-error',
  props: {
    text: {
      type: String
    }
  },

  components: {}
}
</script>
<style lang="less">
.ease-form-error-default {
  color: #f14c4c;
}
</style>
