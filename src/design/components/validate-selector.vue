<template>
  <div class="ease-design-validate-selector">
    <el-drawer
      title="定制rules"
      :before-close="handleClose"
      :destroy-on-close="true"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="ease-design-validate-selector"
      ref="drawer"
    >
      <div class="drawer__content">
        <el-container>
          <div class="search">
            <el-input
              v-model="rule"
              @keydown.native.enter="addRule(rule, true)"
              placeholder="press enter，add rule"
              clearable
            >
              <i class="el-icon-search el-input__icon" slot="suffix"> </i>
            </el-input>
          </div>
          <el-header>place picker</el-header>
          <div class="rule-picker scroller">
            <el-tag
              v-for="(rule, index) in arrayedCurrentRules"
              :key="rule.ruleName"
              @click.native="selectRule(rule, index)"
              >{{ rule.ruleName }}</el-tag
            >
          </div>
          <div class="ease-design-validate__section" style="height:150px;">
            <el-header>selected rule</el-header>
            <div class="scroller">
              <el-tag
                v-for="(rule, index) in arrayedSelectedRules"
                :key="rule.ruleName"
                @click.native="updateRule(rule, index)"
                @close="removeRule(index, rule.ruleName)"
                closable
                >{{ rule.label }}</el-tag
              >
            </div>
          </div>
          <div class="ease-design-validate__section" style="height:260px;">
            <el-header>options</el-header>
            <div>
              <div class="ease-form-row">
                <label class="ease-form-row__label" for="">auto-validate</label>
                <el-switch v-model="autoValidate"></el-switch>
              </div>
              <div class="ease-form-row" v-if="autoValidate">
                <label class="ease-form-row__label" for="">
                  <span style="padding-right:6px;">trigger events</span>
                  <Tip
                    to="https://baianat.github.io/vee-validate/guide/events.html#changing-default-events"
                  ></Tip>
                </label>
                <el-select
                  v-model="value.trigger.events"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="type or select"
                >
                  <el-option
                    v-for="item in events"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ease-form-row">
                <label class="ease-form-row__label" for="">
                  <span style="padding-right:6px;">modifiers</span>
                  <Tip
                    to="https://baianat.github.io/vee-validate/api/directive.html#directive-modifiers"
                  ></Tip>
                </label>
                <el-checkbox-group
                  class="ease-design-validate__modifiers"
                  v-model="modifiers"
                >
                  <el-checkbox label="continues">continues</el-checkbox>
                  <el-checkbox label="persist">persist</el-checkbox>
                  <el-checkbox label="bails">bails</el-checkbox>
                  <el-checkbox label="immediate">immediate</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-container>
        <div class="drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
    <el-dialog
      title="Additional parameters"
      :visible.sync="additionalParametersDialog"
    >
      <code-editor v-model="ruleWithAdditionalParameters"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button @click="additionalParametersDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdditionalParameters"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {rules, triggerEvents, rulesWithArg} from '../../core/validate'
