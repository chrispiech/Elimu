function AddEqualCheck(ide1, ide2, action, callback) {
   return function() {
      action();
      var model1 = ide1.getModel();
      var model2 = ide2.getModel();
      if (model1.equals(model2)) {
         callback();
      }
   }
}

function Unit2Lesson1(finishedCallback) {
   var that = {};
   that.elements = [];
   return that;
}

function Unit1Lesson5(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.201, 'top':0.2, 'width':0.2666, 'height':0.3};
   var staticDim = {'left':0.532, 'top':0.2, 'width':0.2666, 'height':0.3};
   var staticKarel = KarelCanvasElement(staticDim,'ledgeSoln.w');
   var dynamicKarel = KarelCanvasElement(dynamicDim,'ledge.w');
   var textDim1 = {'left':0.185, 'top':0.1, 'width':0.3, 'height':0.074};
   var textDim2 = {'left':0.515, 'top':0.1, 'width':0.3, 'height':0.074};
   var buttonDim1 = {'left':0.185, 'top':0.65, 'width':0.3, 'height':0.12};
   var buttonDim2 = {'left':0.515, 'top':0.65, 'width':0.3, 'height':0.12};
   var buttonDim3 = {'left':0.185, 'top':0.8, 'width':0.3, 'height':0.12};
   var buttonDim4 = {'left':0.515, 'top':0.8, 'width':0.3, 'height':0.12};
   var ide = dynamicKarel.getIde();

   that.elements = [];
   that.elements.push(staticKarel);
   that.elements.push(dynamicKarel);
   that.elements.push(TextElement(textDim1, 'World'));
   that.elements.push(TextElement(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);
   var leftEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepTurnLeft, finishedCallback);
   var putEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPutBeeper, finishedCallback);
   var pickEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPickBeeper, finishedCallback);
   
   that.elements.push(TextButton(buttonDim1, '<b>move();</b>', moveEvent));
   that.elements.push(TextButton(buttonDim2, '<b>turnLeft();</b>', leftEvent));
   that.elements.push(TextButton(buttonDim3, '<b>putBeeper();</b>', putEvent));
   that.elements.push(TextButton(buttonDim4, '<b>pickBeeper();</b>', pickEvent));

   return that;
}

function Unit1Lesson4(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.185, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticDim = {'left':0.515, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticKarel = KarelCanvasElement(staticDim,'putBeeperSoln.w');
   var dynamicKarel = KarelCanvasElement(dynamicDim,'putBeeper.w');
   var textDim1 = {'left':0.185, 'top':0.1, 'width':0.3, 'height':0.074};
   var textDim2 = {'left':0.515, 'top':0.1, 'width':0.3, 'height':0.074};
   var buttonDim1 = {'left':0.185, 'top':0.65, 'width':0.3, 'height':0.12};
   var buttonDim2 = {'left':0.515, 'top':0.65, 'width':0.3, 'height':0.12};
   var buttonDim3 = {'left':0.185, 'top':0.8, 'width':0.3, 'height':0.12};
   var buttonDim4 = {'left':0.515, 'top':0.8, 'width':0.3, 'height':0.12};
   var ide = dynamicKarel.getIde();

   that.elements = [];
   that.elements.push(staticKarel);
   that.elements.push(dynamicKarel);
   that.elements.push(TextElement(textDim1, 'World'));
   that.elements.push(TextElement(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);
   var leftEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepTurnLeft, finishedCallback);
   var putEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPutBeeper, finishedCallback);
   var pickEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPickBeeper, finishedCallback);
   
   that.elements.push(TextButton(buttonDim1, '<b>move();</b>', moveEvent));
   that.elements.push(TextButton(buttonDim2, '<b>turnLeft();</b>', leftEvent));
   that.elements.push(TextButton(buttonDim3, '<b>putBeeper();</b>', putEvent));
   that.elements.push(TextButton(buttonDim4, '<b>pickBeeper();</b>', pickEvent));
   return that;
}

