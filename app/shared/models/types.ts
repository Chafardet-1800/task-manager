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

export interface FormInputConfigModel {
    name: string;
    type: string;
    value: string;
    placeholder: string;
    required: boolean;
    fullWidth: boolean;
    style: string;
}