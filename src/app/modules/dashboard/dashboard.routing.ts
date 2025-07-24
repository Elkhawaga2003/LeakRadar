import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from '../post/components/Post/Post.component';
import { RecentPostComponent } from '../post/components/recentPost/recentPost.component';
import { UsersComponent } from './components/users/users.component';
import { UpdateComponent } from './components/update/update.component';
import { RolesComponent } from './components/roles/roles.component';
import { EditeRoleComponent } from './components/EditeRole/EditeRole.component';
import { ChallengesComponent } from '../challenges/challenges.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'posts',
    component: PostComponent,
  },
  {
    path: 'recentPosts',
    component: RecentPostComponent,
  },
  { path: 'users', component: UsersComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'roles/:id', component: RolesComponent },
  { path: 'EditeRoles', component: EditeRoleComponent },
  {
    path: 'challenges',
    loadChildren: () =>
      import('../challenges/challenges.module').then((m) => m.ChallengesModule),
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
