# RubikTrainer

Web creada para el entrenamiento dentro del entorno del cubo de Rubik.
Su principal objetivo es proporcionar una serie de herramientas para poder entrenar, así como implementaciones sobre ya originales.

Dispone de:
- Resolvedor de cubos de Rubik mediante patrón de colores.
- Cronómetro con tiempos y medias
- Lista de Algoritmos automatizada
- Tutoriales en vídeo para aprender

La nueva novedad es el resolvedor por el método fridrich, que aunque ya existía, jamás ha sido implementado en una página web.

A este se le ha implementado una serie de nuevos usos:
- Generador de mezclas automáticas.
- Resolvedor con mano zurda o diestra.
- Resolvedor con 6 distintas caras, rotando la solución y la mezcla.

La web utiliza:
- El visualizador de Twisty Cubing, una librería de código abierto para poder visualizar el cubo.
- El creador de soluciones Fridrich no implementado nunca en web.
- El creador de soluciones óptimas de Kociemba.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

ng build --configuration=production