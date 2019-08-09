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
        <el-tooltip
          effect="light"
          content="https://baianat.github.io/vee-validate/guide/rules.html#after"
          placement="top"
        >
          <a
            class="ease-form-link"
            @click.stop
            href="https://baianat.github.io/vee-validate/guide/rules.html#after"
            target="_blank"
          >
            <svg
              class="ease-form-tip"
              t="1565337512116"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1134"
              width="20"
              height="20"
            >
              <path
                d="M512 77C271.8 77 77 271.8 77 512c0 240.2 194.8 435 435 435 240.2 0 435-194.8 435-435C947 271.8 752.2 77 512 77L512 77zM509.2 816.4c-35.4 0-64.2-28.2-64.2-62.9s28.7-62.9 64.2-62.9c35.4 0 64.2 28.2 64.2 62.9S544.7 816.4 509.2 816.4L509.2 816.4zM681.6 460.5c-12.6 19.8-39.3 46.7-80.3 80.8-21.2 17.6-34.4 31.8-39.5 42.6-5.1 10.7-7.5 29.9-7 57.6l-91.4 0c-0.2-13.1-0.4-21.1-0.4-24 0-29.6 4.9-53.9 14.7-73 9.8-19.1 29.4-40.6 58.7-64.4 29.3-23.9 46.9-39.5 52.6-46.9 8.8-11.7 13.3-24.6 13.3-38.6 0-19.5-7.9-36.2-23.5-50.2-15.6-13.9-36.8-20.9-63.3-20.9-25.6 0-47 7.3-64.2 21.8-17.2 14.5-32 46.5-35.5 66.3-3.3 18.7-93.4 26.6-92.3-11.3 1.1-37.9 20.8-79 54.6-108.8 33.8-29.8 78.2-44.7 133.1-44.7 57.8 0 103.7 15.1 137.9 45.3 34.2 30.2 51.2 65.3 51.2 105.4C700.4 419.7 694.1 440.7 681.6 460.5L681.6 460.5z"
                p-id="1135"
              ></path>
            </svg>
          </a>
        </el-tooltip>
      </div>
      <div>
        <el-tag v-for="rule in value.validate.rules" :key="rule">{{
          rule
        }}</el-tag>
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
      <el-collapse-item
        title="Validator:"
        name="Validator"
        @click.native="showRulesPicker"
      >
        <div slot="title" class="ease-form-row">
          Validator:
          <el-tooltip
            effect="light"
            content="https://baianat.github.io/vee-validate/guide/rules.html#after"
            placement="top"
          >
            <a
              class="ease-form-link"
              @click.stop
              href="https://baianat.github.io/vee-validate/guide/rules.html#after"
              target="_blank"
            >
              <svg
                class="ease-form-tip"
                t="1565337512116"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1134"
                width="20"
                height="20"
              >
                <path
                  d="M512 77C271.8 77 77 271.8 77 512c0 240.2 194.8 435 435 435 240.2 0 435-194.8 435-435C947 271.8 752.2 77 512 77L512 77zM509.2 816.4c-35.4 0-64.2-28.2-64.2-62.9s28.7-62.9 64.2-62.9c35.4 0 64.2 28.2 64.2 62.9S544.7 816.4 509.2 816.4L509.2 816.4zM681.6 460.5c-12.6 19.8-39.3 46.7-80.3 80.8-21.2 17.6-34.4 31.8-39.5 42.6-5.1 10.7-7.5 29.9-7 57.6l-91.4 0c-0.2-13.1-0.4-21.1-0.4-24 0-29.6 4.9-53.9 14.7-73 9.8-19.1 29.4-40.6 58.7-64.4 29.3-23.9 46.9-39.5 52.6-46.9 8.8-11.7 13.3-24.6 13.3-38.6 0-19.5-7.9-36.2-23.5-50.2-15.6-13.9-36.8-20.9-63.3-20.9-25.6 0-47 7.3-64.2 21.8-17.2 14.5-32 46.5-35.5 66.3-3.3 18.7-93.4 26.6-92.3-11.3 1.1-37.9 20.8-79 54.6-108.8 33.8-29.8 78.2-44.7 133.1-44.7 57.8 0 103.7 15.1 137.9 45.3 34.2 30.2 51.2 65.3 51.2 105.4C700.4 419.7 694.1 440.7 681.6 460.5L681.6 460.5z"
                  p-id="1135"
                ></path>
              </svg>
            </a>
          </el-tooltip>
        </div>
        <div>
          <el-tag v-for="rule in value.validate.rules" :key="rule">{{
            rule
          }}</el-tag>
        </div>
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
      v-model="value.validate.rules"
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
    validateSelector
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
    },
    rulePicker() {
      return this.$refs.rulePicker
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
    },
    showRulesPicker() {
      this.rulePicker.show()
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
<style lang="less">
.field-setting {
  .ease-form-tip {
    margin: 6px;
    transition: fill 0.3s ease;

    &:hover {
      fill: #eaeef1;
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
