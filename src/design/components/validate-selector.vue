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
              @keydown.native.enter="addRule(rule)"
              placeholder="press enter，add rule"
              clearable
            >
              <i class="el-icon-search el-input__icon" slot="suffix"> </i>
            </el-input>
          </div>
          <el-header>place picker</el-header>
          <div class="rule-picker scroller">
            <el-tag
              v-for="(rule, index) in currrentRules"
              :key="rule"
              @click.native="selectRule(rule, index)"
              >{{ rule }}</el-tag
            >
          </div>
          <div class="ease-design-validate__section" style="height:150px;">
            <el-header>selected rule</el-header>
            <div class="scroller">
              <el-tag
                v-for="(rule, index) in selectedRules"
                :key="rule"
                @close="removeRule(index, rule)"
                closable
                >{{ rule }}</el-tag
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
  </div>
</template>

<script lang="ts">
import {rules, triggerEvents} from '../../core/validate'
import Tip from './base/Tip.vue'
export default {
  name: 'ease-design-validate-selector',
  props: {
    value: {
      type: Object
    }
  },
  components: {
    Tip
  },
  data() {
    return {
      dialog: false,
      rule: '',
      rules,
      selectedRules: this.value.rules,
      options: this.value.trigger.options,
      autoValidate: !this.value.trigger.options.disable,
      modifiers: [],
      events: triggerEvents
    }
  },
  computed: {
    currrentRules() {
      return this.rules.filter(
        r => !this.selectedRules.includes(r) && new RegExp(this.rule).test(r)
      )
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
        this.value.trigger.events = []
      }
    },
    value() {
      this.selectedRules = this.value.rules
      this.options = this.value.trigger.options
    }
  },
  methods: {
    reset() {
      this.rule = ''
      this.modifiers = Object.keys(this.options).filter(key => {
        if (key === 'disable') {
          return false
        }
        return !!this.options[key]
      })
      this.autoValidate = !this.value.trigger.options.disable
    },
    handleClose(done) {
      this.$emit('input', this.value)
      done()
    },
    selectRule(rule, index) {
      this.selectedRules.push(rule)
      //this.rules.splice(index, 1)
    },
    addRule(rule) {
      this.selectedRules.push(rule)
      this.rule = ''
    },
    removeRule(index, rule) {
      this.selectedRules.splice(index, 1)
      //this.rules.unshift(rule)
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
