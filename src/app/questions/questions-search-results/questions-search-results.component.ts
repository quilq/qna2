import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { getSearchResults } from '../store/question.selectors';
import { Question } from '../question.model';
import * as QuestionActions from '../store/question.actions';

interface SearchResults {
  keywords: string;
  questions: Question[]
}

@Component({
  selector: 'app-questions-search-results',
  templateUrl: './questions-search-results.component.html',
  styleUrls: ['./questions-search-results.component.scss']
})

export class QuestionsSearchResultsComponent implements OnInit, OnDestroy {
  searchResults: SearchResults;

  private ngUnsubscribe$ = new Subject();

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
