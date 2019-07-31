<template>
  <label for="for">{{ label }}</label>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String
    },
    for: {
      type: String
    }
  }
})
</script>
<style lang="less"></style>
