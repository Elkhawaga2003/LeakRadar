import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ichallenge } from '../../modules/challenges/components/challenge/models/Ichallenge';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../modules/challenges/components/challenge/services/challenge.service';
import { environment } from '../../../environments/environment.development';
import { ToastService } from '../../../shared/toastr/Toast.service';

@Component({
  selector: 'app-play-challenge',
  templateUrl: './play-challenge.component.html',
  styleUrls: ['./play-challenge.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PlayChallengeComponent implements OnInit {
  submittedFlag!: string;
  challenge!: Ichallenge;
  submitMessage: string | null = null;
  submitMessageTimeout: any;
  constructor(
    private activedRoute: ActivatedRoute,
    private challengeServices: ChallengeService,
    private toastrServices: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.challengeServices.Getbyid(+id).subscribe({
          next: (res) => {
            console.log(res);

            this.challenge = {
              ...res,
              imgUrl: `${environment.baseUrl}/${res.imgUrl}`,
              attachmetUrl: res.attachmetUrl
                ? `${environment.baseUrl}/${res.attachmetUrl}`
                : null,
            };
          },
          error: (err) => {
            console.error('Error fetching challenge:', err);
          },
        });
      }
    });
  }
  submitFlag() {
    if (!this.submittedFlag) return;

    this.challengeServices
      .submitFlag(this.submittedFlag, this.challenge.id)
      .subscribe({
        next: (res: string) => {
          this.router.navigateByUrl('/loaderboard');
          this.toastrServices.show('you flag is correct', 'success');
        },
        error: (err) => {
          this.submitMessage = err.error.message || 'Something went wrong.';
          this.autoClearMessage();
        },
      });
  }
  autoClearMessage() {
    clearTimeout(this.submitMessageTimeout); // clear if existing
    this.submitMessageTimeout = setTimeout(() => {
      this.submitMessage = null;
    }, 3000);
  }
}
