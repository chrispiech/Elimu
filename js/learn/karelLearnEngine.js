function KarelLearnEngine() {

   var that = {};

   var windowWidth = $(window).width();
   var windowHeight = $(window).height();
   var topicIndex = 0;
   var slideIndex = 0;
   var content = Content();
   
   var progressModel = ProgressModel();
   var progressBar = ProgressBar(that);
   var headder = Header();
   var centerArea = CenterArea();

   that.onWindowResize = function() {
      resize();
   }

   that.changeLesson = function(lesson) {
      progressModel.changeLesson(lesson);
      progressBar.updateLessons(progressModel);
   }

   function init() {
      progressBar.renderLessons(progressModel);
   }

   function resize() {
      windowWidth = $(window).width(); 
      windowHeight = $(window).height();

      content.resize();
      progressBar.resize();
      headder.resize();

      var bodyHeight = content.getHeight();
      bodyHeight -= progressBar.getHeight();
      bodyHeight -= headder.getHeight();

      centerArea.setTop (headder.getHeight());
      centerArea.setHeight(bodyHeight);
      centerArea.resize();
 
   }

   
   init();
   resize();
   return that;
}
