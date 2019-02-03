'use strict';

let ready = function () {
  var slider = $("slider");
  var output = $("output");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
  output.innerHTML = this.value;
  };
};

/*
 * activate theFunction when document has finished loading
 */
window.addEventListener('load', ready);
