import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { QuestionEffects } from './store/question.effects';
import { questionReducer } from './store/question.reducers';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { QuestionsPopularComponent } from './questions-popular/questions-popular.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionsTagsComponent } from './questions-tags/questions-tags.component';
import { QuestionsUnansweredComponent } from './questions-unanswered/questions-unanswered.component';
import { QuestionsTagsDetailsComponent } from './questions-tags/questions-tags-details/questions-tags-details.component';
import { QuestionsTagsListComponent } from './questions-tags/questions-tags-list/questions-tags-list.component';
import { QuestionsRecentComponent } from './questions-recent/questions-recent.component';
import { QuestionsSearchResultsComponent } from './questions-search-results/questions-search-results.component';
import { QuestionsFeaturedComponent } from './questions-featured/questions-featured.component';
import { QuestionsRelatedComponent } from './questions-related/questions-related.component';
import { QuestionNewComponent } from './question-new/question-new.component';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionDetailsComponent,
    QuestionsTagsComponent,
    QuestionsTagsDetailsComponent,
    QuestionsTagsListComponent,
    QuestionsRecentComponent,
    QuestionsSearchResultsComponent,
    QuestionsFeaturedComponent,
    QuestionsRelatedComponent,
    QuestionNewComponent,
    QuestionsPopularComponent,
    QuestionsUnansweredComponent
  ],
  imports: [
    StoreModule.forFeature('question', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
    SharedModule,
    QuestionsRoutingModule,
  ]
})
export class QuestionsModule { }
