import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveCubeService {
  url = "https://emotaku.ddns.net/api"
  constructor(private http: HttpClient) {
    //console.log("Servicio activado")
  }
  //servicio para obtener usuarios
    getUsuarios() {
    let header = new HttpHeaders()
      .set('Type-content', 'application/json')

    return this.http.post(this.url, {
      headers: header
    });

  }
  //servicio para guardar el cubo de rubik del usuario
  saveCube(cube: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/saveCube`, cube, httpOptions);
  }

  //servicio para guardar la lista del cubo
  getCubeList(usu: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/getListCubes`, usu, httpOptions);
  }

  //Servicio para borrar Cubo
  deleteCube(usu: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/deleteCube`, usu, httpOptions);
  }
  
}
