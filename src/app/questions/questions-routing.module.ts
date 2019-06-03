import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionsPopularComponent } from './questions-popular/questions-popular.component';
import { QuestionsUnansweredComponent } from './questions-unanswered/questions-unanswered.component';
import { QuestionsRecentComponent } from './questions-recent/questions-recent.component';
import { QuestionsSearchResultsComponent } from './questions-search-results/questions-search-results.component';
import { QuestionNewComponent } from './question-new/question-new.component';
import { QuestionsComponent } from './questions.component';
import { QuestionsTagsComponent } from './questions-tags/questions-tags.component';
import { QuestionsTagsListComponent } from './questions-tags/questions-tags-list/questions-tags-list.component';
import { QuestionsTagsDetailsComponent } from './questions-tags/questions-tags-details/questions-tags-details.component';


const routes: Routes = [
  {
    path: '', component: QuestionsComponent, children: [
      { path: 'popular-questions', component: QuestionsPopularComponent },
      { path: 'unanswered-questions', component: QuestionsUnansweredComponent },
      { path: 'recent-questions', component: QuestionsRecentComponent },
      { path: 'question-details/:id', component: QuestionDetailsComponent },
      { path: 'search-results', component: QuestionsSearchResultsComponent },
      { path: 'new-question', component: QuestionNewComponent},
      {
        path: 'tags', component: QuestionsTagsComponent, children: [
          { path: '', component: QuestionsTagsListComponent },
          { path: 'questions-by-tag/:tag', component: QuestionsTagsDetailsComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionsRoutingModule { }
