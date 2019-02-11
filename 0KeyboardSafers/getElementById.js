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

 let $c= (x) => {
   return document.getElementsByClassName(x);
 };

 // then use:
 let bt = $c('myClass');
