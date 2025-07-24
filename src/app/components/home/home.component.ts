import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../../modules/post/components/Post/Post.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChallengeService } from '../../modules/challenges/components/challenge/services/challenge.service';
import { Ichallenge } from '../../modules/challenges/components/challenge/models/Ichallenge';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterLink],
})
export class HomeComponent implements OnInit {
  challenges!: Ichallenge[];
  constructor(private challengeServics: ChallengeService) {}

  ngOnInit() {
    this.challengeServics.Get().subscribe({
      next: (res) => {
        this.challenges = res.map((challenge) => ({
          ...challenge,
          imgUrl: `${environment.baseUrl}/${challenge.imgUrl}`,
        }));
      },
      error: (err) => console.log(err),
    });
  }
}
