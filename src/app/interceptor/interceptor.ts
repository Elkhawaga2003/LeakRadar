import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, switchMap, throwError, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../modules/Auth/services/auth.service';
import { ToastService } from '../../shared/toastr/Toast.service';
import { LoadingService } from '../../shared/loading-snipper/services/loading.service';

const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function httpLoadingInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const userService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastService);
  const loadingService = inject(LoadingService);

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('RefreshToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  loadingService.show();

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        loadingService.hide();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      loadingService.hide();

      if (error.status === 401 && refreshToken) {
        return userService.RefreshToken(refreshToken).pipe(
          switchMap((res: any) => {
            userService.setTokens(res.token, res.refreshToken);
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`,
              },
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            console.error('Refresh Failed:', refreshErr);
            userService.ClearTokens();
            router.navigateByUrl('/home');
            return throwError(() => refreshErr);
          })
        );
      } else if (error.status === 401) {
        toastr.show('You are not signed in yet', 'error');
        router.navigateByUrl('/home');
      }

      return throwError(() => error);
    })
  );
}
