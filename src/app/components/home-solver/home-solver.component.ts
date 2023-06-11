import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as solver from 'rubiks-cube-solver';
import { Alg } from "cubing/alg";
import { KociembaSolutionService } from 'src/app/services/kociemba-solution.service';
import { Cube } from '../dashboard/timer/rbk3d-component/rubik';
import { SaveCubeService } from 'src/app/services/save-cube.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-solver',
  templateUrl: './home-solver.component.html',
  styleUrls: ['./home-solver.component.css']
})
export class HomeSolverComponent implements AfterViewInit, OnInit, OnDestroy {

  //creacion variables
  newSolves: boolean = true;

  valueCara: string = '';
  strSolu: string[] = ['', ''];
  strCross: string[] = ['', ''];
  strF2L1: string[] = ['', ''];
  strF2L2: string[] = ['', ''];
  strF2L3: string[] = ['', ''];
  strF2L4: string[] = ['', ''];
  strOLL: string[] = ['', ''];
  strPLL: string[] = ['', ''];

  scrambleRand: boolean = false;
  checkKociemba = false;
  newColorPartitioned: string[] = ['verde', 'blanco', 'rojo', 'amarillo', 'naranja', 'azul'];
  newColorTwoPhase: string[] = ['rojo', 'blanco', 'verde', 'amarillo', 'naranja', 'azul'];

  options: string[] = ['Cara Blanca', 'Cara Amarilla', 'Cara Roja', 'Cara Naranja', 'Cara Verde', 'Cara Azul'];
  cubeList: string[] = [];
  cubeListBoolean: boolean = false;
  optionsMano: string[] = ['Diestra', 'Zurda'];
  tipoMano: string = "Diestra";
  selectedOption: any;
  selectedOptionList: any;
  element: any;



  //metodo para crear random cube
  scrambleRandCube() {
    const cubeObj = new Cube();
    let [rubikCube, secuenciaMovimientos]: any = cubeObj.iniciar(cubeObj);
    //console.log(secuenciaMovimientos);
    let modifiedScr: string = rubikCube.join().replace(/,/g, '');
    const parts: string[] = [];
    // Verificar si el string se puede dividir en partes de 9 letras
    if (modifiedScr.length % 9 !== 0) {
      //console.log("El string no se puede dividir en partes de 9 letras.");
    } else {
      // Dividir el string en partes de 9 letras

      for (let i = 0; i < modifiedScr.length; i += 9) {
        parts.push(modifiedScr.substr(i, 9));
      }

    }



    let colorOrd = '';
    // let cubeState = [  
    //     'fffffffbf', // front
    //     'rrrrrrrlr', // right  
    //     'uuuuuuuuu', // up  
    //     'ddddddddd', // down  
    //     'lllllllrl', // left  
    //     'bbbbbbbfb' // back
    //     ].join('');

    //ordenar colores
    const lastNineLetters: string = parts[5];
    const newOrder: number[][] = [
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7]
    ];


    let modifiedString: string = "";

    //cerear colores en bucle

    for (let i = 0; i < newOrder.length; i++) {
      for (let j = 0; j < newOrder[i].length; j++) {
        const index = newOrder[i][j] - 1;
        modifiedString += lastNineLetters[index];
      }
    }

    //guardar en array y remplazar
    const newRand: string[] = [parts[1], parts[2], parts[3], parts[0], parts[4], modifiedString];
    // const newRand: string[] = [parts[3],parts[0],parts[1],modifiedString,parts[2],parts[4]];
    const stringRnd: string = newRand.join('');
    const strScr: string = stringRnd
      .replace(/w/g, 'u')
      .replace(/g/g, 'f')
      .replace(/r/g, 'r')
      .replace(/o/g, 'l')
      .replace(/b/g, 'b')
      .replace(/y/g, 'd');


    // LO DE ARRIBA GENERA BIEN EL SEGUIMIENTO PARA EJECUTAR PERO AHORA HAY QUE CAMBIAR EL ORDEN PARA LOS COLORES Y PINTARLOS
    const parts2: string[] = [];
    // Verificar si el string se puede dividir en partes de 9 letras
    if (modifiedScr.length % 9 !== 0) {
      //console.log("El string no se puede dividir en partes de 9 letras.");
    } else {
      // Dividir el string en partes de 9 letras

      for (let i = 0; i < modifiedScr.length; i += 9) {
        parts2.push(modifiedScr.substr(i, 9));
      }

    }

    const arrFin = [parts2[1], parts2[2], parts2[3], parts2[0], parts2[4], parts2[5]].join('');
    // Mapeo de letras a colores

    const strScrGOD: string = arrFin
      .replace(/w/g, 'u')
      .replace(/g/g, 'f')
      .replace(/r/g, 'r')
      .replace(/o/g, 'l')
      .replace(/b/g, 'b')
      .replace(/y/g, 'd');

