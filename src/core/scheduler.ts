import { CompOptions } from './../../types/comp-options.d';
import DefaultItems from '../template/item'
import DefaultAnnotation from '../template/annotation'
import DefaultLabels from '../template/label'
import DefaultContents from '../template/content'
import DefaultErrors from '../template/error'
import { schedulerFormItem, schedulerSlots } from '../../types/scheduler';

class Scheduler {
    formItems: schedulerFormItem[]
    slot:{
        formAnnotation:CompOptions[]
        formLabels:CompOptions[]
        formContnets:CompOptions[]
        formErrors:CompOptions[]
        [key:string]:CompOptions[]
    }
    constructor(){
        let slot = this.slot
        this.addFormItem(DefaultItems)
        slot.formAnnotation = DefaultAnnotation
        slot.formLabels = DefaultLabels
        slot.formContnets = DefaultContents
        slot.formErrors = DefaultErrors
    }
    addFormItem ( arg: (schedulerFormItem|CompOptions)[] ) : void {
        this.formItems = this.formItems || []
        arg.forEach(item => {
            if(item.slots){
                this.formItems.push({
                    slots: (item as CompOptions).slots,
                    component:<CompOptions>item
                })
            }else{
                this.formItems.push((item as schedulerFormItem))
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
    getFormItem(name:string = 'default') : schedulerFormItem{
        return this.formItems.find(item => item.component.name === name)
    }
    getSlot(slotName:string,name:string = 'default') : CompOptions {
        return this.slot[slotName].find(item => item.name === name)
    }
    // private check(comp:CompOptions){
    //     if(comp.name){

    //     }
    // }
}

const com = {
    name:'test',
    methods:{

    }
}

export const scheduler = new Scheduler()

scheduler.addFormItem([{
    slots:['lt'],
    component:com
}])
