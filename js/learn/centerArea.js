function CenterArea() {

   var that = {};

   var div = document.getElementById('centerAreaDiv');

   that.setHeight = function(height) {
      div.style.height = height + 'px';
   }  

   that.setTop = function(top) {
      div.style.top = top + 'px';
   }

   that.resize = function() {
      for (var i = 0; i < that.lesson.elements.length; i++) {
         that.lesson.elements[i].resize();
      }
   }

   that.fadeOutElements = function(finishedCallback) {
      for (var i = 0; i < that.lesson.elements.length; i++) {
         $(that.lesson.elements[i].div).fadeOut(600);
      }
      setTimeout(finishedCallback, 600);
   }

   that.createLesson = function(progressModel, lessonsModel, finishCallback) {
      // clear everything that used to be in the center area
      if (that.lesson) {
         for (var i = 0; i < that.lesson.elements.length; i++) {
            that.lesson.elements[i].deleteDiv();
         }
      }

      that.lesson = lessonsModel.createLesson(progressModel, finishCallback);

      that.resize();
      
      for (var i = 0; i < that.lesson.elements.length; i++) {
         $(that.lesson.elements[i].div).fadeIn(1000);
      }

      that.resize();
   }

   

   return that;

}
