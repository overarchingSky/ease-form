<template>
  <div>
    error
    <slot name="label" />
    <slot />
    <slot name="error" />
    <slot name="annotation" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {},
  components: {}
})
</script>
<style lang="less"></style>
