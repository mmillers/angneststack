import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInfoDetail]'
})
export class InfoDetailDirective implements AfterContentInit {

  @Input() public item!: any;

  constructor(private _elementRef: ElementRef<HTMLDivElement>) {}

  public ngAfterContentInit(): void {
    if (this.item) {
      const keys = Object.keys(this.item);
      this._elementRef.nativeElement.innerText = this.item[keys[1]];
    }
  }
}
