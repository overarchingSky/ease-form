import { CompOptions } from './../types/comp-options.d';
/**
 * 是否是vue组件，区别于原生元素
 * @param arg 
 */
export function isVueComponent(arg:any){
    return typeof arg !== 'string'
}

export function signAsInternalComp(Comps:CompOptions[]){
    Comps.forEach((item:CompOptions) => {
        item.internal = true
    })
}