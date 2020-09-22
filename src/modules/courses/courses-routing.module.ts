import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuardService as AdminGuard } from './../../app/_guards/admin-guard.service';
import { AuthGuardService as AuthGuard } from './../../app/_guards/auth-guard.service';
import { CoursesHomeComponent } from './courses-home/courses-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'home', component: CoursesHomeComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoursesRoutingModule {}
