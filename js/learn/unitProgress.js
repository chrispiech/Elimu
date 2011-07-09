function UnitProgress() {
   var that = {};

   var lessonProgressList = [];

   that.addLesson = function(status) {
      lessonProgressList.push(status);
   }

   that.lessonFinished = function(index) {
      lessonProgressList[index] = 'finished';
   }

   that.getLessonStatus = function(index) {
      return lessonProgressList[index];
   }

   that.getNumLessons = function() {
      return lessonProgressList.length;
   }

   that.lessonStarted = function(index) {
      if(lessonProgressList[index] == 'notStarted') {
         lessonProgressList[index] = 'started';
      }
   }

   return that;

}