    this.colorearCubo(strScr);

  }
  //colores standar
  colorearCubo(strScr) {
    var coloresLetras = {
      r: "#ff0000",
      f: "#00ff00",
      b: "#0927ff",
      u: "#ffffff",
      d: "#ffff00",
      l: "#ff7509"
    };

    // Iterar sobre los números del 1 al 54
    for (var i = 1; i <= 54; i++) {
      var pieza = document.getElementById("color" + i);

      // Verificar si se encontró el elemento con el ID correspondiente
      if (pieza) {
        var letra = strScr[i - 1];

        // Verificar si la letra existe en el mapeo
        if (letra in coloresLetras) {
          pieza.style.backgroundColor = coloresLetras[letra];
        }
      }
    }
  }
  //metodo para elegir el cubo de la lista
  onElegirCuboLista(event: any) {
    const selectedValue = event.value;
    if (selectedValue) {
      this.selectedOptionList = selectedValue;
      // LO DE ARRIBA GENERA BIEN EL SEGUIMIENTO PARA EJECUTAR PERO AHORA HAY QUE CAMBIAR EL ORDEN PARA LOS COLORES Y PINTARLOS
      const parts2: string[] = [];
      // Verificar si el string se puede dividir en partes de 9 letras
      if (this.selectedOptionList.length % 9 !== 0) {
        //console.log("El string no se puede dividir en partes de 9 letras.");
      } else {
        // Dividir el string en partes de 9 letras

        for (let i = 0; i < this.selectedOptionList.length; i += 9) {
          parts2.push(this.selectedOptionList.substr(i, 9));
        }

      }

      const arrFin = [parts2[2], parts2[4], parts2[0], parts2[1], parts2[5], parts2[3]].join('');
      this.colorearCubo(arrFin);

      // Guardar el valor en una variable adicional si es necesario
      // this.otraVariable = selectedValue;
    }
  }
  //metodo para alerta error
  errorMezla(error: string) {
    //Mensaje error cuando no acertamos la contraseña o usuario
    this._snackBar.open(error, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }
  //metodo para detectar el cambio de valor de cubo
  onOptionChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue) {
      this.selectedOption = selectedValue;
      // Guardar el valor en una variable adicional si es necesario
      // this.otraVariable = selectedValue;
    }
  }

  //metodo para detectar el cambio de valor en mano
  onOptionChangeMano(event: any) {
    const selectedValue = event.value;
    if (selectedValue) {
      this.tipoMano = selectedValue;
      // Guardar el valor en una variable adicional si es necesario
      // this.otraVariable = selectedValue;
    }
  }

  //metodo afterview cargado
  ngAfterViewInit() {
    this.element = document.getElementById('twistyVisu');
  }

  ///metodo para obtener kociemba solve
  kociembaSolve() {

    let cubeState = this.createColorPattern(this.newColorTwoPhase);
    cubeState = cubeState.toUpperCase();
    const kzAlg = {
      patternAlg: cubeState,
    };
    //llamamos al servicio para obtener el algoritmo
    this.kociembaService.obtenerAlgoritmos(kzAlg).subscribe(algKZResp => {

      if(algKZResp == false){
        this.errorMezla('Mezcla Errónea, compruébela por favor!')
        return
      }
      this.errorMezla('Solución creada con éxito!')
        // Se ejecuta cuando se recibe una respuesta exitosa
        // Realiza las operaciones necesarias con la respuesta aquí
        // const kociembaClearALG = trimScrambleKociemba(clearScrambleKociemba(algKZResp));
      // console.log(kociembaClearALG)
      this.checkKociemba = true;
      this.crearAlg(algKZResp);
      this.strCross = ['', ''], this.strF2L1 = ['', ''], this.strF2L2 = ['', ''], this.strF2L3 = ['', ''], this.strF2L4 = ['', ''], this.strOLL = ['', ''], this.strPLL = ['', ''];
      this.checkKociemba = false;

      //no usado!
      function clearScrambleKociemba(input: string): string {
        const removedOnes = input.replace(/1/g, '');
        const replacedThrees = removedOnes.replace(/3/g, "'");
        return replacedThrees;
      }

      function trimScrambleKociemba(input: string): string {
        const parts = input.split(' ');
        const trimmedString = parts.slice(0, -1).join(' ');
        return trimmedString;
      }
    }
    )

  }

  //metodo para apagar visualizador y encender con nueva mezcla
  fadeOutAndIn(element: HTMLElement, algs: any) {
    element.style.opacity = '1';

    const fadeOut = setTimeout(() => {
      let opacity = 1;
      const decreaseOpacity = () => {
        opacity -= 0.05; // Disminuye en 0.05 en lugar de 0.01
        element.style.opacity = opacity.toString();

        if (opacity > 0) {
          setTimeout(decreaseOpacity, 5); // Espera de 5 milisegundos en lugar de 1
        } else {
          fadeIn();
        }
      };

      decreaseOpacity();
    }, 0);


    //metodo para que pararezca la nueva mezcla con sus nuevos atributos
    function fadeIn() {
      element.setAttribute('alg', algs[0]);
      element.setAttribute('experimental-setup-alg', algs[1]);
      setTimeout(() => {
        let opacity = 0;
        element.style.opacity = opacity.toString();

        const increaseOpacity = () => {
          opacity += 0.05; // Aumenta en 0.05 en lugar de 0.01
          element.style.opacity = opacity.toString();

          if (opacity < 1) {
            setTimeout(increaseOpacity, 5); // Espera de 5 milisegundos en lugar de 1
          }
        };

        increaseOpacity();
      }, 250); // Espera de 250 milisegundos en lugar de 100
    }
  }


  //metodo para meter la solucion al visualizador
  actsoluCompl() {

    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strSolu);
    }
  }

  //metodo para conseguir cruz
  actCROSS() {
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strCross);
    }

  }
