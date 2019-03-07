import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';
import { StoreModule } from '@ngrx/store';
import { questionReducer } from './store/question.reducers';
import { EffectsModule } from '@ngrx/effects';
import { QuestionEffects } from './store/question.effects';

@NgModule({
  declarations: [
    QuestionsComponent, 
    QuestionDetailsComponent, 
    TagsComponent, 
    UnansweredQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    StoreModule.forFeature('question', questionReducer),
    EffectsModule.forFeature([QuestionEffects])
  ]
})
export class QuestionsModule { }
