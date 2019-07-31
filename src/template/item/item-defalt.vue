<template>
  <div>
    item
    <slot name="label" />
    <slot />
    <slot name="error" />
    <slot name="annotation" />
  </div>
</template>
<script>
export default {
  props: {},
  components: {}
}
</script>
<style lang="less"></style>
