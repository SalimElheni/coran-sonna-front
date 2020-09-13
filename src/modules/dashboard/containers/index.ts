import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { LightComponent } from './light/light.component';
import { StaticComponent } from './static/static.component';

export const containers = [
    Dashboard2Component,
    DashboardComponent,
    StaticComponent,
    LightComponent,
];

export * from './dashboard2/dashboard2.component';
export * from './dashboard/dashboard.component';
export * from './static/static.component';
export * from './light/light.component';
