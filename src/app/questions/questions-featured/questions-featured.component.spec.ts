import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { QuestionsFeaturedComponent } from './questions-featured.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionsFeaturedComponent', () => {
  let component: QuestionsFeaturedComponent;
  let fixture: ComponentFixture<QuestionsFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterModule
      ],
      declarations: [ QuestionsFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
