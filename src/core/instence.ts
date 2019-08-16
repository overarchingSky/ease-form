import Vue from 'vue';
import store from '../store'

import { CompOptions } from './../../types/comp-options.d';
import scheduler from './scheduler';
import { VNodeData } from 'vue/types/vnode';
import { CreateElement } from 'vue';
import { Field } from "../../types/field";
import { schedulerFormItem } from '../../types/scheduler';
import { ResolvedField } from '../../types/resolved-field';
import './validate'

class FormVm {
    form:any = {}
    items:obj = {}
    config:Field[] = []
    // constructor(form){
    //     this.form = form
    // }
    collect(key:string,formItemVm){
        if(this.items[key]){
            console.warn(`${key} has existed in formVm.items,and be Covered, place ensure safety`)
        }
        this.items[key] = formItemVm
    }
    getFieldInstance(fieldName:string){
        for(let key in this.items){
            // if there are two and more identical fields, only return the first one.
            if(new RegExp(`^${fieldName}-`).test(key)){
                return this.items[key]
            }
        }
    }
    getInstance(){
        return this.form
    }
    init(config:Field[],formValue:obj = {}):void {
        //formValue = Vue.observable(formValue)
        this.config = JSON.parse(JSON.stringify(config))
        this.config = this.config.map((fieldConfig:Field) => {
            const formItem: schedulerFormItem = scheduler.getFormItem(fieldConfig.formItem)
            let transmit:VNodeData = fieldConfig.transmit || {}
            let scopedSlots = transmit.scopedSlots
            transmit.scopedSlots = _init(formItem,fieldConfig,formValue)
            let self = this
            fieldConfig._formItem = {
                extends:formItem.component,
                created(){
                    self.collect(`${fieldConfig.field}-${fieldConfig.id}`,this)
                }
            } as CompOptions
            fieldConfig.transmit = transmit
            fieldConfig._slots = transmit.scopedSlots
            return Vue.observable(fieldConfig as ResolvedField)
        });
    }
}

export const formVm = Vue.observable(new FormVm())
console.log('formVm',formVm)
const h:CreateElement = function(...args){
    if(!formVm.form){
        throw(`instence:formVm.form has not been initial,place assigne it with vue instance, like 'this'`)
    }
    return formVm.form && formVm.form.$createElement(...args)
}
// @ts-ignore
window.formVm = formVm

function _init(formItem:schedulerFormItem,FieldConfig:Field,formValue:obj){
    let formItemSlots = formItem.slots
    return resoveSlots(formItemSlots,FieldConfig,formValue)
}

function resoveSlots(formItemSlots:string[],FieldConfig:Field,formValue:obj){
    const scopedSlots:obj = {}
    const slotComponentConfig = FieldConfig.slots
    formItemSlots.forEach((slotName:string) => {
        const slotFillCompName:string = slotComponentConfig[slotName]    
        scopedSlots[slotName] = () => {
            if(slotName === 'default') {
                return h(scheduler.getInput(slotFillCompName),initInput(FieldConfig,formValue))
            }else{
                return h(scheduler.getSlot(slotName,slotFillCompName),initSlot(slotName,FieldConfig))
            }
        }
    })
    return Vue.observable(scopedSlots)
}

// function initVNodeData(FieldConfig:Field,formValue:obj){
//     return 
//     initInput(FieldConfig,formValue)
// }

function initInput(FieldConfig:Field,formValue:obj){
    const validate = FieldConfig.validate
    let opt:VNodeData = {
        attrs:{
            name:FieldConfig.field,
            'data-vv-validate-on':validate.trigger.events.join('|'),
            placeholder:FieldConfig.placeholder
        },
        props:{
            value: formValue[FieldConfig.field],
        },
        on:{
            input:(value:any) => {
                formVm.form.$set(formValue,FieldConfig.field,value)
            }
        },
        ref:FieldConfig.field,
        directives:[{
            name: 'validate',
            value: validate.rules.join("|"),
            //expression: `"${validate.rules.join("|")}"`,
            //arg: 'value',
            modifiers: validate.trigger.options
          }]
    }
    return opt
}

function initSlot(slotName:string,FieldConfig:Field){
    let text = FieldConfig[slotName]
    if(slotName === 'error'){
        text = formVm.form.errors.first(FieldConfig.field)
    }
    let opt:VNodeData = {
        // when Field.validate change, we hope to create a new form-item instance, because of the directives v-validate won't update or re-initial
        key:JSON.stringify(FieldConfig.validate),
        props:{
            text
        }
    }
    return opt
}
