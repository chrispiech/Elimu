function LessonsModel() {
   var that = {};
   var currentLesson;

   that.getNumUnits = function() {
      return 2;
   }

   that.getNumLessons = function(unit) {
      var lesson = 0;
      while (true) {
         var lessonName = 'Unit' + unit + 'Lesson' + (lesson + 1);
         var fn = window[lessonName];
         if(typeof fn != 'function') {
            break;
         }
         lesson += 1;
      }
      return lesson;
   }

   that.createLesson = function(progressModel, finishedCallback) {

      var unitIndex = progressModel.getUnitIndex();
      var lessonIndex = progressModel.getLessonIndex();

      var lessonName = 'Unit' + unitIndex + 'Lesson' + lessonIndex;

      currentLesson = window[lessonName](finishedCallback);
      return currentLesson;
   }

   return that;
}

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

   that.ide = KarelIdeElement();
   that.elements.push(that.ide);

   function animateCode() {
      that.ide.animateCode('borderRunSoln.js', finished);
   }
   
   function animateGoal() {
      
   }

   setTimeout(animateCode, 100);
   
   return that;
}

function Unit2Lesson2(finishedCallback) {
   var that = {};
   that.elements = [];
   return that;
}

function Unit1Lesson5(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.201, 'top':0.2, 'width':0.2666, 'height':0.3};
   var staticDim = {'left':0.532, 'top':0.2, 'width':0.2666, 'height':0.3};
   var staticKarel = KarelStaticCanvasElement(staticDim,'ledge.w');
   var dynamicKarel = KarelStaticCanvasElement(dynamicDim,'ledge.w');
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
   that.elements.push(TextBox(textDim1, 'World'));
   that.elements.push(TextBox(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);
   var leftEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepTurnLeft, finishedCallback);
   var putEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPutBeeper, finishedCallback);
   var pickEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPickBeeper, finishedCallback);

   that.buttons = [];
   that.buttons.push(KarelCommandButton(buttonDim1, '<b>move();</b>', moveEvent));
   that.buttons.push(KarelCommandButton(buttonDim2, '<b>turnLeft();</b>', leftEvent));
   that.buttons.push(KarelCommandButton(buttonDim3, '<b>putBeeper();</b>', putEvent));
   that.buttons.push(KarelCommandButton(buttonDim4, '<b>pickBeeper();</b>', pickEvent));
   for (var i = 0; i < that.buttons.length; i++ ) {
      that.elements.push(that.buttons[i]);
   }

   function animationFinished() {
      for(var i = 0; i < that.buttons.length; i++) {
         that.buttons[i].setEnabled();
      }
   }

   function startAnimation() {
      for(var i = 0; i < that.buttons.length; i++) {
         that.buttons[i].setDisabled();
      }
      staticKarel.animate('karelCode/unit1Lesson5Soln.js', animationFinished);
   } 

   setTimeout(startAnimation, 800);

   return that;
}

function Unit1Lesson4(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.185, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticDim = {'left':0.515, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticKarel = KarelStaticCanvasElement(staticDim,'putBeeper.w');
   var dynamicKarel = KarelStaticCanvasElement(dynamicDim,'putBeeper.w');
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
   that.elements.push(TextBox(textDim1, 'World'));
   that.elements.push(TextBox(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);
   var leftEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepTurnLeft, finishedCallback);
   var putEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPutBeeper, finishedCallback);
   var pickEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepPickBeeper, finishedCallback);

   that.buttons = [];
   that.buttons.push(KarelCommandButton(buttonDim1, '<b>move();</b>', moveEvent));
   that.buttons.push(KarelCommandButton(buttonDim2, '<b>turnLeft();</b>', leftEvent));
   that.buttons.push(KarelCommandButton(buttonDim3, '<b>putBeeper();</b>', putEvent));
   that.buttons.push(KarelCommandButton(buttonDim4, '<b>pickBeeper();</b>', pickEvent));

   for (var i = 0; i < that.buttons.length; i++ ) {
      that.elements.push(that.buttons[i]);
   }

   function animationFinished() {
      for(var i = 0; i < that.buttons.length; i++) {
         that.buttons[i].setEnabled();
      }
   }

   function startAnimation() {
      for(var i = 0; i < that.buttons.length; i++) {
         that.buttons[i].setDisabled();
      }
      staticKarel.animate('karelCode/unit1Lesson4Soln.js', animationFinished);
   } 

   setTimeout(startAnimation, 800);
   return that;
}

function Unit1Lesson3(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.235, 'top':0.2, 'width':0.2, 'height':0.3};
   var staticDim = {'left':0.565, 'top':0.2, 'width':0.2, 'height':0.3};
   var staticKarel = KarelStaticCanvasElement(staticDim,'turnLeft.w');
   var dynamicKarel = KarelStaticCanvasElement(dynamicDim,'turnLeft.w');
   var textDim1 = {'left':0.185, 'top':0.1, 'width':0.3, 'height':0.074};
   var textDim2 = {'left':0.515, 'top':0.1, 'width':0.3, 'height':0.074};
   var buttonDim1 = {'left':0.185, 'top':0.7, 'width':0.3, 'height':0.12};
   var buttonDim2 = {'left':0.515, 'top':0.7, 'width':0.3, 'height':0.12};
   var ide = dynamicKarel.getIde();

   that.elements = [];
   that.elements.push(staticKarel);
   that.elements.push(dynamicKarel);
   that.elements.push(TextBox(textDim1, 'World'));
   that.elements.push(TextBox(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);
   var leftEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepTurnLeft, finishedCallback);

   that.buttons = [];
   that.buttons.push(KarelCommandButton(buttonDim1, '<b>move();</b>', moveEvent));
   that.buttons.push(KarelCommandButton(buttonDim2, '<b>turnLeft();</b>', leftEvent));
   for (var i = 0; i < that.buttons.length; i++ ) {
      that.elements.push(that.buttons[i]);
   }

   function animationFinished() {
      for(var i = 0; i < that.buttons.length; i++) {
         that.buttons[i].setEnabled();
      }
   }

   function startAnimation() {
      for(var i = 0; i < that.buttons.length; i++) {
         that.buttons[i].setDisabled();
      }
      staticKarel.animate('karelCode/unit1Lesson3Soln.js', animationFinished);
   } 

   setTimeout(startAnimation, 800);
   return that;
}

