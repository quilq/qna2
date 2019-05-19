import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionState } from '../../questions/store/question.reducers';
// import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // constructor(private questionStore: Store<QuestionState>) { }
  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
