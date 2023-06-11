import { Component, ElementRef, HostListener, ViewChild  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoguearService } from 'src/app/services/loguear.service';


declare function openNavbarAlgoritmos(): void;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  //creacion variables y constructor
  isMenuRespon = false;


  constructor(private userService: LoguearService, private _snackBar: MatSnackBar) {

  }
  //creacion childs para dectectar los dropdows
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
@ViewChild('dropdownContent') dropdownContent!: ElementRef;

isDropdownOpen = false;
isMobileScreen = false;
//metodo para mostrar dropdowns
showDropdownAlgs() {
  this.isDropdownOpen = true;
}
//metodo para hidear dropdown
hideDropdownAlgs() {
  this.isDropdownOpen = false;
}
//metodo para hacer onclick en moviles
onClick() {
  if (this.isMobileScreen || window.innerWidth < 1100) {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
//metodo para cuando estamos encima de el dropdown en movil cambia a touch
onFocusout(event: FocusEvent) {
  if (this.isMobileScreen || window.innerWidth < 1100) {
    const dropdownContentElement = this.dropdownContent.nativeElement;
    if (!this.dropdownButton.nativeElement.contains(event.relatedTarget) && !dropdownContentElement.contains(event.relatedTarget)) {
      this.isDropdownOpen = false;
    }
  }
}
//metodo para detectar la ventana en resize
@HostListener('window:resize')
onWindowResize() {
  this.isMobileScreen = this.isMobileDevice();
}
//metodo para cuando estamos en movil
private isMobileDevice(): boolean {
  return window.innerWidth < 1100;
}
//metodo para cerrar session, elimina el token y hace logueo
  cerrarSesion(){
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }
//metodo para hacer toggle en el menu
  toggleMenu():void{
    this.isMenuRespon = !this.isMenuRespon;
  }
  //metodo para hacer toggle en el menu de items
  toggleMenuItems():void{
    if(this.isMenuRespon) this.isMenuRespon = false;
    //console.log(this.isMenuRespon);
  }
//metodo para borrar usuario en la parte de arriba, mandando el token
  borrarUser(){

    const usuario_json = {
      token: localStorage.getItem('access_token')
    };
    //llama al servicio y elimina el user
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
  //metodos parar abrir, cerrar y controlar la propagacion del mouse del overlay
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
