function ImageButton(dim, src) {
   var that = {};
   that.div = document.createElement('img');
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);
   that.div.setAttribute('src', src);
   return that;
}
