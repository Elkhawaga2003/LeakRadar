import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges.component';
import { ChallengesRoutes } from './challenges.routing';

@NgModule({
  imports: [CommonModule, ChallengesRoutes],
})
export class ChallengesModule {}
