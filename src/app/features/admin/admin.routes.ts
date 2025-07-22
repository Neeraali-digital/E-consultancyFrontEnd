import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './pages/login/admin-login.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { CollegeListComponent } from './pages/colleges/college-list/college-list.component';
import { CollegeFormComponent } from './pages/colleges/college-form/college-form.component';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseFormComponent } from './pages/courses/course-form/course-form.component';
import { BlogListComponent } from './pages/blogs/blog-list/blog-list.component';
import { BlogFormComponent } from './pages/blogs/blog-form/blog-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { InquiryListComponent } from './pages/inquiries/inquiry-list/inquiry-list.component';
import { SettingsComponent } from './pages/settings/settings.component';
// import { AdminAuthGuard } from './guards/admin-auth.guard'; // Temporarily disabled

export const adminRoutes: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AdminAuthGuard], // Temporarily disabled for development
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'colleges',
        children: [
          {
            path: '',
            component: CollegeListComponent
          },
          {
            path: 'add',
            component: CollegeFormComponent
          },
          {
            path: 'edit/:id',
            component: CollegeFormComponent
          }
        ]
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CourseListComponent
          },
          {
            path: 'add',
            component: CourseFormComponent
          },
          {
            path: 'edit/:id',
            component: CourseFormComponent
          }
        ]
      },
      {
        path: 'blogs',
        children: [
          {
            path: '',
            component: BlogListComponent
          },
          {
            path: 'add',
            component: BlogFormComponent
          },
          {
            path: 'edit/:id',
            component: BlogFormComponent
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserListComponent
          },
          {
            path: 'add',
            component: UserFormComponent
          },
          {
            path: 'edit/:id',
            component: UserFormComponent
          }
        ]
      },
      {
        path: 'inquiries',
        component: InquiryListComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];
