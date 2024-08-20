import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastService } from '../../../../service/toast.service';
import { EToDoListItemStatus, IToDoListItem } from '../../../../models/to-do-list';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { translations } from '../../../../../locale/translations';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})

export class ToDoListItemComponent implements OnInit {
    @Input() item!: IToDoListItem;

    @Output() emitDelete = new EventEmitter<IToDoListItem["id"]>();
    @Output() emitChangeText = new EventEmitter<IToDoListItem["text"]>();
    @Output() emitChangeStatus = new EventEmitter<IToDoListItem["status"]>();
    isEditMode: boolean = false;
    itemTitle!: IToDoListItem["text"];
    public toDoListItemStatus = EToDoListItemStatus;
    readonly translations = translations;

    constructor(public toastService: ToastService){}

    ngOnInit(): void {
      this.itemTitle = this.item ? this.item.text : "";
    }

    public emitDeleteItem(id: number){
        this.emitDelete.emit(id);
    }

    public emitChangeItem(): void {
      this.emitChangeText.emit(this.itemTitle);
    }

    emitItemStatusChange(matCheckboxChange: MatCheckboxChange): void {
      this.emitChangeStatus.emit(matCheckboxChange.checked ? EToDoListItemStatus.Completed : EToDoListItemStatus.InProgress);
    }

    turnEditMode(){
      if(this.isEditMode === false){
        this.isEditMode = true;
      }else{
        this.isEditMode = false;
        this.emitChangeItem();
        this.toastService.showToast("Задача изменена");
      }
    }
}