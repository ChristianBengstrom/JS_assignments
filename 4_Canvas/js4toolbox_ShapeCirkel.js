/*globals document, window */
'use strict';

/**
 * Shape object
 */
let ShapeCirkel = {
    init(cv, x, y, radius, sAngle, counterclockwise ,color) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sAngle = sAngle;
        this.counterclockwise = counterclockwise;
        this.color = color;
    },

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, this.sAngle, 2 * Math.PI);
        this.ctx.fill();
    },

    // move(dx, dy) {
    //     this.x += dx;
    //     this.y += dy;
    // }
};
