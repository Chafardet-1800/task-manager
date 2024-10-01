export interface TaskModel {
    id: string;
    name: string;
    status: string;
}

export interface BoardModel {
    id: string;
    name: string;
    tasks: TaskModel[];
}