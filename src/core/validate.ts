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
},{
  label:'blur',
  value:'blur'
},{
  label:'focus',
  value:'focus'
}]

export const rules = Object.keys(Validator.rules)