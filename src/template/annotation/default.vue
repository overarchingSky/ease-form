<template>
  <div class="ease-form-annotation-default">
    {{ text }}
  </div>
</template>
<script lang="ts">
export default {
  name: 'ease-form-default-annotation',
  props: {
    text: {
      type: String
    }
  },
  components: {}
}
</script>
<style lang="less">
.ease-form-annotation-default {
  border-left: 4px solid #dcdcdc;
  margin: 5px 0;
  line-height: 1.5;
  text-indent: 1em;
  background-color: #f5f7fa;
}
</style>
