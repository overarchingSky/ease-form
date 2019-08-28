import { CreateElement } from "vue";

export default {
    name:'ease-form-input-text',
    props:{
        options:{
            type:Array
        },
        value:{
            type:String
        }
    },
    alias:'select',
    type:'select',
    render(h:CreateElement){
        return h('select',{
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
        },this.options.map(option => {
            return h('option',{
                attrs:{
                    value:option.value
                }
            },[option.label])
        }))
    }
}