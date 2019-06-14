import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { BoardService } from './services/board.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BoardComponent } from './components/board/board.component';
import { TaskComponent } from './components/task/task.component';
import { ColumnComponent } from './components/column/column.component';
import { AssigneePipe } from './pipes/assignee.pipe';

const appRoutes: Routes = [
  
  { 
    path: '**',
    redirectTo: '/board',
    pathMatch: 'full'
  }, 
  {
    path: 'board',
    component: BoardComponent
  }

];

@NgModule({
  imports:      [ BrowserModule,
                  BrowserAnimationsModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpClientModule,
                  RouterModule.forRoot(appRoutes)  ],

  declarations: [ AppComponent,
                  PageNotFoundComponent,
                  BoardComponent,
                  TaskComponent,
                  ColumnComponent,
                  AssigneePipe ],

  bootstrap:    [ AppComponent ],

  providers:    [BoardService],
})
export class AppModule { }
