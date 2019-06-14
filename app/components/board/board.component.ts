import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '../../classes/columns-mock';
import { Column } from '../../classes/column';
import {BoardService} from '../../services/board.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private boardService: BoardService) { }

 // public theColumns = COLUMNS; //typ muss nicht angegeben werden
  public theColumns: Column[]; 

  public assigneeFilterSubject$: BehaviorSubject<string>;
  ngOnInit() {

    this.assigneeFilterSubject$ = this.boardService.getAssigneeFilter();
    this.boardService.getColumnListSubject().subscribe((result) => {
      this.theColumns = result;
    });
    this.boardService.fetchColumnList();
    this.boardService.fetchTasksList();
  }

}