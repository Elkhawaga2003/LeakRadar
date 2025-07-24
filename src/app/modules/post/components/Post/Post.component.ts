import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import CodeFlaskTool from '@calumk/editorjs-codeflask';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import Toggle from 'editorjs-toggle-block';
import Paragraph from '@editorjs/paragraph';

import { Save } from 'lucide-angular';
import { EditorService } from './services/Editor.service';
import { IEditorContent } from './model/IEditorContent';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';
@Component({
  selector: 'app-post',
  templateUrl: './Post.component.html',
  imports: [CommonModule, FormsModule],
})
export class PostComponent implements AfterViewInit, OnDestroy {
  editor!: EditorJS;
  title: string = '';
  coverFile: File | null = null;
  coverPreview: string | null = null;

  constructor(
    private editorServices: EditorService,
    private router: Router,
    private toastrServices: ToastService
  ) {}
  ngAfterViewInit(): void {
    this.editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      placeholder: 'Start writing your page...',
      tools: {
        toggle: {
          class: Toggle as any,
          inlineToolbar: true,
          config: {
            titlePlaceholder: 'Toggle Title',
            messagePlaceholder: 'Toggle Content',
            defaultOpen: false,
          },
        },

        header: {
          class: Header as any,
          inlineToolbar: true,
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
        },
        code: {
          class: CodeFlaskTool as any,
          config: {
            language: 'js',
          },
        },
        list: {
          class: List as unknown as any,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        delimiter: Delimiter,
        warning: Warning,
      },
    });
  }
  savePost() {
    this.editor
      .save()
      .then((outputData) => {
        const formData = new FormData();

        formData.append(
          'Time',
          outputData.time?.toString() || Date.now().toString()
        );
        formData.append('Version', outputData.version || '');
        formData.append('Title', this.title || '');

        formData.append('Blocks', JSON.stringify(outputData));

        if (this.coverFile) {
          formData.append('ImgFile', this.coverFile);
        }

        this.editorServices.Add(formData).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/dashboard');
            this.toastrServices.show('The post was added successfully');
          },
          error: (err) => {
            const msg = err.error?.error || 'Something went wrong';
            this.toastrServices.show(msg, 'error');
          },
        });
      })
      .catch((err) => {
        console.error('Editor save error:', err);
        this.toastrServices.show('Failed to save the post content', 'error');
      });
  }

  onCoverSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.coverFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.coverPreview = reader.result as string;
      };
      reader.readAsDataURL(this.coverFile);
    }
  }
  ngOnDestroy(): void {
    if (this.editor && this.editor.destroy) {
      this.editor.destroy();
    }
  }
}
