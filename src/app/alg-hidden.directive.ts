import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[algHidden]'
})
export class AlgHiddenDirective implements AfterViewInit {
  @Input() algHidden!: string; // Agrega el operador de aserción de tipo (!) para indicar que la propiedad se inicializará más tarde

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.textContent = this.algHidden;
  }
}