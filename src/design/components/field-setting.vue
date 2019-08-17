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
    <el-divider></el-divider>
    <div @click="showRulesPicker">
      <div class="validator ease-form-row el-collapse-item__header">
        Validator
        <Tip
          to="https://baianat.github.io/vee-validate/guide/rules.html#after"
        ></Tip>
        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
      </div>
      <div>
        <el-tag
          v-for="rule in arrayedRules"
          :disable-transitions="true"
          :key="rule"
          >{{ rule.label }}</el-tag
        >
      </div>
    </div>
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
    <validate-selector
      v-model="value.validate"
      ref="rulePicker"
    ></validate-selector>
  </el-form>
</template>
<script lang="ts">
import {cloneDeep} from 'lodash-es'
import scheduler from '../../core/scheduler'
import {CompOptions} from '../../../types/comp-options'
import {formateSelectorOptions} from '../../utils'
import validateSelector from './validate-selector.vue'
import Tip from './base/Tip.vue'
import {rulesWithArg} from '../../core/validate'
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    validateSelector,
    Tip
  },
  computed: {
    slotNames() {
      return scheduler
        .getFormItem(this.value.formItem)
        .slots.filter(slotName => slotName !== 'default')
    },
    Texts() {
      let texts = this.slotNames.filter(
        slotName => !!this.value.slots[slotName] && slotName !== 'error'
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
    },
    rulePicker() {
      return this.$refs.rulePicker
    },
    arrayedRules() {
      let rules = this.value.validate.rules
      return Object.keys(rules).map(ruleName => {
        let rule = true
        let label = ruleName
        if (rulesWithArg.includes(ruleName)) {
          rule = rules[ruleName]
          label = ruleName + ':' + JSON.stringify(rule)
        }
        return {
          ruleName,
          label,
          rule
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
      let res = scheduler.getGroupedSlots(slotName).map((comp: CompOptions) => {
        return {
          label: comp.name,
          value: comp.name
        }
      })
      return formateSelectorOptions(res)
    },
    showRulesPicker() {
      this.rulePicker.show()
    }
  }
}
</script>
<style lang="less">
.field-setting {
  .ease-form-tip {
    margin: 6px;
    transition: fill 0.3s ease;

    &:hover {
      fill: #409eff;
    }
  }

  .validator {
    border-bottom: none;
  }

  .ease-form-row {
    align-items: center;
  }

  .el-divider {
    margin: 0 !important;
  }
}
</style>
