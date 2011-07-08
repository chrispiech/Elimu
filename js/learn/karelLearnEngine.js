function KarelLearnEngine() {
   var that = {};

   var windowWidth = $(window).width();
   var windowHeight = $(window).height();
   var topicIndex = 0;
   var slideIndex = 0;
   var progressBar = ProgressBar(document.body);

   that.onWindowResize = function() {
      windowWidth = $(window).width(); 
      windowHeight = $(window).height();
      progressBar.onWindowResize();
      console.log(windowWidth);
   }

   return that;
}
