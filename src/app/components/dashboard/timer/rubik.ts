//clase cube para hacer suffleo de el algoritmo genereado en el timer
export class Cube {
    private cube: string[][];

    constructor() {
        //init del cubo con las letras originales
        this.cube = [
            ["w", "w", "w", "w", "w", "w", "w", "w"],
            ["o", "o", "o", "o", "o", "o", "o", "o"],
            ["g", "g", "g", "g", "g", "g", "g", "g"],
            ["r", "r", "r", "r", "r", "r", "r", "r"],
            ["b", "b", "b", "b", "b", "b", "b", "b"],
            ["y", "y", "y", "y", "y", "y", "y", "y"],
        ];
    }
    //creaciond de caras pasando el numero
    public faceMove(x: number): void {
        [this.cube[x][0], this.cube[x][6], this.cube[x][4], this.cube[x][2]] = [
            this.cube[x][6],
            this.cube[x][4],
            this.cube[x][2],
            this.cube[x][0],
        ];
        [this.cube[x][1], this.cube[x][7], this.cube[x][5], this.cube[x][3]] = [
            this.cube[x][7],
            this.cube[x][5],
            this.cube[x][3],
            this.cube[x][1],
        ];
    }
    //metodo para mover caras primas
    public faceMovePrime(x: number): void {
        [this.cube[x][0], this.cube[x][2], this.cube[x][4], this.cube[x][6]] = [
            this.cube[x][2],
            this.cube[x][4],
            this.cube[x][6],
            this.cube[x][0],
        ];
        [this.cube[x][1], this.cube[x][3], this.cube[x][5], this.cube[x][7]] = [
            this.cube[x][3],
            this.cube[x][5],
            this.cube[x][7],
            this.cube[x][1],
        ];
    }
    //init swap de caras asignando valores standar
    public swap(
        x1: number,
        x2: number,
        x3: number,
        x4: number,
        y1: number,
        y2: number,
        y3: number,
        y4: number
    ): void {
        [this.cube[x1][y1], this.cube[x2][y2], this.cube[x3][y3], this.cube[x4][y4]] = [
            this.cube[x2][y2],
            this.cube[x3][y3],
            this.cube[x4][y4],
            this.cube[x1][y1],
        ];
    }

    //metodo para printar cubo, no necesario pero orientativo
    public printCube() {
        console.log(this.cube)
        console.log(
            `    ${this.cube[0][0]}${this.cube[0][1]}${this.cube[0][2]}\n` +
            `    ${this.cube[0][7]}w${this.cube[0][3]}\n
  
  + ${this.cube[0][6]}${this.cube[0][5]}${this.cube[0][4]}\n\n+ ${this.cube[1][0]}${this.cube[1][1]}${this.cube[1][2]}${this.cube[2][0]}${this.cube[2][1]}${this.cube[2][2]}${this.cube[3][0]}${this.cube[3][1]}${this.cube[3][2]}${this.cube[4][0]}${this.cube[4][1]}${this.cube[4][2]}\n+ ${this.cube[1][7]}o${this.cube[1][3]}${this.cube[2][7]}g${this.cube[2][3]}${this.cube[3][7]}r${this.cube[3][3]}${this.cube[4][7]}b${this.cube[4][3]}\n+ ${this.cube[1][6]}${this.cube[1][5]}${this.cube[1][4]}${this.cube[2][6]}${this.cube[2][5]}${this.cube[2][4]}${this.cube[3][6]}${this.cube[3][5]}${this.cube[3][4]}${this.cube[4][6]}${this.cube[4][5]}${this.cube[4][4]}\n\n+ ${this.cube[5][0]}${this.cube[5][1]}${this.cube[5][2]}\n+ ${this.cube[5][7]}y${this.cube[5][3]}\n+ ${this.cube[5][6]}${this.cube[5][5]}${this.cube[5][4]}\n`
        );
        // Crear el array de colores siguiendo la ordenación especificada
        // Crear el array de colores siguiendo la ordenación especificada
        const colorsArray = [
            [this.cube[0][0], this.cube[0][1], this.cube[0][2]],
            [this.cube[0][7], 'w', this.cube[0][3]],
            [this.cube[0][6], this.cube[0][5], this.cube[0][4]],
            [this.cube[1][0], this.cube[1][1], this.cube[1][2], this.cube[2][0], this.cube[2][1], this.cube[2][2], this.cube[3][0], this.cube[3][1], this.cube[3][2], this.cube[4][0], this.cube[4][1], this.cube[4][2]],
            [this.cube[1][7], 'o', this.cube[1][3], this.cube[2][7], 'g', this.cube[2][3], this.cube[3][7], 'r', this.cube[3][3], this.cube[4][7], 'b', this.cube[4][3]],
            [this.cube[1][6], this.cube[1][5], this.cube[1][4], this.cube[2][6], this.cube[2][5], this.cube[2][4], this.cube[3][6], this.cube[3][5], this.cube[3][4], this.cube[4][6], this.cube[4][5], this.cube[4][4]],
            [this.cube[5][0], this.cube[5][1], this.cube[5][2]],
            [this.cube[5][7], 'y', this.cube[5][3]],
            [this.cube[5][6], this.cube[5][5], this.cube[5][4]]
        ];
        const originalArray = colorsArray.flat();

        const arrayResult: string[][] = [
            [originalArray[15], originalArray[16], originalArray[17], originalArray[27], originalArray[28], originalArray[29], originalArray[39], originalArray[40], originalArray[41]],
            [originalArray[0], originalArray[1], originalArray[2], originalArray[3], originalArray[4], originalArray[5], originalArray[6], originalArray[7], originalArray[8]],
            [originalArray[9], originalArray[10], originalArray[11], originalArray[21], originalArray[22], originalArray[23], originalArray[33], originalArray[34], originalArray[35]],
            [originalArray[12], originalArray[13], originalArray[14], originalArray[24], originalArray[25], originalArray[26], originalArray[36], originalArray[37], originalArray[38]],
            [originalArray[18], originalArray[19], originalArray[20], originalArray[30], originalArray[31], originalArray[32], originalArray[42], originalArray[43], originalArray[44]],
            [originalArray[51], originalArray[48], originalArray[45], originalArray[52], originalArray[49], originalArray[46], originalArray[53], originalArray[50], originalArray[47]]
        ];
        const arrayRes = arrayResult.flat();
        console.log(arrayRes);
        console.log("a")
        return arrayRes
    }

