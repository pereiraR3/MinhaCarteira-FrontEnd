import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './shared/ui/dashboard.component';
import { ChartsComponent } from './shared/ui/charts/charts.component';
import { GastoListComponent } from './shared/ui/gasto-list/gasto-list.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent, // Componente "Moldura"
    children: [
      {
        path: '', // <-- CORREÇÃO: path vazio para ser o padrão
        component: GastoListComponent // <-- CORREÇÃO: Aponta para a lista de gastos
      },
      {
        path: 'charts', // Rota para /dashboard/charts ("Página 2")
        component: ChartsComponent
      }
    ]
  }
];