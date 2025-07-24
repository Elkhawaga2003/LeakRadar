import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PlayChallengeComponent } from './components/play-challenge/play-challenge.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/modules/Auth/Auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'writeups',
    loadChildren: () =>
      import('../app/modules/writeup/writeup.module').then(
        (m) => m.WriteupModule
      ),
  },
  {
    path: 'loaderboard',
    loadChildren: () =>
      import('../app/modules/loader-board/loader-board.module').then(
        (m) => m.LoaderBoardModule
      ),
  },
  { path: 'challenge/:id', component: PlayChallengeComponent },
  { path: '**', component: NotfoundComponent },
];
