import {  CompOptions } from './comp-options.d';

declare interface schedulerSlots {
    [propsName: string]: CompOptions[];
}

declare interface schedulerFormItem {
    slots: string[];
    component: CompOptions;
}