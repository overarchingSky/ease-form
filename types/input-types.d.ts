import { CompOptions } from "./comp-options";

declare interface Input {
    base:CompOptions[];
    advance:CompOptions[];
    [key:string]:CompOptions[];
}