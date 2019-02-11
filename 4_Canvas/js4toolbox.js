/*globals document, window */
'use strict';

/*
 * nmlCanvas75.js
 */
let initialize = function () {
    // create canvas object
    let toolbox = Object.create(Canvas);
    toolbox.init('toolbox', 'transparent');

    // create objects
    // put in array
    let triangle1 = Object.create(ShapeTriangle);
    triangle1.init(toolbox, 10, 10, 10, 100, 100, 10, 'blue'); // (cv, x, y, x1, y1, x2, y2,color)
    let triangle2 = Object.create(ShapeTriangle);
    triangle2.init(toolbox, 400, 110, 300, 110, 300, 300, 'red');
    let triangle3 = Object.create(ShapeTriangle);
    triangle3.init(toolbox, 0, 400, 300, 400, 150, 200, 'silver');

    var cirkel = Object.create(ShapeCirkel);
    cirkel.init(toolbox, 200, 100, 80, 0, true, 'green'); // (cv, x, y, radius, sAngle, counterclockwise ,color)
    shapes.push(triangle1);
    shapes.push(triangle2);
    shapes.push(triangle3);
    shapes.push(cirkel);
    paint(toolbox, shapes);
}

let paint = function (cv, arr) {
    // loop through array of shapes and draw
    for (var i = 0; i < arr.length; i++) {
        arr[i].draw();
    }
}

let shapes = [];

window.addEventListener('load', initialize);
