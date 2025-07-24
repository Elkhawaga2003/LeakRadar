import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../modules/Auth/services/auth.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/toastr/Toast.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLink],
})
export class SidebarComponent implements OnInit {
  isLogged!: boolean;

  isAdmin!: boolean;
  constructor(
    private userServices: AuthService,
    private router: Router,
    private toastrServices: ToastService,
    private authServivces: AuthService
  ) {}

  ngOnInit() {
    var token = localStorage.getItem('token');
    if (token) {
      var decodedtoken = this.decodeToken(token);

      const roles =
        decodedtoken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      this.isAdmin = Array.isArray(roles) && roles.includes('Admin');
    }
    this.userServices.isloggedIn$.subscribe((value) => {
      this.isLogged = value;
    });
    console.log('should print here');

    console.log(this.isLogged);
  }
  LogOut() {
    const refreshToken = this.userServices.getRefreshToken();
    console.log(refreshToken);

    if (!refreshToken) {
      this.userServices.ClearTokens();
      this.router.navigate(['/Home']);
      return;
    }

    this.userServices.logOut(refreshToken).subscribe({
      next: (res) => {
        const refreshToken = this.userServices.getRefreshToken();
        this.authServivces.logOut(refreshToken);
        this.userServices.ClearTokens();
        this.router.navigate(['/home']);
        this.toastrServices.show('log out successfully', 'success');
      },
      error: (err) => {
        this.router.navigate(['/home']);
        this.toastrServices.show('please try again ', 'warning');
      },
    });
  }
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
