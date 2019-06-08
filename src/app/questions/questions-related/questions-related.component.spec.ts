import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsRelatedComponent } from './questions-related.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('QuestionsRelatedComponent', () => {
  let component: QuestionsRelatedComponent;
  let fixture: ComponentFixture<QuestionsRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterModule
      ],
      declarations: [ QuestionsRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
