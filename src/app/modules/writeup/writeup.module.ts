import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteupComponent } from './writeup.component';
import { WriteupRoutes } from './writeup.routing';

@NgModule({
  imports: [CommonModule, WriteupRoutes],
})
export class WriteupModule {}
