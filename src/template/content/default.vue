<template>
  <div>
    content
    <slot name="label" />
    <slot />
    <slot name="error" />
    <slot name="annotation" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ease-form-default-content',
  props: {},
  components: {}
}
</script>
<style lang="less"></style>
