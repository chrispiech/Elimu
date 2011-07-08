function ProgressBar(parent) {
   var PROGRESS_BAR_HEIGHT = 60;

   var that = {};
   var progressBoxes = [];

   var progressBarDiv = document.getElementById('progressBarDiv');

   function init() {
      progressBarDiv.style.height = PROGRESS_BAR_HEIGHT + 'px';
      render();
   }

   that.onWindowResize = function() {
      render();
   }

   function render() {
      var y = $(window).height() - PROGRESS_BAR_HEIGHT;
      progressBarDiv.style.top = (y) + 'px';
   }

   init();
   return that;

}
