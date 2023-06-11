import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AlgoritmosService {
  //servicio para pedir algoritmos con la api
  url = "https://emotaku.ddns.net/api"
  constructor(private http: HttpClient) {
    //console.log("Servicio activado")
  }
  obtenerAlgoritmos(tipo: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }),
      withCredentials: true
    };
    return this.http.post<any>(`${this.url}/algoritmos`, tipo, httpOptions);
  }
}