//metodo para conseguir f2l
  //CHECKKKKKKKKKKKKKKKKKKKKK
  actF2L1() {
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strF2L1);
    }
  }
  //metodo para conseguir f2l
  actF2L2() {
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strF2L2);
    }
  }
  //metodo para conseguir f2l
  actF2L3() {
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strF2L3);
    }
  }
  //metodo para conseguir f2l
  actF2L4() {
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strF2L4);
    }
  }

  actOLL() {
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strOLL);
    }
  }
//metodo para conseguir oll
  actPLL() {
    const element = document.getElementById('twistyVisu');
    if (this.element !== null) {
      this.fadeOutAndIn(this.element, this.strPLL);

    }

  }
//no se usa!
  modificarCaraSolución(rotacionX2, check) {

  }

//constructor con todo lo necesario para el iniciod el componente
  constructor(private kociembaService: KociembaSolutionService, private cubeSaveService: SaveCubeService, private _snackBar: MatSnackBar) {
    this.selectedOptionList = this.cubeList[0];
    this.selectedOption = this.options[0]; // Establecer la primera opción como seleccionada inicialmente
    const scriptElement = document.getElementById('scriptCuboCreator') as HTMLScriptElement;
    //inserccion twisty visualizador
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


  //metodo on init iniciamos colores
  ngOnInit(): void {
    this.selectedOptionList = this.cubeList[0]
    window.addEventListener('click', this.handleClick);
    const colors = document.querySelectorAll<HTMLElement>('.color');
    const target = document.getElementById('target') as HTMLElement;
    colors.forEach(color => {
      color.addEventListener('click', () => {
        target.style.backgroundColor = color.style.backgroundColor;
      });
    });

    // Agregar la etiqueta al elemento padre

    const contenedor = document.querySelector('.main2');
    if (contenedor) {
      const newDiv = document.createElement("div"); // Crear el nuevo elemento div
      newDiv.classList.add("twisty"); // Añadir la clase "mi-clase-especifica" al nuevo elemento div

      // Crear la etiqueta twisty-player
      let twistyPlayer = document.createElement('twisty-player');
      twistyPlayer.setAttribute('id', "twistyVisu");
      twistyPlayer.setAttribute('alg', '');
      twistyPlayer.setAttribute('experimental-setup-alg', '');
      twistyPlayer.setAttribute('camera-direction', "1");
      newDiv.appendChild(twistyPlayer); // Añadir el nuevo elemento hijo al nuevo elemento div
      contenedor.appendChild(newDiv);

    }
    //iniciamos lista, colores y cubo
    this.detectorColores();
    this.crearAlg("");
    this.crearListaCubes();
  }
  //metodo al salir componente romper datos
  ngOnDestroy(): void {
    window.removeEventListener('click', this.handleClick);
    const script = document.querySelector('script[src="ruta-del-script.js"]');
    if (script) {
      document.head.removeChild(script);
    }
  }
  //metodo para cuando coloreamos cambiar datos de styles
  handleClick = (e: MouseEvent) => {
    const target = document.getElementById('target') as HTMLElement;
    const targetElement = e.target as HTMLElement;
    if (targetElement.classList.contains('piece') && targetElement.id != null && targetElement.id !== "" && targetElement.id != "color50"
      && targetElement.id != "color41" && targetElement.id != "color32" && targetElement.id != "color23"
      && targetElement.id != "color14" && targetElement.id != "color5") {
      const el = document.getElementById(targetElement.id);
      if (el) {
        el.style.backgroundColor = target.style.backgroundColor;
      }
    }
  }
//metodo para detectar colores
  detectorColores() {
    const colors = document.querySelectorAll<HTMLElement>('.color');
    const target = document.getElementById('target') as HTMLElement;
    colors.forEach(color => {
      color.addEventListener('click', () => {
        target.style.backgroundColor = color.style.backgroundColor;
      });
    });
  }
  //metodo para guardar el estado del cubo y crear patron en la base de datos
  guardarCubeState() {
    let patternGuardar = this.createColorPattern(this.newColorPartitioned);
    if (!this.cubeList.includes(patternGuardar)) {
      this.cubeList.push(patternGuardar);
      if (this.cubeList.length > 1) this.cubeListBoolean = true;
      const cube_json = {
        cubeColor: patternGuardar,
        token: localStorage.getItem('access_token')
      };
      //llamamos al servicio para guardar patron
      this.cubeSaveService.saveCube(cube_json).subscribe(resp => {
        this.selectedOptionList = this.cubeList[this.cubeList.length - 1]
      })
    } else {
      // error
    }

  }
  //metodo para borrar cubo de la lista
  borrarCubo() {
    
    // Find the index of the string in the array
    let index = this.cubeList.findIndex(item => item === this.selectedOptionList);
    //console.log(index);

// Remueve el string del array y añade uno nuevo
if (index !== -1) {
  this.cubeList.splice(index, 1);
}

//console.log(this.cubeList.length);
    if (this.cubeList.length == 1){
      //console.log("sfdAAAAAAAAAAAA");
      if(this.cubeList.includes('fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb')){
        //console.log("sfdAAAAAAAAAAAA");
        this.cubeListBoolean = false;
      }else {
        this.cubeList.unshift('fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb');
        this.colorearCubo('uuuuuuuuulllllllllfffffffffrrrrrrrrrbbbbbbbbbddddddddd');
      }
      
      
      
    }
    else if (this.cubeList.length > 1 && this.cubeList.includes('fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb')){
      this.cubeListBoolean = true;
    } 
else {
  this.cubeList.unshift('fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb');
}
//console.log(this.cubeList);
const cube_json = {
  cubeColor: this.selectedOptionList,
  token: localStorage.getItem('access_token')
};

this.cubeSaveService.deleteCube(cube_json).subscribe(resp => {
  
})
this.selectedOptionList = this.cubeList[0];
if(this.cubeListBoolean){
  const parts2: string[] = [];
  // Verificar si el string se puede dividir en partes de 9 letras
  if (this.selectedOptionList.length % 9 !== 0) {
    //console.log("El string no se puede dividir en partes de 9 letras.");
  } else {
    // Dividir el string en partes de 9 letras

    for (let i = 0; i < this.selectedOptionList.length; i += 9) {
      parts2.push(this.selectedOptionList.substr(i, 9));
    }

  }

  const arrFin = [parts2[2], parts2[4], parts2[0], parts2[1], parts2[5], parts2[3]].join('');
//console.log(this.cubeList);
this.colorearCubo('uuuuuuuuulllllllllfffffffffrrrrrrrrrbbbbbbbbbddddddddd');


}else{
  this.colorearCubo('uuuuuuuuulllllllllfffffffffrrrrrrrrrbbbbbbbbbddddddddd');
}

  }
//metodo para crear lista de cubos
crearListaCubes()
{
  const usu = {
    token: localStorage.getItem('access_token')
  };
  //llamamos al servicio
  this.cubeSaveService.getCubeList(usu).subscribe(resp => {
    this.cubeList = resp;
    // Insertar el elemento al inicio del array
    this.cubeList.unshift('fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb');
    if (this.cubeList.length == 1 && !this.cubeList.includes('fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb')) this.cubeListBoolean = true;
    else if (this.cubeList.length > 1) this.cubeListBoolean = true;
    else this.cubeListBoolean = false;
    this.selectedOptionList = this.cubeList[0];
  })

}

//metodo para crear patron de colores
createColorPattern(newColorPartitioned) {
  const colores: { [key: string]: string } = { "#ff0000": "r", "#00ff00": "f", "#ff7509": "l", "#0927ff": "b", "#ffff00": "d", "#ffffff": "u" };
  let total = "";
  for (let i = 1; i < 55; i++) {
    const miElemento = document.getElementById(`color${i}`);
    if (miElemento) {
      const valorBG = window.getComputedStyle(miElemento).getPropertyValue("background-color");
      const rgbArray = valorBG.replace(/[^\d,]/g, "").split(",");
      const hexValue = "#" + ((1 << 24) + (parseInt(rgbArray[0]) << 16) + (parseInt(rgbArray[1]) << 8) + parseInt(rgbArray[2])).toString(16).slice(1);
      total += colores[`${hexValue}`];
    }
  }


  //IMPORTANTEEEEEconsole.log('SOLVER?', solver); // see what we actually imported

  const originalString = total;
  //colores
  const colorOrder = ['rojo', 'naranja', 'verde', 'blanco', 'azul', 'amarillo'];
  let cubeState = '';

  // Iterar sobre el nuevo orden de los colores
  newColorPartitioned.forEach((color) => {
    // Encontrar el índice del color en el array original
    const index = colorOrder.indexOf(color);
    // Obtener la subcadena correspondiente
    const subString = originalString.substr(index * 9, 9);
    // Agregar la subcadena al nuevo string
    cubeState += subString;
  });
  return cubeState
}

checkVez:number = 0
//metodo para crear algoritmo
crearAlg(kociemba) {

  let cubeState = this.createColorPattern(this.newColorPartitioned);
  if (this.scrambleRand) {
    this.scrambleRand = false;
    cubeState = kociemba;

  }
  let solveMoves;

  try {
    // let cubeState = [  
  //     'fffffffbf', // front
  //     'rrrrrrrlr', // right  
  //     'uuuuuuuuu', // up  
  //     'ddddddddd', // down  
  //     'lllllllrl', // left  
  //     'bbbbbbbfb' // back
  //     ].join('');
  //metodo que da la soluciion FRIDRICH
  solveMoves = solver.default(cubeState, { partitioned: true }); // note the call to default, I logged what rubiks was to find this out...  
  } catch (error) {
    // Manejo del error
    this.errorMezla('Mezcla Errónea, compruébela por favor!')
    return
  }
  //creacion de particionado de solucion en variables
  if(this.checkVez != 0) this.errorMezla('Solución creada con éxito!')
  this.checkVez++;
  let solu = "";
  let cross = "";
  let f2l1 = "";
  let f2l2 = "";
  let f2l3 = "";
  let f2l4 = "";
  let oll = "";
  let pll = "";

  //asigancion de particionado
  let arraysolu = [solveMoves.cross[0], solveMoves.cross[1], solveMoves.cross[2], solveMoves.cross[3],
  solveMoves.f2l[0], solveMoves.f2l[1], solveMoves.f2l[2], solveMoves.f2l[3],
  solveMoves.oll, solveMoves.pll];

  let crossolu = [solveMoves.cross[0], solveMoves.cross[1], solveMoves.cross[2], solveMoves.cross[3]];
  let f2lsolu1 = [solveMoves.f2l[0]];
  let f2lsolu2 = [solveMoves.f2l[1]];
  let f2lsolu3 = [solveMoves.f2l[2]];
  let f2lsolu4 = [solveMoves.f2l[3]];
  let ollsolu = [solveMoves.oll];
  let pllsolu = [solveMoves.pll];

//conversion a string
  for (let i = 0; i < arraysolu.length; i++) {
    if (arraysolu[i] != "") {
      solu += " " + arraysolu[i];
    }
    if (crossolu[i] != "") {
      cross += " " + crossolu[i];
    }
    if (f2lsolu1[i] != "") {
      f2l1 += " " + f2lsolu1[i];
    }
    if (f2lsolu2[i] != "") {
      f2l2 += " " + f2lsolu2[i];
    }
    if (f2lsolu3[i] != "") {
      f2l3 += " " + f2lsolu3[i];
    }
    if (f2lsolu4[i] != "") {
      f2l4 += " " + f2lsolu4[i];
    }
    if (ollsolu[i] != "") {
      oll += " " + ollsolu[i];
    }
    if (pllsolu[i] != "") {
      pll += " " + pllsolu[i];
    }
  }
//intercambio de prime o PRIME por '

  let newSolu = solu.replace(/prime/g, "'").trim();
  let newcrossolu = cross.replace(/prime/g, "'").trim();
  let newf2lsolu1 = f2l1.replace(/prime/g, "'").trim();
  let newf2lsolu2 = f2l2.replace(/prime/g, "'").trim();
  let newf2lsolu3 = f2l3.replace(/prime/g, "'").trim();
  let newf2lsolu4 = f2l4.replace(/prime/g, "'").trim();
  let newollsolu = oll.replace(/prime/g, "'").trim();
  let newpllsolu = pll.replace(/prime/g, "'").trim();


  newSolu = newSolu.replace(new RegExp('PRIME', "gi"), "");
  newcrossolu = newcrossolu.replace(new RegExp('PRIME', "gi"), "");
  newf2lsolu1 = newf2lsolu1.replace(new RegExp('PRIME', "gi"), "");
  newf2lsolu2 = newf2lsolu2.replace(new RegExp('PRIME', "gi"), "");
  newf2lsolu3 = newf2lsolu3.replace(new RegExp('PRIME', "gi"), "");
  newf2lsolu4 = newf2lsolu4.replace(new RegExp('PRIME', "gi"), "");
  newollsolu = newollsolu.replace(new RegExp('PRIME', "gi"), "");
  newpllsolu = newpllsolu.replace(new RegExp('PRIME', "gi"), "");

//particionado de cada uno
//console.log(arraysolu);
  if (this.checkKociemba) newSolu = kociemba
  // let arrScramble = newSolu.split(" ");
  let arrSolu = newSolu.split(" ");

  //let arrScrambleCross = newcrossolu.split(" ");
  let arrSoluCross = newcrossolu.split(" ");

  //let arrScrambleF2l1 = newf2lsolu1.split(" ");
  let arrSoluF2l1 = newf2lsolu1.split(" ");

  //let arrScrambleF2l2 = newf2lsolu2.split(" ");
  let arrSoluF2l2 = newf2lsolu2.split(" ");

  //let arrScrambleF2l3 = newf2lsolu3.split(" ");
  let arrSoluF2l3 = newf2lsolu3.split(" ");

  //let arrScrambleF2l4 = newf2lsolu4.split(" ");
  let arrSoluF2l4 = newf2lsolu4.split(" ");

  //let arrScrambleOLL = newollsolu.split(" ");
  let arrSoluOLL = newollsolu.split(" ");

  //let arrScramblePLL = newpllsolu.split(" ");
  let arrSoluPLL = newpllsolu.split(" ");

//creacion de letras segun la cara, creacion de rotaciones
  //Convertir rotación
  var rotacionBlanca = {
    "R": "L", "L": "R",
    "R'": "L'", "L'": "R'",
    "U": "D", "D": "U",
    "U'": "D'", "D'": "U'",
    "R2": "L2", "L2": "R2",
    "U2": "D2", "D2": "U2",
    "E": "E'", "E'": "E",
    "M": "M'", "M'": "M",
    "r": "l", "l": "r",
    "r'": "l'", "l'": "r'",
    "u": "d", "d": "u",
    "u'": "d'", "d'": "u'",
    "r2": "l2", "l2": "r2",
    "u2": "d2", "d2": "u2",
  };


  this.modificarCaraSolución(this.valueCara, arrSoluPLL);
//rotacion a la cara blanca estandarizado

  for (let i = 0; i < arrSolu.length; i++) {
    if (arrSolu[i] in rotacionBlanca) {
      arrSolu[i] = rotacionBlanca[arrSolu[i]];
    }
  }


  for (let i = 0; i < arrSoluCross.length; i++) {
    if (arrSoluCross[i] in rotacionBlanca) {
      arrSoluCross[i] = rotacionBlanca[arrSoluCross[i]];
    }
  }


  for (let i = 0; i < arrSoluF2l1.length; i++) {
    if (arrSoluF2l1[i] in rotacionBlanca) {
      arrSoluF2l1[i] = rotacionBlanca[arrSoluF2l1[i]];
    }
  }


  for (let i = 0; i < arrSoluF2l2.length; i++) {
    if (arrSoluF2l2[i] in rotacionBlanca) {
      arrSoluF2l2[i] = rotacionBlanca[arrSoluF2l2[i]];
    }
  }


  for (let i = 0; i < arrSoluF2l3.length; i++) {
    if (arrSoluF2l3[i] in rotacionBlanca) {
      arrSoluF2l3[i] = rotacionBlanca[arrSoluF2l3[i]];
    }
  }


  for (let i = 0; i < arrSoluF2l4.length; i++) {
    if (arrSoluF2l4[i] in rotacionBlanca) {
      arrSoluF2l4[i] = rotacionBlanca[arrSoluF2l4[i]];
    }
  }


  for (let i = 0; i < arrSoluOLL.length; i++) {
    if (arrSoluOLL[i] in rotacionBlanca) {
      arrSoluOLL[i] = rotacionBlanca[arrSoluOLL[i]];
    }
  }


  for (let i = 0; i < arrSoluPLL.length; i++) {
    if (arrSoluPLL[i] in rotacionBlanca) {
      arrSoluPLL[i] = rotacionBlanca[arrSoluPLL[i]];
    }
  }


  let scrambleMod = newSolu;
  let scrambleModCross = newcrossolu;
  let scrambleModF2l1 = newf2lsolu1;
  let scrambleModF2l2 = newf2lsolu2;
  let scrambleModF2l3 = newf2lsolu3;
  let scrambleModF2l4 = newf2lsolu4;
  let scrambleModOLL = newollsolu;
  let scrambleModPLL = newpllsolu;


  let rotacion = '';
  let rotationMapping;

//creacion rotacion de la solucion a mano zurda
  let tipoManoLetters = {
    "R": "L'", "R'": "L",
    "L": "R'", "L'": "R",
    "U": "U'", "U'": "U",
    "D'": "D", "D": "D'",
    "F": "F'", "F'": "F",
    "B": "B'", "B'": "B",
    "E": "E'", "E'": "E",
    "S": "S'", "S'": "S'",
    "R2": "L2", "L2": "R2",
    "r": "l'", "r'": "l",
    "l": "r'", "l'": "r",
    "d": "d'", "d'": "d",
    "u": "u'", "u'": "u",
    "f": "f'", "f'": "f",
    "b": "b'", "b'": "b",
    "r2": "l2", "l2": "r2"
  };

//retorno de caras rotadas para la elegida
  switch (this.selectedOption) {
    case 'Cara Amarilla':
      rotationMapping = {
        "R": "L", "L": "R",
        "R'": "L'", "L'": "R'",
        "U": "D", "D": "U",
        "U'": "D'", "D'": "U'",
        "R2": "L2", "L2": "R2",
        "U2": "D2", "D2": "U2",
        "r": "l", "l": "r",
        "r'": "l'", "l'": "r'",
        "u": "d", "d": "u",
        "u'": "d'", "d'": "u'",
        "r2": "l2", "l2": "r2",
        "u2": "d2", "d2": "u2",
        "M": "M'", "M'": "M",
        "E": "E'", "E'": "E"
      }
      rotacion = "z2";
      break;
    // Código para el caso 'Cara Amarilla'
    case 'Cara Naranja':
      // Código para el caso 'Cara Roja'
      //Convertir rotación
      rotationMapping = {
        "R": "U", "R'": "U'",
        "U": "L", "U'": "L'",
        "D": "R", "D'": "R'",
        "L": "D", "L'": "D'",
        "R2": "U2", "L2": "D2",
        "U2": "L2", "D2": "R2",
        "M": "E", "M'": "E'",
        "E": "M'", "E'": "M",
        "M2": "E2", "E2": "M2",
        "r": "u", "r'": "u'",
        "u": "l", "u'": "l'",
        "d": "r", "d'": "r'",
        "l": "d", "l'": "d'",
        "r2": "u2", "l2": "d2",
        "u2": "l2", "d2": "r2"
      };
      rotacion = "z";
      break;
    case 'Cara Roja':
      // Código para el caso 'Cara Naranja'
      //Convertir rotación
      rotationMapping = {
        "R": "D", "R'": "D'",
        "L": "U", "L'": "U'",
        "U": "R", "U'": "R'",
        "D": "L", "D'": "L'",
        "M": "E'", "M'": "E",
        "E": "M", "E'": "M'",
        "R2": "D2", "L2": "U2",
        "U2": "R2", "D2": "L2",
        "M2": "E2", "E2": "M2",
        "r": "d", "r'": "d'",
        "l": "u", "l'": "u'",
        "u": "r", "u'": "r'",
        "d": "l", "d'": "l'",
        "r2": "d2", "l2": "u2",
        "u2": "r2", "d2": "l2"

      };
      rotacion = "z'";
      break;

    case 'Cara Azul':
      // Código para el caso 'Cara Verde'
      //Convertir rotación
      rotationMapping = {
        "U": "B", "U'": "B'",
        "F": "U", "F'": "U'",
        "D": "F", "D'": "F'",
        "B": "D", "B'": "D'",
        "U2": "B2", "F2": "U2",
        "D2": "F2", "B2": "D2",
        "E": "S", "S'": "E'",
        "S": "E'", "E'": "S",
        "S2": "E2", "E2": "S2",
        "u": "b", "u'": "b'",
        "f": "u", "f'": "u'",
        "d": "f", "d'": "f'",
        "b": "d", "b'": "d'",
        "u2": "b2", "f2": "u2",
        "d2": "f2'", "b2": "d2"
      };
      rotacion = "x";
      break;
    case 'Cara Verde':
      // Código para el caso 'Cara Azul'
      //Convertir rotación
      rotationMapping = {
        "U": "F", "U'": "F'",
        "F": "D", "F'": "D'",
        "D": "B", "D'": "B'",
        "B": "U", "B'": "U'",
        "U2": "F2", "F2": "D2",
        "D2": "B2", "B2": "U2",
        "E": "S'", "S'": "E",
        "S": "E", "E'": "S'",
        "S2": "E2", "E2": "S2",
        "u": "f", "u'": "f'",
        "f": "d", "f'": "d'",
        "d": "b", "d'": "b'",
        "b": "u", "b'": "u'",
        "u2": "f2", "f2": "d2",
        "d2": "b2'", "b2": "u2"
      };
      rotacion = "x'";
      break;
  }

//spliteo de la mezcla
  // let arrScramble = newSolu.split(" ");
  let scrambleModC = scrambleMod.split(" ");


  //let arrScrambleCross = newcrossolu.split(" ");
  let scrambleModCrossC = scrambleModCross.split(" ");


  //let arrScrambleF2l1 = newf2lsolu1.split(" ");
  let scrambleModF2l1C = scrambleModF2l1.split(" ");


  //let arrScrambleF2l2 = newf2lsolu2.split(" ");
  let scrambleModF2l2C = scrambleModF2l2.split(" ");


  //let arrScrambleF2l3 = newf2lsolu3.split(" ");
  let scrambleModF2l3C = scrambleModF2l3.split(" ");


  //let arrScrambleF2l4 = newf2lsolu4.split(" ");
  let scrambleModF2l4C = scrambleModF2l4.split(" ");


  //let arrScrambleOLL = newollsolu.split(" ");
  let scrambleModOLLC = scrambleModOLL.split(" ");


  //let arrScramblePLL = newpllsolu.split(" ");
  let scrambleModPLLC = scrambleModPLL.split(" ");

//rotacion de la mezcla a zurda si es elegida y la cara elegida

  for (let i = 0; i < scrambleModC.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModC[i] in tipoManoLetters) {
        scrambleModC[i] = tipoManoLetters[scrambleModC[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModC[i] in rotationMapping) {
        scrambleModC[i] = rotationMapping[scrambleModC[i]];

      }
    }
  }


  for (let i = 0; i < scrambleModCrossC.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModCrossC[i] in tipoManoLetters) {
        scrambleModCrossC[i] = tipoManoLetters[scrambleModCrossC[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModCrossC[i] in rotationMapping) {
        scrambleModCrossC[i] = rotationMapping[scrambleModCrossC[i]];
      }
    }
  }


  for (let i = 0; i < scrambleModF2l1C.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModF2l1C[i] in tipoManoLetters) {
        scrambleModF2l1C[i] = tipoManoLetters[scrambleModF2l1C[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModF2l1C[i] in rotationMapping) {
        scrambleModF2l1C[i] = rotationMapping[scrambleModF2l1C[i]];
      }
    }
  }


  for (let i = 0; i < scrambleModF2l2C.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModF2l2C[i] in tipoManoLetters) {
        scrambleModF2l2C[i] = tipoManoLetters[scrambleModF2l2C[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModF2l2C[i] in rotationMapping) {
        scrambleModF2l2C[i] = rotationMapping[scrambleModF2l2C[i]];
      }
    }
  }


  for (let i = 0; i < scrambleModF2l3C.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModF2l3C[i] in tipoManoLetters) {
        scrambleModF2l3C[i] = tipoManoLetters[scrambleModF2l3C[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModF2l3C[i] in rotationMapping) {
        scrambleModF2l3C[i] = rotationMapping[scrambleModF2l3C[i]];
      }
    }
  }


  for (let i = 0; i < scrambleModF2l4C.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModF2l4C[i] in tipoManoLetters) {
        scrambleModF2l4C[i] = tipoManoLetters[scrambleModF2l4C[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModF2l4C[i] in rotationMapping) {
        scrambleModF2l4C[i] = rotationMapping[scrambleModF2l4C[i]];
      }
    }
  }


  for (let i = 0; i < scrambleModOLLC.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModOLLC[i] in tipoManoLetters) {
        scrambleModOLLC[i] = tipoManoLetters[scrambleModOLLC[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModOLLC[i] in rotationMapping) {
        scrambleModOLLC[i] = rotationMapping[scrambleModOLLC[i]];
      }
    }
  }


  for (let i = 0; i < scrambleModPLLC.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (scrambleModPLLC[i] in tipoManoLetters) {
        scrambleModPLLC[i] = tipoManoLetters[scrambleModPLLC[i]];
      }
    }
    if (this.selectedOption != 'Cara Blanca') {
      if (scrambleModPLLC[i] in rotationMapping) {
        scrambleModPLLC[i] = rotationMapping[scrambleModPLLC[i]];
      }
    }
  }

//unimos a un string todo
  scrambleMod = scrambleModC.join(" ");
  scrambleModCross = scrambleModCrossC.join(" ");
  scrambleModF2l1 = scrambleModF2l1C.join(" ");
  scrambleModF2l2 = scrambleModF2l2C.join(" ");
  scrambleModF2l3 = scrambleModF2l3C.join(" ");
  scrambleModF2l4 = scrambleModF2l4C.join(" ");
  scrambleModOLL = scrambleModOLLC.join(" ");
  scrambleModPLL = scrambleModPLLC.join(" ");

  
  for (let i = 0; i < arrSolu.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSolu[i] in tipoManoLetters) {
        arrSolu[i] = tipoManoLetters[arrSolu[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluCross.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluCross[i] in tipoManoLetters) {
        arrSoluCross[i] = tipoManoLetters[arrSoluCross[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluF2l1.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluF2l1[i] in tipoManoLetters) {
        arrSoluF2l1[i] = tipoManoLetters[arrSoluF2l1[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluF2l2.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluF2l2[i] in tipoManoLetters) {
        arrSoluF2l2[i] = tipoManoLetters[arrSoluF2l2[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluF2l3.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluF2l3[i] in tipoManoLetters) {
        arrSoluF2l3[i] = tipoManoLetters[arrSoluF2l3[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluF2l4.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluF2l4[i] in tipoManoLetters) {
        arrSoluF2l4[i] = tipoManoLetters[arrSoluF2l4[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluOLL.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluOLL[i] in tipoManoLetters) {
        arrSoluOLL[i] = tipoManoLetters[arrSoluOLL[i]];
      }
    }
  }
  for (let i = 0; i < arrSoluPLL.length; i++) {
    if (this.tipoMano == 'Zurda') {
      if (arrSoluPLL[i] in tipoManoLetters) {
        arrSoluPLL[i] = tipoManoLetters[arrSoluPLL[i]];
      }
    }
  }

  //Aqui ya está invertido a caras originales. Si queremos mover cara, invertimos aquí ambos.
  //Tanto scramble como solución.

  //invertimos algorimo y solcuion
  const alg = new Alg(scrambleMod);
  const invertirAlg = alg.invert();

  const algCross = new Alg(scrambleModCross);
  const invertirAlgCross = algCross.invert();

  const algF2L1 = new Alg(scrambleModF2l1);
  const invertirAlgF2L1 = algF2L1.invert();

  const algF2L2 = new Alg(scrambleModF2l2);
  const invertirAlgF2L2 = algF2L2.invert();

  const algF2L3 = new Alg(scrambleModF2l3);
  const invertirAlgF2L3 = algF2L3.invert();

  const algF2L4 = new Alg(scrambleModF2l4);
  const invertirAlgF2L4 = algF2L4.invert();

  const algOLL = new Alg(scrambleModOLL);
  const invertirAlgOLL = algOLL.invert();

  const algPLL = new Alg(scrambleModPLL);
  const invertirAlgPLL = algPLL.invert();

  //formateo a string
  let soluMod = arrSolu.join(" ");
  let soluModCross = arrSoluCross.join(" ");
  let soluModF2l1 = arrSoluF2l1.join(" ");
  let soluModF2l2 = arrSoluF2l2.join(" ");
  let soluModF2l3 = arrSoluF2l3.join(" ");
  let soluModF2l4 = arrSoluF2l4.join(" ");
  let soluModOLL = arrSoluOLL.join(" ");
  let soluModPLL = arrSoluPLL.join(" ");





//asignamos a cada variable el resultado eliminando undefineds y trimeadno
  this.strSolu = [soluMod.replace(/undefined'?/g, '').trim(), invertirAlg.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strCross = [soluModCross.replace(/undefined'?/g, '').trim(), invertirAlgCross.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strF2L1 = [soluModF2l1.replace(/undefined'?/g, '').trim(), invertirAlgF2L1.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strF2L2 = [soluModF2l2.replace(/undefined'?/g, '').trim(), invertirAlgF2L2.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strF2L3 = [soluModF2l3.replace(/undefined'?/g, '').trim(), invertirAlgF2L3.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strF2L4 = [soluModF2l4.replace(/undefined'?/g, '').trim(), invertirAlgF2L4.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strOLL = [soluModOLL.replace(/undefined'?/g, '').trim(), invertirAlgOLL.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];
  this.strPLL = [soluModPLL.replace(/undefined'?/g, '').trim(), invertirAlgPLL.toString().replace(/undefined'?/g, '').trim() + " z2" + " " + rotacion];

}

}