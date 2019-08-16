import Vue from 'vue'
import {  VNode } from 'vue/types/vnode';
import { CreateElement } from "vue";
import { Field } from '../../types/field';
import mixins from '../core/mixins'
console.log('Vue',Vue)
export default Vue.extend({
    name: "ease-form",
    mixins:[mixins],
    props:{
        config:{
            type:Array,
            required:true
        },
        value:{
            type:Object,
            default(){
                return {}
            }
        },
        language:{
            type:String
        }
    },
    render(h:CreateElement) : VNode{
        console.log('this.$slots',this.$slots)
        return h('form',{
            class:'ease-form',
        }, [this.resolvedConfig.map((Field:Field) => {
            return h(Field._formItem,{
                scopedSlots:Field.transmit.scopedSlots
            })
        })])
    },
})