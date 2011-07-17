function KarelEditorElement(dim, parentId) {

   var that = {};

   that.div = document.createElement('div');
   that = MakeAbsoluteDiv(that, parentId, dim);
   //document.getElementById(parentId).appendChild(that.div);

   that.div.innerHTML = '//hello world';
   that.div.className = 'code';
   that.div.id        = 'code';
   var editor = ace.edit('code');
   editor.setTheme('ace/theme/jeremys');
   var JavaScriptMode = require("ace/mode/javascript").Mode;
   editor.getSession().setMode(new JavaScriptMode());
   that.div.style.fontSize='16px';

   that.getEditor = function() {
      return editor;
   }

   return that;

}
