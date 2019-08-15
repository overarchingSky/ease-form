<template>
  <div class="ease-form-error-default">
    {{ err }}
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
  computed: {
    err() {
      return this.errors
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
