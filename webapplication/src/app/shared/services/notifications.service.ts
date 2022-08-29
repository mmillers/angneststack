import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notifications } from '../interfaces/notifications.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly successClass = 'is-success';
  private readonly errorClass = 'is-danger';

  private _notification: Subject<Notifications> = new BehaviorSubject<Notifications>({ status: false, message: '', class: '' });
  notification$ = this._notification.asObservable();

  showNotificationSuccess(message: string) {
    this._notification.next({ message, class: this.successClass, status: true });
  }

  showNotificationError(message: string) {
    this._notification.next({ message, class: this.errorClass, status: true });
  }
}
