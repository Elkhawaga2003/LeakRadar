import { Routes, RouterModule } from '@angular/router';
import { WriteupComponent } from './writeup.component';
import { WriteupsComponent } from './components/Writeups/Writeups.component';
import { UpdateComponent } from '../dashboard/components/update/update.component';
import { UpdateWriteupsComponent } from './components/updateWriteups/updateWriteups.component';

const routes: Routes = [
  { path: 'writeup/:id', component: WriteupComponent },
  { path: '', component: WriteupsComponent },
  { path: 'updatewriteup/:id', component: UpdateWriteupsComponent },
];

export const WriteupRoutes = RouterModule.forChild(routes);
