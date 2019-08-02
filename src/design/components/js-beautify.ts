import  beautify_js from 'js-beautify'

export default function (src,options = {}){
    return beautify_js(src,{
        indent_size:2,
        ...options
    })
}