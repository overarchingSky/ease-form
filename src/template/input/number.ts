import { CreateElement } from "vue";
import { isNaN } from "lodash-es";

export default {
    name:'ease-form-input-number',
    props:{
        value:{
            type:[Number,String]
        }
    },
    alias:'number',
    type:'number',
    render(h:CreateElement){
        return h('input',{
            attrs:{
                ...this.$attrs,
                type:'number',
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
                    let value = e.target.value
                    if(!isNaN(e.target.valueAsNumber)){
                        value = Number(value)
                    }
                    this.$emit('input',value)
                }
            },
        })
    }
}