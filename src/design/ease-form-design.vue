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
      <div class="ease-design-layout__code__warp ease-form-col">
        <el-tabs
          class="ease-design-layout__code"
          v-model="activeCode"
          type="border-card"
        >
          <el-tab-pane label="js" name="js">
            <code-editor
              ref="js"
              class="ease-design-layout__code--js"
              :active-key="activeKey"
              v-model="config"
            ></code-editor>
          </el-tab-pane>
          <el-tab-pane label="i18n" name="i18n">
            <code-editor
              ref="i18n"
              class="ease-design-layout__code--i18n"
              v-model="dictionary"
            ></code-editor>
          </el-tab-pane>
        </el-tabs>
        <div>
          <el-button @click="addLanguage">+</el-button>
        </div>
      </div>
    </main>
    <language-selector
      :value="dictionary"
      ref="languageSelector"
      @on-change="changeLanguage"
    ></language-selector>
  </div>
</template>
<script lang="ts">
import FormItemSelector from './components/form-item-selector.vue'
import FieldSetting from '././components/field-setting.vue'
import FormViewer from './components/form-viewer'
import codeEditor from './components/code-editor'
import languageSelector from './components/language-selector.vue'
import {Field} from '../../types/field'
import fieldSettingVue from '././components/field-setting.vue'
export default {
  components: {
    FormItemSelector,
    FormViewer,
    codeEditor,
    FieldSetting,
    languageSelector
  },
  data() {
    return {
      config: [],
      dictionary: {},
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
    },
    languageSelector() {
      return this.$refs.languageSelector
    },

    currentFieldKey() {
      return this.config.map((fieldConfig: Field) => fieldConfig.field)
    }
  },
  watch: {
    currentFieldKey() {
      console.log('update', Object.keys(this.dictionary))
      this.changeLanguage(Object.keys(this.dictionary))
      const dictionary = this.dictionary
      for (let language in dictionary) {
        this.updateDictionaryField(language)
      }
    },
    activeCode() {
      this.$refs[this.activeCode] && this.$refs[this.activeCode].$forceUpdate()
    }
  },
  methods: {
    setSettingPanelType(index: number, config: Field) {
      this.currentFieldIndex = index
      this.activeSetting = 'setting'
    },
    clearCurrentField() {
      this.currentFieldIndex = -1
    },
    addLanguage() {
      this.languageSelector.show()
    },
    changeLanguage(list) {
      const dictionary = this.dictionary
      list.forEach(language => {
        if (!(language in dictionary)) {
          this.updateDictionaryField(language)
        }
      })
      for (let i in dictionary) {
        if (!list.includes(i)) {
          delete dictionary[i]
        }
      }
      this.dictionary = {...dictionary}
      console.log('dictionary', dictionary)
    },
    updateDictionaryField(language) {
      const dictionary = this.dictionary
      const template = this.config.reduce((map: obj, fieldConfig: Field) => {
        map[fieldConfig.field] = ''
        return map
      }, {})
      dictionary[language] = {
        attributes: template
      }
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

    &__code__warp {
      border-top: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
    }

    &__code {
      width: 410px;
      display: flex;
      flex-direction: column;
      flex: 1;

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