import Tip from './base/Tip.vue'
import codeEditor from './code-editor'
export default {
  name: 'ease-design-validate-selector',
  props: {
    value: {
      type: Object
    }
  },
  components: {
    Tip,
    codeEditor
  },
  data() {
    return {
      dialog: false,
      rule: '',
      rules,
      selectedRules: {}, //JSON.parse(JSON.stringify(this.value.rules)),
      options: {},
      validate: JSON.parse(JSON.stringify(this.value)),
      autoValidate: !this.value.trigger.options.disable,
      modifiers: [],
      events: triggerEvents,
      // temporary state ,temporary storage the editing rule name
      currentHandledRuleName: '',
      // display additional parameters dialog
      additionalParametersDialog: false,
      // rule additional parameters
      ruleWithAdditionalParameters: ''
    }
  },
  computed: {
    currrentRules() {
      return Object.keys(this.rules).filter(r => !(r in this.selectedRules))
    },
    arrayedCurrentRules() {
      return this.currrentRules.map(ruleName => {
        let veeRule = this.rules[ruleName]
        return {
          ruleName,
          veeRule
        }
      })
    },
    arrayedSelectedRules() {
      return Object.keys(this.selectedRules).map(ruleName => {
        let rule = true
        let label = ruleName
        let needExtraParmas = this.selectedRules[ruleName].veeRule.options
          .needExtraParmas
        if (needExtraParmas) {
          rule = this.selectedRules[ruleName].rule
          label = ruleName + ':' + JSON.stringify(rule)
        }
        return {
          ruleName,
          label,
          rule,
          veeRule: this.selectedRules[ruleName].veeRule
        }
      })
    }
  },
  watch: {
    dialog(val) {
      val && this.reset()
    },
    modifiers(val) {
      for (let key in this.options) {
        if (key === 'disable') continue
        if (val.includes(key)) {
          this.options[key] = true
        } else {
          this.options[key] = false
        }
      }
    },
    autoValidate(val) {
      this.options.disable = !val
      if (!val) {
        this.validate.trigger.events = []
      }
    },
    value: {
      handler(val) {
        this.validate = JSON.parse(JSON.stringify(val))
        //this.selectedRules = this.value.rules
        //this.options = this.validate.trigger.options
      },
      immediate: true
    }
  },
  methods: {
    reset() {
      this.rule = ''
      this.selectedRules = []
      Object.keys(this.validate.rules).forEach(ruleName => {
        this.addRule(ruleName, this.validate.rules[ruleName])
      })
      this.modifiers = Object.keys(this.options).filter(key => {
        if (key === 'disable') {
          return false
        }
        return !!this.options[key]
      })
      this.options = this.validate.trigger.options
      this.autoValidate = !this.validate.trigger.options.disable
    },
    handleClose(done) {
      // Synchronize rule to this.value.rule
      this.validate.rules = Object.keys(this.selectedRules).reduce(
        (obj, ruleName) => {
          obj[ruleName] = this.selectedRules[ruleName].rule
          return obj
        },
        {}
      )
      this.$emit('input', this.validate)
      done()
    },
    selectRule(rule, index) {
      let {ruleName, veeRule} = rule
      this.currentHandledRuleName = ruleName
      console.log('rule', rule)
      if (veeRule.options.needExtraParmas) {
        // show dialog
        this.ruleWithAdditionalParameters = `{
  "${ruleName}":
}`
        this.additionalParametersDialog = true
      } else {
        this.addRule(ruleName)
      }
    },
    updateRule(config, index) {
      console.log('config', config, JSON.stringify(config))
      let {ruleName, veeRule, rule} = config
      this.currentHandledRuleName = ruleName
      if (veeRule.options.needExtraParmas) {
        // show dialog
        this.ruleWithAdditionalParameters = `{
  "${ruleName}":${JSON.stringify(rule)}
}`
        this.additionalParametersDialog = true
      }
    },
    addRule(ruleName, rule = true, clear = false) {
      this.$set(this.selectedRules, ruleName, {
        veeRule: this.rules[ruleName],
        rule
      })
      console.log('selectedRules', this.selectedRules)
      clear && (this.rule = '')
    },
    removeRule(index, rule) {
      console.log('remove', rule, this.selectedRules)
      //delete this.selectedRules[rule]
      this.$delete(this.selectedRules, rule)
    },
    confirmAdditionalParameters() {
      console.log(
        'confirm',
        this.currentHandledRuleName,
        this.ruleWithAdditionalParameters
      )
      this.addRule(
        this.currentHandledRuleName,
        this.ruleWithAdditionalParameters[this.currentHandledRuleName]
        //`${this.currentHandledRuleName}:${this.ruleWithAdditionalParameters[this.currentHandledRuleName]}`
      )
      this.currentHandledRuleName = ''
      this.additionalParametersDialog = false
    },
    show() {
      this.dialog = true
    },
    hide() {
      this.dialog = false
    }
  }
}
</script>

<style lang="less">
.ease-design-validate-selector {
  .search {
    box-sizing: border-box;
    padding: 10px;
  }

  .ease-form-row {
    margin: 14px;

    &__label {
      display: flex;
      flex-shrink: 0;
      width: 6em;
      justify-content: flex-start;
      align-items: center;
      padding-right: 10px;
    }
  }
}

.el-drawer {
  user-select: none;
}

.el-drawer__body {
  height: calc(100vh - 77px);
}

.el-container {
  height: calc(100% - 120px);
  overflow: auto;
}

.rule-picker {
  min-height: 30vh;
}

.ease-design-validate__section {
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  .scroller {
    flex: 1;
  }
}

.ease-design-validate__modifiers {
  line-height: normal;
}

.el-header {
  background-color: aqua;
  display: flex;
  align-items: center;
}

.el-aside {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.el-footer {
  padding: 0;
  display: flex;
  flex-direction: column;

  .scroller {
    flex: 1;
  }
}

.drawer {
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__footer {
    padding: 20px;
  }
}
</style>
