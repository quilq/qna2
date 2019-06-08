import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSearchResultsComponent } from './questions-search-results.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionsSearchResultsComponent', () => {
  let component: QuestionsSearchResultsComponent;
  let fixture: ComponentFixture<QuestionsSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ QuestionsSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
