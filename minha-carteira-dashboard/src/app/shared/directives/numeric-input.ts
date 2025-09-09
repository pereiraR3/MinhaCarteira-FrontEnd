import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericInput]',
  standalone: true,
})
export class NumericInputDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    let sanitizedValue = value.replace(/[^0-9,]/g, '');

    const firstCommaIndex = sanitizedValue.indexOf(',');

    if (firstCommaIndex !== -1) {
      let partBeforeComma = sanitizedValue.substring(0, firstCommaIndex);
      let partAfterComma = sanitizedValue.substring(firstCommaIndex + 1).replace(/,/g, '');

      if (partBeforeComma.length > 5) {
        partBeforeComma = partBeforeComma.substring(0, 5);
      }

      if (partAfterComma.length > 2) {
        partAfterComma = partAfterComma.substring(0, 2);
      }

      sanitizedValue = `${partBeforeComma},${partAfterComma}`;

    } else {
      if (sanitizedValue.length > 5) {
        sanitizedValue = sanitizedValue.substring(0, 5);
      }
    }

    input.value = sanitizedValue;
  }
}
