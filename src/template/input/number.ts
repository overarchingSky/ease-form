import { CreateElement } from "vue";

export default {
    name:'ease-form-input-number',
    alias:'number',
    type:'number',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                type:'number'
            }
        })
    }
}