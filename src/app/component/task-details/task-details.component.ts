import { Component } from '@angular/core';
import { Task } from '../todo-list/task.model';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../todo-list/task-service.service';

@Component({
  templateUrl: 'task-details.component.html',
})
export class TaskDetailsComponent {
  task: any;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const taskId = params['id'];
      this.task = this.taskService.getTaskById(taskId);
      console.log(this.task)
    });
  }
}
