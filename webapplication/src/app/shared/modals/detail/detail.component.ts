import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() item!: any;
  @Input() title!: string;
  @Input() redirectTo!: string;
  keys!: Array<string>;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    if (this.item)
      this.keys = Object.keys(this.item);
  }

  redirect(code: number) {
    this._router.navigateByUrl(`${this.redirectTo}/${code}`);
  }
}
