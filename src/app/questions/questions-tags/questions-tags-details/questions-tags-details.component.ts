import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Question } from '../../question.model';
import { QuestionState } from '../../store/question.reducers';
import { getQuestionsByTag } from '../../store/question.selectors';
import * as QuestionActions from '../../store/question.actions';

@Component({
  selector: 'app-questions-tags-details',
  templateUrl: './questions-tags-details.component.html',
  styleUrls: ['./questions-tags-details.component.scss']
})
export class QuestionsTagsDetailsComponent implements OnInit {
  questionsByTag: Question[];
  tag: string;

  private ngUnsubscribe$ = new Subject();

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    private questionStore: Store<QuestionState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tag = this.activatedRoute.snapshot.paramMap.get('tag');
    this.questionStore.dispatch(QuestionActions.onFindQuestionsByTag({ tag: this.tag, next: 0 }));
    this.questionStore.select(getQuestionsByTag)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questions => this.questionsByTag = questions);

    // if (isPlatformBrowser(this.platformId)) {
    // window.scroll(0, 0);
    // }
  }

  getMoreQuestions() {
    this.questionStore.dispatch(QuestionActions.onFindQuestionsByTag({
      tag: this.tag, next: this.questionsByTag.length
    }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
