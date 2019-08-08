import { localize } from "./validate";

class I18n {
    language:string
    constructor(language = 'en'){
        this.localize(language)
    }
    localize(language = 'en'):void{
        this.language = language
        localize(language)
    }
}

export default new I18n()