import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';
import { QuestionsComponent } from './questions.component';
import { PopularQuestionsComponent } from './popular-questions/popular-questions.component';
import { QuestionsByTagComponent } from './tags/questions-by-tag/questions-by-tag.component';
import { AllTagsComponent } from './tags/all-tags/all-tags.component';
import { RecentQuestionsComponent } from './recent-questions/recent-questions.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  {
    path: 'questions', component: QuestionsComponent, children: [
      { path: '', component: PopularQuestionsComponent },
      {
        path: 'tags', component: TagsComponent, children: [
          { path: '', component: AllTagsComponent },
          { path: 'questions-by-tag/:tag', component: QuestionsByTagComponent }
        ]
      },
      { path: 'unanswered-questions', component: UnansweredQuestionsComponent },
      { path: 'recent-questions', component: RecentQuestionsComponent },
      { path: 'question-details/:id', component: QuestionDetailsComponent },
      { path: 'search-results', component: SearchResultsComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionsRoutingModule { }
