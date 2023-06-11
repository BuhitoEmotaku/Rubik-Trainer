import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlgoritmosService } from 'src/app/services/algoritmos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-algoritmos',
  templateUrl: './algoritmos.component.html',
  styleUrls: ['./algoritmos.component.css']
})

export class AlgoritmosComponent implements OnInit, AfterViewInit, OnDestroy {


  //constructor y variables
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private algoritmoService: AlgoritmosService) {
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
  //metodo para propagacion del evento
  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
  //creacion variables
  displayedColumns: string[] = ['case', 'imgAlg', 'alg'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChildren('algHidden') algHiddenElements!: QueryList<ElementRef<HTMLInputElement>>;

  //metodo after
  ngAfterViewInit() {

  }
  //metodo on init inicio para recibir los algorimos
  parametro: any = '';
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.parametro = params.get('parametro');
      const sendAlg = {
        id_algoritmo: this.parametro
      }
      // Aquí puedes utilizar el valor del parámetro como desees
      this.algoritmoService.obtenerAlgoritmos(sendAlg).subscribe(resp => {
        //console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;

        this.loadTwistyPlayers(); // Llama al método aquí
      });
    });

    //metodo para meter el script de twitsty Cube
    const scriptElement = document.getElementById('scriptCuboCreator') as HTMLScriptElement;
    if (scriptElement) {
      const parentElement = scriptElement.parentNode;
      if (parentElement) parentElement.removeChild(scriptElement);
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.id = 'scriptCuboCreator'
    script.src = 'https://cdn.cubing.net/js/cubing/twisty';
    document.body.appendChild(script);

  }
  //metodo para destruir suscriptciones
  ngOnDestroy(): void {
    if (this.routerSubscription && !this.routerSubscription.closed) {
      this.routerSubscription.unsubscribe();
    }
  }
  //Metodo para resetear componentes
  resetComponentState(): void {
    // Código para reiniciar el componente aquí
    //console.log("hol")
    this.loadTwistyPlayers();
  }

  //metodos para crear twisty player e insertarlos
  loadTwistyPlayers(): void {
    setTimeout(() => {
      const algHiddenElements = document.getElementsByClassName('algHidden');
      //console.log(algHiddenElements);
      for (let i = 0; i < algHiddenElements.length; i++) {
        const algHiddenElement = algHiddenElements.item(i) as HTMLInputElement;
        const alg = algHiddenElement.value; // Obtiene el valor del atributo "value"
        //console.log(alg);
        if (alg) {
          const twistyPlayer = document.createElement('twisty-player');
          twistyPlayer.setAttribute('alg', alg);
          twistyPlayer.setAttribute('experimental-setup-anchor', 'end');
          twistyPlayer.setAttribute('visualization', 'experimental-2D-LL');
          twistyPlayer.setAttribute('background', 'none');
          twistyPlayer.setAttribute('control-panel', 'none');
          const parentElement = algHiddenElements[i].parentElement;
          if (parentElement) {
            parentElement.appendChild(twistyPlayer);
          }
        }
      }
    }, 500);
  }
  
}