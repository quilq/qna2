import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsRecentComponent } from './questions-recent.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionsRecentComponent', () => {
  let component: QuestionsRecentComponent;
  let fixture: ComponentFixture<QuestionsRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ QuestionsRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
