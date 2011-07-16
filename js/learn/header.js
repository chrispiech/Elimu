function Header() {
   var HEIGHT_FRACTION = 0.05;
   var LESSON_TITLE_X_FRACTION = 0.01;

   var that = {};

   var div = document.getElementById('headerDiv');

   var lessonTitle = TitleElement(LESSON_TITLE_X_FRACTION, '');

   that.getHeight = function() {
      return $('#headerDiv').height();
   }

   that.resize = function() {
      var contentHeight = $('#content').height();
      var headerHeight = contentHeight * HEIGHT_FRACTION;
      div.style.height = headerHeight + 'px';
      lessonTitle.resize();
   }

   that.updateHeader = function(progressModel) {
      var text = 'Unit ' + progressModel.getUnitIndex();
      text += ' Lesson ' + progressModel.getLessonIndex();
      lessonTitle.setText(text);
   }
   
   return that;

}
