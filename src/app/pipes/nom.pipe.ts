import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'nom'
})
export class NomPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(values: Observable<Array<any>>) {
    if(values) {
      values.subscribe(
        (obj) => { return obj.sort((a, b) => a.Nom.localeCompare(b.Nom)); }
      );

    }

  }

}
