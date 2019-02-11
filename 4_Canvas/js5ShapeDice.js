/*globals document, window */
'use strict';

/**
 * Shape object
 */
let ShapeDice = {
    init(cv, x, y, eyes, isLocked) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.diceColor = 'beige';
        this.eyesColor = 'black';
        this.eyes = eyes;
        this.isLocked = (isLocked>0) ? true : false;
    },

    drawEye(x, y) {
      this.ctx.beginPath();
      this.ctx.arc((this.x*2 + x)/2, (this.y*2 + y)/2, 5, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.eyesColor;
      this.ctx.fill();
      this.ctx.closePath();
    },

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.diceColor;
      this.ctx.rect(this.x, this.y, 70, 70);
      this.ctx.fill();
      if (this.isLocked) {
        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
      }
      this.ctx.closePath();
      switch (this.eyes) {
        case 1:
          this.drawEye(70, 70);
          break;
        case 2:
          this.drawEye(45, 45);
          this.drawEye(95, 95);
          break;
        case 3:
          this.drawEye(40, 40);
          this.drawEye(70, 70);
          this.drawEye(100, 100);
          break;
        case 4:
          this.drawEye(40, 40);
          this.drawEye(100, 40);
          this.drawEye(40, 100);
          this.drawEye(100, 100);
        break;
          break;
        case 5:
          this.drawEye(40, 40);
          this.drawEye(100, 40);
          this.drawEye(70, 70);
          this.drawEye(40, 100);
          this.drawEye(100, 100);

          break;
        case 6:
          this.drawEye(40, 40);
          this.drawEye(100, 40);
          this.drawEye(40, 70);
          this.drawEye(100, 70);
          this.drawEye(40, 100);
          this.drawEye(100, 100);

          break;
        default:

      }
    },

    // move(dx, dy) {
    //     this.x += dx;
    //     this.y += dy;
    // }
};
