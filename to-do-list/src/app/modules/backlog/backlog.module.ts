import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacklogComponent } from './backlog.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { ToDoListCreateComponent } from './components/to-do-list-create/to-do-list-create.component';
import { ToDoListViewComponent } from './components/to-do-list-view/to-do-list-view.component';
import { BacklogRoutingModule } from './backlog.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
      BacklogComponent,
      ToDoListComponent,
      ToDoListItemComponent,
      ToDoListCreateComponent,
      ToDoListViewComponent,
  ],
  imports: [
      CommonModule,
      BacklogRoutingModule,
      FormsModule,
      AngularMaterialModule,
      ReactiveFormsModule,
      SharedModule,
  ],
})
export class BacklogModule { }
