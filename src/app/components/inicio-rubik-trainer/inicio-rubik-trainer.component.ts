import { Component,ElementRef,HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inicio-rubik-trainer',
  templateUrl: './inicio-rubik-trainer.component.html',
  styleUrls: ['./inicio-rubik-trainer.component.css']
})
export class InicioRubikTrainerComponent {

  //creacion imagenes carrusel web,tablet,movil
  carouselSlides = [
    // Agrega más objetos para cada imagen
    { src: 'assets/img/slider/webNormal/inicio.png', alt: 'Imagen Inicio Web', title: 'Imagen Inicio Web'},
    { src: 'assets/img/slider/webNormal/inicio2.png', alt: 'Imagen Inicio Web Prueba',title: 'Imagen Inicio Web Prueba' },
    { src: 'assets/img/slider/webNormal/timer.png', alt: 'Timer Prueba',title: 'Timer Prueba' },
    { src: 'assets/img/slider/webNormal/timer2.png', alt: 'Timer Eliminar/Guardar', title: 'Timer Eliminar/Guardar'},
    { src: 'assets/img/slider/webNormal/timer3.png', alt: 'Timer Configurado',title: 'Timer Configurado' },
    { src: 'assets/img/slider/webNormal/algoritmos1.png', alt: 'Algoritmos Visualización',title: 'Algoritmos Visualización' },
    { src: 'assets/img/slider/webNormal/algoritmos2.png', alt: 'Más Algoritmos', title: 'Más Algoritmos'},
    { src: 'assets/img/slider/webNormal/tutorial1.png', alt: 'Tutorial Básico',title: 'Tutorial Básico' },
    { src: 'assets/img/slider/webNormal/tutorial2.png', alt: 'Tutorial Medio',title: 'Tutorial Medio' }
  ];

  carouselSlidesSmall: any[] = [
    // Variable de imágenes para pantallas pequeñas (menos de 700px de ancho)
    // Agrega las imágenes correspondientes
    { src: 'assets/img/slider/webMovil/inicioWebMovil.png', alt: 'Imagen Inicio Web', title: 'Imagen Inicio Web'},
    { src: 'assets/img/slider/webMovil/inicio2WebMovil.png', alt: 'Imagen Inicio Web Prueba',title: 'Imagen Inicio Web Prueba' },
    { src: 'assets/img/slider/webMovil/timerMovil.png', alt: 'Timer Prueba',title: 'Timer Prueba' },
    { src: 'assets/img/slider/webMovil/timer2Movil.png', alt: 'Timer Eliminar/Guardar', title: 'Timer Eliminar/Guardar'},
    { src: 'assets/img/slider/webMovil/timer3Movil.png', alt: 'Timer Configurado',title: 'Timer Configurado'},
    { src: 'assets/img/slider/webMovil/algoritmos1Movil.png', alt: 'Algoritmos Visualización',title: 'Algoritmos Visualización' },
    { src: 'assets/img/slider/webMovil/algoritmos2Movil.png', alt: 'Más Algoritmos', title: 'Más Algoritmos'},
    { src: 'assets/img/slider/webMovil/tutorialMovil.png', alt: 'Tutorial Básico',title: 'Tutorial Básico'},
    { src: 'assets/img/slider/webMovil/tutorial2Movil.png', alt: 'Tutorial Medio',title: 'Tutorial Medio'}
  ];

  carouselSlidesMedium: any[] = [
    // Variable de imágenes para pantallas medianas (entre 700px y 900px de ancho)
    // Agrega las imágenes correspondientes
    { src: 'assets/img/slider/webTablet/inicioTablet.png', alt: 'Imagen Inicio Web', title: 'Imagen Inicio Web'},
    { src: 'assets/img/slider/webTablet/inicio2Tablet.png', alt: 'Imagen Inicio Web Prueba',title: 'Imagen Inicio Web Prueba' },
    { src: 'assets/img/slider/webTablet/timer1Tablet.png', alt: 'Timer Prueba',title: 'Timer Prueba' },
    { src: 'assets/img/slider/webTablet/timer2Tablet.png', alt: 'Timer Eliminar/Guardar', title: 'Timer Eliminar/Guardar'},
    { src: 'assets/img/slider/webTablet/algoritmos1Tablet.png', alt: 'Algoritmos Visualización',title: 'Algoritmos Visualización' },
    { src: 'assets/img/slider/webTablet/algoritmos2Tablet.png', alt: 'Más Algoritmos', title: 'Más Algoritmos'},
    { src: 'assets/img/slider/webTablet/tutorial1Tablet.png', alt: 'Tutorial Básico',title: 'Tutorial Básico'},
    { src: 'assets/img/slider/webTablet/tutorial2Tablet.png', alt: 'Tutorial Medio',title: 'Tutorial Medio'}
  ];

