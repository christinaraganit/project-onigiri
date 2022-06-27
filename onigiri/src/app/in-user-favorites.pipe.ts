import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inUserFavorites'
})
export class InUserFavoritesPipe implements PipeTransform {
  transform(value: Array<any>, id: number): boolean {
    return value.find(e => parseInt(e.mediaId) === id);
  }

}