    //metodo para crear movimientos haciendo el swap con el metodo de arriba
    move(cube: Cube, m: string, x: number): void {
        // Se necesita hacer 3 veces para llegar a la solucion
        if (m === 'U') {
            cube.faceMove(x);
            cube.swap(1, 2, 3, 4, 0, 0, 0, 0);
            cube.swap(1, 2, 3, 4, 1, 1, 1, 1);
            cube.swap(1, 2, 3, 4, 2, 2, 2, 2);
        } else if (m === "U'") {
            cube.faceMovePrime(x);
            cube.swap(1, 4, 3, 2, 0, 0, 0, 0);
            cube.swap(1, 4, 3, 2, 1, 1, 1, 1);
            cube.swap(1, 4, 3, 2, 2, 2, 2, 2);
        } else if (m === 'U2') {
            this.move(cube, 'U', x);
            this.move(cube, 'U', x);
        } else if (m === 'D') {
            cube.faceMove(x);
            cube.swap(1, 4, 3, 2, 4, 4, 4, 4);
            cube.swap(1, 4, 3, 2, 5, 5, 5, 5);
            cube.swap(1, 4, 3, 2, 6, 6, 6, 6);
        } else if (m === "D'") {
            cube.faceMovePrime(x);
            cube.swap(1, 2, 3, 4, 4, 4, 4, 4);
            cube.swap(1, 2, 3, 4, 5, 5, 5, 5);
            cube.swap(1, 2, 3, 4, 6, 6, 6, 6);
        } else if (m === 'D2') {
            this.move(cube, 'D', x);
            this.move(cube, 'D', x);
        } else if (m === 'R') {
            cube.faceMove(x);
            cube.swap(0, 2, 5, 4, 2, 2, 2, 6);
            cube.swap(0, 2, 5, 4, 3, 3, 3, 7);
            cube.swap(0, 2, 5, 4, 4, 4, 4, 0);
        } else if (m === "R'") {
            cube.faceMovePrime(x);
            cube.swap(0, 4, 5, 2, 2, 6, 2, 2);
            cube.swap(0, 4, 5, 2, 3, 7, 3, 3);
            cube.swap(0, 4, 5, 2, 4, 0, 4, 4);
        } else if (m === 'R2') {
            this.move(cube, 'R', x);
            this.move(cube, 'R', x);
        } else if (m === 'L') {
            cube.faceMove(x);
            cube.swap(0, 4, 5, 2, 6, 2, 6

                , 6);
            cube.swap(0, 4, 5, 2, 7, 3, 7, 7);
            cube.swap(0, 4, 5, 2, 0, 4, 0, 0);
        } else if (m === "L'") {
            cube.faceMovePrime(x);
            cube.swap(0, 2, 5, 4, 6, 6, 6, 2);
            cube.swap(0, 2, 5, 4, 7, 7, 7, 3);
            cube.swap(0, 2, 5, 4, 0, 0, 0, 4);
        } else if (m === 'L2') {
            this.move(cube, 'L', x);
            this.move(cube, 'L', x);
        } else if (m === 'F') {
            cube.faceMove(x);
            cube.swap(0, 1, 5, 3, 4, 2, 0, 6);
            cube.swap(0, 1, 5, 3, 5, 3, 1, 7);
            cube.swap(0, 1, 5, 3, 6, 4, 2, 0);
        } else if (m === "F'") {
            cube.faceMovePrime(x);
            cube.swap(0, 3, 5, 1, 4, 6, 0, 2);
            cube.swap(0, 3, 5, 1, 5, 7, 1, 3);
            cube.swap(0, 3, 5, 1, 6, 0, 2, 4);
        } else if (m === 'F2') {
            this.move(cube, 'F', x);
            this.move(cube, 'F', x);
        } else if (m === 'B') {
            cube.faceMove(x);
            cube.swap(0, 3, 5, 1, 0, 2, 4, 6);
            cube.swap(0, 3, 5, 1, 1, 3, 5, 7);
            cube.swap(0, 3, 5, 1, 2, 4, 6, 0);
        } else if (m === "B'") {
            cube.faceMovePrime(x);
            cube.swap(0, 1, 5, 3, 0, 6, 4, 2);
            cube.swap(0, 1, 5, 3, 1, 7, 5, 3);
            cube.swap(0, 1, 5, 3, 2, 0, 6, 4);
        } else if (m === 'B2') {
            this.move(cube, 'B', x);
            this.move(cube, 'B', x);
        }
    }

