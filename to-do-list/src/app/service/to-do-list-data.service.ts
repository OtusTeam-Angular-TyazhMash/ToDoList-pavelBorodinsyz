import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToDoListItem } from '../models/to-do-list';
import { ToDoListService } from './to-do-list.service';
import { ToastService } from './toast.service';
import { translations } from '../../locale/translations';

export type CreateItemFormData = Pick<IToDoListItem, "text" | "description">;

@Injectable({
    providedIn: 'root',
})
export class ToDoListDataService {
    private toDoListItems$: BehaviorSubject<Array<IToDoListItem>> =
        new BehaviorSubject<Array<IToDoListItem>>([]);

    constructor(private toDoListService: ToDoListService,
        private toastService: ToastService) { }

    get getItems(): Observable<Array<IToDoListItem>> {
        return this.toDoListItems$.asObservable();
    }

    update(): void {
        this.toDoListService.getToDoListItems().subscribe({
            next: receivedItems => {
                this.toDoListItems$.next(receivedItems);
            },
            error: () => {
                this.toDoListItems$.next([]);
            },
        });
    }

    addItem(formData: CreateItemFormData): void {
        this.toDoListService.addToDoListItem(formData.text, formData.description).subscribe({
            next: (addedToDoListItem) => {
                this.toDoListItems$.next([...this.toDoListItems$.value, addedToDoListItem]);
                this.toastService.showToast(translations.itemAdded);
            },
            error: () => {
                this.toastService.showToast(translations.failedToAddTodo);
            },
        });
    }

    deleteItemById(itemId: IToDoListItem["id"]): void {
        this.toDoListService.deleteToDoListItemById(itemId).subscribe({
            next: () => {
                const deletedItemIndex = this.toDoListItems$.value.findIndex(item => item.id === itemId);
                if (deletedItemIndex > -1)
                    this.toDoListItems$.value.splice(deletedItemIndex, 1)
                this.toastService.showToast(translations.todoDeleted);
            },
            error: () => {
                this.toastService.showToast(translations.failedToDeleteTodo);
            },
        });
    }

    editItemTitleById(itemId: IToDoListItem["id"], title: IToDoListItem["text"]): void {
        this.toDoListService.editItemTitleById(itemId, title).subscribe({
            next: (editedToDoListItem) => {
                const deprecatedItemIndex = this.toDoListItems$.value.findIndex(item => item.id === editedToDoListItem.id);
                this.toDoListItems$.value[deprecatedItemIndex] = editedToDoListItem;
                this.toastService.showToast(translations.itemEdited);
            },
            error: () => {
                this.toastService.showToast(translations.failedToEditTodo);
            },
        });
    }

    editItemStatusById(itemId: IToDoListItem["id"], itemStatus: IToDoListItem["status"]): void {
        this.toDoListService.editItemStatusById(itemId, itemStatus).subscribe({
            next: (editedToDoListItem) => {
                const deprecatedItemIndex = this.toDoListItems$.value.findIndex(item => item.id === editedToDoListItem.id);
                this.toDoListItems$.value[deprecatedItemIndex] = editedToDoListItem;
                this.toastService.showToast(translations.taskStatusHasBeenChanged);
            },
            error: () => {
                this.toastService.showToast(translations.failedToEditTodo);
            },
        });
    }
}