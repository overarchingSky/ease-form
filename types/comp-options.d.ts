import Vue from 'vue'
import { ComponentOptions } from 'vue/types/options'
export interface CompOptions extends ComponentOptions <Vue> {
    name:string;
    slots?:string[];
}