import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { ILoadboader } from './models/ILoadboader';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader-board',
  templateUrl: './loader-board.component.html',
  styleUrls: ['./loader-board.component.css'],
})
export class LoaderBoardComponent implements OnInit {
  users!: ILoadboader[];
  constructor(private loaderServices: LoaderService) {}

  ngOnInit() {
    this.loaderServices.Get().subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.log(err),
    });
  }
}
