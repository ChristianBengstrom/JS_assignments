/*globals document, window */
'use strict';

/**
 * Shape object
 */
let ShapeTriangle = {
    init(cv, x, y, x1, y1, x2, y2,color) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        console.log(this.ctx);
    },

    draw() {
      this.ctx.beginPath();        // new path
      this.ctx.moveTo(this.x, this.y);    // goto coordinate in canvas
      this.ctx.lineTo(this.x1, this.y1);    // line to coordinate
      this.ctx.lineTo(this.x2, this.y2);   // another line to coord
      this.ctx.closePath();        // Back to starting point 3.6
      this.ctx.fillStyle = this.color;
      // this.ctx.strokeStyle = 'black';
      // this.ctx.lineWidth = 10;
      this.ctx.fill();             // fills poly
      // this.ctx.stroke();           // draws lines
    },

    // move(dx, dy) {
    //     this.x += dx;
    //     this.y += dy;
    // }
};
