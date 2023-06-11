import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiempoCuboUserService {

  url = "https://emotaku.ddns.net/api"
  constructor(private http: HttpClient) {
    //console.log("Servicio activado")
  }
  
  //Servicio para obtener Usuarios
    getUsuarios() {
    let header = new HttpHeaders()
      .set('Type-content', 'application/json')

    return this.http.post(this.url, {
      headers: header
    });

  }
  //Servicio para obtener el tiempo de Usuario
  saveTiempoUser(cube: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/saveTiempoCubo`, cube, httpOptions);
  }

  //Servicio para obtener lista de cubo
  getCubeList(usu: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/getTiempoCubes`, usu, httpOptions);
  }
  
  //Servicio para borrar lista de Cubos
  deleteCubeList(usu: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/deleteTiempoLista`, usu, httpOptions);
  }
}
