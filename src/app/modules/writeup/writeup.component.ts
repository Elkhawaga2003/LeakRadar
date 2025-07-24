import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import CodeFlaskTool from '@calumk/editorjs-codeflask';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import Toggle from 'editorjs-toggle-block';
import { EditorService } from '../post/components/Post/services/Editor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-writeup',
  templateUrl: './writeup.component.html',
  styleUrls: ['./writeup.component.css'],
})
export class WriteupComponent implements OnInit {
  data: any = null;
  id!: string;
  constructor(
    private editorServices: EditorService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parmap) => {
      const id = parmap.get('id');
      if (id) {
        this.id = id;
      }
    });
    this.fetchWriteup();
  }

  fetchWriteup() {
    this.editorServices.GetById(this.id).subscribe({
      next: (res) => {
        const parsed = JSON.parse(res.contentJson);
        parsed.title = res.title;

        this.data = parsed;

        setTimeout(() => this.initializeEditor(), 0);
      },
      error: (err) => console.log(err),
    });
  }

  initializeEditor() {
    new EditorJS({
      holder: 'editor-view',
      readOnly: true,
      data: this.data,
      tools: {
        toggle: { class: Toggle as any },
        header: { class: Header as any },
        code: { class: CodeFlaskTool as any },
        list: { class: List as any },
        quote: { class: Quote as any },
        image: { class: ImageTool },
        delimiter: Delimiter,
        warning: Warning,
      },
    });
  }
}
