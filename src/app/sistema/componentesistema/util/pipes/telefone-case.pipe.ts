import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'telefonePipe',
})
export class TelefoneCasePipe implements PipeTransform{
    transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}