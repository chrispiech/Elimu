function KarelStaticCanvasElement(dim, worldName) {
   var that = {};
   that.div = document.createElement('canvas');
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);

   var karelIde = KarelIde(null, that.div, worldName);

   var resize = that.resize;
   that.resize = function() {
      resize();
      karelIde.resizeCanvas(that.width, that.height);
   }

   that.getIde = function() {
      return karelIde;
   }
   
   that.resize();

   return that;
}
