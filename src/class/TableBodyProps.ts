export class ToDoItem {
    id: number = 0;
    todo: string = "";
    completed: boolean = false;
    userId: number = 0;
}

export default class TableBodyProps {
    todoList: ToDoItem[] = [];
}