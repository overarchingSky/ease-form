<template>
  <div class="ease-design">
    <header></header>
    <main class="ease-design-layout">
      <el-tabs
        class="ease-design-layout__ctrl"
        v-model="activeSetting"
        type="border-card"
      >
        <el-tab-pane label="组件" name="types">
          <form-item-selector></form-item-selector>
        </el-tab-pane>
        <el-tab-pane label="选项" name="setting">
          <field-setting
            v-if="showSettingPanel"
            v-model="currentFieldConfig"
          ></field-setting>
        </el-tab-pane>
      </el-tabs>
      <form-viewer
        class="ease-design-layout__content"
        v-model="config"
        @select-field="setSettingPanelType"
        @clear-select-field="clearCurrentField"
      ></form-viewer>
      <el-tabs
        class="ease-design-layout__code"
        v-model="activeCode"
        type="border-card"
      >
        <!-- <el-tab-pane label="html" name="html">
          <code-editor
            class="ease-design-layout__code--html"
            :active-key="activeKey"
            v-model="html"
          ></code-editor>
        </el-tab-pane> -->
        <el-tab-pane label="js" name="js">
          <code-editor
            class="ease-design-layout__code--js"
            :active-key="activeKey"
            v-model="config"
          ></code-editor>
        </el-tab-pane>
        <el-tab-pane label="i18n" name="i18n">
          <code-editor
            class="ease-design-layout__code--i18n"
            :active-key="activeKey"
            v-model="config"
          ></code-editor>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>
<script lang="ts">
import FormItemSelector from './components/form-item-selector.vue'
import FieldSetting from '././components/field-setting.vue'
import FormViewer from './components/form-viewer'
import codeEditor from './components/code-editor'
import {Field} from '../../types/field'
export default {
  components: {
    FormItemSelector,
    FormViewer,
    codeEditor,
    FieldSetting
  },
  data() {
    return {
      config: [],
      html: `<ease-form v-model="formValue" :config="config" :dictionary="dictionary"></ease-form>`,
      currentFieldIndex: -1,
      activeSetting: 'types',
      activeCode: 'js'
    }
  },
  computed: {
    showSettingPanel() {
      return this.currentFieldIndex > -1
    },
    currentFieldConfig() {
      return this.config[this.currentFieldIndex]
    },
    activeKey() {
      return this.currentFieldConfig && this.currentFieldConfig.id
    }
  },
  methods: {
    setSettingPanelType(index: number, config: Field) {
      this.currentFieldIndex = index
      this.activeSetting = 'setting'
    },
    clearCurrentField() {
      this.currentFieldIndex = -1
    }
  }
}
</script>

<style lang="less">
.ease-design {
  display: flex;
  height: 80vh;

  &-layout {
    flex: 1;
    display: flex;
    align-items: stretch;

    &__ctrl {
      width: 300px;
      height: 100%;
      min-height: 60vh;
      box-sizing: border-box;
    }

    &__content {
      flex: 1;
      border-top: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
    }

    &__code {
      width: 410px;
      display: flex;
      flex-direction: column;

      .el-tabs__content {
        flex: 1;
        padding: 0;

        .el-tab-pane {
          height: 100%;

          > div {
            height: 100%;
          }
        }
      }
    }

    .el-tabs--border-card {
      box-shadow: none;
    }
  }
}

.ease-form-ghost {
  background-color: #f5f5f5;
  border: 1px dashed #999;
}
</style>
