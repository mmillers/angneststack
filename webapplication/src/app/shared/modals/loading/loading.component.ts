import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  loading!: boolean;
  isActivated = true;

  constructor(private readonly _loadingService: LoadingService) {}

  ngOnInit(): void {
    this._loadingService.loadingSub$
      .pipe(takeWhile(() => this.isActivated))
      .subscribe((value) => this.loading = value);
  }

  ngOnDestroy(): void {
    this.isActivated = false;
  }
}
