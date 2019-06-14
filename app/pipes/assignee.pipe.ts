import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../classes/task';

@Pipe({
  name: 'assignee'
})
export class AssigneePipe implements PipeTransform {

  transform(task: Task[], filterText: string): any {
    if(filterText=== ''){
      return task;
    }
    return task.filter(task => task.assignee.indexOf(filterText) > -1);
  }

}