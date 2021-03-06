import { VeeOptions } from './../../types/vee-validate.d';
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import axios from 'axios'

Vue.use(VeeValidate,{
    classes: true,
});

export function initDictionary(){
    return {
        en: {
          attributes: {
            email: 'Email Address'
          }
        }
    }
}

export function localize(language = 'en'){
    Validator.localize(language)
}

export const triggerEvents = [{
  label:'input',
  value:'input'
},{
  label:'change',
  value:'change'
}]

export const rules = Validator.rules



// how to deal with the rules such as "is", "is_not"?

export const rulesWithArg = ['after','before','between','confirmed','date_between','date_format','decimal','digits','dimensions','ext','included','excluded','length','max','min','max_value','min_value','mimes','regex','required_if','size','url']

Object.keys(rules).forEach((ruleName:string) => {
  if(rulesWithArg.indexOf(ruleName) > -1){
    let rule:VeeOptions = rules[ruleName].options
    rule.needExtraParmas = true
  }
})

// extend demo

Validator.extend('tianlong',{
  getMessage: field => 'The ' + field + ' value is not tianlong.',
  validate: value => value === 'tianlong'
},{
  needExtraParmas:false
} as VeeOptions)

Validator.extend('remote',( value, args ) => {
  // axios({
  //   method:'get',
  //   url:'http://bit.ly/2mTM3nY',
  //   responseType:'stream'
  // })
  let params
  if(typeof args === 'string'){
    params = {
      url:args,
      method:'get'
    }
  }else if(typeof args === 'object'){
     params = args
  }
  return axios(params).then()
},{
  immediate:false,
  needExtraParmas:true
} as VeeOptions)