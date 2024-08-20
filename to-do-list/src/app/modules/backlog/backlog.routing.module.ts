import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogComponent } from './backlog.component';
import { ToDoListViewComponent } from './components/to-do-list-view/to-do-list-view.component';

const routes: Routes = [
    {
        path: '',
        component: BacklogComponent,
        children: [
            {
                path: ':id',
                component: ToDoListViewComponent,
            },
        ],
    },
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BacklogRoutingModule { }