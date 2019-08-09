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

export const rules = Object.keys(Validator.rules)