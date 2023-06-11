import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoguearService } from 'src/app/services/loguear.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //creacion variables
  form: FormGroup;
  loader = false;
  codigoContrasena = false;
  logOcult = true;
  recContrasena = false;
  //creacion constructor
  constructor(private fb: FormBuilder, private loguearService: LoguearService, private _snackBar: MatSnackBar
    , private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  //creacion loguear usuario
  loguear() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    const usuario_json = {
      name: usuario,
      password: password,
    };
    //llamammos al servicio y manejamos errores
    this.loguearService.loguearUsuario(usuario_json).subscribe(resp => {
      if (resp != "none" && resp.mensaje != "Nombre de usuario o contraseña incorrectos") {
        localStorage.setItem('access_token', resp);
        this.cargadorFalso();
      }

      else {
        this.errorLogin(resp.mensaje);
        this.form.reset();
      }
      //console.log(localStorage.getItem('access_token'));
    })


  }

  //alerta error login
  errorLogin(error: string) {
    //Mensaje error cuando no acertamos la contraseña o usuario
    this._snackBar.open(error, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }

  //alerta cargador falso y redirect
  cargadorFalso() {
    this.codigoContrasena = false;
        this.logOcult = false;
        this.recContrasena = false;
    this.loader = true;
    setTimeout(() => {

      //Hacemos redirect al dashboard y lo reseteamos
      this.router.navigate(['dashboard']);
    }, 1000);
  }

  //alerta recuperar contraseña
  recuperarContrase(){
    this.codigoContrasena = false;
    this.recContrasena = true;
    const usuario_json = {
      email: (<HTMLInputElement>document.getElementById('emailRecuperarContra')).value
    };
    this.recContrasena = true;
    //llamamos al servicio y manejramos errores
    this.loguearService.recuperarContraseña(usuario_json).subscribe(resp => {
      //console.log(resp);
      if (resp == 'true') {
        //localStorage.setItem('access_token', resp);
        
        this.codigoContrasena = true;
        this.recContrasena = false;
        this.errorLogin('Código enviado al email!');
      }
      else {
        this.errorLogin('Email erróneo!');
        this.codigoContrasena = false;
        // for (let i = 0; i < resp.length; i++) {
        //   setTimeout(() => {
        //     this.errorRegister(resp[i]);
        //   }, i * 2000); // Mostrar la alerta cada 3 segundos
        // }
      }
      //console.log(localStorage.getItem('access_token'));
    })

  }
  
  //metodo para checjeckar el codigo de la contraseña del email
  codigoContrasenaM(){
    const usuario_json = {
      contrasenaNueva: (<HTMLInputElement>document.getElementById('contrasenaNueva')).value,
      token: (<HTMLInputElement>document.getElementById('token')).value
    };
    //servicio para cambiarla y manejar errores
    this.loguearService.cambiarContrasena(usuario_json).subscribe(resp => {
      //console.log(resp);
      if (resp == 'true') {
        //localStorage.setItem('access_token', resp);
        this.errorLogin('Contraseña Cambiada con éxito!');
        this.codigoContrasena = false;
      }
      else {
        this.errorLogin('Código erróneo!');
        // for (let i = 0; i < resp.length; i++) {
        //   setTimeout(() => {
        //     this.errorRegister(resp[i]);
        //   }, i * 2000); // Mostrar la alerta cada 3 segundos
        // }
      }
      //console.log(localStorage.getItem('access_token'));
    })

  }

  
}
