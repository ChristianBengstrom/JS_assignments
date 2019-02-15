let jsonHandler = function(eve) {
    /* ajax load event
     * create a table in the DOM
     * and loop the received JSON
     * into the table as rows
     */
    console.log(eve.target.getResponseHeader('Content-Type'));
    console.log(eve.target.responseText);
    let jsonObj = JSON.parse(eve.target.responseText);
    $('verylatest').innerHTML = "";
    let tab = document.createElement('table');
    console.log(jsonObj[0].id);
    for (let i = 0; i < jsonObj.length; i++) {
        let r = document.createElement('tr');

        let c1 = document.createElement('td');
        let t = document.createTextNode(jsonObj[i].id);
        c1.appendChild(t);
        r.appendChild(c1);

        let c2 = document.createElement('td');
        t = document.createTextNode(jsonObj[i].name);
        c2.appendChild(t);
        r.appendChild(c2);

        let c3 = document.createElement('td');
        t = document.createTextNode(jsonObj[i].population);
        c3.appendChild(t);
        r.appendChild(c3);

        tab.appendChild(r);
    }
    $('verylatest').appendChild(tab);
};

/*
 *  Assign handlers (functions) to the buttons
 */
let showStarter = function () {
    // getContent();
    $('jsonvar').addEventListener('click', getContent);
}

let contentDist = 'pullDataFromDB.php';
let handler = 'jsonHandler';
// getContent(contentDist, handler);

window.addEventListener('load', showStarter);       // kick off JS
