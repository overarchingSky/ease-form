import { Field } from "../../types/field";
import { isFunction, isObject } from "lodash-es";

// Manage field visibility
export function initVisibility (field:Field, formValue:obj) : boolean {
    if(!isObject(field.linkage)){
        return true
    }
    const ruleFun = field.linkage && field.linkage.rule
    if(ruleFun && !isFunction(ruleFun)){
        console.warn(`field ${field.field} linkage.rule must be a function`)
        return true
    }
    if(ruleFun){
        return ruleFun(formValue)
    }else {
        // if ruleFun not exist
        return true
    }
}