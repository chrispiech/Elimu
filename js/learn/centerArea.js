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

   that.renderLesson = function(progressModel) {
      // clear everything that used to be in the center area
      for (var i = 0; i < elements.length; i++) {
         elements[i].deleteDiv();
      }
      elements.length = 0;

      var unitIndex = progressModel.getUnitIndex();
      var lessonIndex = progressModel.getLessonIndex();

      // For now just render the first lesson of the first unit
      if (unitIndex == 1 && lessonIndex == 1) {
         renderFirstLesson();
      }
      if (unitIndex == 1 && lessonIndex == 2) {
         renderSecondLesson();
      }

      for (var i = 0; i < elements.length; i++) {
         elements[i].resize();
      }
   }

   function renderSecondLesson() {
      var dynamicDim = {'left':0.17, 'top':0.2, 'width':0.3, 'height':0.5};
      var staticDim = {'left':0.53, 'top':0.2, 'width':0.3, 'height':0.5};
      var staticKarel = KarelCanvasElement(staticDim,'moveSoln.w');
      var dynamicKarel = KarelCanvasElement(dynamicDim,'move.w');
      elements.push(staticKarel);
      elements.push(dynamicKarel);
   }

   function renderFirstLesson() {
      var imageDim1 = {'left':0.169, 'top':0.1, 'width':0.316, 'height':0.42};
      var imageDim2 = {'left':0.515, 'top':0.1, 'width':0.316, 'height':0.42};
      var imageDim3 = {'left':0.169, 'top':0.55, 'width':0.316, 'height':0.42};
      var imageDim4 = {'left':0.515, 'top':0.55, 'width':0.316, 'height':0.42};
      var textDim = {'left':0.342, 'top':0.014, 'width':0.316, 'height':0.074};
      elements.push(ImageButton(imageDim1));
      elements.push(ImageButton(imageDim2));
      elements.push(ImageButton(imageDim3));
      elements.push(ImageButton(imageDim4));
      elements.push(TextElement(textDim, 'text'));
   }

   return that;

}
