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
   }

   return that;

}
