function TextButton(dim, text, clickCallback) {

   var that = {};
   that.div = document.createElement('div');
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);
   var textSpan = document.createElement('p');
   textSpan.innerHTML = text;
   textSpan.className = 'centeredText';
   textSpan.style.fontFamily = 'monospace';
   that.div.appendChild(textSpan);
   that.div.className = 'roundedButton';

   disableSelection(textSpan);
   var resizeFn = that.resize;
   that.resize = function() {
      resizeFn();
      var centerHeight = $('#centerAreaDiv').height();
      var height = that.heightFraction * centerHeight;
      textSpan.style.fontSize = height*.45 + 'px';
      textSpan.style.lineHeight = height + 'px';
   }

   textSpan.onclick = function() {
      clickCallback();
   }
   
   return that;
}
