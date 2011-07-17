function KarelIdeButtons(dim, parentId) {
   var BORDER_HEIGHT = 0.04;

   var that = {};
   that.div = document.createElement('div');
   that = MakeAbsoluteDiv(that, parentId, dim);
   that.div.id = 'ideButtonBar';

   var border = {};
   var borderDim = {left:0, top:1-BORDER_HEIGHT, width:1, height:BORDER_HEIGHT};
   border.div = document.createElement('div');
   border = MakeAbsoluteDiv(border, 'ideButtonBar', borderDim);
   border.div.id = 'ideButtonBarBorder';
   
   var resize = that.resize;
   that.resize = function() {
      resize();
      border.resize();
   }
   that.resize();
   return that;
}
