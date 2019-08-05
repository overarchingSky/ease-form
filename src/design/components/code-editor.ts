import Vue, { CreateElement } from 'vue'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
// monokai.css
// 3024-day
// 3024-night
import jsBeautify from './js-beautify'
import { stringifyObj, parseObj } from '../../utils';
export default {
    name:'code-editor',
    props:{
        value:{
            type:Array
        },
        activeKey:{
            type:Number
        }
    },
    computed:{
        _value(){
            return jsBeautify(stringifyObj(this.value))
        },
        codemirror(){
            return this.$children[0].codemirror
        }
    },
    watch:{
        activeKey(val){
            this.$nextTick(_ => {
                if(val){
                    this.rowInfo = this.scrollFeild(this.activeKey)
                }
                let {startIndex,endIndex} = this.rowInfo
                this.codemirror.setSelection ({line:startIndex,ch:3},{line:endIndex,ch:1})
                this.codemirror.scrollIntoView({line:startIndex,ch:3})
            })
        }
    },
    render(h:CreateElement){
        return h(codemirror,{
            ref:'code',
            props:{
                value:this._value,
                options: {
                    // codemirror options
                    tabSize: 4,
                    mode: 'text/javascript',
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                    // highlightSelectionMatches:{
                    //     showToken:true,

                    // },
                    lineWrapping:true
                    // more codemirror options, 更多 codemirror 的高级配置...
                  }
            },
            on:{
                input:this.updateConfig
            }
        })
    },
    methods:{
        scrollFeild(id){
            console.log('id',id)
            let lineCount = this.codemirror.lineCount()
            let startIndex = -1
            let endIndex = -1
            let deep = 0
            for(let i = 0 ; i < lineCount; i++){
                const text = this.codemirror.lineInfo(i).text
                if(startIndex > -1){
                    if(/}/.test(text)){
                        if(deep === 0){
                            endIndex = i
                            break;
                        }else{
                            deep--
                        }
                    }
                    if(/{/.test(text)){
                        deep++
                    }
                }else if((new RegExp(id)).test(text)){
                    startIndex = i - 1
                }
            }
            return {
                startIndex,
                endIndex
            }
        },
        updateConfig(code:any){
            console.log(code)
            this.$emit('input',parseObj(code))
        }
    }
}