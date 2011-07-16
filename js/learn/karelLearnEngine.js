function KarelLearnEngine() {

   var that = {};

   var windowWidth = $(window).width();
   var windowHeight = $(window).height();
   var topicIndex = 0;
   var slideIndex = 0;
   var content = Content();
   
   var progressModel = ProgressModel();
   var lessonsModel = LessonsModel();
   var headder = Header();

   that.centerArea = CenterArea();
   that.progressBar = ProgressBar(that);

   that.onWindowResize = function() {
      resize();
   }

   that.onHashChange = function () {
      var previousUnit = progressModel.getUnitIndex();
      progressModel.loadHash();
      var newUnit = progressModel.getUnitIndex() != previousUnit;
      render(newUnit);
   }

   that.changeLesson = function(lesson) {
      progressModel.changeLesson(lesson);
      render(false);
   }

   function render(newUnit) {
      if (newUnit) {
         that.progressBar.createLessonIcons(progressModel);
      } else {
         that.progressBar.updateLessonIcons(progressModel);
      }
      that.centerArea.createLesson(progressModel, lessonsModel, lessonFinished);
   }

   function init() {
      render(true);
   }

   function lessonFinished() {
      progressModel.finishedLesson();
      // you should do some sort of animation!
      setTimeout(finishedChangeAnimation,500);
   }

   function finishedChangeAnimation() {
      render(progressModel.isStartingNewUnit());      
   }

   function resize() {
      windowWidth = $(window).width(); 
      windowHeight = $(window).height();

      content.resize();
      that.progressBar.resize();
      headder.resize();

      var bodyHeight = content.getHeight();
      bodyHeight -= that.progressBar.getHeight();
      bodyHeight -= headder.getHeight();

      that.centerArea.setTop (headder.getHeight());
      that.centerArea.setHeight(bodyHeight);
      that.centerArea.resize();
   }

   
   init();
   return that;
}
