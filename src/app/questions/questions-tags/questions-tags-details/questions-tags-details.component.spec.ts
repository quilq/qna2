import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTagsDetailsComponent } from './questions-tags-details.component';
import { SharedModule } from '../../../shared/shared.module';

describe('QuestionsTagsDetailsComponent', () => {
  let component: QuestionsTagsDetailsComponent;
  let fixture: ComponentFixture<QuestionsTagsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ QuestionsTagsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTagsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
