import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule
  ]
})
export class MaterialModule { }
