import { init, setVM } from '../../core/instence';
import { Field } from '../../../types/field';
import { CreateElement } from 'vue';
import scheduler from '../../core/scheduler'
import { generateFieldConfig } from '../../utils';
import { ResolvedField } from '../../../types/resolved-field';
export default {
    name:'form-viewer',
    props:{
        value:{
            type:Array
        }
    },
    computed:{
        config(){
            return JSON.parse(JSON.stringify(this.value))
        },
        currentActiveFeild(){
            return this.resolvedConfig[this.currentActiveFeildIndex]
        }
    },
    components:{
        
    },
    render(h:CreateElement){
        return h('dragable',{
            class:'ease-form-viewer',
            props:{
                options:{
                    group:{
                        name:'viewer',
                        put:true
                    },
                    ghostClass:'ease-form-ghost',
                    swapThreshold:0.5,
                    animation: 100
                },
            },
            on:{
                add:this.updateConfig
            }
        }, [this.resolvedConfig.map((Field:Field,index:number) => {
            return h(Field._formItem,{
                class:this.currentActiveFeildIndex === index && 'active',
                style:{
                    userSelect:'none',
                    cursor:'grab'
                },
                key:Field.field,
                scopedSlots:Field.transmit.scopedSlots,
                nativeOn:{
                    click:_ => this.clickHandler(index,Field)
                }
            })
        })])
    },
    watch:{
        config(){
            this.updateInnerConfig()
        }
    },
    created(){
        setVM(this)
        this.updateInnerConfig()
    },
    data(){
        return {
            currentActiveFeildIndex:null,
            currentActiveFeild:{},
            resolvedConfig:[]
        }
    },
    methods:{
        updateInnerConfig(){
            const res = init(this.config,this.value)
            this.resolvedConfig = res
        },
        updateConfig(e:any){
            const {item,oldIndex,newIndex} = e
            const { group } = item.dataset
            const inputs = scheduler.input[(group as string)]
            const input = inputs[oldIndex]
            console.log('info',input)
            this.config.splice(newIndex,0,generateFieldConfig(input.type))
            console.log('add',this.config)
            this.$emit('input',this.config)
        },
        clickHandler(index:number,field:any){
            this.currentActiveFeildIndex = index
            this.$emit('select-field',index,field)
        }
    }
}
