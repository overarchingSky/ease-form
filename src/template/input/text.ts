import { CreateElement } from "vue";

export default {
    name:'ease-form-input-text',
    props:{
        value:{
            type:String
        }
    },
    alias:'text',
    type:'text',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                ...this.$attrs,
                type:'text',
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