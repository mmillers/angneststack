import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() showCancel = true;
  @Output() saveEventEmitter = new EventEmitter();

  save() {
    this.saveEventEmitter.emit();
  }
}
