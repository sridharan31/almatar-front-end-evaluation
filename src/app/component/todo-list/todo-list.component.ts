import { Input, Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { Task } from './task.model';
import { TaskService } from './task-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { startOfDay, endOfDay, isToday, startOfWeek, endOfWeek, isAfter } from 'date-fns';
@Component({
  selector: 'app-ngbd-alert',
  templateUrl: 'todo-list.component.html',
  styles: [

  ],
})
export class NgbdAlertBasicComponent {
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  filteredTasks: Task[] = [];
  isDeleteButtonDisabled = true;
  isDoneButtonDisabled = true;
  taskForm: FormGroup;
  filterForm: FormGroup;
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      selectedTasks: new FormControl(null),
    });
    this.filterForm= this.fb.group({
      title: [''],
      date: [''],
      group: [''],
    });
  }

  ngOnInit(): void {
    this.loadTasks();

  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks();
    });

    this.clearSelection();
  }
  markAsDone(): void {
    this.selectedTasks.forEach((task) => {
      this.taskService.markTaskAsDone(task.id);
    });
    this.clearSelection();
  }
 
  deleteSelected(): void {
    const taskIdsToUpdate = this.selectedTasks.map((task) => task.id);
    this.taskService.updateTaskStatus(taskIdsToUpdate, 'Pending');
    this.clearSelection();
  }

  private clearSelection(): void {
    const selectedTasksControl = this.taskForm.get('selectedTasks') as FormControl;
    selectedTasksControl.setValue(null);
    this.selectedTasks = [];
  }
  selectTask(task: Task): void {
    const index = this.selectedTasks.indexOf(task);
    if (index === -1) {
      this.selectedTasks.push(task);
    } else {
      this.selectedTasks.splice(index, 1);
    }
    this.isDeleteButtonDisabled = this.selectedTasks.length === 0;
    this.isDoneButtonDisabled = this.selectedTasks.length === 0;
  }
  isMultipleSelection(): boolean {
    return this.selectedTasks.length > 1;
  }
  AddNew(){
    this.router.navigate(['component/addTask'])
  }

  getUniqueGroups(): string[] {
    return Array.from(new Set(this.tasks.map(task => task.group)));
  }

  getTasksByGroup(group: string): Task[] {
    return this.filteredTasks.filter(task => task.group === group);
  }
  markTaskAsDone(task: Task): void {
    this.taskService.markTaskAsDone(task.id);
  }

  deleteTask(task: Task): void {
    this.taskService.updateTaskStatus([task.id], 'Pending');
  }

  filterTasks(): void {
    const filters = this.filterForm.value;
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (!filters.date || new Date(task?.deliveryDate).toDateString() === new Date(filters.date).toDateString()) &&
        (!filters.group || task.group === filters.group)
      );
    });
  }

  // filterTasks(): void {
  //   const filters = this.taskForm.value;

  //   this.filteredTasks = this.tasks.filter((task) => {
  //     return (
  //       task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
  //       (!filters.date || new Date(task.date).toDateString() === new Date(filters.date).toDateString()) &&
  //       (!filters.group || task.group === filters.group) &&
  //       (filters.today || this.isToday(new Date(task.date))) &&
  //       (filters.thisWeek || this.isThisWeek(new Date(task.date)))
  //     );
  //   });
  // }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isThisWeek(date: Date): boolean {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 6 - today.getDay());
    return date >= today && date <= endOfWeek;
  }
}


