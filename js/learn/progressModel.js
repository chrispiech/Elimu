function ProgressModel() {

   var that = {}; 
   var currUnitIndex = 1;
   var currLessonIndex = 1;

   var unitProgressList = [];

   that.changeLesson = function(lesson) {
      currLessonIndex = lesson;
      var unit = getcurrUnitIndex();
      unit.lessonStarted(lesson - 1);  
      setHash();
   }

   that.getNumLessons = function() {
      var unit = getcurrUnitIndex();
      return unit.getNumLessons();
   }

   that.getLessonStatus = function(lesson) {
      var unit = getcurrUnitIndex();
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
      hashString += 'unit=' + currUnitIndex;
      hashString += '&lesson=' + currLessonIndex;
      window.location.hash = hashString;
   }

   function init() {
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
      var unit = getcurrUnitIndex();
      unit.lessonStarted(currLessonIndex - 1);
   }

   function getcurrUnitIndex() {
      return unitProgressList[currUnitIndex - 1];
   }

   init(); 
   return that;
}
