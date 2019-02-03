'use strict';
/*
 * davis.js
 */
let empty = function (target) {
    let foo = target;
    // Removing all children from an element
    while (foo.firstChild) {
        foo.removeChild(foo.firstChild);
    }
}

let fillLeft = function (target) {
    let art = target;

    let img = document.createElement('img'); // create element
    img.setAttribute('src', 'http://x15.dk/webdev/code/jsn/book-icon.png');
    img.setAttribute('alt', 'book icon');
    img.setAttribute('width', '64');

    let h1 = document.createElement('h1'); // create element
    let txt = document.createTextNode('Always'); // create text
    h1.appendChild(txt); // put on tree

    let par = document.createElement('p'); // create element
    if (target.id == 'center') {
      h1.setAttribute('style','color: yellow');
      par.setAttribute('style','color: yellow');
    }
    txt = document.createTextNode("You could have four columns here but you won't. You'll have three like everyone else."); // create text
    par.appendChild(txt); // put onto tree

    art.appendChild(img);
    art.appendChild(h1);
    art.appendChild(par);
}

let t1 = function (ev) {
    let target = ev.target || ev.srcElement;
    let id = target.id;
    // alert(id);
    let elm = $(id);
    if (target.innerHTML !== '') {
        empty(elm);
    } else {
        switch (id) {
            case 'left': fillLeft(elm); break;
            case 'center': fillLeft(elm); break;
            case 'right': fillLeft(elm); break;
        }
    }
}

let initialize = function () {
    let left = $('left');
    fillLeft(left);
    left.addEventListener('click', t1, false);

    let center = $('center');
    fillLeft(center);
    center.addEventListener('click', t1, false);

    let right = $('right');
    fillLeft(right);
    right.addEventListener('click', t1, false);
}

window.addEventListener('load', initialize);
