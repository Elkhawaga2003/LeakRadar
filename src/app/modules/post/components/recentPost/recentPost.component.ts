import { Component, OnInit } from '@angular/core';
import { EditorService } from '../Post/services/Editor.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recentPost',
  templateUrl: './recentPost.component.html',
  styleUrls: ['./recentPost.component.css'],
  imports: [DatePipe, RouterLink],
})
export class RecentPostComponent implements OnInit {
  posts!: any[];
  constructor(
    private editorServices: EditorService,
    private toastServices: ToastService
  ) {}

  ngOnInit() {
    this.editorServices.Get(0).subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  Delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.editorServices.Delete(id).subscribe(() => {
          this.posts = this.posts.filter((e) => e.id != id);
          this.toastServices.show('User deleted successfully!', 'success');
        });
      }
    });
  }
}
