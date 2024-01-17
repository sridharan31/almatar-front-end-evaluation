
export interface Task {
    id: number;
    title: string;
    description?: string;
    priority?: string;
    deliveryDate: Date;
    state: string;
    group: string;
    deleted: boolean;
  }

  export interface TaskForm {
    title: string;
    description: string;
    priority: string;
    deliveryDate: Date;
    group: string;
  }