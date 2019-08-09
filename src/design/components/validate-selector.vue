<template>
  <div class="ease-design-validate-selector">
    <el-drawer
      title="定制rules"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="ease-design-validate-selector"
      ref="drawer"
    >
      <div class="drawer__content">
        <el-container>
          <el-main>
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
            <div class="scroller">
              <el-tag
                v-for="(rule, index) in currrentRules"
                :key="rule"
                @click.native="selectRule(rule, index)"
                >{{ rule }}</el-tag
              >
            </div>
          </el-main>
          <el-footer style="height:30vh;">
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
          </el-footer>
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
import {rules} from '../../core/validate'
export default {
  name: 'ease-design-validate-selector',
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      dialog: false,
      rule: '',
      rules,
      selectedRules: this.value
    }
  },
  computed: {
    currrentRules() {
      console.log('this.rules', this.rules)
      return this.rules.filter(r => new RegExp(this.rule).test(r))
    }
  },
  watch: {
    value() {
      this.selectedRules = this.value
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('input', this.selectedRules)
      done()
    },
    selectRule(rule, index) {
      this.selectedRules.push(rule)
      this.rules.splice(index, 1)
    },
    addRule(rule) {
      this.selectedRules.push(rule)
      this.rule = ''
    },
    removeRule(index, rule) {
      this.selectedRules.splice(index, 1)
      this.rules.unshift(rule)
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
}

.el-drawer {
  user-select: none;
}

.el-drawer__body {
  height: calc(100vh - 77px);
}

.el-container {
  height: calc(100% - 120px);
}

.el-main {
  padding: 0;
  display: flex;
  flex-direction: column;

  .scroller {
    flex: 1;
  }
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
