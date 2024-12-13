import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[healthNumericInputRestriction]',
  standalone: true,
})
export class NumericInputRestrictionDirective {
  public maxLength = input<number>(5); // Используем input из signal
  private readonly el = inject(ElementRef);
  private readonly control = inject(NgControl);

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^0-9]/g, '');

    if (value.length > this.maxLength()) {
      value = value.slice(0, this.maxLength());
    }
    this.control.control?.setValue(Number(value));
  }
}
