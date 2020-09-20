import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { TablesModule } from '@modules/tables/tables.module';

import { CourseModalComponent } from './course-modal/course-modal.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CoursesHomeComponent } from './courses-home/courses-home.component';

@NgModule({
    declarations: [DashboardComponent, CourseModalComponent, LandingPageComponent, CoursesHomeComponent],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,
    ],
    entryComponents: [CourseModalComponent],
})
export class CoursesModule {}
