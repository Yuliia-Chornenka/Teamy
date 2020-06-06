import { Pipe, PipeTransform } from '@angular/core';
import { IProject } from '../Models/project';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(projectsList: IProject[], searchValue, fieldName: string) {
    if (!projectsList.length || searchValue === '') {
      return projectsList;
    }
    return projectsList.filter((projectItem: IProject) => projectItem[fieldName].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
  }
}
