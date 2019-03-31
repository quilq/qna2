import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
