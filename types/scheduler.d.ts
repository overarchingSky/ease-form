import {  CompOptions } from './comp-options.d';

declare interface schedulerInput {
    advance: boolean;
    alisa?:string;
    type?:string;
    component: InputComponent;
}

declare interface schedulerSlots {
    [propsName: string]: CompOptions[];
}

declare interface schedulerFormItem {
    slots: string[];
    component: CompOptions;
}

declare type InputComponent = CompOptions|string