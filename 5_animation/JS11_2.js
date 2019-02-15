/*globals document, window */
'use strict';

/**
 * Umo object
 */
let Umo = {
    init(canvas, color) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.getWidth();
        this.y = Math.random() * this.canvas.getHeight();
        this.r = Math.random() * 9 + 3;
        this.dx = (Math.random() - 1) * 2;
        this.yoffset = 100;
        this.dyoffset = 100;
        this.color = color;
    },

    draw() {
        this.canvas.getContext().beginPath();
        this.canvas.getContext().fillStyle = this.color;
        this.canvas.getContext().arc(this.x, this.y, this.r,
                                     0, Math.PI * 2,
                                     false);
        this.canvas.getContext().fill();
        this.canvas.getContext().closePath();
    },

    move() {
      if (this.x + this.dx > this.canvas.getWidth()
              || this.x + this.dx < 0) {
            this.dx = -this.dx;
            this.yoffset += this.dyoffset
      }

      this.x += this.dx;
      if (this.color === 'blue')
          this.y = 80 * Math.sin(this.x * Math.PI / 100) + this.yoffset;
      else
          this.y = 80 * Math.cos(this.x * Math.PI / 100) + this.yoffset;

      },
};
