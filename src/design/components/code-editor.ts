import Vue, { CreateElement } from 'vue'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
// theme css
// import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/3024-day.css'
import jsBeautify from './js-beautify'
import { stringifyObj, parseObj } from '../../utils';
export default {
    name:'code-editor',
    props:{
        value:{
            type:[Array,Object,String]
        },
        activeKey:{
            type:Number
        },
        type:{
            type:String
        },
        readOnly:{
            type:Boolean
        }
    },
    data(){
        return {
            // tempValue:temporary value,if it's same as value, stringifyValue will not be update
            // stringifyValue will be update only when prop value changed without input in codemirror
            // when the codemirror be input, we hope component'render function not be executed, because it will re-render entirely codemirror，and cause input cursor move to an unexpected position
            tempValue:'',
            stringifyValue: this.formatValue()
        }
    },
    computed:{
        codemirror(){
            return this.$children[0].codemirror
        }
    },
    watch:{
        value:{
            handler(){
                let newValue = this.formatValue()
                if(newValue !== this.tempValue){
                    this.stringifyValue = this.formatValue()
                }
                // 此处会导致编辑代码时，代码块被选中
                //this.location()
            },
            deep:true
        },
        activeKey:{
            handler(val){
                this.location()
            },
            immediate:true
        }
    },
    render(h:CreateElement){
        return h(codemirror,{
            ref:'code',
            props:{
                value:this.stringifyValue,
                options: {
                    // codemirror options
                    tabSize: 4,
                    mode:'text/javascript',
                    theme: '3024-day',
                    lineNumbers: true,
                    line: true,
                    lineWrapping:true,
                  }
            },
            on:{
                input:this.updateConfig
            }
        })
    },
    methods:{
        formatValue(val = this.value){
            if(typeof val=== 'string'){
                return jsBeautify(val)
            }
            try {
                return jsBeautify(stringifyObj(val))
            } catch (error) {
                console.warn('the code must be json');
                return jsBeautify(val)
            }
        },
        scrollFeild(id){
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
            try {
                let output = parseObj(code)
                code = this.formatValue(output)
                this.$emit('input',output)
                this.tempValue = code
            } catch (error) {
               
            }
        },
        location(){
            this.$nextTick(_ => {
                if(this.activeKey){
                    this.rowInfo = this.scrollFeild(this.activeKey)
                    let {startIndex,endIndex} = this.rowInfo
                    this.codemirror.setSelection ({line:startIndex,ch:3},{line:endIndex,ch:1})
                    this.codemirror.scrollIntoView({line:startIndex,ch:3})
                }
            })
        }
    }
}