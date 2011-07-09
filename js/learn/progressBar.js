function ProgressBar(engine) {
   var HEIGHT_FRACTION = 0.07;

   var that = {};
   var progressBoxes = [];

   var div = document.getElementById('progressBarDiv');

   function init() {
   }

   that.getHeight = function() {
      return $('#progressBarDiv').height();
   }

   that.renderLessons = function(progressModel) {
      // Remove all the old lessons
      for (var i = 0; i < progressBoxes.length; i++) {
         progressBoxes[i].deleteDiv();
      }
      progressBoxes.length = 0;
      
      var numLessons = progressModel.getNumLessons();
      for (var i = 0; i < numLessons; i++) {
         var status = progressModel.getLessonStatus(i + 1);
         progressBoxes.push(ProgressBox(engine, i + 1, status));
      }
   }

   that.updateLessons = function(progressModel) {
      var numLessons = progressModel.getNumLessons();
      for (var i = 0; i < numLessons; i++) {
         var status = progressModel.getLessonStatus(i + 1);
         progressBoxes[i].setStatus(status);
      }
   }

   that.resize = function() {
      var contentHeight = $('#content').height();
      var progressHeight = contentHeight * HEIGHT_FRACTION;
      div.style.height = progressHeight + 'px';
   
      var y = contentHeight - progressHeight;
      div.style.top = (y) + 'px';
      for (var i = 0; i < progressBoxes.length; i++) {
         progressBoxes[i].setPos(i, progressBoxes.length);
      }
   }

   init();
   return that;

}
