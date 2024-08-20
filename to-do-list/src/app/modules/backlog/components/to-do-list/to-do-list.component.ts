import { Component, OnInit } from '@angular/core';
import { EToDoListItemStatus, IToDoListItem, IToDoListItemCreate, translatedToDoListItemStatus } from '../../../../models/to-do-list';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { CreateItemFormData, ToDoListDataService } from '../../../../service/to-do-list-data.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})

export class ToDoListComponent implements OnInit{
    public toDoListItems$!: Observable<Array<IToDoListItem>>;
    public isLoading: boolean = false;
    public editedItemId: IToDoListItem["id"] | null = null;
    public toDoListItemEnum = EToDoListItemStatus;
    readonly translatedToDoListItemStatus = translatedToDoListItemStatus;

    constructor(private activatedRoute: ActivatedRoute,
                private toDoListDataService: ToDoListDataService) { }

    ngOnInit(): void {
        this.toDoListItems$ = this.toDoListDataService.getItems;
        this.toDoListDataService.update();
    }

    public deleteItem(id: number){
        this.toDoListDataService.deleteItemById(id);
    }

    public get getItemIdFromRoute(): number | null {
        return this.activatedRoute.snapshot.children.length === 0 ?
        null : +this.activatedRoute.snapshot.children[0].params['id'];
    }

    addToDoListItem(formData: CreateItemFormData): void {
        this.toDoListDataService.addItem(formData);
    }

    editToDoListItemTitleById(itemId: IToDoListItem["id"], title: IToDoListItem["text"]): void {
        this.toDoListDataService.editItemTitleById(itemId, title);
        this.editedItemId = null;
    }

    editToDoListItemStatusById(itemId: IToDoListItem["id"], itemStatus: IToDoListItem["status"]): void {
        this.toDoListDataService.editItemStatusById(itemId, itemStatus);
    }

    onStatusFilterChange(matButtonToggleChange: MatButtonToggleChange): void {
        this.toDoListItems$ = matButtonToggleChange.value === null ?
        this.toDoListDataService.getItems :
        this.toDoListDataService.getItems.pipe(
            map(items => items.filter(item => item.status === matButtonToggleChange.value)),
        );
    }
}

