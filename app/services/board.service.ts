import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';



import { Column } from '../classes/column';
import { Utils } from '../classes/utils';
import { Task } from '../classes/task';
import { TASKS } from '../classes/tasks-mock';
import { COLUMNS } from '../classes/columns-mock';
@Injectable()
export class BoardService {

  /**
   * here we define two variables representing our Backend API Urls 
   */
  columnsAPI= 'https://pentascrum-b922.restdb.io/rest/columns';
  tasksAPI = 'https://pentascrum-b922.restdb.io/rest/tasks';


  /**
   * we define a BehaviorSubject of Column array, we can subscribe to this subject 
   * and everytime new values (columns) comes in all the subscrition will be notified and 
   * the subscribe function will be called on each Observer
   */
  private columnsSubject$: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);


  /** (1)
   * Behaviorsubject of Task array, we can subscribe to this subject 
   * and everytime new values (tasks) comes in all the subscrition will be notified and 
   * the subscribe function will be called on each Observer
   */
  ////TODO define it
  private taskSubject$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]); 
  /** (2)
   * Behaviorsubject of string,
   * This will be used for filter by assinee, so whenever new value is giving in the filter field,
   * this subject will notify the observers 
   */
  ////TODO define it
  private assigneeFilterSharedSubject$: BehaviorSubject<string>= new BehaviorSubject<string>("");


  /**
   *here we are defining header options, and adding our backend required security key 
  */
  private httpOptions = {
      headers: new HttpHeaders({ 'x-apikey': '5adee70a25a622ae4d528544' })
   };

  constructor( private http: HttpClient) { }

  /**
   * here we are calling the backend to fetch the list of Columns and when we get response 
   * we apply map operator on it in order to sort the list,
   * and the resulted list we send it as Stream package into the columnsSubject which will call 
   * every subscribed Observer's next() function passing the list to it.
   * and in case the http call fails for anyreason, we send the local mocked list of columns,
   * this way our page won't ever display empty list of columns
   */
  public fetchColumnList(): void {
    this.http.get<Column[]>(this.columnsAPI, this.httpOptions)
    .pipe(
      map(unorderedListOfColumns => unorderedListOfColumns.sort(Utils.columnComparator))
    )
    .subscribe((nextVal) => {
      this.columnsSubject$.next(nextVal);
    }, () => {
      this.columnsSubject$.next( COLUMNS as Column[] );
    }, () => {
     // nothing :D 
    });
  }

  /**
   * here we are returning the private class member columnSubject to make it visible for the components,
   * but we cast it to Observable, this way the subscribers won't be able to send values to the Subject,
   * instead only recieve values
   */
  public getColumnListSubject(): Observable<Column[]> {
    return this.columnsSubject$;
  }


  /**
   * Normal http POST call to create a new column
   */
  public createColumn(column: Column) {
    return this.http
      .post(this.columnsAPI, column, this.httpOptions);
  }

  /** (3)
   * fetch call to get Tasks and send the response to the Observers via task subject 
   */
  public fetchTasksList(): void {
    // TODO
        this.http.get<Task[]>(this.tasksAPI, this.httpOptions)
    .pipe(
      map(unorderedListOfColumns => unorderedListOfColumns.sort(Utils.columnComparator))
    )
    .subscribe((nextVal) => {
      this.taskSubject$.next(nextVal);
    }, () => {
      this.taskSubject$.next( TASKS as Task[] );
    }, () => {
     // nothing :D 
    });
  }

  /** (4)
   * return the tasks subject
   */
  public getTasksListSubject(): Observable<Task[]> {
    return this.taskSubject$; // TODO
  }


  /**
   * Normal Http POST call to create a new Task
   */
  public createTask(task: Task) {
    return this.http
      .post(this.tasksAPI, task, this.httpOptions);
  }

  /**
   * Normal Http put call to Update a new Task
   */
  public updateTask(task: Task) {
    return this.http
      .put(this.tasksAPI + '/' + task._id, task, this.httpOptions);
  }

  /**
   * Normal Http get call to get a Task by it's ID
   */
  public getTaskById(taskId: string) {
    return this.http
      .get<Task>(this.tasksAPI + '/' + taskId, this.httpOptions);
  }

  /**
   * returning the assinee filter subject
   */
  public getAssigneeFilter(): BehaviorSubject<string> {
    return this.assigneeFilterSharedSubject$; // TODO
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
