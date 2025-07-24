import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './challenges.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengeCategoriesComponent } from './components/challenge-categories/challenge-categories.component';

const routes: Routes = [
  { path: '', component: ChallengesComponent },
  { path: 'Addchallenge', component: ChallengeComponent },
  { path: 'Addchallenge/:id', component: ChallengeComponent },
  { path: 'challengeCategoires', component: ChallengeCategoriesComponent },
];

export const ChallengesRoutes = RouterModule.forChild(routes);
