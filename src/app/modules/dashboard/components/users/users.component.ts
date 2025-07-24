import { Component, OnInit } from '@angular/core';
import { IUser } from './models/IUser';
import { UsersService } from './services/users.service';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../../../shared/toastr/Toast.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [RouterLink],
})
export class UsersComponent implements OnInit {
  users!: IUser[];

  constructor(
    private userServices: UsersService,
    private toastServices: ToastService
  ) {}

  ngOnInit() {
    this.userServices.GetUsers(0).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => console.log(err),
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
      if (result.isConfirmed) {
        this.userServices.Delete(id).subscribe(() => {
          this.users = this.users.filter((e) => e.id != id);
          this.toastServices.show('User deleted successfully!', 'success');
        });
      }
    });
  }
}
