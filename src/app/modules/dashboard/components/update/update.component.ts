import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../users/models/IUser';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users/services/users.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../../shared/toastr/Toast.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UpdateComponent implements OnInit {
  user!: IUser;
  userId!: string;
  userForm!: FormGroup;
  constructor(
    private activateRoute: ActivatedRoute,
    private userServices: UsersService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.userForm = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((parmap) => {
      const id = parmap.get('id');
      if (id) {
        this.userId = id;
        this.userServices.GetUserById(this.userId).subscribe({
          next: (res) => {
            (this.user = res), this.userForm.patchValue(res);
          },
          error: (err) => console.log(err),
        });
      }
    });
  }
  Update() {
    this.user = this.userForm.value;
    this.user.id = this.userId;
    this.userServices.Update(this.user).subscribe({
      next: (res) => {
        this.toastService.show('Updated in successfully!', 'success');
      },
      error: (err) => {
        const msg = err.error?.error || 'somthing went wrong';
        this.toastService.show(msg, 'error');
      },
    });
  }
}
