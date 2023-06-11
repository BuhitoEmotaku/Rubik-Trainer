import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//Components para hace connexion con la api
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

//crear modulos para insertarlos componentes
import { AppInterceptor } from './app.interceptor';
import { SharedModule } from './components/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { HomeSolverComponent } from './components/home-solver/home-solver.component';
import { AlgHiddenDirective } from './alg-hidden.directive';
import { InicioRubikTrainerComponent } from './components/inicio-rubik-trainer/inicio-rubik-trainer.component';
import { NavbarInicioComponent } from './components/navbar-inicio/navbar-inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeSolverComponent,
    AlgHiddenDirective,
    InicioRubikTrainerComponent,
    NavbarInicioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  //Creamos los SCHEMAS para diferentes funciones
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agrega la directiva aquí                                      
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
