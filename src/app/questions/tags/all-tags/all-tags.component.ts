import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { QuestionState } from '../../store/question.reducers';
import { getTags } from '../../store/question.selectors';
import * as QuestionActions from '../../store/question.actions';

@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrls: ['./all-tags.component.scss']
})
export class AllTagsComponent implements OnInit {

  tags$: Observable<string[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    console.log('tags component init');
    this.questionStore.dispatch(new QuestionActions.OnGetTags());
    this.tags$ = this.questionStore.select(getTags); 
  }
}
