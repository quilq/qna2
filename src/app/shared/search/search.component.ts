import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionState } from '../../questions/store/question.reducers';
import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
  }

  onSearch(keywords: string) {
    console.log(keywords);
    this.questionStore.dispatch(new QuestionActions.OnFindQuestionsByKeywords({ keywords }));
  }

}
