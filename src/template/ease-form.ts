import Vue from 'vue'
import {  VNode } from 'vue/types/vnode';
import { CreateElement } from "vue";
import { Field } from '../../types/field';
import { setVM, init } from '../core/instence';
console.log('Vue',Vue)
export default Vue.extend({
    name: "ease-form",
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
        }
    },
    data(){
        return {
            currentValue:this.value,
            _config:null
        }
    },
    watch:{
        value(val){
            this.currentValue = val
        },
        config:{
            handler(){
                this._config = init(this.config,this.formValue)
            },
            deep:true
        }
    },
    render(h:CreateElement) : VNode{
        return h('form',{
            class:'ease-form'
        },[this._config.map((Field:Field) => {
            return h(Field._formItem,{
                scopedSlots:Field.transmit.scopedSlots
            })
        })])
    },
    created(){
        setVM(this)
        this._config = init(this.config,this.value)
    },
    methods:{

    }
})