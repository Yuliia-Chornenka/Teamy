import { Pipe, PipeTransform } from '@angular/core';
import { IProject } from '../Models/project';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(projectsList: IProject[], searchValue, fieldName: string) {
    if (!projectsList.length || searchValue === '') {
      return projectsList;
    }
    return projectsList.filter((projectItem: IProject) => projectItem[fieldName] === searchValue);
  }
}
