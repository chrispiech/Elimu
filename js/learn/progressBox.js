function ProgressBox(parent, status) {

   var HEIGHT = 30;
   var WIDTH = 30;
   var SPACING = 10;

   var that = {};

   var div = document.createElement('div');
   
   function init () {
      div.className = 'progressBox' + status;

      var progressBarHeight = $('#progressBarDiv').height();
      var y = (progressBarHeight - HEIGHT)/2;
      div.style.top = y + 'px';
      parent.appendChild(div);
   }

   that.setPos = function(index, elements) {
      var boxesWidth = elements * WIDTH + (elements - 1) * SPACING;
      var boxesLeft = ($(window).width() - boxesWidth)/2;
      var offset = index * (WIDTH + SPACING);
      var left = boxesLeft + offset;
      div.style.left = left + 'px';
   }
   
   init();
   return that;
}
