import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board.routing.module';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { BoardItemViewComponent } from './components/board-item-view/board-item-view.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        BoardComponent,
        BoardViewComponent,
        BoardItemViewComponent,
    ],
    imports: [
        CommonModule,
        BoardRoutingModule,
    ],
})
export class BoardModule { }