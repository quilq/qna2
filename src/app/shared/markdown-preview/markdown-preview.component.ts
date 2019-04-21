import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.scss']
})
export class MarkdownPreviewComponent implements OnInit {

  @Input() content: string;
  preview = false;

  constructor() { }

  ngOnInit() {
  }

}
