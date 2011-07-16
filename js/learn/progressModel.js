function ProgressModel() {

   var that = {}; 
   var currUnitIndex = 1;
   var currLessonIndex = 1;
   var unitProgressList = [];
   var corrupted = false;

   that.changeLesson = function(lesson) {
      currLessonIndex = lesson;
      var unit = getCurrUnitIndex();
      unit.lessonStarted(lesson - 1);  
      setHash();
   }

   that.isStartingNewUnit = function() {
      return currLessonIndex == 1;
   }

   that.finishedLesson = function() {
      var unit = getCurrUnitIndex();
      unit.lessonFinished(currLessonIndex - 1);

      // update the lesson / unit values
      if (unit.isLastLesson(currLessonIndex - 1)) {
         currUnitIndex += 1;
         currLessonIndex = 1;
         unit = getCurrUnitIndex();
      } else {
         currLessonIndex += 1;
      }

      unit.lessonStarted(currLessonIndex - 1); 
      setHash();
   }

   that.getNumLessons = function() {
      var unit = getCurrUnitIndex();
      return unit.getNumLessons();
   }

   that.getLessonStatus = function(lesson) {
      var unit = getCurrUnitIndex();
      return unit.getLessonStatus(lesson - 1);
   }

   that.getUnitIndex = function() {
      return currUnitIndex;
   }

   that.getLessonIndex = function() {
      return currLessonIndex;
   }

   function setHash() {
      hashString = '';
      hashString += '/unit' + currUnitIndex;
      hashString += '/lesson' + currLessonIndex;
      window.location.hash = hashString;
   }

   that.loadHash = function() {
      var hashText = window.location.hash;
      var path = hashText.split('/');
      var unitString = path[1];
      var lessonString = path[2];

      if (!unitString.match(/^unit\d*$/)) {
         corrupted = true;
         return;
      } else if (!lessonString.match(/^lesson\d*$/)) {
         corrupted = true;
         return;
      }

      currUnitIndex = parseInt(unitString.replace('unit', ''));
      currLessonIndex = parseInt(lessonString.replace('lesson', ''));
   }

   function init() {
      that.loadHash();
      setHash();

      // This is temporary code to load up units
      var unit1 = UnitProgress();
      for (var i = 0; i < 5; i++){
         unit1.addLesson('notStarted');
      }
      var unit2 = UnitProgress();
      for (var i = 0; i < 8; i++){
         unit2.addLesson('notStarted');
      }
      unitProgressList.push(unit1);
      unitProgressList.push(unit2);

      // Set the current lesson to start
      var unit = getCurrUnitIndex();
      unit.lessonStarted(currLessonIndex - 1);
   }

   function getCurrUnitIndex() {
      return unitProgressList[currUnitIndex - 1];
   }

   init(); 
   return that;
}
