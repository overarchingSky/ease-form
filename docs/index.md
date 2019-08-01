```vue
<template>
    <ease-form :config="config" v-model="formValue">123456786</ease-form>
</template>
<script lang="ts">
export default {
    data(){
        return {
            formValue:{},
            config:[
                {
                    field:'name',
                    slots:{
                        default:'text',
                        label:'tllabel'
                    }
                }
            ]
        }
    },
    watch:{
        formValue:{
            handler(){
                console.log('formValue',this.formValue)
            },
            deep:true
        }
    }
}
</script>
```