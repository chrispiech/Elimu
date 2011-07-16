function TextElement(dim, text, parentId) {
   var that = {};
   that.div = document.createElement('div');
   that = MakeAbsoluteDiv(that, parentId, dim);
   that.textSpan = document.createElement('p');
   that.textSpan.innerHTML = text;
   that.textSpan.className = 'centeredText';
   that.div.appendChild(that.textSpan);
   

   disableSelection(that.textSpan);

   var resizeFn = that.resize;
   that.resize = function() {
      resizeFn();
      var centerHeight = $('#' + parentId).height();
      var height = that.heightFraction * centerHeight;
      that.textSpan.style.fontSize = height + 'px';
      that.textSpan.style.lineHeight = height + 'px';
   }

   that.setText = function(text) {
      that.textSpan.innerHTML = text;
   }

   that.setClassName = function(className) {
      that.div.className = 'rounded';
   }

   that.setBackgroundColor = function(color) {
      that.div.style.background = color;
   }

   that.setTextColor = function(color) {
      that.div.style.color = color;
   }
   
   return that;
}
