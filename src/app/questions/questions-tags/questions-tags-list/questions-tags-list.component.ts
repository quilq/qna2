import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionState } from '../../store/question.reducers';
import { getTags } from '../../store/question.selectors';
import * as QuestionActions from '../../store/question.actions';

@Component({
  selector: 'app-questions-tags-list',
  templateUrl: './questions-tags-list.component.html',
  styleUrls: ['./questions-tags-list.component.scss']
})
export class QuestionsTagsListComponent implements OnInit {
  tags$: Observable<string[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.dispatch(new QuestionActions.OnGetTags());
    this.tags$ = this.questionStore.select(getTags);
  }
}
