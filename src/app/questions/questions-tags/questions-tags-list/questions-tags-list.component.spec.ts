import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTagsListComponent } from './questions-tags-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('QuestionsTagsListComponent', () => {
  let component: QuestionsTagsListComponent;
  let fixture: ComponentFixture<QuestionsTagsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterModule
      ],
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
