import { CreateElement } from "vue";

export default {
    name:'ease-form-input-text',
    props:{
        placeholder:{
            type:String
        }
    },
    alias:'text',
    type:'text',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                type:'text',
                placeholder:this.placeholder
            }
        })
    }
}