import { CreateElement } from "vue";

export default {
    name:'ease-form-input-textarea',
    props:{
        value:{
            type:String
        },
        placeholder:{
            type:String
        }
    },
    alias:'textarea',
    type:'textarea',
    render(h:CreateElement){
        return h('textarea',{
            attrs:{
                ...this.$attrs,
                value:this.value
            },
            on:{
                focus: e => {
                    this.$emit('focus',e)
                },
                blur: e => {
                    this.$emit('blur',e)
                },
                input:e => {
                    this.$emit('input',e.target.value)
                }
            }
        })
    }
}