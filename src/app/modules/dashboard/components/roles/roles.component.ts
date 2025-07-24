import { Component, OnInit } from '@angular/core';
import { IRole } from './models/Irole';
import { RolesService } from './services/roles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../shared/toastr/Toast.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  imports: [CommonModule, FormsModule],
})
export class RolesComponent implements OnInit {
  roles!: IRole[];
  userId!: string;
  constructor(
    private roleServices: RolesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastServices: ToastService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parmap) => {
      const id = parmap.get('id');
      if (id) {
        this.userId = id;
        this.roleServices.GetRoles(this.userId).subscribe({
          next: (res) => {
            (this.roles = res), console.log(res);
          },
          error: (err) => console.error(err),
        });
      }
    });
  }
  Update() {
    this.roleServices.UpdateUserRoles(this.userId, this.roles).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/dashboard');
        this.toastServices.show('user roles updated succesfully', 'success');
      },
      error: (err) => {
        const msg = err.error?.error;
        this.toastServices.show(msg, 'error');
      },
    });
  }
}
