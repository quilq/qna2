import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTagsComponent } from './questions-tags.component';

describe('QuestionsTagsComponent', () => {
  let component: QuestionsTagsComponent;
  let fixture: ComponentFixture<QuestionsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
