
import { VNode } from 'vue/types/vnode'
declare class FormItem {
    type: string;
    label: string;
    field: string;
    value: any;
    // 传递vnode配置给组件
    transmit: VNode;
    validate: {

    }
}

declare interface Validate {
    required?: boolean,
    message: string,
    trigger: Event
}

declare enum Event {
    click,
    focus,
    blur,
    touchStart,
    touchEnd,
    change
}
