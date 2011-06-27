

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


   that.turnAround = function() {
      karelModel.turnAround();
   }

   that.paintCorner = function(color) {
      karelModel.paintCorner(color);
   }

	that.beeperPresent = function() {
		return karelModel.beeperPresent();
	}

   that.frontIsClear = function() {
      return karelModel.frontIsClear();
	}

	that.rightIsClear = function() {
		return karelModel.rightIsClear();
	}

	that.leftIsClear = function() {
		return karelModel.leftIsClear();
	}

	that.facingNorth = function() {
		return karelModel.facingNorth();	
	}

	that.facingSouth = function() {
		return karelModel.facingSouth();	
	}

	that.facingEast = function() {
		return karelModel.facingEast();	
	}

	that.facingWest = function() {
		return karelModel.facingWest();	
	}

   that.loadWorld = function(text, canvasModel) {
      karelModel.loadWorld(text, canvasModel);
   }

   that.getModel = function() {
      return karelModel;
   }

	return that;
}




