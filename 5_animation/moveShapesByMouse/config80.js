'use strict';

/*
 * config80.js
 */
var initialize = function () {
    // create toolbox canvas object
    box = Object.create(Canvas);
    box.init('toolbox', '#ccc');
    // create shapes and place in array
    let shape = Object.create(Shape);
    shape.init(box, 10, 10, 60, 20, '#00f', 10000, 'stoker');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 40, 80, 30, '#00c', 15000, 'stoker');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 80, 100, 40, '#009', 20000, 'stoker');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 130, 60, 10, '#0f0', 12000, 'feeder');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 150, 80, 15, '#0c0', 16000, 'feeder');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 175, 100, 20, '#090', 20000, 'feeder');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 205, 20, 20, '#f00', 4000, 'tank');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 235, 40, 40, '#c00', 8000, 'tank');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 10, 285, 80, 80, '#900', 12000, 'tank');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 220, 205, 20, 20, '#fff', 0, 'chimney');
    shapes.push(shape);
    shape = Object.create(Shape);
    shape.init(box, 160, 235, 80, 160, 'transparent', 0, 'door');
    shapes.push(shape);
    // draw them
    repeater(box, shapes);
    // make measurements button click sensitive
    document.forms.inputpanel.bt1.addEventListener('click', drawRoom);
}

var drawRoom = function () {
    // draw room, handler for click button
    let workDiv = $('work');
    // Removing all children from an element
    while (workDiv.firstChild) {
        workDiv.removeChild(workDiv.firstChild);
    }
    cshapes = [];           // clear array for left canvas
    let roomCanvas = document.createElement('canvas'); // create canvas
    roomCanvas.setAttribute('id', 'room');  // give it 3 attributes
    roomCanvas.setAttribute('width', document.forms.inputpanel.wid.value);
    roomCanvas.setAttribute('height', document.forms.inputpanel.hei.value);
    workDiv.appendChild(roomCanvas); // attach to parent div
    room = Object.create(Canvas);
    room.init('room', '#ee0');  // and create object ref
    // make toolbox canvas click sensitive
    box.canvas.addEventListener('click', select);
}

var redraw = function (cv, arr) {
    // clear canvas
    cv.clear();
    // prep canvas with background color
    cv.prep();
    // loop through array and draw shapes again
    for (var i = 0; i < arr.length; i++) {
        arr[i].draw();
    }
}

var repeater = function (cv, arr) {
    // if this is an animation build a setInterval loop here
    // if not, just draw this once
    redraw(cv, arr);
}

