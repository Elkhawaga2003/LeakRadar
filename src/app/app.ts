import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { ToastData, ToastService } from '../shared/toastr/Toast.service';
import { LoadingSnipperComponent } from '../shared/loading-snipper/loading-snipper.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    NgxEditorModule,
    ToastrComponent,
    LoadingSnipperComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'LeakRadar';
  toastData: ToastData = { message: '', type: 'info', show: false };
  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe((data) => {
      this.toastData = data;
    });
  }
}
