import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsUnansweredComponent } from './questions-unanswered.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionsUnansweredComponent', () => {
  let component: QuestionsUnansweredComponent;
  let fixture: ComponentFixture<QuestionsUnansweredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ QuestionsUnansweredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsUnansweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
