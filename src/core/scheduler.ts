import Items from '../widget/items'
import Labels from '../widget/labels'
import Contents from '../widget/contents'
import Errors from '../widget/errors'
import { Widget } from '../../types/widget';
class Scheduler {
    formItems:Widget[] =[Items]
    formLabels:Widget[] = [Labels]
    formContnets:Widget[] = [Contents]
    formErrors:Widget[] = [Errors]
    constructor(arg: SchedulerContructorArgs){
        const {items,labels,cotnents,errors} = arg
        this.formItems = [...this.formItems,...items]
        this.formLabels = [...this.formLabels,...labels]
        this.formContnets = [...this.formContnets,...cotnents]
        this.formErrors = [...this.formErrors,...errors]
    }
}

interface SchedulerContructorArgs {
    items?: Widget[]
    labels?: Widget[]
    cotnents?: Widget[]
    errors?: Widget[]
}