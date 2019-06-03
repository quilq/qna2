import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTagsListComponent } from './questions-tags-list.component';

describe('QuestionsTagsListComponent', () => {
  let component: QuestionsTagsListComponent;
  let fixture: ComponentFixture<QuestionsTagsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsTagsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
