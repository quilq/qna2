import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionState } from '../store/question.reducers';
import { getRelatedQuestions } from '../store/question.selectors';
import { Question } from '../question.model';
import { OnGetRelatedQuestions } from '../store/question.actions';

@Component({
  selector: 'app-related-questions',
  templateUrl: './related-questions.component.html',
  styleUrls: ['./related-questions.component.scss']
})
export class RelatedQuestionsComponent implements OnInit, OnChanges {
  @Input() tags: string[];

  relatedQuestions$: Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    // this.questionStore.dispatch(new OnGetRelatedQuestions({tags: this.tags}));
    this.relatedQuestions$ = this.questionStore.select(getRelatedQuestions);
  }

  ngOnChanges(change: SimpleChanges){
    let newTags = change.tags.currentValue;
    this.questionStore.dispatch(new OnGetRelatedQuestions({tags: newTags}));
  }


}
