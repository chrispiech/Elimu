function TextElement(dim, text) {
   var that = {};
   that.div = document.createElement('div');
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);
   var textSpan = document.createElement('p');
   textSpan.innerHTML = text;
   textSpan.className = 'centeredText';
   that.div.appendChild(textSpan);
   that.div.className = 'rounded';

   var resizeFn = that.resize;
   that.resize = function() {
      resizeFn();
      var centerHeight = $('#centerAreaDiv').height();
      var height = that.heightFraction * centerHeight;
      textSpan.style.fontSize = height + 'px';
      //textSpan.style.top = 
   }
   return that;
}
