<template>
  <div>
    item
    <slot name="label" />
    <slot />
    <slot name="error" />
    <slot name="annotation" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ease-form-default-item',
  props: {},
  components: {},
  slots: ['label', 'error', 'annotation', 'default']
}
</script>
<style lang="less"></style>
