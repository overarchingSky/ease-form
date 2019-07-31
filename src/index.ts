import Vue from 'vue';
import { Form } from './core/instence';
import { schedulerSlots, schedulerFormItem } from '../types/scheduler';
import { scheduler } from './core/scheduler';
const name = 'ease-form'
export default {
    install(options:Options){
        const form = new Form()
        form.addFormItem(options.formItem)
        form.addSlot(options.slots)
        Vue.component(name, {
            name,
            props:{
                config:{
                    type:Object,
                    required:true
                }
            },
            render(h){
                return h(scheduler.getFormItem())
            },
            data(){
                return {
                    scheduler
                }
            }
        })
    }
}

interface Options {
    slots:schedulerSlots;
    formItem:schedulerFormItem[]
}