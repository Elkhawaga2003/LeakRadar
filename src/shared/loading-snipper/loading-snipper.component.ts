import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-snipper',
  templateUrl: './loading-snipper.component.html',
  styleUrls: ['./loading-snipper.component.css'],
  imports: [CommonModule],
})
export class LoadingSnipperComponent {
  loading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((val) => {
      this.loading = val;
    });
  }
}
