import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EToDoListItemStatus, IToDoListItem } from "../models/to-do-list";

@Injectable()

export class ToDoListService {

    private toDoListUrl = "http://localhost:3000/to-do-list";

    constructor(private httpClient: HttpClient,) { }

    getToDoListItems(): Observable<Array<IToDoListItem>> {
        return this.httpClient.get<Array<IToDoListItem>>(this.toDoListUrl);
    }
    
    addToDoListItem(text: IToDoListItem["text"], description: IToDoListItem["description"]): Observable<IToDoListItem> {
        return this.httpClient.post<IToDoListItem>(this.toDoListUrl, {
            text: text,
            description: description,
            status: EToDoListItemStatus.InProgress
        });
    }

    deleteToDoListItemById(itemId: IToDoListItem["id"]): Observable<void> {
        return this.httpClient.delete<void>(this.toDoListUrl + "/" + itemId);
    }

    editItemTitleById(itemId: IToDoListItem["id"], text: IToDoListItem["text"]): Observable<IToDoListItem> {
        return this.httpClient.patch<IToDoListItem>(this.toDoListUrl + "/" + itemId, { text: text });
    }

    editItemStatusById(itemId: IToDoListItem["id"], itemStatus: IToDoListItem["status"]): Observable<IToDoListItem> {
        return this.httpClient.patch<IToDoListItem>(this.toDoListUrl + "/" + itemId, { status: itemStatus });
    }
}
