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

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'colleges', component: CollegesComponent },
  { path: 'college/:id', component: CollegeDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'abroad', component: AbroadComponent },
  { path: 'abroad/:country', component: AbroadComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'franchise', component: FranchiseComponent },
  { path: '**', redirectTo: 'home' } // Wildcard route for 404 pages
];
