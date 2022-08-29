import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private numberOfRequests: number = 0;
  private _loadingSub: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loadingSub$ = this._loadingSub.asObservable();

  setLoading(loading: boolean): void {
    this.numberOfRequests = loading ? this.numberOfRequests + 1 : this.numberOfRequests - 1;
    this._loadingSub.next(this.numberOfRequests > 0);
  }

  get numberOfRequestsOpen() {
    return this.numberOfRequests;
  }
}
