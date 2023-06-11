import { AfterViewInit, Component, AfterViewChecked, OnInit, OnDestroy  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import DOMPurify from 'dompurify';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements AfterViewChecked {

  //creacion de variables
  public loaded:string = 'principiante';
  public isButtonDisabled: boolean = true;
  constructor(public sanitizer: DomSanitizer) {
  }

  //lista de tutorial principiante
  public listaTutorial = {
    "principiante": [
      // videos para nivel principiante
      "https://www.youtube.com/embed/C-vvUglSqOQ",
      "https://www.youtube.com/embed/hdxM46M0Lls",
      "https://www.youtube.com/embed/6WQ-yQs15xU",
      "https://www.youtube.com/embed/fGHJ2i0CIq0",
      "https://www.youtube.com/embed/XkdAo2PBpEY",
      "https://www.youtube.com/embed/cRQzph68QJ4",
      "https://www.youtube.com/embed/VE1PG3mnoug"
    ],
    //lista avanzado medio
    "avanzado": [
      // videos para nivel avanzado
      "https://www.youtube.com/embed/PcUFnCvLFro",
      "https://www.youtube.com/embed/IRvrAKhf8Vc",
      "https://www.youtube.com/embed/kdvG7b5pogY",
      "https://www.youtube.com/embed/u32wtuI9gH0"
    ],
    //lista experto
    "experto": [
      // videos para nivel avanzado
    ]
      
  };
  //metodo afterview bloquear experto
  ngAfterViewChecked(): void {
    if (this.loaded === 'experto') {
      this.isButtonDisabled = false;
    }
  }
  //metodo detectar click para hacer videos
  handleClick(set: string) {
    this.loaded = set;
  }
}