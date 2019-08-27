import { isFunction } from 'lodash-es';
import { isObject } from 'lodash-es';
import { Field } from '../../types/field';
// Automatic Computation value
export function computedValue (field:Field, formValue:obj) : any {
    const computed = field.linkage.computed
    if(!isObject (computed)){
        return true
    }
    const ruleFun = computed && computed.rule
    if(ruleFun){
        if(isFunction(ruleFun)){
            console.log('++ calc')
            return ruleFun(formValue) || ''
        } else {
            console.warn(`field ${field.field} linkage.computed.rule must be a function`)
            return ''
        }
    } else {
        return ''
    }
}