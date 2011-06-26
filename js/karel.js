

// Karel class	
function Karel(canvasModel) {

   var that = {};

   var karelModel = KarelModel();
   
	that.draw = function(c) {
	   KarelView.draw(canvasModel, karelModel, c);
	}

	that.move = function() {
      karelModel.move();
	}

	that.turnLeft = function() {
      karelModel.turnLeft();
	}

	that.turnRight = function() {
      karelModel.turnRight();
	}

	that.turnAround = function() {
      karelModel.turnAround();
	}

	that.paintCorner = function(color) {
      karelModel.paintCorner(color);
	}

	that.putBeeper = function() {
      karelModel.putBeeper();
	}

	that.pickBeeper = function() {
      karelModel.pickBeeper();
	}

   that.loadWorld = function(text, canvasModel) {
      karelModel.loadWorld(text, canvasModel);
   }

   that.getModelDeepCopy = function() {
      return deepCopy(karelModel);
   }

	return that;
}




