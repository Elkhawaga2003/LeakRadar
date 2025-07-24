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
import { ActivatedRoute, Router } from '@angular/router';
import { EditorService } from '../../../post/components/Post/services/Editor.service';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../../shared/toastr/Toast.service';

@Component({
  selector: 'app-updateWriteups',
  templateUrl: './updateWriteups.component.html',
  styleUrls: ['./updateWriteups.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UpdateWriteupsComponent implements OnInit {
  data: any = null;
  id!: string;
  editorInstance: any;
  coverFile: File | null = null;
  coverPreview: string | null = null;

  constructor(
    private editorServices: EditorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrServiecs: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parmap) => {
      const id = parmap.get('id');
      if (id) {
        this.id = id;
        this.fetchWriteup();
      }
    });
  }

  fetchWriteup() {
    this.editorServices.GetById(this.id).subscribe({
      next: (res) => {
        const parsed = JSON.parse(res.contentJson);
        parsed.title = res.title;
        parsed.imgUrl = `${environment.baseUrl}/${res.imgUrl}`;
        this.data = parsed;

        setTimeout(() => this.initializeEditor(), 0);
      },
      error: (err) => console.log(err),
    });
  }

  initializeEditor() {
    this.editorInstance = new EditorJS({
      holder: 'editor-view',
      data: this.data,
      tools: {
        toggle: { class: Toggle as any },
        header: { class: Header as any },
        code: { class: CodeFlaskTool as any },
        list: { class: List as any },
        quote: { class: Quote as any },
        delimiter: Delimiter,
        warning: Warning,
      },
    });
  }

  saveWriteup() {
    this.editorInstance.save().then((outputData: any) => {
      const formData = new FormData();

      formData.append('Id', this.id);
      formData.append('Title', this.data.title);
      formData.append('Blocks', JSON.stringify(outputData));
      formData.append('Time', Date.now().toString());
      formData.append('Version', outputData.version || '2.29.1');

      if (this.coverFile) {
        formData.append('ImgFile', this.coverFile);
      }

      this.editorServices.Update(formData).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard'),
            this.toastrServiecs.show('update writeUp succesfully');
        },
        error: (err) => {
          const msg = err.error?.error || 'somthing went wrong';
          this.toastrServiecs.show(msg, 'error');
        },
      });
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
}
