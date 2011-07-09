function MakeAbsoluteDiv(that, parentId, dim) {

   that.widthFraction = dim.width;
   that.heightFraction = dim.height;
   that.leftFraction = dim.left;
   that.topFraction = dim.top;

   that.init = function() {
      that.div.className = 'absoluteDiv';
      document.getElementById(parentId).appendChild(that.div);
   }
   
   that.deleteDiv = function() {
      document.getElementById(parentId).removeChild(that.div);
   }

   that.resize = function() {
      var centerHeight = $('#' + parentId).height();
      var centerWidth = $('#' + parentId).width();

      var width = that.widthFraction * centerWidth;
      var height = that.heightFraction * centerHeight;
      var left = that.leftFraction * centerWidth;
      var top = that.topFraction * centerHeight;

      that.div.style.left = left + 'px';
      that.div.style.top = top + 'px';
      that.div.style.width = width + 'px';
      that.div.style.height = height + 'px';
   }

   that.init();

   return that;
}
