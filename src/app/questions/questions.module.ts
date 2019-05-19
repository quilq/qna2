import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { PopularQuestionsComponent } from './popular-questions/popular-questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';
import { QuestionEffects } from './store/question.effects';
import { questionReducer } from './store/question.reducers';
import { QuestionsByTagComponent } from './tags/questions-by-tag/questions-by-tag.component';
import { AllTagsComponent } from './tags/all-tags/all-tags.component';
import { RecentQuestionsComponent } from './recent-questions/recent-questions.component';
import { RelatedQuestionsComponent } from './related-questions/related-questions.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FeaturedQuestionsComponent } from './featured-questions/featured-questions.component';
// import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionDetailsComponent,
    TagsComponent,
    UnansweredQuestionsComponent,
    PopularQuestionsComponent,
    QuestionsByTagComponent,
    AllTagsComponent,
    RecentQuestionsComponent,
    RelatedQuestionsComponent,
    SearchResultsComponent,
    FeaturedQuestionsComponent
  ],
  imports: [
    StoreModule.forFeature('question', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
    // CommonModule,
    // ReactiveFormsModule,
    // FlexLayoutModule,
    // MaterialModule,
    SharedModule,
    QuestionsRoutingModule,
  ]
})
export class QuestionsModule { }
