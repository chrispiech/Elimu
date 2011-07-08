function ProgressBar(parent) {
   var PROGRESS_BAR_HEIGHT = 60;

   var that = {};
   var progressBoxes = [];

   var progressBarDiv = document.getElementById('progressBarDiv');

   function init() {
      progressBarDiv.style.height = PROGRESS_BAR_HEIGHT + 'px';
      progressBoxes.push(ProgressBox(progressBarDiv, 'Finished'));
      progressBoxes.push(ProgressBox(progressBarDiv, 'NotStarted'));
      
      progressBoxes.push(ProgressBox(progressBarDiv, 'NotStarted'));
      progressBoxes.push(ProgressBox(progressBarDiv, 'NotStarted'));
      
      render();
   }

   that.onWindowResize = function() {
      render();
   }

   function render() {
      var y = $(window).height() - PROGRESS_BAR_HEIGHT;
      progressBarDiv.style.top = (y) + 'px';
      for (var i = 0; i < progressBoxes.length; i++) {
         progressBoxes[i].setPos(i, progressBoxes.length);
      }
   }

   init();
   return that;

}
