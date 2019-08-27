import { Field } from "../../types/field";
import { isFunction, isObject } from "lodash-es";

// Manage field visibility
export function initVisibility (field:Field, formValue:obj) : boolean {
    if(!isObject(field.linkage.visibility)){
        return true
    }
    const ruleFun = field.linkage && field.linkage.visibility.rule
    if(ruleFun){
        if(isFunction(ruleFun)){
            return ruleFun(formValue)
        }else{
            console.warn(`field ${field.field} linkage.visibility.rule must be a function`)
            return true
        }
    }else {
        return true
    }
}