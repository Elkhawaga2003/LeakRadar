import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChallengeService } from './components/challenge/services/challenge.service';
import { Ichallenge } from './components/challenge/models/Ichallenge';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrComponent } from '../../../shared/toastr/toastr.component';
import { ToastService } from '../../../shared/toastr/Toast.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
  imports: [RouterLink, FormsModule, CommonModule],
})
export class ChallengesComponent implements OnInit {
  challenges!: Ichallenge[];
  constructor(
    private challengeServices: ChallengeService,
    private toastServices: ToastService
  ) {}

  ngOnInit() {
    this.challengeServices.Get().subscribe({
      next: (res) => {
        this.challenges = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  Delete(id: number) {
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
        this.challengeServices.delete(id).subscribe(() => {
          this.challenges = this.challenges.filter((e) => e.id != id);
          this.toastServices.show('User deleted successfully!', 'success');
        });
      }
    });
  }
}
