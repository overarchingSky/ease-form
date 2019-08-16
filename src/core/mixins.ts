import { instanceApi } from './api';
import { formVm } from './instence';
export default {
    props:{
        config:{
            type:Array,
            required:true
        },
        value:{
            type:Object
        },
        dictionary:{
            type:Object
        }
    },
    data(){
        return {
            resolvedConfig:[],
            currentValue:this.value || {}
        }
    },
    methods:{
        ...instanceApi,
    },
    watch:{
        value(val){
            this.currentValue = val || {}
        },
        config(...arg){
            formVm.init(this.config,this.currentValue)
        }
    },
    created(){
        formVm.form = this
        formVm.init(this.config,this.currentValue)
    },
}