import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioRubikTrainerComponent } from './components/inicio-rubik-trainer/inicio-rubik-trainer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PermissionsGuard } from './guard/permissions.guard';

const routes: Routes = [
  //Cuando no metamos nada, va a ruta concreta
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full'},
  //Paths habituales login, register y Dashboard
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inicio', component: InicioRubikTrainerComponent },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate: [PermissionsGuard]},
  //Para cuando metemos algo random, se vaya a ruta concreta
  { path: '*',redirectTo: 'dashboard/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
