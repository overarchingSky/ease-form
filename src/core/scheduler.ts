import { CompOptions } from './../../types/comp-options.d';
import DefaultItems from '../template/item'
import DefaultAnnotation from '../template/annotation'
import DefaultLabels from '../template/label'
import DefaultErrors from '../template/error'
import DefaultInputs from '../template/input'
import { schedulerFormItem, schedulerSlots, schedulerInput } from '../../types/scheduler';
import { signAsInternalComp } from '../utils';
import { Input } from '../../types/input-types';
import { CreateElement } from 'vue';

class Scheduler {
    input:Input = {
        base:[],
        advance:[]
    }
    formItems: schedulerFormItem[] = []
    slot:{
        annotation:CompOptions[]
        label:CompOptions[]
        contnet:CompOptions[]
        error:CompOptions[]
        //基础输入类型
        default:CompOptions[]
        [key:string]:CompOptions[]
    } = {
        annotation:[],
        label:[],
        contnet:[],
        error:[],
        default:[],
    }
    constructor(){
        let slot = this.slot
        DefaultItems.forEach((item:CompOptions) => {
            item.internal = true
        })
        signAsInternalComp(DefaultItems)
        signAsInternalComp(DefaultAnnotation)
        signAsInternalComp(DefaultLabels)
        signAsInternalComp(DefaultErrors)
        //signAsInternalComp(DefaultInputs)
        this.addFormItem(DefaultItems)
        this.addInput(DefaultInputs.map(input => ({
            advance:false,
            component:input
        })))
        slot.annotation = DefaultAnnotation
        slot.label = DefaultLabels
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
    addInput(arg: schedulerInput[]){
        let comps:CompOptions[] = arg.map((item:schedulerInput) => {
            return item.component
        })
        let base = arg.reduce((res:CompOptions[],item:schedulerInput) => {
            if(!item.advance){
                res.push(item.component)
            }
            return res
        },[])
        let advance = arg.reduce((res:CompOptions[],item:schedulerInput) => {
            if(item.advance){
                res.push(item.component)
            }
            return res
        },[])
        console.log('this.slot.default',this.slot.default)
        this.slot.default = [...this.slot.default,...comps]
        this.input.base = [...this.input.base,...base]
        this.input.advance = [...this.input.advance,...advance]
    }
    getFormItem(name:string = 'ease-form-default-item') : schedulerFormItem{
        return this.formItems.find(item => item.component.name === name)
    }
    getGroupedSlots(slotName:string) : CompOptions[]{
        return this.slot[slotName] || []
    }
    getSlot(slotName:string,name:string = 'ease-form-default') : CompOptions {
        if(slotName in this.slot){
            return this.slot[slotName].find(item => {
                //let compName = item.internal ? `${name}-${slotName}` : slotName
                return item.name === name
            })
        }else{
            console.warn(`slot template '${slotName}' was not exsist!`)
        }
    }
    getInput(type:string) : CompOptions{
        return this.slot.default.find(item => item.type === type)
    }
    // private check(comp:CompOptions){
    //     if(comp.name){

    //     }
    // }
}

let scheduler = new Scheduler()

scheduler.addFormItem([{
    name:'my-form-item',
    slots:['default','test-label'],
    render(h:CreateElement){
      return h('div','my-form-item')
    }
  }])
export default scheduler

