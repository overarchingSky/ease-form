import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

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

Validator.extend('tianlong',{
  getMessage: field => 'The ' + field + ' value is not tianlong.',
  validate: value => value === 'tianlong'
})
// @ts-ignore
window.v = Validator