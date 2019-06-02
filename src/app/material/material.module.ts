import { NgModule } from '@angular/core';
import {
  MatExpansionModule,
  MatSidenavModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatChipsModule,
  MatDividerModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTabsModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
