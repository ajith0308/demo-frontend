import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @Input() editedItem: any;
  @Input() modalVisible: boolean = false;
  @Output() saveEdit = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  onSaveEdit() {
    this.saveEdit.emit();
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }
}
