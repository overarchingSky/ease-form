<template>
  <div class="ease-design">
    <header></header>
    <main class="ease-design-layout">
      <div class="ease-design-layout__ctrl">
        <el-tabs type="border-card">
          <el-tab-pane label="组件">
            <form-item-selector></form-item-selector>
          </el-tab-pane>
          <el-tab-pane label="选项">
            <field-setting v-model="currentFieldConfig"></field-setting>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="ease-design-layout__content">
        <form-viewer
          v-model="config"
          @select-field="setCurrentField"
        ></form-viewer>
      </div>
      <div class="ease-design-layout__code">
        <code-editor v-model="config"></code-editor>
      </div>
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
      config: [
        {
          field: 'name',
          slots: {
            default: 'text'
          }
        }
      ],
      currentFieldConfig: {}
    }
  },
  methods: {
    setCurrentField(config: Field) {
      this.currentFieldConfig = config
    }
  }
}
</script>

<style lang="less">
.ease-design {
  &-layout {
    display: flex;
    height: 100px;

    &__ctrl {
      background-color: red;
      width: 300px;
    }

    &__content {
      flex: 1;
    }

    &__code {
      background-color: blue;
      width: 300px;
    }
  }
}

.ease-form-ghost {
  background-color: #f5f5f5;
  border: 1px dashed #999;
}
</style>
