import { Component, ViewChild  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoguearService } from 'src/app/services/loguear.service';

declare function openNavbarAlgoritmos(): void;
@Component({
  selector: 'app-navbar-inicio',
  templateUrl: './navbar-inicio.component.html',
  styleUrls: ['./navbar-inicio.component.css']
})
export class NavbarInicioComponent {


  isMenuRespon = false;

  //constructor navbar
  constructor(private userService: LoguearService, private _snackBar: MatSnackBar) {

  }
  //referencai a los algoritmos
  @ViewChild(MatMenuTrigger) menuAlgoritmos!: MatMenuTrigger;
  onClick(): void {
    openNavbarAlgoritmos(); // Llamada a la función desde el archivo JavaScript externo
  }

  isDropdownOpen = false;
  //metodo para abrir algs
  showDropdownAlgs() {
    this.isDropdownOpen = true;
  }
  //metodo para cerrar algs menu
  hideDropdownAlgs() {
    this.isDropdownOpen = false;
  }
  //metodo para cerrar session
  cerrarSesion(){
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }
  //metodos para togglear menu
  toggleMenu():void{
    this.isMenuRespon = !this.isMenuRespon;
  }
  toggleMenuItems():void{
    if(this.isMenuRespon) this.isMenuRespon = false;
    //console.log(this.isMenuRespon);
  }

  //metodo para borrarUsuario
  borrarUser(){

    const usuario_json = {
      token: localStorage.getItem('access_token')
    };
    //llamamos al servicio
    this.userService.borrarUser(usuario_json).subscribe(resp => {
      //Mensaje error cuando no acertamos la contraseña o usuario
    this._snackBar.open('Eliminando Usuario...', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    setTimeout(() => {
      // Código a ejecutar después de 2 segundos
      this.cerrarSesion();
    }, 2000);
    this.cerrarSesion();
    })
    

    
  }

  //metodos parar abrir overlay o cerrarlo
  isOverlayOpen = false;
  selectedElement: any;

  openOverlay() {
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.isOverlayOpen = false;
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
