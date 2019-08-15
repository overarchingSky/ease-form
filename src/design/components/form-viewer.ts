import { instanceApi } from './../../core/api';
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
        },
        dictionary:{
            type:Object
        }
    },
    computed:{
        config(){
            return JSON.parse(JSON.stringify(this.value))
        },
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
            const activeClassName = this.currentActiveFeild.id === Field.id && 'active'
            return h('div',{
                class:`ease-form-row ${activeClassName}`,
                style:{
                    alignItems:'center'
                }
            },[
                h(Field._formItem,{
                    style:{
                        userSelect:'none',
                        cursor:'grab',
                        flex:1
                    },
                    // when Field.validate change, we hope to create a new form-item instance,because of the directives v-validate won't update
                    key:JSON.stringify(Field.validate),
                    scopedSlots:Field.transmit.scopedSlots,
                    nativeOn:{
                        click:_ => this.clickHandler(index,Field)
                    }
                }),
                h('div',{
                    class:'ease-form-delete',
                    on:{
                        click: _ => this.deleteField(index)
                    }
                },'×')
            ])
        })])
    },
    watch:{
        currentValue:{
            handler(){
                this.updateInnerConfig()
            },
            deep:true
        },
        config(){
            this.updateInnerConfig()
        }
    },
    created(){
        setVM(this)
        this.updateInnerConfig()
        console.log('this',this)
    },
    data(){
        return {
            currentActiveFeild:{},
            resolvedConfig:[],
            currentValue:{}
        }
    },
    methods:{
        ...instanceApi,
        updateInnerConfig(){
            const res = init(this.config,this.currentValue)
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
        deleteField(index){
            this.config.splice(index,1)
            this.$emit('clear-select-field')
            this.$emit('input',this.config)
            console.log('delete',index,this.config)
        }, 
        clickHandler(index:number,field:any){
            this.currentActiveFeild = field
            this.$emit('select-field',index,field)
        }
    }
}
