function KarelLearnEngine() {

   var that = {};

   var windowWidth = $(window).width();
   var windowHeight = $(window).height();
   var topicIndex = 0;
   var slideIndex = 0;
   var content = Content();
   
   var progressModel = ProgressModel();
   var lessonsModel = LessonsModel();

   that.header = Header();
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
      console.log('render');
      if (newUnit) {
         that.progressBar.createLessonIcons(progressModel);
      } else {
         that.progressBar.updateLessonIcons(progressModel);
      }
     
      that.centerArea.createLesson(progressModel, lessonsModel, lessonFinished);
      that.header.updateHeader(progressModel);
      progressModel.setHash();
   }

   function init() {
      render(true);
      resize();
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
      that.header.resize();

      var bodyHeight = content.getHeight();
      bodyHeight -= that.progressBar.getHeight();
      bodyHeight -= that.header.getHeight();

      that.centerArea.setTop (that.header.getHeight());
      that.centerArea.setHeight(bodyHeight);
      that.centerArea.resize();
   }

   
   init();
   return that;
}
