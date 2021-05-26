import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nom'
})
export class NomPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(values: any[]): any[] {
    return values.sort((a, b) => a.Nom.localeCompare(b.Nom));
  }

}