var select = function (ev) {
    // for each array shape in box
    for (var i = 0; i < shapes.length; i++) {
        let cx = shapes[i].ctx;  // get context from array obj
        cx.beginPath();          // simulate it's path
        cx.rect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
        cx.closePath();
        let mcoord = mouseToCanvasCoordinatesNML(ev);
        if (cx.isPointInPath(mcoord['x'], mcoord['y'])) {  // is this the hit shape?
            cx.lineWidth = 2;              // stroke weight
            cx.strokeStyle = 'black';       // stroke color
            cx.stroke();
            room.canvas.addEventListener('click', function placeInRoom (ev) {
                redraw(box,shapes); // clear select in toolbox

                let mcoord = mouseToCanvasCoordinatesNML(ev);
                let cshape = Object.create(Shape);
                cshape.init(room, mcoord['x'], mcoord['y'],
                    shapes[i].getWidth(), shapes[i].getHeight(),
                    shapes[i].getColor(),
                    shapes[i].getPrice(), shapes[i].getType());
                for (let j = 0; j < cshapes.length; j++) {
                    if (cshape.isOverlapping(cshapes[j])) {
                        window.alert("overlaps another shape");
                        room.canvas.removeEventListener('click', placeInRoom);
                        return;
                    }
                    if (cshapes[j].getType() === cshape.getType()) {
                        window.alert("There's already a "+cshape.getType()+" in the room");
                        room.canvas.removeEventListener('click', placeInRoom);
                        return;
                    }

                }
                if (cshape.getType() === 'chimney' && !cshape.isChimneyRules()) {
                    window.alert("Chimney must be near wall");
                    room.canvas.removeEventListener('click', placeInRoom);
                    return;
                }
                if (cshape.getType() === 'door' && !cshape.isDoorRules()) {
                    window.alert("Door must be placed near wall");
                    room.canvas.removeEventListener('click', placeInRoom);
                    return;
                }
                if (!cshape.isFullyInsideRoom()) {
                    window.alert("Not fully inside room. Intersects wall.");
                    room.canvas.removeEventListener('click', placeInRoom);
                    return;
                }
                cshapes.push(cshape);
                if (cshapes.length === 1) {
                    room.canvas.addEventListener('mousedown', mouseDowner);

                }
                redraw(room, cshapes);
                room.canvas.removeEventListener('click', placeInRoom);
                if (cshapes.length >= 3) {
                    document.forms.inputpanel.btf.addEventListener('click', calculate);
                }
            });
            break;
        } else {
            continue;
        }
    }
}
var mouseToCanvasCoordinatesNML = function (e) {
    let coord = [];
    // bb = canvas x,y,w,h
    let bb = e.target.getBoundingClientRect();
    // mouse window coordinates to canvas coordinates
    coord['x'] = (e.clientX - bb.left) * (e.target.width / bb.width);
    coord['y'] = (e.clientY - bb.top) * (e.target.height / bb.height);
    return coord;
}
var calculate = function () {
    let s = "Estimate:\n\n";
    let sum = 0;
    for (let i = 0; i < cshapes.length; i++) {
        if (cshapes[i].getType() === 'chimney'
            || cshapes[i].getType() === 'door') continue;
        s += (i+1)+': '+cshapes[i].getType()+"\t"+cshapes[i].getPrice()+"\n";
        sum += cshapes[i].getPrice();
    }
    s += "\nTotal:\t" + sum;

    let container = document.getElementById('calculation');
    let calc = document.createElement('article');
    let outp = document.createElement('pre');
    let outpp = document.createTextNode(s);
    outp.appendChild(outpp);
    calc.appendChild(outp);
    container.appendChild(calc);
    document.forms.inputpanel.btf.removeEventListener('click', calculate);
}

let mouseDowner = function (ev) {
    for (let i = 0; i < cshapes.length; i++) {
        let cx = cshapes[i].ctx;  // get context from array obj
        cx.beginPath();          // simulate it's path
        cx.rect(cshapes[i].x, cshapes[i].y, cshapes[i].width, cshapes[i].height);
        cx.closePath();
        let mcoord = mouseToCanvasCoordinatesNML(ev);
        if (cx.isPointInPath(mcoord['x'], mcoord['y'])) {  // is this the hit shape?
            let offsetX = mcoord['x'] - cshapes[i].getX();
            let offsetY = mcoord['y'] - cshapes[i].getY();
            room.canvas.addEventListener('mousemove', function mouseMover (ev) {
                room.canvas.addEventListener('mouseup', function () {
                    room.canvas.removeEventListener('mousemove', mouseMover);   //fjern mousemove eventlistener når objektet er sat.
                });
                let ccoord = mouseToCanvasCoordinatesNML(ev);
                let cshape = Object.create(Shape);
                cshape.init(room,
                    ccoord['x'] - offsetX,
                    ccoord['y'] - offsetY,
                    cshapes[i].getWidth(), cshapes[i].getHeight(),
                    cshapes[i].getColor(),
                    cshapes[i].getPrice(), cshapes[i].getType());
                for (let j = 0; j < cshapes.length; j++) {
                    if (i === j) continue;
                    if (!cshape.isOverlapping(cshapes[j]) && cshape.isFullyInsideRoom()) {
                        cshapes[i].move(cshape.getX(), cshape.getY());
                        redraw(room, cshapes);
                    }
                }
            });
            break;
        }
    }
};

var shapes = [];
var box;
var cshapes = [];
var room;

window.addEventListener('load', initialize);
