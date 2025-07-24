import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  show: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toast = new BehaviorSubject<ToastData>({
    message: '',
    type: 'info',
    show: false,
  });

  toast$ = this._toast.asObservable();

  show(message: string, type: ToastData['type'] = 'info') {
    this._toast.next({ message, type, show: true });

    setTimeout(() => {
      this._toast.next({ ...this._toast.value, show: false });
    }, 3000); // hides after 3 sec
  }
}
