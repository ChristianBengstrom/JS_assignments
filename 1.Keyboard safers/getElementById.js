// function $(x) {
//     return dokument.getElementById(x);
// }

// const $ = function(x) {
//     return dokument.getElementById(x);
// }

// define $ as ID selector
let $= (x) => {
  return document.getElementById(x);
};
 // then use:
 let bg = $('myDiv');
