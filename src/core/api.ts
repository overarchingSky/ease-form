import { formVm } from './instence';
import { CompOptions } from './../../types/comp-options.d';
import i18n from './i18n'
import { schedulerSlots, schedulerFormItem, schedulerInput } from '../../types/scheduler';
import scheduler from './scheduler';

export const staticApi = {
    localize:i18n.localize,
    extend:extend,
    extends:multipleExtend
}

const { getInstance,getFieldInstance } = formVm

export const instanceApi = {
    localize:i18n.localize,
    getInstance,
    getFieldInstance
}

function extend(arg:schedulerInput):void;
// extend form-item or input type
function extend(arg:schedulerFormItem|CompOptions):void;
// extend slot
function extend(arg:string,config:CompOptions ) : void
function extend(arg:schedulerFormItem|CompOptions|string|schedulerInput,config?:CompOptions):void{
    if(typeof arg === 'string'){
        scheduler.addSlot({
            [arg]:[config]
        })
    }else if((arg as schedulerFormItem|CompOptions).slots){
        scheduler.addFormItem([arg as schedulerFormItem|CompOptions])
    }else if((arg as schedulerInput).component){
        scheduler.addInput([arg as schedulerInput])
    }
}
// extend input type
function multipleExtend(arg: schedulerInput[]) : void;
// extend form-item
function multipleExtend(arg: (schedulerFormItem|CompOptions)[]):void;
// extend slot
function multipleExtend(arg: schedulerSlots ) : void;
// extend slot
function multipleExtend(arg:string,config:CompOptions[] ) : void;
function multipleExtend(arg:(schedulerFormItem|CompOptions)[]|schedulerInput[]|schedulerSlots|string,config?:CompOptions[] ) : void {
    if(typeof arg === 'string'){
        if(Array.isArray(config)){
            scheduler.addSlot({
                [arg]:config
            })
        }else{
            throw(Error('arguement config of function extends must be an Array width CompOptions'))
        }
    }else if((arg[0] as schedulerFormItem|CompOptions).slots){
        scheduler.addFormItem(arg as (schedulerFormItem|CompOptions)[])
    }else if('advance' in (arg[0] as schedulerInput) && 'component' in (arg[0] as schedulerInput)){
        scheduler.addInput(arg as schedulerInput[])
    }else{
        scheduler.addSlot(arg as schedulerSlots)
    }
}