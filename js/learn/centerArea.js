function CenterArea() {

   var that = {};

   var div = document.getElementById('centerAreaDiv');
   var elements = [];

   that.setHeight = function(height) {
      div.style.height = height + 'px';
   }  

   that.setTop = function(top) {
      div.style.top = top + 'px';
   }

   that.resize = function() {
      for (var i = 0; i < elements.length; i++) {
         elements[i].resize();
      }
   }

   that.createLesson = function(progressModel, lessonsModel, finishCallback) {
      // clear everything that used to be in the center area
      for (var i = 0; i < elements.length; i++) {
         elements[i].deleteDiv();
      }
      elements.length = 0;

      elements = lessonsModel.createLesson(progressModel, finishCallback);

      for (var i = 0; i < elements.length; i++) {
         elements[i].resize();
      }
   }

   

   return that;

}
