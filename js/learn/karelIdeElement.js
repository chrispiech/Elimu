function KarelIdeElement() {
   var that = {};

   var IDE_INSET = 0.06;

   var dim = {left:IDE_INSET, top:IDE_INSET, width:(1-IDE_INSET*2), height:(1-IDE_INSET*2)};
   that.div = document.createElement('div');
   that.div.id = 'ide';
   that = MakeAbsoluteDiv(that, 'centerAreaDiv', dim);

   var BUTTON_HEIGHT = 0.1;
   var EDITOR_WIDTH = 0.42;
   var MESSAGE_HEIGHT = 0.06;
   var MESSAGE_WIDTH = 0.4;
   var editorDim = {left:0, top:BUTTON_HEIGHT, width:EDITOR_WIDTH, height:1-BUTTON_HEIGHT};
   var canvasDim = {left:EDITOR_WIDTH+0.01, top:BUTTON_HEIGHT, width:1-EDITOR_WIDTH-0.02, height:1-BUTTON_HEIGHT};
   var buttonBarDim = {left:0, top:0, width:1, height:BUTTON_HEIGHT};
   var messageDim = {left:(1-MESSAGE_WIDTH)/2, top:0, width:MESSAGE_WIDTH, height:MESSAGE_HEIGHT};

   var karelDiv = that.div; 
   
   var editor = KarelEditorElement(editorDim, 'ide');
   var canvas = KarelCanvasElement(canvasDim, 'ide');
   var messageElement = KarelIdeMessage(messageDim, 'ide');
   
   var karelIde = KarelIde(editor.getEditor(), canvas.getCanvas(), '4x4.w');

   var buttonBar = KarelIdeButtons(buttonBarDim, 'ide', karelIde);

   that.animateCode = function(starterCodeFile) {
      var starterCodePath = './karelCode/' + starterCodeFile;
      loadDoc(starterCodePath, starterCodeLoaded);
   }
   
   var resize = that.resize;
   that.resize = function() {
      resize();
      editor.resize();
      canvas.resize();
      karelIde.resizeCanvas(canvas.width, canvas.height);
      buttonBar.resize();
      messageElement.resize();
   }

   that.getIde = function() {
      return karelIde;
   }
   
   that.resize();

   function starterCodeLoaded(code) {
      editor.animateCode(code);
   }

   return that;
}
