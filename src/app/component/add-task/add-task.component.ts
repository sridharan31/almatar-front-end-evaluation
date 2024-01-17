import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../todo-list/task-service.service";
import { Router } from "@angular/router";
import { Task, TaskForm } from "../todo-list/task.model";
@Component({
  templateUrl: "add-task.component.html",
})
export class addTaskComponent { 

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      group: ['', Validators.required],
    });
  }

  clearForm(): void {
    this.taskForm.reset();
    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
  }

  addTask(): void {
    if (this.taskForm.valid) {
        // Create a new task using the form data
        const newTask: Task = {
          id: this.generateNewId(), // You need to implement generateNewId() method
          title: this.taskForm.controls['title'].value,
          description: this.taskForm.controls['description'].value,
          priority: this.taskForm.controls['priority'].value,
          deliveryDate: this.taskForm.controls['deliveryDate'].value,
          group: this.taskForm.controls['group'].value,
          state: 'Pending',
          deleted: false,
        };
    
        // Add the new task to the task service
        this.taskService.addTask(newTask);
      // // You can add logic to save the task to the backend here
      // this.taskService.addTask(newTask);
      this.clearForm();
    }
  }
  private generateNewId(): number {
    // Generate a timestamp-based ID with a random number
    return new Date().getTime() + Math.floor(Math.random() * 1000);
  }
  get f() { return this.taskForm.controls; }
  goBackToList(): void {
    this.router.navigate(['component/task']);
  }
}
