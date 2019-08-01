import { CreateElement } from "vue";

export default {
    name:'text',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                type:'text'
            }
        })
    }
}