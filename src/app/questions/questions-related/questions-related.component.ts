import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionState } from '../store/question.reducers';
import { getRelatedQuestions } from '../store/question.selectors';
import { Question } from '../question.model';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-questions-related',
  templateUrl: './questions-related.component.html',
  styleUrls: ['./questions-related.component.scss']
})
export class QuestionsRelatedComponent implements OnInit, OnChanges {
  @Input() tags: string[];

  relatedQuestions$: Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.relatedQuestions$ = this.questionStore.select(getRelatedQuestions);
  }

  ngOnChanges(change: SimpleChanges) {
    let oldTags = change.tags.previousValue;
    let newTags = change.tags.currentValue;

    if (oldTags && (oldTags.join('') === newTags.join(''))) {
      // console.log('tag(s) did not change');
      return;
    } else {
      this.questionStore.dispatch(QuestionActions.onGetRelatedQuestions({ tags: newTags }));
    }
  }

}
