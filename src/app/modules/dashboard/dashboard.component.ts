import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecentPostComponent } from '../post/components/recentPost/recentPost.component';
import { UsersService } from './components/users/services/users.service';
import { EditorService } from '../post/components/Post/services/Editor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterLink, RecentPostComponent],
})
export class DashboardComponent implements OnInit {
  userCount!: number;
  postCount!: number;
  constructor(
    private userServices: UsersService,
    private editorServics: EditorService
  ) {}

  ngOnInit() {
    this.userServices.GetUserCount().subscribe({
      next: (res) => {
        this.userCount = res;
      },
      error: (err) => console.log(err),
    });
    this.editorServics.GetPostCount().subscribe({
      next: (res) => {
        this.postCount = res;
      },
      error: (err) => console.log(err),
    });
  }
}
