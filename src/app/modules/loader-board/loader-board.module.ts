import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderBoardComponent } from './loader-board.component';
import { LoaderboardRoutes } from './loaderboard.routing';

@NgModule({
  imports: [CommonModule, LoaderboardRoutes],
})
export class LoaderBoardModule {}
