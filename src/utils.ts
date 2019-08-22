import { CompOptions } from './../types/comp-options.d';
import json from 'json5'
import { isUndefined } from 'util';
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

/**
 * generate default field config
 * @param type input type, such as:text number date etc.
 */
//待拓展，用户可自定义默认值
export function generateFieldConfig(type:string){
    return {
        id:Math.ceil(Math.random() * 10000) + Date.now(),
        field:`field`,
        formItem:'ease-form-default-item',
        label:'label',
        annotation:'field desc',
        slots:{
            default:type,
            label: "ease-form-default-label",
            error: "ease-form-default-error",
            annotation: "ease-form-default-annotation"
        },
        validate:{
            rules:{},
            trigger:{
                events:['blur'],
                // modifiers
                options:{
                    continues:false,
                    persist:false,            
                    bails:false,          
                    disable:true,     
                    immediate:false
                }
            }
        }
    }
}

export function formateSelectorOptions(options){
    options.unshift({
        label:'none',
        value:''
    })
    return options
}




export function StringFunction(src:obj[]|obj){
    if((src as obj[]).push){
        return src.map(item => {
            let newObj = {}
            for(var key in item){
                if(item.hasOwnProperty(key) && item[key] instanceof Function){
                    newObj[key] = item[key].toString().replace(/[\n\t]/g,"");
                    continue;
                }
                // 如果为数组或者obj，则递归
                // else if(item[key]){

                // }
                newObj[key] = item[key];
            }
            return newObj
        })
    }else{
        let newObj = {}
        for(var key in src){
            if(src.hasOwnProperty(key) && src[key] instanceof Function){
                newObj[key] = src[key].toString().replace(/[\n\t]/g,"");
                continue;
            }
            newObj[key] = src[key];
        }
        return newObj
    }
}

export function stringifyObj(src){
    return json.stringify(src)
}

export function parseObj(strObj){
    return json.parse(strObj)
    // var obj = JSON.parse(strObj);
    // var funReg = /function\s\(.*\)/;
    // for(var key in obj){
    //     if(funReg.test(obj[key])){
    //         try{
    //             var fun = (new Function("return " + obj[key]))();
    //             if(fun instanceof Function){
    //                 obj[key] = fun;
    //             }
    //         }catch(e){
    //             console.log(e)
    //         }
    //     }
    // }
    // return obj;
}

export function isDefined(data){
    return data !== undefined
}

export function isNaN(data){//利用NaN !== NaN的特性判定
    return data !== data
}