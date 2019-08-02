import { CreateElement } from "vue";

export default {
    name:'ease-form-input-textarea',
    alias:'textarea',
    type:'textarea',
    render(h:CreateElement){
        return h('textarea')
    }
}