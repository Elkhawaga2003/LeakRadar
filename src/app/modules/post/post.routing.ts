import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './components/Post/Post.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: '**', component: PostComponent },
];

export const PostRoutes = RouterModule.forChild(routes);
