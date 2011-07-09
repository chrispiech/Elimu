function Content() {
   var ASPECT_RATIO = 1.33;

   var that = {};
   var div = document.getElementById('content');

   that.resize = function() {
      windowWidth = $(window).width(); 
      windowHeight = $(window).height();

      var widthScale = windowWidth / ASPECT_RATIO;
      var heightScale = windowHeight;
      var scale = Math.min(widthScale, heightScale);

      var width = ASPECT_RATIO * scale;
      var height = scale;

      var x = (windowWidth - width) / 2;
      var y = (windowHeight - height) / 2;
      
      div.style.width = width + 'px';
      div.style.height = height + 'px';
      div.style.top = y + 'px';
      div.style.left = x + 'px';
   }

   that.getHeight = function() {
      return $('#content').height();
   }

   return that;
}
