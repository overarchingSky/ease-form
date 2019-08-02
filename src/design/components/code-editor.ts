import Vue, { CreateElement } from 'vue'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
import jsBeautify from './js-beautify'
import { stringifyObj, parseObj } from '../../utils';
export default {
    name:'code-editor',
    props:{
        value:{
            type:Array
        }
    },
    computed:{
        _value(){
            return jsBeautify(stringifyObj(this.value))
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
        updateConfig(code:any){
            console.log(code)
            this.$emit('input',parseObj(code))
        }
    }
}