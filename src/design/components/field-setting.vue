<template>
  <el-form ref="form" class="field-setting" label-width="40px">
    <el-form-item label="Field">
      <el-input v-model="value.field"></el-input>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import {cloneDeep} from 'lodash-es'
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  }
  // watch:{
  //     formValue(val){
  //         this.$emit('input',this.val)
  //     }
  // },
  // data(){
  //     return {
  //         formValue:cloneDeep(this.value)
  //     }
  // }
}
</script>
<style lang="less"></style>
