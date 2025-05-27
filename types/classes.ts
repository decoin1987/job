interface ITask {
    id: number
    title: string
    active: Boolean
    checked: Boolean
    taskHandler():void
}


export class Task implements ITask{

    constructor(public id:number, public title:string, public active:boolean, public checked:boolean) {
        this.id = id
        this.title = title
        this.active = active
        this.checked = checked
    }

    public taskHandler() {
        this.checked = !this.checked
    }
}