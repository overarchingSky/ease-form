```vue
<template>
    <ease-form :config="config">123456786</ease-form>
</template>
<script lang="ts">
import ElFormRenderer from '../src/index'
export default {
    data(){
        return {
            config:[
                {
                    field:'name',
                    slots:{}
                }
            ]
        }
    }
}
</script>
```