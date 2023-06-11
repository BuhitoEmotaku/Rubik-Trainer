// Componente TimerComponent
import { Component, OnDestroy, HostListener, OnInit, AfterViewInit, ViewChild, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Cronometro } from './cronometro';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { Cube } from './rubik';
import { TiempoCuboUserService } from 'src/app/services/tiempo-cubo-user.service';

class Rubik2dRender {
  //renderizado 2d cubo
  //creador de mezclas
  crearMezcla() {
    const cubeObj = new Cube();
    let [rubikCube, secuenciaMovimientos]: any = cubeObj.iniciar(cubeObj);
    //console.log(rubikCube + "A")
    //console.log(secuenciaMovimientos);
    let secuenciaMovimientosFin: string = '';
    secuenciaMovimientosFin = secuenciaMovimientos;
    let scene:any;
    scene = new THREE.Scene()

    // Tamaño de los cuadrados
    const squareSize = 50;
    const faceSeparation = 100;

    // Desplazamiento para posicionar las caras del cubo
    let offsetX = 0;
    let offsetY = 0;
    let offsetZ = 0;

    // Crear los cuadrados para las seis caras
    for (let face = 0; face < 6; face++) {

      // Crear una geometría plana
      const geometry = new THREE.PlaneGeometry(squareSize, squareSize);

      // Posicionar los cuadrados de la cara en la escena
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Obtener el índice correspondiente al color en el array
          let index;
          if (j === 0) {
            index = face * 9 + 6 + i; // Parte inferior
          } else if (j === 1) {
            index = face * 9 + 3 + i; // Parte del medio
          } else {
            index = face * 9 + i; // Parte superior
          }

          // Obtener el color del array
          const color = rubikCube[index];

          // Crear el material correspondiente al color
          let material;
          switch (color) {
            case "r": // Cara frontal
              material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
              break;
            case "o": // Cara trasera
              material = new THREE.MeshBasicMaterial({ color: 0xffa500 });
              break;
            case "w": // Cara superior
              material = new THREE.MeshBasicMaterial({ color: 0xffffff });
              break;
            case "y": // Cara inferior
              material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
              break;
            case "g": // Cara izquierda
              material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
              break;
            case "b": // Cara derecha
              material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
              break;
          }

          // Crear el cuadrado
          const square = new THREE.Mesh(geometry, material);

          square.position.set(
            (i - 1) * squareSize + offsetX,
            (j - 1) * squareSize + offsetY,
            offsetZ
          );

          scene.add(square);

          // Crear el borde interno
          const innerEdgeGeometry = new THREE.EdgesGeometry(geometry);
          const innerEdgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
          const innerEdge = new THREE.LineSegments(innerEdgeGeometry, innerEdgeMaterial);
          innerEdge.position.copy(square.position);
          scene.add(innerEdge);
        }
      }

