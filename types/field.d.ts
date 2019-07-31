import { CreateElement } from 'vue';
import { CompOptions } from './comp-options.d';

import { VNodeData,VNode } from 'vue/types/vnode'

declare class Field {
    type: string;
    label: string;
    field: string;
    value: any;
    // 传递vnode配置给组件
    _transmit: VNodeData;
    formItem: string;
    //当前用到的slot模板
    slots:obj;
    _slots:{
        [key:string]:CompOptions
    };
    _formItem: CompOptions;
    validate: {

    }
    [key:string]:any
}

declare interface Validate {
    required?: boolean,
    message: string,
    trigger: Event
}


