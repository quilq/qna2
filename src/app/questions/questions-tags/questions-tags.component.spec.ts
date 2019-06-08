import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { QuestionsTagsComponent } from './questions-tags.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionsTagsComponent', () => {
  let component: QuestionsTagsComponent;
  let fixture: ComponentFixture<QuestionsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterModule
      ],
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
