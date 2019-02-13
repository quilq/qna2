import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersComponent } from './answers.component';

@NgModule({
  declarations: [AnswersComponent],
  imports: [
    CommonModule,
    AnswersRoutingModule
  ]
})
export class AnswersModule { }
