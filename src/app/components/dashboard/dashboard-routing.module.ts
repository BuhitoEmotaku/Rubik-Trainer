import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSolverComponent } from '../home-solver/home-solver.component';
import { DashboardComponent } from './dashboard.component';
import { AlgoritmosComponent } from './algoritmos/algoritmos.component'
import { TutorialComponent } from './tutorial/tutorial.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: HomeSolverComponent},
    { path: 'home', component: HomeSolverComponent},
    { path: 'timer', component: TimerComponent},
    { path: 'algs', component: AlgoritmosComponent },
    { path: 'tutorial', component: TutorialComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
