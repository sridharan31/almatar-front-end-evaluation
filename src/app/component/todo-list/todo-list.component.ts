import { Input, Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { Task } from './task.model';
import { TaskService } from './task-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.taskForm = this.fb.group({
      selectedTasks: new FormControl(null),
    });
    this.filterForm= this.fb.group({
      title: [''],
      date: [''],
      group: [''],
      today: [false],
      Week: [false],
      all: [false],
      done: [false],
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const filter = queryParams['filter'];
      this.filterForm.patchValue({
        today: false,
        Week: false,
        all: false,
        done: false,
      });
      if (filter === 'today' || filter === 'Week' || filter === 'all' || filter === 'done') {
        this.filterForm.patchValue({ [filter]: true });
      }
// console.log(filter)
//       if (filter === 'today') {
//         this.filterForm.patchValue({ today: true });
//         this.filterForm.patchValue({ thisWeek: false });
//         this.filterForm.patchValue({ all: false });
//         this.filterForm.patchValue({ done: false });
//       } else if (filter === 'Week') {
//         this.filterForm.patchValue({ today: false });
//         this.filterForm.patchValue({ thisWeek: true });
//         this.filterForm.patchValue({ all: false });
//         this.filterForm.patchValue({ done: false });
//       } else if (filter === 'all') {
//         this.filterForm.patchValue({ today: false });
//         this.filterForm.patchValue({ thisWeek: false });
//         this.filterForm.patchValue({ all: true });
//         this.filterForm.patchValue({ done: false });
//       } else if (filter === 'done') {
//         this.filterForm.patchValue({ today: false });
//         this.filterForm.patchValue({ thisWeek: false });
//         this.filterForm.patchValue({ all: false });
//         this.filterForm.patchValue({ done: true });
//       }else  {
//         this.filterForm.patchValue({ today: false });
//         this.filterForm.patchValue({ thisWeek: false });
//         this.filterForm.patchValue({ all: false });
//         this.filterForm.patchValue({ done: false });
//       }

      this.loadTasks();
    });
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

  // filterTasks(): void {
  //   const filters = this.filterForm.value;
  //   this.filteredTasks = this.tasks.filter((task) => {
  //     return (
  //       task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
  //       (!filters.date || new Date(task?.deliveryDate).toDateString() === new Date(filters.date).toDateString()) &&
  //       (!filters.group || task.group === filters.group)
  //     );
  //   });
  // }

  filterTasks(): void {
    const filters = this.filterForm.value;

    this.filteredTasks = this.tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (!filters.date || new Date(task.deliveryDate).toDateString() === new Date(filters.date).toDateString()) &&
        (!filters.group || task.group === filters.group) &&
        (!filters.today || this.isToday(new Date(task.deliveryDate))) &&
        (!filters.Week || this.isThisWeek(new Date(task.deliveryDate))) &&
        (!filters.all || true) &&
        (!filters.done || task.state === 'Done')
      );
    });
    console.log(this.filteredTasks)
  }

  isToday(date: Date): boolean {
    const today = new Date();
    console.log(date.toDateString() === today.toDateString())
    return date.toDateString() === today.toDateString();
  }

  isThisWeek(date: Date): boolean {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
console.log(date >= startOfWeek && date <= endOfWeek)
    return date >= startOfWeek && date <= endOfWeek;
  }
}


