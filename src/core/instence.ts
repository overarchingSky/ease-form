
import { CompOptions } from './../../types/comp-options.d';
import scheduler from './scheduler';
import { VNodeData } from 'vue/types/vnode';
import { CreateElement } from 'vue';
import { Field } from "../../types/field";
import { schedulerFormItem } from '../../types/scheduler';
import { ResolvedField } from '../../types/resolved-field';

let formVm:any;
let h:CreateElement;
export function setVM(vm:any){
    formVm = vm
    h = vm.$createElement
}

export function init(config:Field[],formValue:obj = {}) : ResolvedField[] {
    config =JSON.parse(JSON.stringify(config))
    return config.map((fieldConfig:Field):ResolvedField => {
        const formItem: schedulerFormItem = scheduler.getFormItem(fieldConfig.formItem)
        const slotsComponentConfig:string[] = formItem.slots
        let transmit:VNodeData = fieldConfig.transmit || {}
        transmit.scopedSlots = _init(formItem,fieldConfig,formValue)
        fieldConfig._formItem = formItem.component
        fieldConfig.transmit = transmit
        fieldConfig._slots = transmit.scopedSlots
        return fieldConfig as ResolvedField
    });
}

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

function initInput(FieldConfig:Field,formValue:obj){
    const slotComponentConfig = FieldConfig.slots
    let opt:VNodeData = {
        props:{
            value: formValue[FieldConfig.field],
            placeholder:FieldConfig.placeholder
        },
        nativeOn:{
            input:(e:any) => {
                let value = e.target.value
                formValue[FieldConfig.field] = value
                formVm.$emit('input',{...formValue})
            }
        }
    }
    return opt
}

function initSlot(slotName:string,FieldConfig:Field){
    let opt:VNodeData = {
        props:{
            text: FieldConfig[slotName]
        }
    }
    return opt
}
