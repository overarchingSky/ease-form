import { CreateElement } from 'vue';
import { CompOptions } from './comp-options.d';

import { VNodeData,VNode } from 'vue/types/vnode'

declare class Field {
    type: string;
    label: string;
    field: string;
    value: any;
    formItem: string;
    //当前用到的slot模板
    slots:obj;
    computedValue: (formValue:obj) => any;
    // 联动规则
    linkage: Linkage;
    _visibility:boolean;
    // 传递vnode配置给组件
    _transmit: VNodeData;
    _slots:{
        [key:string]:CompOptions
    };
    _formItem: CompOptions;
    validate: {
        rules:{},
        // 触发事件
        trigger?:{
            // 触发验证的事件列表,被vee-validate一致，使用“|”做分割
            events:string[];
            // modifiers，refer：https://baianat.github.io/vee-validate/api/directive.html#directive-modifiers
            options:{
                // 配置多个校验规则时，当前一个校验失败时，是否继续后续校验，并给出所有的错误信息？
                continues?:boolean;
                // 当字段被销毁时（destoryed），是否将状态保留到内存中，以便仍能对其进行校验
                persist?:boolean;
                // ??
                bails?:boolean;
                // 是否禁用自动校验功能？
                disable?:boolean;
                // 是否在渲染成功后立即校验一次，某些场景如：编辑表单时，可以立即做一次校验
                immediate?:boolean;
            }
        }

    }
    [key:string]:any
}

declare interface Validate {
    required?: boolean,
    message: string,
    trigger: Event
}

declare interface Linkage {
    visibility:{
        rule: (formValue:obj) => boolean
    }
    computed:{
        rule: (formValue:obj) => any
    }
}


