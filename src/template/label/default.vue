<template>
  <label for="for">
    {{ text }}
  </label>
</template>
<script lang="ts">
export default {
  name: 'ease-form-default-label',
  props: {
    text: {
      type: String
    },
    for: {
      type: String
    }
  }
}
</script>
<style lang="less"></style>
