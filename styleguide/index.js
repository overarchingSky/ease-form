import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import draggable from 'vuedraggable'

Vue.component('dragable', draggable)

Vue.use(ElementUI)
