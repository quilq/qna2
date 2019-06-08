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
  MatToolbarModule,
  MatSnackBarModule
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
    MatTabsModule,
    MatSnackBarModule
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
    MatTabsModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
