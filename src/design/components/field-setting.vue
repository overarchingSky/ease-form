<template>
  <el-form ref="form" class="field-setting">
    <el-form-item label="template" label-width="72px">
      <el-select v-model="value.formItem" placeholder="请选择">
        <el-option
          v-for="item in formItemTemplates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Field" label-width="44px">
      <el-input v-model="value.field" clearable></el-input>
    </el-form-item>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Text:" name="Text">
        <el-form-item
          v-for="(text, index) in Texts"
          :key="index"
          :label="text"
          :label-width="getLabelWidth(Texts)"
        >
          <el-input v-model="value[text]" clearable></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="Slots:" name="Slots">
        <el-form-item
          v-for="(slotName, index) in slotNames"
          :key="index"
          :label="slotName"
          :label-width="getLabelWidth(slotNames)"
        >
          <el-select v-model="value.slots[slotName]" placeholder="请选择">
            <el-option
              v-for="item in getSlotTemplates(slotName)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>
<script lang="ts">
import {cloneDeep} from 'lodash-es'
import scheduler from '../../core/scheduler'
import {CompOptions} from '../../../types/comp-options'
import {formateSelectorOptions} from '../../utils'
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    slotNames() {
      return scheduler
        .getFormItem(this.value.formItem)
        .slots.filter(slotName => slotName !== 'default')
    },
    Texts() {
      let texts = this.slotNames.filter(
        slotName => !!this.value.slots[slotName]
      )
      texts.push('placeholder')
      return texts
    },
    formItemTemplates() {
      return scheduler.formItems.map(item => {
        return {
          label: item.component.name,
          value: item.component.name
        }
      })
    }
  },
  data() {
    return {
      activeNames: ['Text', 'Slots']
    }
  },
  methods: {
    getLabelWidth(labels) {
      return Math.max(...labels.map(label => label.length)) * 10 + 'px'
    },
    getSlotTemplates(slotName) {
      console.log('getGroupedSlots', scheduler.getGroupedSlots(slotName))
      let res = scheduler.getGroupedSlots(slotName).map((comp: CompOptions) => {
        return {
          label: comp.name,
          value: comp.name
        }
      })
      return formateSelectorOptions(res)
    }
  },
  watch: {
    value(val) {
      console.log('this.value._formItem', this.value)
    }
  }
  // data(){
  //     return {
  //         formValue:cloneDeep(this.value)
  //     }
  // }
}
</script>
<style lang="less"></style>