  ngOnInit() {
    // Inicializa el carrusel con las imágenes actuales
    this.carouselSlides = this.carouselSlides;
    this.slideWidth = window.innerWidth;
    this.startCarousel();
    this.updateCarouselSlides();
  }

  //si detecta resize cambia las imageners
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.updateCarouselSlides();
  }

  updateCarouselSlides() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 700) {
      // Pantalla pequeña (< 700px)
      this.carouselSlides = this.carouselSlidesSmall;
    } else if (screenWidth < 1200) {
      // Pantalla mediana (entre 700px y 900px)
      this.carouselSlides = this.carouselSlidesMedium;
    } else {
      // Pantalla grande (900px o más)
      this.carouselSlides = [
        // Variable de imágenes para pantallas grandes (900px o más)
        // Agrega las imágenes correspondientes
        // Agrega más objetos para cada imagen
    { src: 'assets/img/slider/webNormal/inicio.png', alt: 'Imagen Inicio Web', title: 'Imagen Inicio Web'},
    { src: 'assets/img/slider/webNormal/inicio2.png', alt: 'Imagen Inicio Web Prueba',title: 'Imagen Inicio Web Prueba' },
    { src: 'assets/img/slider/webNormal/timer.png', alt: 'Timer Prueba',title: 'Timer Prueba' },
    { src: 'assets/img/slider/webNormal/timer2.png', alt: 'Timer Eliminar/Guardar', title: 'Timer Eliminar/Guardar'},
    { src: 'assets/img/slider/webNormal/timer3.png', alt: 'Timer Configurado',title: 'Timer Configurado' },
    { src: 'assets/img/slider/webNormal/algoritmos1.png', alt: 'Algoritmos Visualización',title: 'Algoritmos Visualización' },
    { src: 'assets/img/slider/webNormal/algoritmos2.png', alt: 'Más Algoritmos', title: 'Más Algoritmos'},
    { src: 'assets/img/slider/webNormal/tutorial1.png', alt: 'Tutorial Básico',title: 'Tutorial Básico' },
    { src: 'assets/img/slider/webNormal/tutorial2.png', alt: 'Tutorial Medio',title: 'Tutorial Medio' }
      ];
    }
  }

  //busca el slider
  @ViewChild('sliderTrack', { static: true }) sliderTrack!: ElementRef;

  slideWidth: number = 0;
  currentIndex: number = 0;
  currentTranslateX: number = 0;
  dragging: boolean = false;
  startX: number = 0;
  interval: any;
paused: boolean = false;

  //inicia el carrusel
startCarousel() {
  this.interval = setInterval(() => {
    if (!this.paused) {
      this.nextSlide();
    }
  }, 4000);
}
//metodo toggle pausa al tocar
togglePause() {
  this.paused = !this.paused;
  if (!this.paused) {
    this.restartCarousel();
  }
}
//metodo reiniciear carrusel
restartCarousel() {
  clearInterval(this.interval);
  this.interval = setInterval(() => {
    if (!this.paused) {
      this.nextSlide();
    }
  }, 4000);
}
//metodo obtener slider tamaño
  getSlideStyle() {
    return {
      width: `${this.slideWidth}px`,
      transform: `translateX(${this.currentTranslateX}px)`
    };
  }
  //metodo pasar siguiente slider
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselSlides.length;
    this.currentTranslateX = -this.currentIndex * this.slideWidth;
  }

  //metodo anterior slider
  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselSlides.length) % this.carouselSlides.length;
    this.currentTranslateX = -this.currentIndex * this.slideWidth;
  }

  //metodo cuando empieza el avance solo
  onDragStart(event: any) {
    this.paused = true;
    clearInterval(this.interval);
    this.startX = event.touches ? event.touches[0].clientX : event.clientX;
    this.dragging = true;
  }

  //metodo para mover el slider
  onDragMove(event: any) {
    if (!this.dragging) return;

    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const distance = x - this.startX;
    this.currentTranslateX = -this.currentIndex * this.slideWidth + distance;

    this.sliderTrack.nativeElement.style.transform = `translateX(${this.currentTranslateX}px)`;
  }

  //metodo para acabar el slider y avanzar al siguiente
  onDragEnd(event: any) {
    this.paused = false;
    
    this.dragging = false;

    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
    const distance = x - this.startX;
    const threshold = this.slideWidth / 2;

    //calcula distancias
    if (Math.abs(distance) >= threshold) {
      if (distance > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    }

    this.currentTranslateX = -this.currentIndex * this.slideWidth;

    this.sliderTrack.nativeElement.style.transition = 'transform 0.5s ease';
    this.sliderTrack.nativeElement.style.transform = `translateX(${this.currentTranslateX}px)`;

    this.startCarousel();
  }

  preventDrag(event: Event) {
    event.preventDefault();
  }
}
