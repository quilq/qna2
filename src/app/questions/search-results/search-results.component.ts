import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionState } from '../store/question.reducers';
import { Observable } from 'rxjs';
import { getSearchResults } from '../store/question.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchResults$: Observable<{}>
  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.searchResults$ = this.questionStore.select(getSearchResults);
  }

}
