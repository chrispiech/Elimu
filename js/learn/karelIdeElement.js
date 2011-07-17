function KarelIdeElement() {
   var that = {};

   var dim = {'left':0, 'top':0, 'width':1, 'height':1};
   that.div = document.createElement('div');
   that.div.id = 'ide';
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);

   
   var editorDim = {'left':0.01, 'top':0.01, 'width':0.39, 'height':0.98};
   var canvasDim = {'left':0.41, 'top':0.01, 'width':0.58, 'height':0.98};

   var karelDiv = that.div; 
   var editor = KarelEditorElement(editorDim, 'ide');
   var canvas = KarelCanvasElement(canvasDim, 'ide');
   
   var karelIde = KarelIde(editor.getEditor(), canvas.getCanvas(), '4x4.w');
   

   var resize = that.resize;
   that.resize = function() {
      resize();
      editor.resize();
      canvas.resize();
      karelIde.resizeCanvas(canvas.width, canvas.height);
   }

   that.getIde = function() {
      return karelIde;
   }
   
   that.resize();

   return that;
}
