function KarelModel() {

   var that = {};

   var direction = KarelConstants.KAREL_EAST;
   var karelRow = 0;
   var karelCol = 0;
   var beepers = null;
   var walls = null;
   var squareColors = null;
   var rows = 0;
   var cols = 0;

   that.move = function() {
      var newRow = karelRow;
		var newCol = karelCol;
		switch(direction) {
			case KarelConstants.KAREL_EAST: newCol = newCol + 1; break;
			case KarelConstants.KAREL_WEST: newCol = newCol - 1; break;
			case KarelConstants.KAREL_NORTH: newRow = newRow - 1; break;
			case KarelConstants.KAREL_SOUTH: newRow = newRow + 1; break;
			default: alert("invalid direction: " + direction); break;		
		}
		if(walls.isMoveValid(karelRow, newCol, newRow, newCol)) {
			karelRow = newRow;
			karelCol = newCol;
		} else {
		   alert('Front Is Blocked');
		}
   }

   that.turnLeft = function() {
      var newD = direction;
		switch(direction) {
			case KAREL_EAST:  newD = KAREL_NORTH; break;
			case KAREL_WEST:  newD = KAREL_SOUTH; break;
			case KAREL_NORTH: newD = KAREL_WEST; break;
			case KAREL_SOUTH: newD = KAREL_EAST; break;	
			default: alert("invalid direction: " + direction); break;	
		}
		direction = newD;
   }

   that.turnRight = function() {
      var newD = direction;
		switch(direction) {
			case KAREL_EAST:  newD = KAREL_SOUTH; break;
			case KAREL_WEST:  newD = KAREL_NORTH; break;
			case KAREL_NORTH: newD = KAREL_EAST; break;
			case KAREL_SOUTH: newD = KAREL_WEST; break;	
			default: alert("invalid direction: " + direction); break;	
		}
		direction = newD;
   }

   that.pickBeeper = function() {
   }

   that.putBeeper = function() {
   }

   that.turnAround = function() {
   }

   that.paintCorner = function() {
   }

   that.getDirection = function() {
      return direction;
   }

   that.getNumRows = function() {
      return rows;
   }

   that.getNumCols = function() {
      return cols;
   }

   that.getKarelRow = function() {
      return karelRow;
   }

   that.getKarelCol = function() {
      return karelCol;
   }

   that.getSquareColor = function(r, c) {
      squareColors.getColor(r, c);
   }

   that.loadWorld = function(worldText, canvasModel) {
      var lines = worldText.split("\n");

		// get world dimension
		var dimensionTxt = lines[0];
		var dimensionStrings = lines[0].split(":");

		rows = parseInt(dimensionStrings[1]);
		cols = parseInt(dimensionStrings[2]);
		
		beepers = Beepers(rows, cols);
		walls = Walls(rows, cols);
      squareColors = SquareColors(rows, cols);

      placeKarel(rows - 1, 0);

		// load world details
		for (var i = 1; i < lines.length; i++) {
			loadLine(lines[i]);
		}

		canvasModel.setKarelDimensions(rows, cols);
   }

   function placeKarel(row, col) {
      karelRow = row;
      karelCol = col;
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
			walls.addTopWall(v1, v2);
		} else if (key == "right") {
			walls.addRightWall(v1, v2);
		} else if (key == "beeper") {
			beepers.putBeeper(v1, v2);
		}
	}

   return that;

}
