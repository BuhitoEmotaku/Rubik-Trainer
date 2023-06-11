import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

//servicio para obtener usuario con la api (no usado)
export class LoguearService {
  url = "https://emotaku.ddns.net/api"
  constructor(private http: HttpClient) {
    //console.log("Servicio activado")
  }
    getUsuarios() {
    let header = new HttpHeaders()
      .set('Type-content', 'application/json')

    return this.http.post(this.url, {
      headers: header
    });

  }
  //servicio para loguear usuario con la api
  loguearUsuario(usuario: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/loguear`, usuario, httpOptions);
  }

  //servicio para checheackr usuario logueado con su token
  checkLogueado(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/checkLogin`, token, httpOptions);
  }

  //servicio para borrar Usuario con la api
  borrarUser(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/borrarUser`, token, httpOptions);

  }

  //serviciop para recuperar contraseña con la api
  recuperarContraseña(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/recuperarContraseña`, token, httpOptions);
  }

  //servicio para cambiar la contraseña con la api
  cambiarContrasena(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/cambiarContrasena`, token, httpOptions);
  }

  
}
