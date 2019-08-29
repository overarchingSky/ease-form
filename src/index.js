// Import vue component
import Form from './template/ease-form'
import {staticApi} from './core/api'
//import { Vue } from 'vue/types/vue'
// install function executed by Vue.use()

export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component(Form.name, Form)
}

// Create module definition for Vue.use()
const plugin = {
  install,
  ...staticApi
}

// To auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin

export let easeForm = {
  ...Form,
  ...staticApi
}
