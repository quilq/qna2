import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { PopularQuestionsComponent } from './popular-questions/popular-questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';
import { QuestionEffects } from './store/question.effects';
import { questionReducer } from './store/question.reducers';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionDetailsComponent,
    TagsComponent,
    UnansweredQuestionsComponent,
    PopularQuestionsComponent
  ],

  imports: [
    StoreModule.forFeature('question', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    QuestionsRoutingModule,
  ]
})
export class QuestionsModule { }
