import { Component, OnInit } from '@angular/core';
import { EditeRoleComponent } from '../../../dashboard/components/EditeRole/EditeRole.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EditorService } from '../../../post/components/Post/services/Editor.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-Writeups',
  templateUrl: './Writeups.component.html',
  styleUrls: ['./Writeups.component.css'],
  imports: [CommonModule, DatePipe, RouterLink],
})
export class WriteupsComponent implements OnInit {
  writeups!: any[];

  constructor(private editorServices: EditorService) {}

  ngOnInit() {
    this.editorServices.Get(0).subscribe({
      next: (res) => {
        this.writeups = res.map((item: any) => {
          return {
            ...item,
            imgUrl: `${environment.baseUrl}/${item.imgUrl}`,
          };
        });
      },
      error: (err) => console.log(err),
    });
  }
}
