import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question } from '../../question.model';
import { QuestionState } from '../../store/question.reducers';
import { getQuestionsByTag } from '../../store/question.selectors';
import { ActivatedRoute } from '@angular/router';
import * as QuestionActions from '../../store/question.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-questions-by-tag',
  templateUrl: './questions-by-tag.component.html',
  styleUrls: ['./questions-by-tag.component.scss']
})
export class QuestionsByTagComponent implements OnInit {

  private ngUnsubscribe$ = new Subject();
  questionsByTag: Question[];
  tag: string;

  constructor(
    private questionStore: Store<QuestionState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tag = this.activatedRoute.snapshot.paramMap.get('tag');
    this.questionStore.dispatch(new QuestionActions.OnFindQuestionsByTag({ tag: this.tag, next: 0 }));
    this.questionStore.select(getQuestionsByTag)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questions => this.questionsByTag = questions);

    window.scroll(0, 0);
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnFindQuestionsByTag({
      tag: this.tag, next: this.questionsByTag.length
    }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
