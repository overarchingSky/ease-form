import { CompOptions } from './../../types/comp-options.d';
import DefaultItems from '../template/item'
import DefaultAnnotation from '../template/annotation'
import DefaultLabels from '../template/label'
import DefaultContents from '../template/content'
import DefaultErrors from '../template/error'
import { schedulerFormItem, schedulerSlots } from '../../types/scheduler';
import { signAsInternalComp } from '../utils';

class Scheduler {
    formItems: schedulerFormItem[] = []
    slot:{
        annotation:CompOptions[]
        label:CompOptions[]
        contnet:CompOptions[]
        error:CompOptions[]
        [key:string]:CompOptions[]
    } = {
        annotation:[],
        label:[],
        contnet:[],
        error:[]
    }
    constructor(){
        let slot = this.slot
        DefaultItems.forEach((item:CompOptions) => {
            item.internal = true
        })
        signAsInternalComp(DefaultItems)
        signAsInternalComp(DefaultAnnotation)
        signAsInternalComp(DefaultLabels)
        signAsInternalComp(DefaultContents)
        signAsInternalComp(DefaultErrors)
        this.addFormItem(DefaultItems)
        slot.annotation = DefaultAnnotation
        slot.label = DefaultLabels
        slot.contnet = DefaultContents
        slot.error = DefaultErrors
    }
    addFormItem ( arg: (schedulerFormItem|CompOptions)[] ) : void {
        this.formItems = this.formItems || []
        arg.forEach(item => {
            if(item.slots && (item as schedulerFormItem).component){
                this.formItems.push((item as schedulerFormItem))
            }else if(item.slots){
                this.formItems.push({
                    slots: (item as CompOptions).slots,
                    component:<CompOptions>item
                })
            }else{
                throw(Error('form-item模板必须携带slots参数'))
            }
        })
    }
    addSlot ( arg: schedulerSlots ) : void {
        let slot = this.slot
        for(let slotName in arg){
            const newSlots = arg[slotName]
            slot[slotName] = slot[slotName] || []
            if(slotName in slot){
                slot[slotName] = [...slot[slotName],...newSlots]
            }else{
                slot[slotName] = newSlots
            }
        }
    }
    getFormItem(name:string = 'ease-form-default-item') : schedulerFormItem{
        return this.formItems.find(item => item.component.name === name)
    }
    getSlot(slotName:string,name:string = 'ease-form-default') : CompOptions {
        if(slotName in this.slot){
            return this.slot[slotName].find(item => {
                let compName = item.internal ? `${name}-${slotName}` : slotName
                return item.name === compName
            })
        }else{
            console.warn(`slot template '${slotName}' was not exsist!`)
        }
    }
    // private check(comp:CompOptions){
    //     if(comp.name){

    //     }
    // }
}

export const scheduler = new Scheduler()

