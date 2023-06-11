import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegistrarService } from 'src/app/services/registrar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister: FormGroup;
  loader = false
  usuario = '';
  password = '';
  email = '';
  inputValue = '';
  checkCorreo = false;

  //constructor registro
  constructor(private fbRegist: FormBuilder, private registrarService: RegistrarService, private _snackBar: MatSnackBar
    , private router: Router) {
    this.formRegister = this.fbRegist.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }


  //metodo para registrar
  registrar() {
    
    const usuario_json = {
      name: this.usuario,
      password: this.password,
      email: this.email,
      clave: (<HTMLInputElement>document.getElementById('token')).value
    };

    //llamamos al servicio
    this.registrarService.registarUsuario(usuario_json).subscribe(resp => {
      //console.log(resp);
      if (resp == true) {
        //localStorage.setItem('access_token', resp);
        this.cargadorFalso();
      }
      else {
        this.errorRegister('Código erróneo!')
        // for (let i = 0; i < resp.length; i++) {
        //   setTimeout(() => {
        //     this.errorRegister(resp[i]);
        //   }, i * 2000); // Mostrar la alerta cada 3 segundos
        // }
      }
      //console.log(localStorage.getItem('access_token'));
    })

  }


  //metodo para checkear registro
  checkRegistrar(){

    this.usuario = this.formRegister.value.usuario;
    this.password = this.formRegister.value.password;
    this.email = this.formRegister.value.email;

    const usuario_json = {
      name: this.usuario,
      password: this.password,
      email: this.email,
    };

    //llamamos al servicio y manejamos errores o true
    this.registrarService.checkRegistrar(usuario_json).subscribe(resp => {
      //console.log(resp);
      if (resp == 'true') {
        this.checkCorreo = true;
        this.errorRegister('Se ha mandado un código a tu email!')
      }
      
      else {
        for (let i = 0; i < resp.length; i++) {
          this.checkCorreo = false;
          setTimeout(() => {
            this.errorRegister(resp[i]);
          }, i * 2000); // Mostrar la alerta cada 3 segundos
        }
      }
      //console.log(localStorage.getItem('access_token'));
    })
  }

  //creador de alertas
  errorRegister(error: string) {
    //Mensaje error cuando no acertamos la contraseña o usuario
    this._snackBar.open(error, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }
  //cargador falso register y manda al dashboard
  cargadorFalso() {
    this.checkCorreo = false;
    this.loader = true;
    setTimeout(() => {

      //Hacemos redirect al dashboard y lo reseteamos
      this.router.navigate(['dashboard']);
    }, 1000);
  }
}
