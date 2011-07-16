function Header() {
   var HEIGHT_FRACTION = 0.05;

   var that = {};

   var div = document.getElementById('headerDiv');

   that.getHeight = function() {
      return $('#headerDiv').height();
   }

   that.resize = function() {
      var contentHeight = $('#content').height();
      var headerHeight = contentHeight * HEIGHT_FRACTION;
      div.style.height = headerHeight + 'px';
   }
   
   return that;

}
