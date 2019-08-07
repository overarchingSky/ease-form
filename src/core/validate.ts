import Vue from 'vue';
import VeeValidate from 'vee-validate';

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
