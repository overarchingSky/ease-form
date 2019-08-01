<template>
  <div>
    <el-tag type="info">标签三</el-tag>
    <el-tag type="info">标签三</el-tag>
  </div>
</template>

<script>
import scheduler from '../../core/scheduler'
export default {
  data() {
    return {
      inputTypes: scheduler.slot.input
    }
  }
}
</script>

<style></style>
