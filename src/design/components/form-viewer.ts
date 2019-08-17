import { formVm } from './../../core/instence';

import { Field } from '../../../types/field';
import { CreateElement } from 'vue';
import scheduler from '../../core/scheduler'
import { generateFieldConfig } from '../../utils';
import mixins from '../../core/mixins'
export default {
    name:'form-viewer',
    mixins:[mixins],
    model:{
        prop:'config',
        event:'input'
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
                add:this.updateConfig,
                sort:this.sortHandler
            }
        }, [formVm.config.map((Field:Field,index:number) => {
            const activeClassName = this.currentActiveFeild && this.currentActiveFeild.id === Field.id && 'active'
            return h('div',{
                class:`ease-form-row ${activeClassName}`,
                key: Field.id,
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
                    // when Field.validate change, we hope to create a new form-item instance, because of the directives v-validate won't update or re-initial
                    //key:JSON.stringify(Field.validate),
                    key:Field.id,
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
    data(){
        return {
            // both of add and sort event handler will be dispatch when add a new field, but only add event handler was expected
            // adding state is expected to deal with the case of add
            adding:false,
            currentActiveFeild:null,
        }
    },
    methods:{
        updateConfig(e:any){
            const {item,oldIndex,newIndex} = e
            const { group } = item.dataset
            const inputs = scheduler.input[(group as string)]
            const input = inputs[oldIndex]
            console.log('info',input)
            this.config.splice(newIndex,0,generateFieldConfig(input.type))
            console.log('add',this.config)
            this.$emit('input',this.config)
            this.adding = true
        },
        sortHandler(e){
            if(this.adding){
                return this.adding = false
            }
            let { oldIndex, newIndex } = e
            let field = this.config.splice(oldIndex,1)[0]
            this.config.splice(newIndex,0,field)
            this.$nextTick(_ => {
                this.clickHandler(newIndex,field)
            })
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
