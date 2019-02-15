'use strict';

/**
 * Shape object
 */
var Shape = {
    init(cv, x, y, width, height, color, price, stype) {
        this.ctx = cv.context;
        this.x = Number(x);
        this.y = Number(y);
        this.width = Number(width);
        this.height = Number(height);
        this.price = Number(price);
        this.stype = stype;
        this.color = color;
    },

    draw() {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.stype === 'chimney') {
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        if (this.stype === 'door') {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + this.getWidth(),
                       this.y + this.getWidth());
            this.ctx.arc(this.x + this.getWidth(),
                       this.y + this.getWidth(),
                       this.getWidth(),
                       Math.PI * 0.5,
                       Math.PI * 1.5,
                       false);
            this.ctx.stroke();
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.lineWidth = 3;
            this.ctx.fillStyle = '#999';
            this.ctx.arc(this.x + this.getWidth(),
                       this.y + this.getWidth(),
                       this.getWidth(),
                       Math.PI * 1.5,
                       Math.PI * 1.1,
                       true);
            this.ctx.lineTo(this.x + this.getWidth(),
                       this.y + this.getWidth())
            this.ctx.fill();
            this.ctx.stroke();
        }
    },

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    },

    getX() {
        return this.x;
    },
    setX(x) {
        this.x = x;
    },
    getY() {
        return this.y;
    },
    setY(y) {
        this.y = y;
    },
    setContext(cv) {
        this.ctx = cv.context;
    },
    getWidth() {
        return this.width;
    },
    getHeight() {
        return this.height;
    },
    getColor() {
        return this.color;
    },
    getPrice() {
        return this.price;
    },
    getType() {
        return this.stype;
    },
    toString() {
        console.log('x: '+this.x+', y: '+this.y+
                     ', width: '+this.width+', height: '+this.height+
                     ', color: '+this.color+
                     ', type: '+this.stype+
                     ', price: '+this.price);
    },

    isOverlapping(obj) {
    /*
     *  http://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
     */
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
        }

        var thisleft = this.x;
        var thisright = this.x + this.getWidth();
        var thistop = this.y;
        var thisbottom = this.y + this.getHeight();

        var objleft = obj.x;
        var objright = obj.x + obj.getWidth();
        var objtop = obj.y;
        var objbottom = obj.y + obj.getHeight();

        if (!(thisleft > objright ||
               thisright < objleft ||
               thistop > objbottom ||
               thisbottom < objtop)) {
            return true;
        } else {
            return false;
        }
    },

    isChimneyRules(ev) {
        var rcw = false;
        var rch = false;
        if ((this.x + this.getWidth()) > (this.ctx.canvas.width - this.getWidth())) {
            this.x = this.ctx.canvas.width - this.getWidth();
            rcw = true;
        }
        if ((this.y + this.getHeight()) > (this.ctx.canvas.height - this.getHeight())) {
            this.y = this.ctx.canvas.height - this.getHeight();
            rch = true;
        }

        if (this.x < this.getWidth() && rcw === false) {
            this.x = 0;
            rcw = true;
        }
        if (this.y < this.getHeight() && rch === false) {
            this.y = 0;
            rch = true;
        }
        return (rcw || rch);
    },

    isDoorRules(ev) {
        var rcw = false;
        var rch = false;
        if ((this.x + this.getWidth()) > (this.ctx.canvas.width - this.getWidth())) {
            this.x = this.ctx.canvas.width - this.getWidth();
            rcw = true;
        }
        if ((this.y + this.getHeight()) > (this.ctx.canvas.height - this.getHeight())) {
            this.y = this.ctx.canvas.height - this.getHeight();
            rch = true;
        }

        if (this.x < this.getWidth() && rcw === false) {
            this.x = 0;
            rcw = true;
        }
        if (this.y < this.getHeight() && rch === false) {
            this.y = 0;
            rch = true;
        }
        return (rcw || rch);
    },

    isFullyInsideRoom(ev) {
        if (this.x + this.getWidth() > this.ctx.canvas.width
            || this.y + this.getHeight() > this.ctx.canvas.height) {
            return false;
        } else {
            return true;
        }
    },

    move(x, y) {
        this.x = x;
        this.y = y;
    }
};
