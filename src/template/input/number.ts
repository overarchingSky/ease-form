import { CreateElement } from "vue";

export default {
    name:'ease-form-input-number',
    props:{
        placeholder:{
            type:String
        }
    },
    alias:'number',
    type:'number',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                type:'number',
                placeholder:this.placeholder
            }
        })
    }
}