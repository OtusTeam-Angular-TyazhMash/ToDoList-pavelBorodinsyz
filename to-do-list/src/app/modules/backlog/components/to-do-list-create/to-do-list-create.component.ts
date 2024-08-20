import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { IToDoListItemCreate } from '../../../../models/to-do-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { translations } from '../../../../../locale/translations';

@Component({
  selector: 'app-to-do-list-create',
  templateUrl: './to-do-list-create.component.html',
  styleUrl: './to-do-list-create.component.scss'
})
export class ToDoListCreateComponent implements OnInit {
  public toDoItemForm!: FormGroup;
  @Output() emitNewItem = new EventEmitter<IToDoListItemCreate>();
  readonly translations = translations;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.toDoItemForm = this.formBuilder.group({
        text: ['', Validators.required],
        description: ['', Validators.required]
    });
  }

  emitCreatingItem(): void {
    this.emitNewItem.emit({
        text: this.toDoItemForm.controls['text'].value,
        description: this.toDoItemForm.controls['description'].value
    });
    this.toDoItemForm.reset();
}

}
