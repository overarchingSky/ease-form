
import { CompOptions } from './../../types/comp-options.d';
import { scheduler } from './scheduler';
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
        if(slotName !== 'default'){
            const slotFillCompName:string = slotComponentConfig[slotName]
            const component:CompOptions = scheduler.getSlot(slotName,slotFillCompName)
            console.log('slotName',slotFillCompName,component)
            scopedSlots[slotName] = () => {
                return h(component)
            }
        }else{
            slotComponentConfig.default && (scopedSlots.default = () => {
                let isVueComp = typeof slotComponentConfig.default !== 'string'
                let opt = initEvent(FieldConfig,formValue)
                return h(FieldConfig.slots.default,opt)
            })
        }
    })
    
    
    
    return scopedSlots
}

function initEvent(FieldConfig:Field,formValue:obj){
    const slotComponentConfig = FieldConfig.slots
    let opt:VNodeData = {
        props:{
            value: formValue[FieldConfig.field]
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
