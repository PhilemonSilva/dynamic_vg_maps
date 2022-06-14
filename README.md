# Dynamic VG Maps
## _Middleware for Procedural Generation of Videogame Maps_


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dynamic VG Maps is a customizable Procedural Videogame Map Generator that aims to ease the process of development of Videogame Maps and Levels.

## Features

- Customization of map dimensions, cells and more;
- Optional Interface included for map visualization;
- Quick generation of validated procedural maps;
- Always with a traversable path.

## Technologies

Dynamic VG Maps uses a multitude of open technologies to function properly:

- [React] - Interface developed using the React Framework;
- [Node.js] - Scripts made with Node.js;
- [Electron] - Used for creating an executable application;
- [Hilbert-Curve] - Used for generating viable Hilbert-Curves for path generation.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v16.13.1+ to run.

Install the dependencies and start the application.

```sh
npm i
npm run dev
```

## Customizable Parameters:

### _Seed_

The Random Number Generator (the basis for all randomness in the application) can
receive a user defined sequence of characters denominated "seed". The same seed, with the
same parameters, will generate the same output every time.
If this input is left blank, the algorithm generates a random seed for the Random Number
Generator.
The user can click the "Get Current Seed"button, seen in Figure 11, to fill the "Seed"input
with the randomized seed used to generate the currently displayed Map, or input a seed of his
choosing.

### _Fill_

The Fill Parameter dictates the average percentage of solid Cell spawns, making Ro-
oms more or less "cramped" with solid Cells. If at 100%, Rooms will always be completely
composed of solid cells.

### _Path Width_

The Path Width Parameter manipulates the minimum width, in Cells, of the path through the Map.

### _Organic Paths_

The Organic Paths Parameter indicates if the generated path through the Map is "organic" in nature, meaning it has less hard, unnatural looking lines and edges

### _Map Dimension_

The Map Dimension Parameter defines the width, in Cells, of the Map. All maps have to be square by nature, and as such, the "x100" segment showcased in Figure 15 is updated when the user changes the number in the Input.

### _Rooms Per Row_

The Rooms Per Row Parameter defines the amount of Rooms in the rows of the Map. If the user inputs the number 4, having the Map Dimension set at 100, the Map will be generated with a 4x4 Room layout in mind, with each Room dimension being 20 Cells (100 Cells per row, divided by 4 Rooms).

### _Dead End Chance_

The Dead End Chance Parameter defines the average chance of Rooms to be generated as Dead Ends.

### _Minimum Wall Width_

The Minimum Wall Width Parameter defines a minimum amount of solid cells to surround the Rooms generated, giving a stronger delineation of the Rooms to the user.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Hilbert-Curve]: <https://github.com/mhyfritz/hilbert-curve>
[Node.js]: <http://nodejs.org>
[Electron]: <https://www.electronjs.org/>
[React]: <https://reactjs.org/>
