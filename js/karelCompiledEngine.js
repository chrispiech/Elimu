function KarelCompiledEngine(karel) {

   var that = {};

   that.compile = function(code) {
      // Fill this in. This function is called once
      // when the user hits the run button. It shouldn't
      // make calls to karel. 
   }

   that.executeStep = function() {
      // Execute the next action of the karel program.
      // (note that boolean checks are not actions).
      // Return true if the end of the program has been
      // reached.
      // Execute the action by making a call to the karel
      // object.
      return true;
   }

   return that;

}
