function TextButton(dim, text, parentId, clickCallback) {


   var that = TextElement(dim, text, parentId);
   that.div.className = 'roundedButton';

   that.textSpan.onclick = function() {
      clickCallback();
   }

   var resizeFn = that.resize;
   that.resize = function() {
      resizeFn();
      
      that.textSpan.style.fontSize = that.height + 'px';
      that.textSpan.style.lineHeight = that.height + 'px';
   }
   
   return that;
}