      // Actualizar el desplazamiento para la siguiente cara
      if (face === 0) {
        offsetX = -squareSize * 4.5;
        offsetY = 0;
        offsetZ = 0;
      } else if (face === 1) {
        offsetX = squareSize * 4.5;
        offsetY = 0;
        offsetZ = 0;
      } else if (face === 2) {
        offsetX = 0;
        offsetY = -squareSize * 4.5;
        offsetZ = 0;
      } else if (face === 3) {
        offsetX = 0;
        offsetY = squareSize * 4.5;
        offsetZ = 0;
      } else if (face === 4) {
        offsetX = offsetY = squareSize * 9;
        offsetY = 0;
        offsetZ = 0;
      } else if (face === 5) {
        offsetX = 0;
        offsetY = 0;
        offsetZ = 0;
      }
    }

    // Crear una cámara
    const camera = new THREE.PerspectiveCamera(65, 1000 / 450, 0.1, 1000);
    camera.position.z = 500;

    // Crear un renderizador
    let renderer:any = new THREE.WebGLRenderer();
    const canvasContainer = document.getElementById('canvasScramble');
    renderer.setSize(500, 250);
    if (canvasContainer) {
      canvasContainer.innerHTML = "";
      canvasContainer.appendChild(renderer.domElement);
    }



    // Función de renderizado
    function render() {
      // requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    // Renderizar la escena
    render();
    return secuenciaMovimientosFin
  }
  
}


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy, AfterViewInit {

  //creacion de variables necesarias
  @ViewChildren('tiempoHidden') algHiddenElements!: QueryList<ElementRef<HTMLInputElement>>;
  @Input() secuenciaMovimientos: string = "";
  cronometro = new Cronometro();
  tiempoTranscurrido = '0:00.00';
  tiempos: ({} | string)[] = [];
  tiempoColor = '';
  mezcla: string = "";
  private eventosTiempoSubscription: Subscription | undefined;
  private barraEspaciadoraPresionada = false;
  private tiempoInicioEspacio = 0;
  private tiempoDetenido = false;
  ao5: string = "";
  ao12: string = "";

  //oninit arrancamos borrando js twisty si existe
  ngOnInit(): void {
    const scriptElement = document.getElementById('scriptCuboCreator') as HTMLScriptElement;
    if (scriptElement) {
      const parentElement = scriptElement.parentNode;
      if (parentElement) parentElement.removeChild(scriptElement);
    }
    this.getListaCubos();


  }

  //constructor
  constructor(private tiempoCuboService: TiempoCuboUserService) {

  }


  private timeoutEspacio: any; // Variable para almacenar el temporizador

  

  //listener para cuando apretamos el spacio
  @HostListener('document:keydown.space')
iniciarCronometro(event: KeyboardEvent) {
  if (!this.isMobileDevice() && !this.barraEspaciadoraPresionada) {
    this.barraEspaciadoraPresionada = true;
    //actualiza los tiempos
    this.tiempoInicioEspacio = Date.now();
    this.actualizarColorTiempo();
    this.iniciarTemporizador();
  }
}

//listener para cuando soltamos el espacio
@HostListener('document:keyup.space')
detenerCronometro(event: KeyboardEvent) {
  if (!this.isMobileDevice() && this.barraEspaciadoraPresionada) {
    //cambiamos el color segun el tiempo que lleve mantenido
    this.barraEspaciadoraPresionada = false;
    clearTimeout(this.timeoutEspacio);
    if (this.tiempoColor === 'orange') {
      this.tiempoColor = 'green';
    } else {
      this.actualizarColorTiempo();
    }
    if (this.tiempoColor === 'green') {
      if (!this.cronometro.tiempoIniciado) {
        this.cronometro.iniciar();
        //obtenemos los tiempos de la base de datos
        this.eventosTiempoSubscription = this.cronometro.obtenerEventosTiempo().subscribe(() => {
          this.actualizarTiempo();
        });
        this.tiempoDetenido = false;
      }
    } else {
      //si está detenido entonces lo añadimos y actualizamos base de datos y lista
      if (this.cronometro.tiempoIniciado && !this.tiempoDetenido) {
        this.cronometro.detener();
        this.tiempoDetenido = true;
        this.tiempoColor = '';
        //console.log("B");
        this.actualizarListaTiempos();
        this.generarMezclaRender();
        this.añadirCubo();
      } else {
        this.tiempoColor = '';
      }
    }
  }
}

//same pero para moviles y tablets
@HostListener('document:touchstart')
iniciarCronometroTouch(event: TouchEvent) {
  if (this.isMobileDevice()) {
    // Código para el evento touchstart en dispositivos móviles
    if (!this.barraEspaciadoraPresionada) {
      this.barraEspaciadoraPresionada = true;
      this.tiempoInicioEspacio = Date.now();
      this.actualizarColorTiempo();
      this.iniciarTemporizador();
    }
  }
}

//same pero para moviles y tablets
@HostListener('document:touchend')
detenerCronometroTouch(event: TouchEvent) {
  if (this.isMobileDevice() && this.barraEspaciadoraPresionada) {
    // Código para el evento touchend en dispositivos móviles
    this.barraEspaciadoraPresionada = false;
    clearTimeout(this.timeoutEspacio);
    if (this.tiempoColor === 'orange') {
      this.tiempoColor = 'green';
    } else {
      this.actualizarColorTiempo();
    }
    if (this.tiempoColor === 'green') {
      if (!this.cronometro.tiempoIniciado) {
        this.cronometro.iniciar();
        this.eventosTiempoSubscription = this.cronometro.obtenerEventosTiempo().subscribe(() => {
          this.actualizarTiempo();
        });
        this.tiempoDetenido = false;
      }
    } else {
      if (this.cronometro.tiempoIniciado && !this.tiempoDetenido) {
        this.cronometro.detener();
        this.tiempoDetenido = true;
        this.tiempoColor = '';
        //console.log("B");
        this.actualizarListaTiempos();
        this.generarMezclaRender();
        this.añadirCubo();
      } else {
        this.tiempoColor = '';
      }
    }
  }
}
//asignamos metodo de windows tamaño
private isMobileDevice(): boolean {
  return window.innerWidth < 1100;
}


  private iniciarTemporizador() {
    this.timeoutEspacio = setTimeout(() => {
      this.tiempoColor = 'orange';
      // Realizar acciones adicionales si es necesario
    }, 500);
  }

  //metodo para añadir el cubo a la base de datos
  añadirCubo() {
    //console.log(this.tiempoTranscurrido);
    const usuario_json = {
      tiempo: this.tiempoTranscurrido,
      tiempoMilisegundos: this.obtenerMilisegundos(this.tiempoTranscurrido),
      mezcla: this.mezcla,
      token: localStorage.getItem('access_token')
    };
    this.tiempoCuboService.saveTiempoUser(usuario_json).subscribe(resp => {
    })

  }

  //metodo para obtener los milisegundos
  obtenerMilisegundos(tiempo: string): number {
    let minutos = 0;
    let segundos = 0;
    let milesimas = 0;
    //añadimos min, sec y milesimas con sus ceros correspondientes si llega o no
    if (tiempo.includes(":")) {
      const partes = tiempo.split(":");
      minutos = parseInt(partes[0]);
      const segundosParte = partes[1].split(".");
      segundos = parseInt(segundosParte[0]);
      milesimas = parseInt(segundosParte[1]);
    } else if (tiempo.includes(".")) {
      const partes = tiempo.split(".");
      if (partes.length === 2) {
        segundos = parseInt(partes[0]);
        milesimas = parseInt(partes[1]);
      } else if (partes.length === 3) {
        minutos = parseInt(partes[0]);
        segundos = parseInt(partes[1]);
        milesimas = parseInt(partes[2]);
      }
    } else {
      segundos = parseInt(tiempo);
    }

    const tiempoTotalMilisegundos = minutos * 60 * 1000 + segundos * 1000 + milesimas * 10;

    return tiempoTotalMilisegundos;
  }

  //metodo para pasar el tiempo a milisegundos para despues guardarlo en la base de datos
  convertirMilisegundosATiempo(milisegundos: number): string {
    if (milisegundos < 1000) {
      return (milisegundos / 1000).toFixed(2);
    } else if (milisegundos < 60000) {
      const segundos = Math.floor(milisegundos / 1000);
      const milesimas = Math.floor((milisegundos % 1000) / 10);
      if (segundos < 10) {
        return `${segundos},${milesimas.toString().padStart(2, "0")}`;
      } else {
        return `${segundos}.${milesimas.toString().padStart(2, "0")}`;
      }
    } else {
      const minutos = Math.floor(milisegundos / 60000);
      const segundos = Math.floor((milisegundos % 60000) / 1000);
      const milesimas = Math.floor((milisegundos % 1000) / 10);
      return `${minutos}:${segundos.toString().padStart(2, "0")}.${milesimas.toString().padStart(2, "0")}`;
    }
  }

  //metodo para obtener la lista de cubos del usuario
  getListaCubos() {
    const usuario_json = {
      token: localStorage.getItem('access_token')
    };
    //llamamos al servicio para obtener la lista
    this.tiempoCuboService.getCubeList(usuario_json).subscribe(resp => {
      this.tiempos = resp;
      //console.log(resp);
    })
  }

  //metod para iniciar la mezcla de rendercizado
  generarMezclaRender() {
    const element = document.getElementById('canvasScramble');
    if (element !== null) {
      element.innerHTML = '';
    }
    const cube = new Rubik2dRender();
    this.mezcla = cube.crearMezcla();
  }

  //metod para actualizar los tiempos
  private actualizarTiempo() {
    this.tiempoTranscurrido = this.cronometro.obtenerTiempoFormateado();
  }

  //metodo para actualizar los colores del cronometro segun su pulsacion de tiempo
  private actualizarColorTiempo() {
    const tiempoTranscurridoEspacio = Date.now() - this.tiempoInicioEspacio;
    if (tiempoTranscurridoEspacio > 1000) {
      this.tiempoColor = 'green';
    } else if (tiempoTranscurridoEspacio > 500) {
      this.tiempoColor = 'orange';
    } else {
      this.tiempoColor = 'red';
    }
  }

  //metodo para actualizar la lista de tiempo y añadirlos
  private actualizarListaTiempos() {
    let mili = this.obtenerMilisegundos(this.tiempoTranscurrido);
    this.tiempos.push({ tiempo: this.tiempoTranscurrido.toString(), tiempoMilisegundos: mili, mezcla: this.mezcla })  ;

    //console.log(this.tiempos + "A");
  }
  //metodo destruir suscripcion al cambiar de componente
  ngOnDestroy() {
    if (this.eventosTiempoSubscription) {
      this.eventosTiempoSubscription.unsubscribe();
      this.eventosTiempoSubscription = undefined;
    }
  }

  //metodo para calcular las medias de la tabla
  calcularMedia(tipo: number, index: number): string {
    if (tipo === 5) {
      if (index < 4) {
        return '-';
      }

      if (this.tiempos.length < 4) {
        this.ao12 = '-';
      }
      //de los ultimos 5
      const ultimosCinco = this.tiempos.slice(index - 4, index + 1); // Obtener los últimos 5 tiempos, incluyendo el actual
      ultimosCinco.sort((a, b) => a['tiempoMilisegundos'] - b['tiempoMilisegundos']); // Ordenar los tiempos de menor a mayor

      let media = 0;
      for (let i = 1; i < ultimosCinco.length - 1; i++) { // Ignorar el primer y último tiempo
        media += ultimosCinco[i]['tiempoMilisegundos'];
      }

      const mili = media / 3; // Calcular la media sobre los 3 tiempos restantes
      let aoCinco = '';

      if (index == this.tiempos.length - 1) {
        this.ao5 = `${this.convertirMilisegundosATiempo(mili)}`;
      }

      aoCinco = `${this.convertirMilisegundosATiempo(mili)}`;
      return aoCinco;
    }
    //de los ultimos 12
    if (tipo === 12) {

      if (index < 11) {
        return '-';
      }

      if (index == this.tiempos.length) {
        this.ao12 = '-';
      }
      const ultimosDoce = this.tiempos.slice(index - 11, index + 1); // Obtener los últimos 12 tiempos, incluyendo el actual
      ultimosDoce.sort((a, b) => a['tiempoMilisegundos'] - b['tiempoMilisegundos']); // Ordenar los tiempos de menor a mayor

      let media = 0;
      for (let i = 1; i < ultimosDoce.length - 1; i++) { // Ignorar el primer y último tiempo
        media += ultimosDoce[i]['tiempoMilisegundos'];
      }

      const mili = media / 10; // Calcular la media sobre los 10 tiempos restantes
      let ao12Return = '';

      if (index == this.tiempos.length - 1) {
        this.ao12 = `${this.convertirMilisegundosATiempo(mili)}`;
      }

      ao12Return = `${this.convertirMilisegundosATiempo(mili)}`;
      return ao12Return;
    }

    return '';
  }

  mostrarTiempos = true;
  mostrarScramble = true;
  mostrarMezcla = true;

  //metodo para toggle tiempo
  toggleTiempos() {
    this.mostrarTiempos = !this.mostrarTiempos;
  }
  //metodo para toggle scramble
  toggleScramble() {
    this.mostrarScramble = !this.mostrarScramble;
  }
  //metodo para toggle mezcla
  toggleMezcla() {
    this.mostrarMezcla = !this.mostrarMezcla;
  }
  scramble: string | undefined;
  //after view generar mezcla y render
  ngAfterViewInit(): void {

    this.generarMezclaRender();
  }

  
  isOverlayOpen = false;
  selectedElement: any;

  //metodo abrir overlay
  openOverlay(element: any) {
    this.isOverlayOpen = true;
    this.selectedElement = element;
  }
  //metodo cerrar overlay
  closeOverlay() {
    this.isOverlayOpen = false;
  }
  //metodo parar propagacion
  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
  //metodo borrar tiempos base de datos
  borrarTiempo(){
    let idTiempo = {
      idTiempo: this.tiempos[this.tiempos.length - this.selectedElement - 1]['idTiempo'],
      token: localStorage.getItem('access_token')
    };
    //llamamos a borrar lista de cubos
    this.tiempoCuboService.deleteCubeList(idTiempo).subscribe(resp => {
    })
    //cerramos el overlay
    this.tiempos.splice(this.tiempos.length - this.selectedElement - 1, 1);
    this.closeOverlay();
    
  }
  
}
