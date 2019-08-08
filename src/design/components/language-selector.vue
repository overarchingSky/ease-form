<template>
  <div class="language-selector">
    <el-drawer
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="drawer__content">
        <el-container>
          <el-main>
            <el-header>place picker</el-header>
            <div class="scroller">
              <el-tag
                v-for="(language, index) in languages"
                :key="language"
                @click.native="selectLanguage(index, language)"
                >{{ language }}</el-tag
              >
            </div>
          </el-main>
          <el-footer style="height:30vh;">
            <el-header>selected languages</el-header>
            <div class="scroller">
              <el-tag
                v-for="(language, index) in currentLanguage"
                :key="language"
                @close="removeLanguage(index, language)"
                closable
                >{{ language }}</el-tag
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

<script>
export default {
  name: 'language-selector',
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      currentLanguage: [],
      languages: 'abcdefghijklmnopqrstuvwxyz'.split('')
    }
  },
  watch: {
    value() {
      this.currentLanguage = Object.keys(this.value)
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确定更改？').then(_ => {
        this.$emit('on-change', this.currentLanguage)
        done()
      })
    },
    selectLanguage(index, language) {
      this.currentLanguage.push(language)
      this.languages.splice(index, 1)
    },
    removeLanguage(index, language) {
      this.currentLanguage.splice(index, 1)
      this.languages.unshift(language)
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
.el-drawer {
  user-select: none;
}

.el-drawer__body {
  height: calc(100vh - 45px);
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
