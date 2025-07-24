import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './Auth.routing';

@NgModule({
  imports: [CommonModule, AuthRoutes],
})
export class AuthModule {}
