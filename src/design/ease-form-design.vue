<template>
  <div class="ease-design">
    <header></header>
    <main class="ease-design-layout">
      <el-tabs
        class="ease-design-layout__ctrl"
        v-model="activeTab"
        type="border-card"
      >
        <el-tab-pane label="组件" name="types">
          <form-item-selector></form-item-selector>
        </el-tab-pane>
        <el-tab-pane label="选项" name="setting">
          <field-setting v-model="currentFieldConfig"></field-setting>
        </el-tab-pane>
      </el-tabs>
      <form-viewer
        class="ease-design-layout__content"
        v-model="config"
        @select-field="setCurrentField"
      ></form-viewer>
      <code-editor
        class="ease-design-layout__code"
        :active-key="activeKey"
        v-model="config"
      ></code-editor>
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
      currentFieldIndex: {},
      activeTab: 'types'
    }
  },
  computed: {
    currentFieldConfig() {
      return this.config[this.currentFieldIndex]
    },
    activeKey() {
      return this.currentFieldConfig && this.currentFieldConfig.field
    }
  },
  methods: {
    setCurrentField(index: number, config: Field) {
      this.currentFieldIndex = index
      this.activeTab = 'setting'
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
