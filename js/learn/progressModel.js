function ProgressModel() {

   var that = {}; 
   var currentUnit = 1;
   var currentLesson = 1;

   var unitProgressList = [];

   that.changeLesson = function(lesson) {
      currentLesson = lesson;
      var unit = getCurrentUnit();
      unit.lessonStarted(lesson - 1);  
      setHash();
   }

   that.getNumLessons = function() {
      var unit = getCurrentUnit();
      return unit.getNumLessons();
   }

   that.getLessonStatus = function(lesson) {
      var unit = getCurrentUnit();
      return unit.getLessonStatus(lesson - 1);
   }

   function setHash() {
      hashString = '';
      hashString += 'unit=' + currentUnit;
      hashString += '&lesson=' + currentLesson;
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
      var unit = getCurrentUnit();
      unit.lessonStarted(currentLesson - 1);
   }

   function getCurrentUnit() {
      return unitProgressList[currentUnit - 1];
   }

   init(); 
   return that;
}
