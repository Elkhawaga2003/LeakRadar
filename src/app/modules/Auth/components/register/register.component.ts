import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router
  ) {
    this.userForm = fb.group(
      {
        UserName: ['', Validators.required],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: [this.passwordsMatchValidator] }
    );
  }

  ngOnInit() {}
  Register() {
    this.authServices.RegisterUser(this.userForm.value).subscribe({
      next: (res) => this.router.navigateByUrl('/auth'),
      error: (err) => console.error(err),
    });
  }
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
