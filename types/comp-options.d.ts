import Vue from 'vue'
import { ComponentOptions } from 'vue/types/options'
export interface CompOptions extends ComponentOptions <Vue> {
    name:string;
    //是否是内置组件模板
    internal?:boolean;
    slots?:string[];
    alias?:string;
    type?:string;
}