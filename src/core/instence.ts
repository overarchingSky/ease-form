
import { CompOptions } from './../../types/comp-options.d';
import scheduler from './scheduler';
import { VNodeData } from 'vue/types/vnode';
import { CreateElement } from 'vue';
import { Field } from "../../types/field";
import { schedulerFormItem } from '../../types/scheduler';
import { ResolvedField } from '../../types/resolved-field';
import './validate'
import { isNaN } from 'lodash-es';
import { CombinedVueInstance } from 'vue/types/vue';

class FormVm {
    form:any = {}
    items:obj = {}
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
        // 继续这里
        return this.items.find()
    }
    init(config:Field[],formValue:obj = {}) : ResolvedField[] {
        config =JSON.parse(JSON.stringify(config))
        return config.map((fieldConfig:Field):ResolvedField => {
            const formItem: schedulerFormItem = scheduler.getFormItem(fieldConfig.formItem)
            const slotsComponentConfig:string[] = formItem.slots
            let transmit:VNodeData = fieldConfig.transmit || {}
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
            return fieldConfig as ResolvedField
        });
    }
}

export const formVm = new FormVm()
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
        let componentVNode:VNodeData
        if(slotName === 'default') {
            componentVNode = h(scheduler.getInput(slotFillCompName),initInput(FieldConfig,formValue))
        }else{
            componentVNode = h(scheduler.getSlot(slotName,slotFillCompName),initSlot(slotName,FieldConfig))
        }
        scopedSlots[slotName] = () => {
            return componentVNode
        }
    })
    return scopedSlots
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
                setTimeout(() => {
                    //formVm.$forceUpdate()
                }, 0);
                
            }
        },
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

        props:{
            text
        }
    }
    return opt
}
