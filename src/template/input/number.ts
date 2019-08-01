import { CreateElement } from "vue";

export default {
    name:'ease-form-input-number',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                type:'number'
            }
        })
    }
}