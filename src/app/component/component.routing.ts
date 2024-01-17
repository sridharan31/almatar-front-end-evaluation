import { Routes } from '@angular/router';
import { NgbdAlertBasicComponent } from './todo-list/todo-list.component';
import { addTaskComponent } from './add-task/add-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'task/:id',
				component: TaskDetailsComponent
			},
			{
				path: 'addTask',
				component: addTaskComponent
			},
			{
				path: 'task',
				component: NgbdAlertBasicComponent
			},
		]
	}
];
