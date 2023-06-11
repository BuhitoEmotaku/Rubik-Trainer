import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//importacion de componentes hijos para su uso dentro del dashboard
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TimerComponent } from './timer/timer.component';
import { AlgoritmosComponent } from './algoritmos/algoritmos.component';
import { TutorialComponent } from './tutorial/tutorial.component'
@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    NavbarComponent,
    TimerComponent,
    AlgoritmosComponent,
    TutorialComponent
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
