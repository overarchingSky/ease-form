import { CompOptions } from './comp-options.d';
import { Field } from "./field";

declare class ResolvedField extends Field {
    _slots:{
        [key:string]:CompOptions
    };
    _formItem: CompOptions;
}