import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import { IAuth } from '../../../../models/IAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  user!: IAuth;
  constructor(
    private auhtServics: AuthService,
    private toastrServices: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}
  logIn() {
    this.user = this.userForm.value;
    this.auhtServics.LogInUser(this.user).subscribe({
      next: (res) => {
        this.auhtServics.setTokens(res.token, res.refreshToken);
        this.router.navigateByUrl('/home'),
          this.toastrServices.show('Welcome again ', 'info');
      },
      error: (err) => {
        const msg = err.error?.error || 'Email or Password are wrong';
        this.toastrServices.show(msg, 'error');
      },
    });
  }
}
