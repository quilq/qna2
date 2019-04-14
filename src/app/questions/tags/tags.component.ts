import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionState } from '../store/question.reducers';
import { getTags } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags$: Observable<string[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    console.log('tags component init');
    this.questionStore.dispatch(new QuestionActions.OnGetTags());
    this.tags$ = this.questionStore.select(getTags);
    this.tags$.subscribe(tag => console.log('tags ', tag));
  }

}
