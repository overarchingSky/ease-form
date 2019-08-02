<template>
  <div class="ease-form-item-default">
    <div class="ease-form-item-default__annotation">
      <slot name="annotation" />
    </div>
    <div class="ease-form-item-default__main">
      <slot name="label">
        <label :for="_for">
          {{ label }}
        </label>
      </slot>
      <div class="ease-form-item-default__main__content">
        <div class="ease-form-row">
          <slot />
          <span class="ease-form-item-default__posterior">
            unit
          </span>
        </div>
        <div class="ease-form-item-default__main__error">
          <slot name="error" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ease-form-default-item',
  props: {
    label: {
      type: String
    },
    for: {
      type: String,
      default: '#123'
    }
  },
  computed: {
    _for() {
      return this.for
    }
  },
  components: {},
  slots: ['label', 'error', 'annotation', 'default'],
  created() {
    console.log('form-item', this)
  }
}
</script>
<style lang="less">
@import '../../style.less';

.ease-form-item-default {
  margin: 10px;

  &__main {
    margin-top: 10px;
    display: flex;
    align-items: flex-start;

    &__content {
      padding: 0 10px;
      flex: 1;
    }

    &__error {
      font-size: 0.7em;
      margin-top: 5px;
    }
  }

  &__posterior {
    margin-left: 10px;
  }
}
</style>
