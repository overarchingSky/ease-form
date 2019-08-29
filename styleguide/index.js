import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/style.less'
import draggable from 'vuedraggable'
import easeForm from '../src'
window.vm = Vue.prototype
easeForm.extend({
  advance: false,
  type: 'test',
  alias: 'test',
  components: {
    name: 'ease-form-input-test',
    render(h) {
      return h('div', ['date+'])
    },
    created() {
      let a = Vue.component('ElInput')
      let res = {}
      Object.keys(a).forEach(item => {
        res[item] = a[item]
      })
      console.log('easeForm', Vue.component('ElInput').options)
    }
  }
})

Vue.component('dragable', draggable)

Vue.use(ElementUI)

const mapping = [
  {
    alias: 'ELInput',
    type: 'input++',
    ref: 'el-input'
  },
  {
    alias: 'ELDate',
    type: 'date',
    ref: 'el-date-picker',
    vnode: {
      props: {
        format: 'yyyy年MM月dd日'
      }
    }
  }
]

easeForm.use(mapping)
