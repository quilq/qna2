import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have title "qna2"', () => {
    expect(app.title).toEqual('qna2');
  });

});
