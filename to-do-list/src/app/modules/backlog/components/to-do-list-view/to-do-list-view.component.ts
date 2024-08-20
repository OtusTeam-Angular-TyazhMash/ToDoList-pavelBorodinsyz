import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IToDoListItem } from '../../../../models/to-do-list';
import { Subject, map, takeUntil } from 'rxjs';
import { ToDoListDataService } from '../../../../service/to-do-list-data.service';

@Component({
  selector: 'app-to-do-list-view',
  templateUrl: './to-do-list-view.component.html',
  styleUrl: './to-do-list-view.component.scss'
})
export class ToDoListViewComponent {
    public description!: IToDoListItem["description"];
    public componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(private activatedRoute: ActivatedRoute,
                private toDoListDataService: ToDoListDataService) { }

    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(takeUntil(this.componentDestroyed$)).subscribe((params) => {
            this.toDoListDataService.getItems.pipe(
                takeUntil(this.componentDestroyed$),
                map(items => items.find(item => item.id === +params["id"])),
            ).subscribe(item => {
                if (item)
                    this.description = item.description;
            });
        });
    }
}
