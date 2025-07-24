import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ichallenge } from './models/Ichallenge';
import { ICategory } from '../challenge-categories/models/Icategory';
import { CategoryService } from '../challenge-categories/services/category.service';
import { ChallengeService } from './services/challenge.service';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import { Route } from 'lucide-angular';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
})
export class ChallengeComponent implements OnInit {
  challenge!: Ichallenge;
  challengeForm!: FormGroup;
  categories!: ICategory[];
  challengeId!: number;
  coverFile: File | null = null;
  attFile: File | null = null;
  constructor(
    private categoryServices: CategoryService,
    private challengeServices: ChallengeService,
    private toastrServices: ToastService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute
  ) {
    this.challengeForm = fb.group({
      title: ['', Validators.required],
      flag: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      points: ['', Validators.required],
      isVasible: [''],
      challengeUrl: [''],
      difficulty: [''],
    });
  }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.challengeId = +id;
        this.challengeServices.Getbyid(this.challengeId).subscribe({
          next: (res) => {
            this.challengeForm.patchValue(res);
          },
          error: (err) => console.log(err),
        });
      }
    });
    this.categoryServices.Get().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.log(err),
    });
  }
  Add() {
    if (this.challengeId) {
      this.challenge = this.challengeForm.value;

      if (this.attFile) this.challenge.attachmetFile = this.attFile;
      if (this.coverFile) this.challenge.coverImg = this.coverFile;
      this.challenge.id = this.challengeId;
      this.challengeServices.Update(this.challenge).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard/challenges');
          this.toastrServices.show('Updated happen succesfully', 'success');
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.challenge = this.challengeForm.value;
      if (this.attFile) this.challenge.attachmetFile = this.attFile;
      if (this.coverFile) this.challenge.coverImg = this.coverFile;
      this.challengeServices.Add(this.challenge).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard/challenges');
          this.toastrServices.show('challenge Added succesfully', 'success');
        },
        error: (err) => {
          const msg = err.error?.error || 'somthing went wrong';
          console.log(err);
        },
      });
    }
  }
  onCoverSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.coverFile = input.files[0];
    }
  }
  onAttchmentSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.attFile = input.files[0];
    }
  }
}
