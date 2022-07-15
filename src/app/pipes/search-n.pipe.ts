import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchN'
})
export class SearchNPipe implements PipeTransform {

  transform(list: any[], text: string, searchfor: string) : any[] {
    if(!text) return list

    if(searchfor === "notices"){
      return list.filter(item => item.title.toUpperCase().includes(text.toUpperCase()))
    }

    return list
    
  }

}
