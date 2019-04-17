import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { NewAnswerComponent } from './new-answer/new-answer.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    SearchComponent, 
    NewQuestionComponent, 
    NewAnswerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    SearchComponent, 
    NewQuestionComponent, 
    NewAnswerComponent
  ]
})
export class SharedModule { }
