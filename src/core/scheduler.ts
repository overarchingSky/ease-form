import { CompOptions } from './../../types/comp-options.d';
import DefaultItems from '../template/item'
import DefaultAnnotation from '../template/annotation'
import DefaultLabels from '../template/label'
import DefaultErrors from '../template/error'
import DefaultInputs from '../template/input'
import { schedulerFormItem, schedulerSlots, schedulerInput, InputComponent } from '../../types/scheduler';
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
        default:schedulerInput[]
        [key:string]:(CompOptions|schedulerInput)[]
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
            alias:input.alias,
            type:input.type,
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
        let comps:schedulerInput[] = arg.map((item:schedulerInput) => {
            return item
        })
        let base:schedulerInput[] = arg.reduce((res:schedulerInput[],item:schedulerInput) => {
            if(!item.advance){
                res.push(item)
            }
            return res
        },[])
        let advance:schedulerInput[] = arg.reduce((res:schedulerInput[],item:schedulerInput) => {
            if(item.advance){
                res.push(item)
            }
            return res
        },[])
        function merage(src = [],target = []){
            src.forEach(comp => {
                const index = target.findIndex(item => item.alias === comp.alias)
                if (index > -1){
                    target[index] = comp
                } else {
                    target.push(comp)
                }
            })
        }
        
        merage(comps,this.slot.default)
        merage(base,this.input.base)
        merage(advance,this.input.advance)
    }
    getFormItem(name:string = 'ease-form-default-item') : schedulerFormItem{
        return this.formItems.find(item => item.component.name === name)
    }
    getGroupedSlots(slotName:string) : (CompOptions|schedulerInput)[]{
        return this.slot[slotName] || []
    }
    getSlot(slotName:string,name:string = 'ease-form-default') : CompOptions|schedulerInput {
        if(slotName in this.slot){
            return this.slot[slotName].find(item => {
                if(typeof item === 'string'){
                    return item === name
                }else{
                    return (item as CompOptions).name === name
                }
                
            })
        }else{
            console.warn(`slot template '${slotName}' was not exsist!`)
        }
    }
    getInput(type:string) : schedulerInput{
        return this.slot.default.find(item => {
            return item.type === type
        })
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

