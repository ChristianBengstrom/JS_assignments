/*
   This file is copyright Niels Muller Larsen.
	It is experimental and it contains a JavaScript implementation of
	The Game of Life
	It is released under the GNU GPL, re herunder. If you use it please retain this
	copyright section.

	This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

	This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var DEAD     = 0;
var LIVE     = 1;
var boardDiv = "boardiv";
var boardTab = "boardid";

var XDIM     = 200;
var YDIM     = 80;
var INTERVAL = 25;
var fontSize = 5;

var counter, startStop;
var board,ghost,tableids;       // declare array vars as global

function initBoardArrays() {
	 counter             = 0;
	 board         = new Array(YDIM);
	 ghost         = new Array(YDIM);
	 tableids      = new Array(YDIM);
	 for (i = 0; i < board.length; i++) {
		  board[i]    = new Array(XDIM);
		  ghost[i]    = new Array(XDIM);
		  tableids[i] = new Array(XDIM);
	 }
	 tableInit(board);
}

function seedBoardRandomly() {
	for (i = 0; i < board.length; i++)
		for (j = 0; j < board[i].length; j++)
			// board[i][j] = Math.floor(Math.random() * 2);
			if (Math.random() < 0.08)
				board[i][j] = LIVE;
			else
				board[i][j] = DEAD;
	return true;
}

function seedRPentomino() {
	 i = Math.floor(board.length/2) - 1;
	 j = Math.floor(board[i].length/2) - 1;
	 board[i][j+1] = LIVE;
	 board[i][j+2] = LIVE;
	 board[i+1][j] = LIVE;
	 board[i+1][j+1] = LIVE;
	 board[i+2][j+1] = LIVE;
	 return true;
}

function seedGliderX() {
	 i = board.length-3;
	 j = 0;
	 board[i][j+1] = LIVE;
	 board[i+1][j+2] = LIVE;
	 board[i+2][j] = LIVE;
	 board[i+2][j+1] = LIVE;
	 board[i+2][j+2] = LIVE;
	 i = board.length-3;
	 j = Math.floor(board[i].length/2) - 3;
	 board[i][j+1] = LIVE;
	 board[i+1][j+2] = LIVE;
	 board[i+2][j] = LIVE;
	 board[i+2][j+1] = LIVE;
	 board[i+2][j+2] = LIVE;
	 return true;
}

function seedGliderY() {
	i = Math.floor(board.length/2) - 1;
	j = Math.floor(board[i].length/2) - 1;
	board[i][j+1] = LIVE;
	board[i+1][j+1] = LIVE;
	board[i+1][j+2] = LIVE;
	board[i+2][j] = LIVE;
	board[i+2][j+2] = LIVE;
	return true;
}

function mod(i,j) {    //coNML, returnerer positiv R
	return (i%j+j)%j;
}

function setGameParms() {
	if (!document.all) {
		width = window.innerWidth;
		height = window.innerHeight;
	} else {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
//	XDIM = parseInt( width / fontSize );
//	YDIM = parseInt( height / fontSize * 9 / 16);
//	YDIM = parseInt( height / fontSize );
//	alert(XDIM+","+YDIM);
}

function boardLayout() {
	tableInit(ghost);
	var a4 = document.getElementById(boardDiv);
	var a5 = document.getElementById(boardTab)
	if (a4) {
		if (a5)
			a4.removeChild(a5);                                         // remove previous board
		document.getElementsByTagName('body').item(0).removeChild(a4);
	}

	 a4 = document.createElement("div");     // create layer (div) and set some attributes
	 a4.setAttribute("id", boardDiv);
	 a4.setAttribute("class", "dummy");
	 a5 = document.createElement("table");   // create board (table) and set some attributes
	 a5.setAttribute("id", boardTab);
	 a5.setAttribute("class", "dummy");

	for (i = 0; i < board.length; i++) {
		  var a6 = document.createElement("tr");  // create tablerows
		  for (j = 0; j < board[i].length; j++) {
				var a7 = document.createElement("td");  // with parametrisized number of cells
				var celleid = "_" + i + "_" + j;              // cell-ids '_i_j'
				a7.setAttribute("id", celleid);               // cells with id
				tableids[i][j] = celleid;               // table with cell-ids
				if (board[i][j] == LIVE) {                                  // paint start content re board-array
//					 textString = LIVEChar;
					 a7.setAttribute("class", "live");
				} else {
//					 textString = DEADChar;
					 a7.setAttribute("class", "dead");
				}
				w1 = document.createTextNode(" ");
				a7.appendChild(w1);                                     // cell content into cell
				a6.appendChild(a7);                                     // cell into row
		  }
		  a5.appendChild(a6);                                         // row into table
	 }
	 a4.appendChild(a5);                                     // append table to layer
	 document.getElementsByTagName('body').item(0).appendChild(a4);  // put layer onto DOM tree

	 return true;
}

function playGameOfLife() {
	 window.status = ++counter;
	 countLiveNeighbours();
	 board2DOM();
}

function tableInit(xtable) {
	 for (i = 0; i < board.length; i++)
		  for (j = 0; j < board[i].length; j++)
				xtable[i][j] = DEAD;
	 return true;
}

function board2DOM() {
	 for (i = 0; i < board.length; i++)
		  for (j = 0; j < board[i].length; j++) {
				board[i][j] = ghost[i][j];                      // ghost cell to board cell
				ghost[i][j] = 0;                                // clear ghost cell
				var status = "live";
				if (board[i][j] == DEAD) {
					 status = "dead";
				}
				document.getElementById(tableids[i][j]).setAttribute("class", status);
		  }
	 return true;
}

function countLiveNeighbours() {
	 /*
		  gennemløb spilleplade og
		  for hvert felt optælles sum af 8 naboer
		  hvert felts sum gemmes i parallelt array
		  ---
		  Dette kan ske i funktion for sig således:

		  a[0][0] a[0][1] a[0][2]
		  a[1][0] a[1][1] a[1][2]
		  a[2][0] a[2][1] a[2][2]

		  sum(a[i][j]) = a(i-1,j-1) + a(i-1,j)  + a(i-1,j+1)
							+ a(i,j-1)   + a(i,j+1)
							+ a(i+1,j-1) + a(i+1,j)  + a(i+1,j+1)
		  hvis index er <0 eller >board.length laver vi wrap af matricen
	 */

	 for (i = 0; i < board.length; i++) {
		  for (j = 0; j < board[i].length; j++) {
				var tally  = board[mod(i-1,board.length)][mod(j-1,board[i].length)];
				tally += board[mod(i-1,board.length)][mod(j,board[i].length)];
				tally += board[mod(i-1,board.length)][mod(j+1,board[i].length)];
				tally += board[mod(i,board.length)][mod(j-1,board[i].length)];
				tally += board[mod(i,board.length)][mod(j+1,board[i].length)];
				tally += board[mod(i+1,board.length)][mod(j-1,board[i].length)];
				tally += board[mod(i+1,board.length)][mod(j,board[i].length)];
				tally += board[mod(i+1,board.length)][mod(j+1,board[i].length)];
				if (tally < 2)
					 ghost[i][j] = DEAD;
				else if (tally > 3)
					 ghost[i][j] = DEAD;
				else if (tally == 2)
					 ghost[i][j] = board[i][j];
				else
					 ghost[i][j] = LIVE;
		  }
	 }
	 return true;
}

function setup() {
	clearInterval(startStop);
	setGameParms();
	initBoardArrays();
//	seedBoardRandomly();
 seedRPentomino();
//	seedGliderX();
	boardLayout();
}
