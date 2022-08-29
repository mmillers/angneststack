import { Component, OnDestroy, OnInit } from '@angular/core';
import * as bulmaToast from 'bulma-toast';
import { takeWhile } from 'rxjs/operators';
import { Notifications } from './shared/interfaces/notifications.interface';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'webapplication';
  isActivated = true;

  constructor(private readonly _notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsSub();
    this.setToastConfig();
  }

  ngOnDestroy(): void {
    this.isActivated = false;
  }

  notificationsSub() {
    this._notificationsService.notification$
      .pipe(takeWhile(() => this.isActivated))
      .subscribe((notification: Notifications) => {
        if (notification.status)
          this.showNotifications(notification);
      });
  }

  setToastConfig() {
    bulmaToast.setDefaults({
      duration: 3500,
      position: 'top-center',
      closeOnClick: true,
      dismissible: true,
      opacity: 1
    })
  }

  showNotifications(notification: Notifications) {
    bulmaToast.toast({
      message: notification.message,
      extraClasses: notification.class
    });
  }
}
