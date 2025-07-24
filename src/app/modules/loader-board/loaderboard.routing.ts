import { Routes, RouterModule } from '@angular/router';
import { LoaderBoardComponent } from './loader-board.component';

const routes: Routes = [{ path: '', component: LoaderBoardComponent }];

export const LoaderboardRoutes = RouterModule.forChild(routes);
