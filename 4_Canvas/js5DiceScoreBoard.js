/*globals document, window */
'use strict';

let manageScore = function () {

  let tbl = $('my-table')
  let players=[];

  let rBtn = $('restart');
  rBtn.addEventListener('click', function(){
      let nop = parseInt(prompt('angiv antal spillere')); // promt nop = number of players
      // let nop = 1;

      for (var i = 1; i < nop+1; i++) {
        players[i] = prompt('angiv '+i+'. medspillers navn'); //promt names
        // players[i] = 'P'+i
        let cc = i;                   // column counter
        appendColumn(players[i], cc);
        addEL();                      // addEventListeners
      }
  });

  // create DIV element and append to the table cell
  function createCell(cell, text, cc, rc, style) {    // cc:culomnCount rc:rowCount
      var p = document.createElement('p'),        // create DIV element
          txt = document.createTextNode(text);        // create text node
      p.appendChild(txt);                           // append text node to the DIV
      p.className = cc;                         // set DIV class attribute
      p.className += ' ';
      p.className += rc;                        // adds a class attribute
      cell.appendChild(p);                          // append DIV to the table cell
  }

  // append column to the HTML table
  function appendColumn(name, cc) {
      let i;
      // open loop for each row and append cell
      for (i = 0; i < tbl.rows.length; i++) {
        if (i < 1) {
          createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), name, 'tmp' ,'col');
        } else {
          createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), '', cc, i, 'col');
        }
      }
  }
  // delete table columns with index greater then 1
  function deleteColumns() {
      var tbl = document.getElementById('my-table'), // table reference
          lastCol = tbl.rows[0].cells.length - 1,    // set the last column index
          i, j;
      // delete cells with index greater then 0 (for each row)
      for (i = 0; i < tbl.rows.length; i++) {
          for (j = lastCol; j > 0; j--) {
              tbl.rows[i].deleteCell(j);
          }
      }
  }

  var addEL = () => {

    tbl.addEventListener('click', function(e) {
        if (e.target.nodeName.toUpperCase() !== "TD" || e.target.className == "tmp") return;
        let cell = e.target.firstChild;
        let sCell = e.target.firstChild.attributes[0].value.split(" ");

        // var col = parseInt(sCell[0]);
        var row = parseInt(sCell[1]);

        let diceResult = window.lockedOnArr;
        let counts=[];
        var count = () => {
          diceResult.forEach(function(x) {
            counts[x] = (counts[x] || 0)+1;
          });
        };
        count();

        let sum = (from, to) => {
          let res;
          let points = [];

          for (var i = from; i < to+1; i++) {
            var content = parseInt($c('1 ' +i)[0].innerHTML);
            // if (!content) return '-';
            points[i-1] = content ? content : 0;
          }
          res = points.reduce((a, b) => a + b, 0);
          return res;
        };

        switch (row) {
          case 1:
            cell.innerHTML = counts[1] ? counts[1]*1 : 0;
            break;
          case 2:
            cell.innerHTML = counts[2] ? counts[2]*2 : 0;
            break;
          case 3:
            cell.innerHTML = counts[3] ? counts[3]*3 : 0;
            break;
          case 4:
            cell.innerHTML = counts[4] ? counts[4]*4 : 0;
            break;
          case 5:
            cell.innerHTML = counts[5] ? counts[5]*5 : 0;
            break;
          case 6:
            cell.innerHTML = counts[6] ? counts[6]*6 : 0;
            break;
          case 7:
            cell.innerHTML = sum(1,6);
            break;
          case 8:
            cell.innerHTML = sum(1,6)>= 63 ? 50 : 0;
            break;
          case 9:
            // cell.innerHTML = !Math.max(counts) ? Math.max(counts) : 0;
            // console.log(Math.max(counts));
            break;
          // case 10:
          //   cell.innerHTML = sum(1,6);
          //   break;
          default:

        }
        e.target.removeEventListener('click', this, false);
    });
  };
};
window.addEventListener('load', manageScore);
