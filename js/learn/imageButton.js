function ImageButton(dim) {
   var that = {};
   that.div = document.createElement('img');
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);
   that.div.setAttribute('src', './images/imageButtonFrame.png');
   return that;
}
