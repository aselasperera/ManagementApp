

import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard as Auth0Guard } from '@auth0/auth0-angular';
import { AuthGuard } from './layout/authGuard/authGuard';
import { UserProfileComponent } from './layout/Userprofile/user-profile.component';

// Generated Pages
import {UserComponent} from "./../genPages/User/User.component"; 
import {RoleComponent} from "./../genPages/Role/Role.component"; 
import {EmployeeComponent} from "./../genPages/Employee/Employee.component"; 


const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,canActivate: [Auth0Guard],
        children: [
            { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'user-profile', component: UserProfileComponent, canActivate: [Auth0Guard] },

           // Generated Pages
           {path: 'pages/user', component: UserComponent,canActivate: [AuthGuard],data: { breadcrumb: 'User', requiredRoles:["Admin"] }},
					{path: 'pages/role', component: RoleComponent,canActivate: [AuthGuard],data: { breadcrumb: 'Role', requiredRoles:["Admin"] }},
					{path: 'pages/employee', component: EmployeeComponent,canActivate: [AuthGuard],data: { breadcrumb: 'Employee', requiredRoles:["Admin"] }},
					
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
