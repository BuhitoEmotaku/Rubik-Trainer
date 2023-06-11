// cronometro.ts
import { Observable, Subject } from "rxjs";

export class Cronometro {
  //creacion de variables
  private tiempoInicio: number | null = null;
  private tiempoFin: number | null = null;
  private intervalId: any;
  private eventosTiempo = new Subject<void>();

  
  tiempoIniciado = false;
  //metodo para inciaar cronometro 
  iniciar() {
    if (!this.tiempoIniciado) {
      this.tiempoInicio = new Date().getTime();
      this.tiempoFin = null;
      this.intervalId = setInterval(() => {
        this.eventosTiempo.next();
      }, 10);
      this.tiempoIniciado = true;
    }
  }
  //metodo para detener el cronometro
  detener() {
    if (this.tiempoIniciado) {
      clearInterval(this.intervalId);
      this.tiempoFin = new Date().getTime();
      this.tiempoIniciado = false;
    }
  }

  //metodo para obtener el tiempo transcurrido
  obtenerTiempoTranscurrido() {
    let tiempoTranscurrido = 0;
    if (this.tiempoInicio !== null) {
      const tiempoActual = this.tiempoFin ?? new Date().getTime();
      tiempoTranscurrido = tiempoActual - this.tiempoInicio;
    }
    return tiempoTranscurrido;
  }
  //metodo para obteer el tiempo formateado a minutos segundos y milesimas
  obtenerTiempoFormateado() {
    const tiempoTranscurrido = this.obtenerTiempoTranscurrido();
    const minutos = Math.floor(tiempoTranscurrido / 60000);
    const segundos = (tiempoTranscurrido % 60000) / 1000;
    //checho si existen min
    let tiempoFormateado = '';
  
    if (minutos > 0) {
      tiempoFormateado += `${minutos}:`;
    }
    //checko si existen segundos
    if (segundos >= 1) {
      if (segundos < 10 && minutos > 0) {
        tiempoFormateado += `0${segundos.toFixed(2)}`;
      } else {
        tiempoFormateado += segundos.toFixed(2);
      }
    } else {
      const segundosFormateados = segundos.toFixed(2).substr(1);
      tiempoFormateado += `0${segundosFormateados}`;
    }
  
    // Añadir un segundo cero si los segundos son iguales a cero
    if (minutos > 0 && segundos === 0) {
      tiempoFormateado += '0';
    }
    //return tiempo
    return tiempoFormateado;
  }
  //obtener el tiempo de la lista de eventos
  obtenerEventosTiempo(): Observable<void> {
    return this.eventosTiempo.asObservable();
  }
  
}
