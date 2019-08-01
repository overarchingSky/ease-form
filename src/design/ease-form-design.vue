<template>
  <div class="ease-design">
    <header></header>
    <main class="ease-design-layout">
      <div class="ease-design-layout__ctrl">
        <el-tabs type="border-card">
          <el-tab-pane label="组件">
            <form-item-selector></form-item-selector>
          </el-tab-pane>
          <el-tab-pane label="选项"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="ease-design-layout__content"></div>
      <div class="ease-design-layout__code"></div>
    </main>
  </div>
</template>
<script lang="ts">
import FormItemSelector from './components/form-item-selector.vue'
export default {
  components: {
    FormItemSelector
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
</style>
