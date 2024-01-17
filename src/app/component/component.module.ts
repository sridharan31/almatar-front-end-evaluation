import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdAlertBasicComponent } from './todo-list/todo-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { addTaskComponent } from './add-task/add-task.component';
import { GroupByPipe } from 'ngx-pipes';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    NgbdAlertBasicComponent,
    addTaskComponent,
    TaskDetailsComponent

  ],
  providers:[GroupByPipe]
})
export class ComponentsModule { }
