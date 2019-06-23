import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MarkdownPreviewComponent } from './markdown-preview.component';
import { MaterialModule } from '../../material/material.module';

@Component({
  template: `
  <app-markdown-preview 
    [content]="content">
  <app-markdown-preview>`
})
class TestHostComponent {
  content: string = 'test content';
}

describe('MarkdownPreviewComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let previewButton: HTMLElement;
  let previewContent: HTMLElement;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MaterialModule,
        MarkdownModule.forRoot()
      ],
      declarations: [ 
        MarkdownPreviewComponent,
        TestHostComponent 
      ]
    });
    
    //create TestHostComponent instead of MarkdownPreviewComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    previewButton = fixture.nativeElement.querySelector('.preview-button');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display preview button // inside test host', () => {
    expect(previewButton.textContent).toContain('preview');
  });

  it('should display content when clicked // inside test host', () => {
    previewButton.click();
    fixture.detectChanges();
    previewContent = fixture.nativeElement.querySelector('.preview-content');
    fixture.detectChanges();
    expect(previewContent.textContent).toContain('test content');
  });
});
