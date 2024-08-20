import { Component, OnInit } from '@angular/core';
import { EToDoListItemStatus, IToDoListItem, translatedToDoListItemStatus } from '../../../../models/to-do-list';
import { Observable, map } from 'rxjs';
import { ToDoListDataService } from '../../../../service/to-do-list-data.service';

@Component({
    selector: 'app-board-view',
    templateUrl: './board-view.component.html',
    styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit {
    readonly toDoListItemStatus = EToDoListItemStatus;
    allToDoListItems$!: Observable<Array<IToDoListItem>>;
    inProgressToDoListItems$!: Observable<Array<IToDoListItem>>;
    completedToDoListItems$!: Observable<Array<IToDoListItem>>;
    readonly translatedToDoListItemStatus = translatedToDoListItemStatus;

    constructor(private toDoListDataService: ToDoListDataService) { }

    ngOnInit(): void {
        this.allToDoListItems$ = this.toDoListDataService.getItems;
        this.inProgressToDoListItems$ = this.toDoListDataService.getItems.pipe(
            map(items => items.filter(item => item.status === EToDoListItemStatus.InProgress)),
        );
        this.completedToDoListItems$ = this.toDoListDataService.getItems.pipe(
            map(items => items.filter(item => item.status === EToDoListItemStatus.Completed)),
        );
        this.toDoListDataService.update();
    }
}