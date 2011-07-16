function ProgressBox(engine, index, status) {

   var HEIGHT_FRACTION = 0.55;
   var SPACING_FRACTION = HEIGHT_FRACTION / 3;

   var that = {};

   var div = document.createElement('div');
   var current  = false;
   
   function init () {
      div.className = 'progressBox';
      div.onclick = onClick;
      div.onmouseover = onMouseOver;
      div.onmouseout = onMouseOut;
      div.onmousedown = onMouseDown;
      div.onmouseup = onMouseUp;
      setDefault();
      document.getElementById('progressBarDiv').appendChild(div);
   }

   that.deleteDiv = function() {
      document.getElementById('progressBarDiv').removeChild(div);
   }

   that.setStatus = function(newStatus) {
      if (newStatus != status) {
         status = newStatus;
         setDefault();
      }
   }

   that.setCurrent = function(newCurrnet) {
      if (newCurrnet != current) {
         current = newCurrnet;
         setDefault();
      }
   }

   function onClick() {
      engine.changeLesson(index);
   }

   function onMouseUp() {
      div.style.background = 'blue';
   }

   function onMouseDown() {
      div.style.background = 'orange';
   }

   function onMouseOver() {
      div.style.background = 'blue';
   }

   function onMouseOut() {
      setDefault();
   }

   function setDefault() {
      if (current) {
         div.style.background = 'white';
      } else if (status == 'notStarted' || status == 'none') {
         div.style.background = 'grey';
      } else if (status == 'finished') {
         div.style.background = 'green';
      } else if (status == 'started') {
         div.style.background = 'lightblue';
      } else {
         throw 'status incorectly formated';
      }
   }

   that.setPos = function(drawIndex, elements) {
      var progressHeight = $('#progressBarDiv').height();
      var progressWidght = $('#progressBarDiv').width();
      var height = HEIGHT_FRACTION * progressHeight;
      var spacing = SPACING_FRACTION * progressHeight;
      var width = height;
   
      var boxesWidth = elements * width + (elements - 1) * spacing;
      var boxesLeft = (progressWidght - boxesWidth)/2;
      var offset = drawIndex * (width + spacing);
      var left = boxesLeft + offset;
      var top = 0.35* progressHeight;
      
      div.style.left = left + 'px';
      div.style.top = top + 'px';
      div.style.width = width + 'px';
      div.style.height = height + 'px';
   }
   
   init();
   return that;
}
