import {  CompOptions } from './comp-options.d';

declare interface schedulerInput {
    advance: boolean;
    component: CompOptions;
}

declare interface schedulerSlots {
    [propsName: string]: CompOptions[];
}

declare interface schedulerFormItem {
    slots: string[];
    component: CompOptions;
}