function Unit1Lesson2(finishedCallback) {
   var that = {};
   var dynamicDim = {'left':0.185, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticDim = {'left':0.515, 'top':0.2, 'width':0.3, 'height':0.3};
   var staticKarel = KarelStaticCanvasElement(staticDim,'move.w');
   var dynamicKarel = KarelStaticCanvasElement(dynamicDim,'move.w');
   var textDim1 = {'left':0.185, 'top':0.1, 'width':0.3, 'height':0.074};
   var textDim2 = {'left':0.515, 'top':0.1, 'width':0.3, 'height':0.074};
   var buttonDim1 = {'left':0.35, 'top':0.7, 'width':0.3, 'height':0.12};
   var ide = dynamicKarel.getIde();

   that.elements = [];
   that.elements.push(staticKarel);
   that.elements.push(dynamicKarel);
   that.elements.push(TextBox(textDim1, 'World'));
   that.elements.push(TextBox(textDim2, 'Goal'));

   var moveEvent = AddEqualCheck(ide, staticKarel.getIde(), ide.stepMove, finishedCallback);   

   that.button = KarelCommandButton(buttonDim1, '<b>move();</b>', moveEvent);
   that.elements.push(that.button);

   function animationFinished() {
      that.button.setEnabled();
   }

   function startAnimation() {
      that.button.setDisabled();
      staticKarel.animate('karelCode/unit1Lesson2Soln.js', animationFinished);
   } 

   setTimeout(startAnimation, 800);
   
   return that;
}

function Unit1Lesson1(finishedCallback) {
   var that = {};
   var textDim = {'left':0.342, 'top':0.014, 'width':0.316, 'height':0.074};

   var positions = [
      {'left':0.169, 'top':0.11, 'width':0.316, 'height':0.42},
      {'left':0.515, 'top':0.11, 'width':0.316, 'height':0.42},
      {'left':0.169, 'top':0.56, 'width':0.316, 'height':0.42},
      {'left':0.515, 'top':0.56, 'width':0.316, 'height':0.42}
   ];

   var buttonSrcs = [
      './images/karelButtonFrame.png',
      './images/beeperButtonFrame.png',
      './images/worldButtonFrame.png',
      './images/wallButtonFrame.png',
   ];

   var labels = [
      'Karel',
      'Beeper',
      'World',
      'Wall'
   ];
   
   that.generatePuzzle = function() {
      var orderMap = [];
      var indicies = [];
      for (var i = 0; i < buttonSrcs.length; i++){
         indicies.push(i);
      }
      for (var i = 0; i < buttonSrcs.length; i++) {
         var maxIndex = indicies.length;
         var randomIndex = Math.floor(Math.random()*maxIndex);
         orderMap.push(indicies[randomIndex]);
         indicies.splice(randomIndex, 1);
      }
      
      that.elements = [];
      for (var i = 0; i < buttonSrcs.length; i++) {
         var buttonIndex = orderMap.indexOf(i);
         var callback;
         switch(i) {
            case 0: callback = function(){that.buttonClicked(0)}; break;
            case 1: callback = function(){that.buttonClicked(1)}; break;
            case 2: callback = function(){that.buttonClicked(2)}; break;
            case 3: callback = function(){that.buttonClicked(3)}; break;
         }
         var button = ImageButton(positions[i], buttonSrcs[buttonIndex], callback);
         that.elements.push(button);
      }

      that.answerIndex = orderMap[that.questionIndex];
      var questionLabel = labels[that.questionIndex];
      that.questionBox = TextBox(textDim, questionLabel);
      that.elements.push(that.questionBox);
   }

   that.buttonClicked = function(index) {
      if (index == that.answerIndex) {
         var button = that.elements[index];
         button.animateCorrect(that.questionBox, that.nextPuzzle);
      } else {
         that.elements[index].animateIncorrect();
      }
   }

   that.nextPuzzle = function() {
      function finishedFadeOut() {
         for (var i = 0; i < that.elements.length; i++) {
            that.elements[i].deleteDiv();
         }
         that.generatePuzzle();
         for (var i =0; i < that.elements.length; i++) {
            that.elements[i].resize();
            $(that.elements[i].div).fadeIn(600);
         }
      }
   
      that.questionIndex += 1;
      if (that.questionIndex >= buttonSrcs.length) {
         finishedCallback();
      } else {
         for (var i = 0; i < that.elements.length; i++) {
            $(that.elements[i].div).fadeOut(600);
         }
         setTimeout(finishedFadeOut, 600);
      }
   }
   
   that.questionIndex = 0;
   that.generatePuzzle();
   
   return that;
}



