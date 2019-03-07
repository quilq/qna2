import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsModule } from './questions/questions.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QuestionsModule,
    UserModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot({}),
    AppRoutingModule  //after other routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
