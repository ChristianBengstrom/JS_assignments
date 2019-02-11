/*globals document, window */
'use strict';

window.lockedOnArr = [0,0,0,0,0];

let initialize = function () {
    // create canvas object
    let myCanvas = Object.create(Canvas);
    myCanvas.init('myCanvas', 'silver');

    let randomDicer = (min,max) => {
       return Math.floor(Math.random() * (max - min + 1) ) + min;
    };

    // let lockedOnArr = [0,0,0,0,0];
    let diceLocked = false;

    let rollBtn = $('roll');
    rollBtn.addEventListener('click', function() {
      let dice = [];
      let xPos = 15-90;

      let shapes = [];
      shapes.length = 0;


      let rolling = () => {
        for (var i = 0; i < 5; i++) {
          var diceEyes = (lockedOnArr[i]>0) ? lockedOnArr[i] : randomDicer(1,6);

          xPos += 90;
          dice = Object.create(ShapeDice);
          dice.init(myCanvas, xPos, 15 , diceEyes, lockedOnArr[i]); // (cv, x, y, eyes, isLocked)

          shapes.push(dice);
          }

          let paint = function (cv, arr) {
              cv.clear();
              cv.prep();
              // loop through array of shapes and draw
              for (var i = 0; i < arr.length; i++) {
                  arr[i].draw();
              }
            }

          myCanvas.canvas.addEventListener('click', hittest);

          // let diceLocked = false;
          function hittest(e) {
            for (let i = 0; i < shapes.length; i++) {
                let cx = shapes[i].ctx;
                let diceLocked = shapes[i].isLocked;
                cx.beginPath();
                cx.rect(shapes[i].x, shapes[i].y, 70, 70);
                cx.closePath();
                let bb = this.getBoundingClientRect();    // canvas size and pos
                // // mouse to canvas coordinates
                let x = (e.clientX - bb.left) * (this.width / bb.width);
                let y = (e.clientY - bb.top) * (this.height / bb.height);

                if (!diceLocked) {
                  if (cx.isPointInPath(x, y)) {
                      cx.strokeStyle = "green";
                      cx.lineWidth = 4;
                      cx.stroke();
                      lockedOnArr[i] = shapes[i].eyes;
                      diceLocked = true;
                      // window.alert("hit: "+x+","+y);
                  } else {
                      // window.alert("nohit: "+x+","+y);
                  }
                } else {
                  if (cx.isPointInPath(x, y)) {
                      cx.beginPath();
                      cx.rect(shapes[i].x, shapes[i].y, 70, 70);
                      cx.closePath();
                      cx.strokeStyle = "darkred";
                      cx.stroke();
                      lockedOnArr[i] = 0;
                      diceLocked = false;
                      // window.alert("hit: "+x+","+y);
                  } else {
                      // window.alert("nohit: "+x+","+y);
                  }
                }

            }
          }
          paint(myCanvas, shapes);
        }
        console.log(lockedOnArr);

        rolling();
    });
};


window.addEventListener('load', initialize);
