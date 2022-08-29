import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _notificationsService: NotificationsService,
    private readonly _loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (!(error.error instanceof ErrorEvent) && this._loadingService.numberOfRequestsOpen === 1) {
            this._notificationsService.showNotificationError(error.error);
          }
          return throwError(error);
        })
      );
  }
}
