import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSidenavComponent } from './left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component';

@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    LeftSidenavComponent, 
    RightSidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class CoreModule { }
