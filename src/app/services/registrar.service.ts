import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class RegistrarService {


  
  url = "https://emotaku.ddns.net/api"
  constructor(private http: HttpClient) {
    //console.log("Servicio activado")
  }
  //servicio para registrar usuario
  registarUsuario(usuario: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/registrar`, usuario, httpOptions);
  }
  //servicio para checkear registro
  checkRegistrar(usuario: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/checkRegister`, usuario, httpOptions);
  }
}
