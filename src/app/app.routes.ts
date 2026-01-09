import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CoursesComponent } from './features/courses/courses.component';
import { ServicesComponent } from './features/services/services.component';
import { CollegesComponent } from './features/colleges/colleges.component';
import { CollegeDetailComponent } from './features/colleges/college-detail/college-detail.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { AbroadComponent } from './features/abroad/abroad.component';
import { FaqComponent } from './features/faq/faq.component';
import { UpdatesComponent } from './features/updates/updates.component';
import { BlogsComponent } from './features/blogs/blogs.component';
import { FranchiseComponent } from './features/franchise/franchise.component';
import { UserRouteGuard } from './shared/guards/user-route.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [UserRouteGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [UserRouteGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [UserRouteGuard] },
  { path: 'colleges', component: CollegesComponent, canActivate: [UserRouteGuard] },
  { path: 'college/:idOrName', component: CollegeDetailComponent, canActivate: [UserRouteGuard] },
  { path: 'about', component: AboutComponent, canActivate: [UserRouteGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [UserRouteGuard] },
  { path: 'abroad', component: AbroadComponent, canActivate: [UserRouteGuard] },
  { path: 'abroad/:country', component: AbroadComponent, canActivate: [UserRouteGuard] },
  { path: 'faq', component: FaqComponent, canActivate: [UserRouteGuard] },
  { path: 'updates', component: UpdatesComponent, canActivate: [UserRouteGuard] },
  { path: 'blogs', component: BlogsComponent, canActivate: [UserRouteGuard] },
  { path: 'vlogs', loadComponent: () => import('./features/vlogs/vlogs.component').then(m => m.VlogsComponent), canActivate: [UserRouteGuard] },
  { path: 'franchise', component: FranchiseComponent, canActivate: [UserRouteGuard] },
  // Admin routes with lazy loading
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },
  { path: '**', redirectTo: 'home' } // Wildcard route for 404 pages
];