    //metodo para crear scramble aleartorio entre 21 y 25 moves
    Scramble(): string {
        const moves = ["U", "D", "F", "B", "R", "L"];
        const dirs = ["", "'", "2"];
        const slen = Math.floor(Math.random() * 4) + 25;

        //metodo para iniciar scramble
        function gen_scramble(): string {
            const s = valid(
                Array.from({ length: slen }, () => [randomChoice(moves), randomChoice(dirs),])
            );

            return (
                s
                    .map((move) => move[0] + move[1])
                    .join(" ") + "[" + slen.toString() + "]"
            );
        }

        //metodo para validar la mezcla comprobando que no se repitan letras
        function valid(arr: Array<[string, string]>): Array<[string, string]> {
            for (let x = 1; x < arr.length; x++) {
                while (arr[x][0] === arr[x - 1][0]) {
                    arr[x][0] = randomChoice(moves);
                }
            }
            for (let x = 2; x < arr.length; x++) {
                while (
                    arr[x][0] === arr[x - 2][0] ||
                    arr[x][0] === arr[x - 1][0]
                ) {
                    arr[x][0] = randomChoice(moves);
                }
            }
            return arr;
        }

        //metodo para crear numero de moves aleatorios
        function randomChoice(arr: string[]): string {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const s = gen_scramble();
        console.log(s);
        return s;

    }
    //metodo para convertir la solucion a primes originales y no con letras, crear el string
    convertSolution(solution: string): [string, string][] {
        const moves = solution.split(' ');
        const convertedSolution: [string, string][] = [];

        for (const move of moves) {
            let moveName = move[0];
            let moveCount = '';

            if (move.length > 1) {
                if (move[1] === "'") {
                    moveCount = "'";
                } else {
                    moveCount = move[1];
                }
            }

            convertedSolution.push([moveName, moveCount]);
        }

        return convertedSolution;
    }

    //metodo para iniciar todos los metodos para sacar el print y el cubo
    iniciar(cube: Cube, scra = this.Scramble()) {
        const movess: string[] = ['U', 'L', 'F', 'R', 'B', 'D'];
        let scr = this.convertSolution(scra)
        for (const x of scr) {
            if (x.length >= 2) {
                this.move(cube, x[0] + x[1].toString(), movess.indexOf(x[0]));
            } else {
                console.error('Invalid move:', x);
            }
        }
        //retorna el cubo pintado y el scramble
        return [this.printCube(), scra];
    }
}