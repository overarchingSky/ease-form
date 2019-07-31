import { CompOptions } from './../../types/comp-options.d';
import Vue from 'vue'
import { VNodeData, VNode } from 'vue/types/vnode';
import { scheduler } from './../core/scheduler';
import { CreateElement } from "vue";
import { Field } from '../../types/field';
import { schedulerFormItem } from '../../types/scheduler';


export default{
    name:'ease-form',
    props:{
        config:{
            type:Array,
            required:true
        }
    },
    computed:{
        formItem(){
            return scheduler.getFormItem()
        }
    },
    data(){
        _config:null
    },
    render(h:CreateElement) : VNode{
        const slots = this.initConifg(this.config)
        return h('form',{
            class:'ease-form'
        },slots.map((slot:VNodeData) => {
            return h('ease-form-item',{
                ...slot
            })
        }))
    },
    methods:{
        /**
         * 初始化配置
         * 1.根据formItem字段匹配真实的form-item组件
         * 2.根据slots匹配真实的slot组件（如label、error等template目录下的文件），将其实例其注册到form.ts组件上,并更新到_slot及transmit中
         * @param {Array} config 
         */
        initConifg(config:Field[]) : VNodeData[] {
            return this.config.map((fieldConfig:Field) =>{
                const formItem: schedulerFormItem = scheduler.getFormItem(fieldConfig.formItem)
                const slots:string[] = formItem.slots
                const scopedSlots:obj = fieldConfig._slots
                let transmit:VNodeData = fieldConfig._transmit || {}
                fieldConfig._formItem = formItem.component
                Vue.component('ease-form-item',fieldConfig._formItem)
                scopedSlots && slots.forEach((slotName:string) => {
                    const name:string = fieldConfig.slots[slotName]
                    const component:CompOptions = scheduler.getSlot(fieldConfig.type,fieldConfig.slots[slotName])
                    //这里有组件命名冲突的可能
                    Vue.component(name,component)
                    scopedSlots[slotName] = component
                })
                transmit.scopedSlots = scopedSlots
                return transmit
            });
        }
    }
}