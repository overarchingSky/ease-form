import { CreateElement } from "vue";

export default {
    name:'ease-form-input-textarea',
    props:{
        placeholder:{
            type:String
        }
    },
    alias:'textarea',
    type:'textarea',
    render(h:CreateElement){
        return h('textarea',{
            attrs:{
                placeholder:this.placeholder
            }
        })
    }
}