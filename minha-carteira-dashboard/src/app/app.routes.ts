import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './shared/ui/dashboard.component';
import { ChartsComponent } from './shared/ui/charts/charts.component';

export const routes: Routes = [{path:'', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent},
    { path: 'charts',component: ChartsComponent}
];
