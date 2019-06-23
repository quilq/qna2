import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { QuestionsTagsComponent } from './questions-tags.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionsTagsComponent', () => {
  let component: QuestionsTagsComponent;
  let fixture: ComponentFixture<QuestionsTagsComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [ QuestionsTagsComponent ]
    });

    fixture = TestBed.createComponent(QuestionsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
