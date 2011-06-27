function KarelModel() {

   var that = {};

   that.dir = Const.KAREL_EAST;
   that.karelRow = 0;
   that.karelCol = 0;
   that.beepers = null;
   that.walls = null;
   that.squareColors = null;
   that.rows = 0;
   that.cols = 0;

   that.deepCopy = function() {
      var newModel = KarelModel();
      newModel.dir = that.dir;
      newModel.karelRow = that.karelRow;
      newModel.karelCol = that.karelCol;
      newModel.beepers = that.beepers.deepCopy();
      newModel.walls = that.walls.deepCopy();
      newModel.squareColors = that.squareColors.deepCopy();
      newModel.rows = that.rows;
      newModel.cols = that.cols;
      return newModel;
   }

   that.move = function() {
      var newRow = that.karelRow;
		var newCol = that.karelCol;
		switch(that.dir) {
			case Const.KAREL_EAST: newCol = newCol + 1; break;
			case Const.KAREL_WEST: newCol = newCol - 1; break;
			case Const.KAREL_NORTH: newRow = newRow - 1; break;
			case Const.KAREL_SOUTH: newRow = newRow + 1; break;
			default: alert("invalid that.dir: " + that.dir); break;		
		}
		if(that.walls.isMoveValid(that.karelRow, that.karelCol, newRow, newCol)) {
			that.karelRow = newRow;
			that.karelCol = newCol;
		} else {
		   error('Front Is Blocked');
		}
   }

   that.turnLeft = function() {
      var newD = that.dir;
		switch(that.dir) {
			case Const.KAREL_EAST:  newD = Const.KAREL_NORTH; break;
			case Const.KAREL_WEST:  newD = Const.KAREL_SOUTH; break;
			case Const.KAREL_NORTH: newD = Const.KAREL_WEST; break;
			case Const.KAREL_SOUTH: newD = Const.KAREL_EAST; break;	
			default: alert("invalid that.dir: " + that.dir); break;	
		}
		that.dir = newD;
   }

   that.turnRight = function() {
      var newD = that.dir;
		switch(that.dir) {
			case Const.KAREL_EAST:  newD = Const.KAREL_SOUTH; break;
			case Const.KAREL_WEST:  newD = Const.KAREL_NORTH; break;
			case Const.KAREL_NORTH: newD = Const.KAREL_EAST; break;
			case Const.KAREL_SOUTH: newD = Const.KAREL_WEST; break;	
			default: alert("invalid that.dir: " + that.dir); break;	
		}
		that.dir = newD;
   }

   that.pickBeeper = function() {
      if (that.beepers.beeperPresent(that.karelRow, that.karelCol)) {
         that.beepers.pickBeeper(that.karelRow, that.karelCol);
      } else {
         error('No Beepers Present');
      }
   }

   that.putBeeper = function() {
      that.beepers.putBeeper(that.karelRow, that.karelCol);
   }

   that.turnAround = function() {
      console.log('turn around undefined!');
   }

   that.paintCorner = function() {
      console.log('paint corner undefined!');
   }

   that.getDirection = function() {
      return that.dir;
   }

   that.getNumRows = function() {
      return that.rows;
   }

   that.getNumCols = function() {
      return that.cols;
   }

   that.getKarelRow = function() {
      return that.karelRow;
   }

   that.getKarelCol = function() {
      return that.karelCol;
   }

   that.getSquareColor = function(r, c) {
      that.squareColors.getColor(r, c);
   }

   that.getNumBeepers = function(r, c) {
      return that.beepers.getNumBeepers(r, c);
   }

	that.beeperPresent = function() {
		return karelWorld.virtualBeeperPresent(virtualY, virtualX);
	}

   that.frontIsClear = function() {
      var newRow = that.karelRow;
		var newCol = that.karelCol;
		switch(that.dir) {
			case Const.KAREL_EAST: newCol = newCol + 1; break;
			case Const.KAREL_WEST: newCol = newCol - 1; break;
			case Const.KAREL_NORTH: newRow = newRow - 1; break;
			case Const.KAREL_SOUTH: newRow = newRow + 1; break;
			default: alert("invalid that.dir: " + that.dir); break;		
		}
		return that.walls.isMoveValid(that.karelRow, that.karelCol, newRow, newCol);
		
	}

	that.rightIsClear = function() {
		var newRow = that.karelRow;
		var newCol = that.karelCol;
		switch(that.dir) {
			case KAREL_EAST: newRow = newRow + 1; break;
			case KAREL_WEST: newCol = newRow - 1; break;
			case KAREL_NORTH: newRow = newCol + 1; break;
			case KAREL_SOUTH: newRow = newCol - 1; break;
			default: alert("invalid that.dir: " + that.dir); break;		
		}
		return that.walls.isMoveValid(that.karelRow, that.karelCol, newRow, newCol);
	}

	that.leftIsClear = function() {
		var newRow = that.karelRow;
		var newCol = that.karelCol;
		switch(that.dir) {
			case KAREL_EAST: newRow = newRow - 1; break;
			case KAREL_WEST: newCol = newRow + 1; break;
			case KAREL_NORTH: newRow = newCol - 1; break;
			case KAREL_SOUTH: newRow = newCol + 1; break;
			default: alert("invalid that.dir: " + that.dir); break;		
		}
		return that.walls.isMoveValid(that.karelRow, that.karelCol, newRow, newCol);
	}

	that.facingNorth = function() {
		return virtualDirection == KAREL_NORTH;	
	}

	that.facingSouth = function() {
		return virtualDirection == KAREL_SOUTH;	
	}

	that.facingEast = function() {
		return virtualDirection == KAREL_EAST;	
	}

	that.facingWest = function() {
		return virtualDirection == KAREL_WEST;	
	}

   that.loadWorld = function(worldText, canvasModel) {
      var lines = worldText.split("\n");

		// get world dimension
		var dimensionTxt = lines[0];
		var dimensionStrings = lines[0].split(":");

		that.rows = parseInt(dimensionStrings[1]);
		that.cols = parseInt(dimensionStrings[2]);
		
		that.beepers = Beepers(that.rows, that.cols);
		that.walls = Walls(that.rows, that.cols);
      that.squareColors = SquareColors(that.rows, that.cols);

      that.dir = Const.KAREL_EAST;
      placeKarel(that.rows - 1, 0);

		// load world details
		for (var i = 1; i < lines.length; i++) {
			loadLine(lines[i]);
		}

		canvasModel.setKarelDimensions(that.rows, that.cols);
   }

   function error(msg) {
      throw msg;
   }

   function placeKarel(row, col) {
      that.karelRow = row;
      that.karelCol = col;
   }

   function loadLine(line) {
		var elements = line.split(":");
		if (elements.length != 3) {
			return;
		}
		var key = elements[0];
		var v1 = parseInt(elements[1]);
		var v2 = parseInt(elements[2]);

		if (key == "karel")  {
			placeKarel(v1, v2);
		} else if (key == "top")  {
			that.walls.addTopWall(v1, v2);
		} else if (key == "right") {
			that.walls.addRightWall(v1, v2);
		} else if (key == "beeper") {
			that.beepers.putBeeper(v1, v2);
		}
	}

   return that;

}
