<template>
  <dragable
    class="ease-form-item-selector"
    v-model="base"
    :options="{
      group: {name: 'viewer', pull: 'clone', put: false, revertClone: false},
      sort: false,
      swapThreshold: 0.5,
      animation: 100
    }"
  >
    <transition-group>
      <el-tag
        v-for="type in base"
        :key="type.alias"
        type="info"
        data-group="base"
        >{{ type.alias }}</el-tag
      >
    </transition-group>
  </dragable>
</template>

<script>
import scheduler from '../../core/scheduler'
const inputs = scheduler.input
console.log('inputs', inputs)
export default {
  computed: {},
  data() {
    return {
      base: inputs.base,
      advance: inputs.advance
    }
  }
}
</script>

<style>
.ease-form-item-selector {
  user-select: none;
}

.el-tag {
  margin: 6px;
  cursor: grab;
}

.ghost {
  width: 100px;
  height: 50px;
  background-color: red;
}
</style>
