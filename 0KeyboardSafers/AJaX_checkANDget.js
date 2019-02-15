'use strict';

// test if browser has XMLHttpRequest object / compatibility
let ajax = () => {
    let ajaxobj = false;
    try {
        ajaxobj = new XMLHttpRequest();
    } catch(err) {
        window.alert(err.message + "Get yourself a new browser");
    }
    return ajaxobj;
};

// get the AJaX content IF browser is compatible
let getContent = (url, toDoNext) => {
    let request = ajax();
    if (request) {
        request.addEventListener('load', jsonHandler);
        request.open('GET', url);
        request.send(null);
    } else {
        window.alert('Your browser does not support XMLHttpRequest');
    }
}
/*
 * readystatechange 'load' event handler
 * aka callback function
 * for the above AJaX
 */
