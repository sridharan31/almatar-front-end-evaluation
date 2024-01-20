import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    // {
    //   id: 1,
    //   title: 'Task 1',
    //   deliveryDate: new Date(),
    //   state: 'Pending',
    //   group: 'group1',
    //   deleted: false,
    // },
    // {
    //   id: 2,
    //   title: 'Task 2',
    //   deliveryDate: new Date(),
    //   state: 'Pending',
    //   group: 'group2',
    //   deleted: false,
    // },
  ];
  constructor() {
    this.loadTasksFromLocalStorage();
  }
  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }
  getTasks(): Observable<Task[]> {
    const filteredTasks = this.tasks.filter((task) => !task.deleted);
    return of(filteredTasks);
  }
  private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


  addTask(newTask: Task): void {
    // For simplicity, we are not assigning a real ID or handling backend logic here
    newTask.id = this.tasks.length + 1;
    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
    console.log(this.tasks)
  }
  markTaskAsDone(taskId: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].state = 'Done';
    }
    this.saveTasksToLocalStorage();
  }
  deleteTasks(taskIds: number[]): void {
    this.tasks = this.tasks.filter((task) => !taskIds.includes(task.id));
  }
  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id == id);
  }
  updateTaskStatus(taskIds: number[], newStatus: string): void {
    taskIds.forEach((taskId) => {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.state = newStatus;
      }
    });
    this.saveTasksToLocalStorage();
  }
}