function Unit1Lesson3(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.235, 'top':0.2, 'width':0.2, 'height':0.3};
   var staticDim = {'left':0.565, 'top':0.2, 'width':0.2, 'height':0.3};
   var staticKarel = KarelCanvasElement(staticDim,'turnLeftSoln.w');
   var dynamicKarel = KarelCanvasElement(dynamicDim,'turnLeft.w');
   var textDim1 = {'left':0.185, 'top':0.1, 'width':0.3, 'height':0.074};
   var textDim2 = {'left':0.515, 'top':0.1, 'width':0.3, 'height':0.074};
   var buttonDim1 = {'left':0.185, 'top':0.7, 'width':0.3, 'height':0.12};
   var buttonDim2 = {'left':0.515, 'top':0.7, 'width':0.3, 'height':0.12};
   var ide = dynamicKarel.getIde();

   that.elements = [];
   that.elements.push(staticKarel);
   that.elements.push(dynamicKarel);
   that.elements.push(TextElement(textDim1, 'World'));
   that.elements.push(TextElement(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);
   var leftEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepTurnLeft, finishedCallback);
   
   that.elements.push(TextButton(buttonDim1, '<b>move();</b>', moveEvent));
   that.elements.push(TextButton(buttonDim2, '<b>turnLeft();</b>', leftEvent));
   return that;
}

function Unit1Lesson2(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.185, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticDim = {'left':0.515, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticKarel = KarelCanvasElement(staticDim,'moveSoln.w');
   var dynamicKarel = KarelCanvasElement(dynamicDim,'move.w');
   var textDim1 = {'left':0.185, 'top':0.1, 'width':0.3, 'height':0.074};
   var textDim2 = {'left':0.515, 'top':0.1, 'width':0.3, 'height':0.074};
   var buttonDim1 = {'left':0.35, 'top':0.7, 'width':0.3, 'height':0.12};
   var ide = dynamicKarel.getIde();

   that.elements = [];
   that.elements.push(staticKarel);
   that.elements.push(dynamicKarel);
   that.elements.push(TextElement(textDim1, 'World'));
   that.elements.push(TextElement(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);    
   
   that.elements.push(TextButton(buttonDim1, '<b>move();</b>', moveEvent));
   return that;
}

function Unit1Lesson1(finishedCallback) {
   var that = {};
   var textDim = {'left':0.342, 'top':0.014, 'width':0.316, 'height':0.074};

   var positions = [
      {'left':0.169, 'top':0.1, 'width':0.316, 'height':0.42},
      {'left':0.515, 'top':0.1, 'width':0.316, 'height':0.42},
      {'left':0.169, 'top':0.55, 'width':0.316, 'height':0.42},
      {'left':0.515, 'top':0.55, 'width':0.316, 'height':0.42}
   ];

   var buttonSrcs = [
      './images/worldButtonFrame.png',
      './images/beeperButtonFrame.png',
      './images/karelButtonFrame.png',
      './images/wallButtonFrame.png'
   ];
   var indicies = [];
   for (var i = 0; i < buttonSrcs.length; i++){
      indicies.push(i);
   }
   var orderMap = [];
   for (var i = 0; i < buttonSrcs.length; i++) {
      var maxIndex = indicies.length;
      var randomIndex = Math.floor(Math.random()*maxIndex);
      orderMap.push(indicies[randomIndex]);
      indicies.splice(randomIndex, 1);
   }

   that.elements = [];
   for (var i = 0; i < buttonSrcs.length; i++) {
      var buttonIndex = orderMap[i];
      var button = ImageButton(positions[i], buttonSrcs[buttonIndex]);
      that.elements.push(button);
   }
   that.elements.push(TextElement(textDim, 'Karel'));
   return that;
}

function LessonsModel() {
   var that = {};
   var currentLesson;

   that.createLesson = function(progressModel, finishedCallback) {

      var unitIndex = progressModel.getUnitIndex();
      var lessonIndex = progressModel.getLessonIndex();

      var lessonName = 'Unit' + unitIndex + 'Lesson' + lessonIndex;

      currentLesson = window[lessonName](finishedCallback);
      return currentLesson.elements;
   }

   return that;
}

