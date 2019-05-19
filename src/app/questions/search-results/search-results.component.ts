import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { getSearchResults } from '../store/question.selectors';
import { Question } from '../question.model';
import * as QuestionActions from '../../questions/store/question.actions';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();
  searchResults: {
    keywords: string,
    questions: Question[]
  };
  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.select(getSearchResults)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(searchResults => this.searchResults = searchResults);;
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnFindQuestionsByKeywords({
      keywords: this.searchResults.keywords, next: this.searchResults.questions.length
    }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
