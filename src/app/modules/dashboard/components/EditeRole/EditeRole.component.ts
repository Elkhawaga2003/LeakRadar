import { Component, OnInit } from '@angular/core';
import { Role } from './models/role';
import { RolesService } from '../roles/services/roles.service';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import { EditeRolesService } from './services/editeRoles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-EditeRole',
  templateUrl: './EditeRole.component.html',
  styleUrls: ['./EditeRole.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditeRoleComponent implements OnInit {
  roles!: Role[];
  editingRoleId: string | null = null;
  updatedRoleName: string = '';
  constructor(
    private editeRoleServices: EditeRolesService,
    private toastrServices: ToastService
  ) {}

  ngOnInit() {
    this.editeRoleServices.Get().subscribe({
      next: (res) => {
        this.roles = res;
      },
      error: (err) => console.log(err),
    });
  }
  CreateRole(roleName: string) {
    this.editeRoleServices.Create(roleName).subscribe({
      next: (res) => {
        this.toastrServices.show('role added succesfully', 'success');
        this.roles.push(res);
      },
      error: (err) => {
        const msg = err.error?.error || 'somthing went wrong ';
        this.toastrServices.show(msg, 'error');
      },
    });
  }
  Delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      this.editeRoleServices.Delete(id).subscribe({
        next: (res) => {
          this.toastrServices.show('Delete role happen succesfully', 'success');
          this.roles = this.roles.filter((role) => role.id != id);
        },
        error: (err) => {
          const msg = err.error?.error || 'somthing went wrong';
          this.toastrServices.show(msg, 'error');
        },
      });
    });
  }
  startEdit(role: any) {
    this.editingRoleId = role.id;
    this.updatedRoleName = role.name;
  }

  saveEdit(role: any) {
    this.editeRoleServices.update(role.id, this.updatedRoleName).subscribe({
      next: (res) => {
        role.name = res.name;
        this.toastrServices.show('Role updated successfully', 'success');
        this.editingRoleId = null;
      },
      error: (err) => {
        const msg = err.error?.error || 'Update failed';
        this.toastrServices.show(msg, 'error');
      },
    });
  }

  cancelEdit() {
    this.editingRoleId = null;
  }
}
