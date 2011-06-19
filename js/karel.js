

// Karel class	
function Karel(karelWorld) {

	var KAREL_SMALL_SIZE = 30;
	var KAREL_TINY_SIZE = 19;

	var KAREL_NORTH = 0;
	var KAREL_EAST = 1;
	var KAREL_SOUTH = 2;
	var KAREL_WEST = 3;

	var MOVE = 0;
	var TURN_LEFT = 1;
	var TURN_RIGHT = 2;
	var PUT_BEEPER = 3;
	var PICK_BEEPER = 4;
	var PAINT_CORNER = 5;

	var MAX_ACTIONS = 1000000;

	var xIndex, yIndex, direction;
	var virtualX, virtualY, virtualDirection;
	var actionBuffer, actionIndex;

	function getImage() {
		switch(direction){
			case KAREL_NORTH: return karelImages.karelNorth; 	
			case KAREL_SOUTH: return karelImages.karelSouth;
			case KAREL_EAST: return karelImages.karelEast;
			case KAREL_WEST: return karelImages.karelWest;	
		}
		return null;
	}

	function getTinyImage() {
		switch(direction){
			case KAREL_NORTH: return karelImages.karelNorthTiny; 	
			case KAREL_SOUTH: return karelImages.karelSouthTiny;
			case KAREL_EAST: return karelImages.karelEastTiny;
			case KAREL_WEST: return karelImages.karelWestTiny;	
		}
		return null;
	}

	function getSmallImage() {
		switch(direction){
			case KAREL_NORTH: return karelImages.karelNorthSmall; 	
			case KAREL_SOUTH: return karelImages.karelSouthSmall;
			case KAREL_EAST: return karelImages.karelEastSmall;
			case KAREL_WEST: return karelImages.karelWestSmall;	
		}
		return null;
	}

	this.draw = function(c) {
		var cornerSize = karelWorld.getCornerSize();
		
		var img = null;
		if (cornerSize <= KAREL_TINY_SIZE) {
			img = getTinyImage();
		} else if (cornerSize <= KAREL_SMALL_SIZE) {
			img = getSmallImage();
		} else {
			img = getImage();
		}
		
		if (typeof img == "undefined" || img == null) {
			alert('image loading fail!');
		}
		
		var x = karelWorld.getLeft() + xIndex * cornerSize;
		var y = karelWorld.getTop() + yIndex * cornerSize;
		
		//draw karel one pixel smaller on all sides
		c.drawImage(img,x+1, y+1, cornerSize-2, cornerSize-2);
	}


	this.reset = function(row, col) {
		xIndex = col;
		yIndex = row;
		direction = KAREL_EAST;
		
		actionBuffer = new Array();
		actionIndex = 0;
		
		virtualX = xIndex;
		virtualY = yIndex;
		virtualDirection = direction;	
	}

	this.frontIsClear = function() {
		var newX = virtualX;
		var newY = virtualY;
		switch(virtualDirection) {
			case KAREL_EAST: newX = newX + 1; break;
			case KAREL_WEST: newX = newX - 1; break;
			case KAREL_NORTH: newY = newY - 1; break;
			case KAREL_SOUTH: newY = newY + 1; break;
			default: alert("invalid direction: " + virtualDirection); break;		
		}
		return karelWorld.isMoveValid(virtualX, virtualY, newX, newY);
	}

	this.beeperPresent = function() {
		return karelWorld.virtualBeeperPresent(virtualY, virtualX);
	}

	this.rightIsClear = function() {
		var newX = virtualX;
		var newY = virtualY;
		switch(virtualDirection) {
			case KAREL_EAST: newY = newY + 1; break;
			case KAREL_WEST: newX = newY - 1; break;
			case KAREL_NORTH: newY = newX + 1; break;
			case KAREL_SOUTH: newY = newX - 1; break;
			default: alert("invalid direction: " + virtualDirection); break;		
		}
		return karelWorld.isMoveValid(virtualX, virtualY, newX, newY);
	}

	this.leftIsClear = function() {
		var newX = virtualX;
		var newY = virtualY;
		switch(virtualDirection) {
			case KAREL_EAST: newY = newY - 1; break;
			case KAREL_WEST: newX = newY + 1; break;
			case KAREL_NORTH: newY = newX - 1; break;
			case KAREL_SOUTH: newY = newX + 1; break;
			default: alert("invalid direction: " + virtualDirection); break;		
		}
		return karelWorld.isMoveValid(virtualX, virtualY, newX, newY);
	}

	this.facingNorth = function() {
		return virtualDirection == KAREL_NORTH;	
	}

	this.facingSouth = function() {
		return virtualDirection == KAREL_SOUTH;	
	}

	this.facingEast = function() {
		return virtualDirection == KAREL_EAST;	
	}

	this.facingWest = function() {
		return virtualDirection == KAREL_WEST;	
	}

	this.move = function() {
		var newX = virtualX;
		var newY = virtualY;
		switch(virtualDirection) {
			case KAREL_EAST: newX = newX + 1; break;
			case KAREL_WEST: newX = newX - 1; break;
			case KAREL_NORTH: newY = newY - 1; break;
			case KAREL_SOUTH: newY = newY + 1; break;
			default: alert("invalid direction: " + virtualDirection); break;		
		}
		if(karelWorld.isMoveValid(virtualX, virtualY, newX, newY)) {
			virtualX = newX;
			virtualY = newY;
		}
		addToActionBuffer(new Action(MOVE, null));
	}

	this.paintCorner = function(color) {
		addToActionBuffer(new Action(PAINT_CORNER, color));
	}

	this.turnLeft = function() {
		var newD = virtualDirection;
		switch(virtualDirection) {
			case KAREL_EAST:  newD = KAREL_NORTH; break;
			case KAREL_WEST:  newD = KAREL_SOUTH; break;
			case KAREL_NORTH: newD = KAREL_WEST; break;
			case KAREL_SOUTH: newD = KAREL_EAST; break;	
			default: alert("invalid direction: " + virtualDirection); break;	
		}
		virtualDirection = newD;
		addToActionBuffer(new Action(TURN_LEFT, null));
	}

	this.turnRight = function() {
		var newD = virtualDirection;
		switch(virtualDirection) {
			case KAREL_EAST:  newD = KAREL_SOUTH; break;
			case KAREL_WEST:  newD = KAREL_NORTH; break;
			case KAREL_NORTH: newD = KAREL_EAST; break;
			case KAREL_SOUTH: newD = KAREL_WEST; break;	
			default: alert("invalid direction: " + virtualDirection); break;	
		}
		virtualDirection = newD;
		addToActionBuffer(new Action(TURN_RIGHT, null));
	}

	this.putBeeper = function() {
		karelWorld.putVirtualBeeper(virtualY, virtualX);
		addToActionBuffer(new Action(PUT_BEEPER, null));
	}

	this.pickBeeper = function() {
		karelWorld.pickVirtualBeeper(virtualY, virtualX);
		addToActionBuffer(new Action(PICK_BEEPER, null));
	}

	this.executeNextAction = function() {

		if (actionIndex >= actionBuffer.length || actionIndex == -1) {
			return false;
		}
		if (actionIndex == MAX_ACTIONS) {
			alert("karel has executed "+MAX_ACTIONS+" "+
			 	"commands and appears to be in an " +
				"infinite loop.");
			error();
		} 

		var action = actionBuffer[actionIndex];
		var actionId = action.getId();
		actionIndex = actionIndex + 1;		

		switch(actionId) {
			case MOVE: executeMove(); break;
			case TURN_LEFT: executeTurnLeft(); break;
			case TURN_RIGHT: executeTurnRight(); break;
			case PUT_BEEPER: executePutBeeper(); break;
			case PICK_BEEPER: executePickBeeper(); break;
			case PAINT_CORNER: executePaintCorner(action.getParam()); break;
			default: alert("invalid action"); break;
		}

		return true;
		
	}

	function addToActionBuffer(action) {
		if (actionBuffer.length > MAX_ACTIONS) {
			throw("infinite loop");
		}
		actionBuffer.push(action);
	}

	function executePutBeeper() {
		karelWorld.putBeeper(yIndex, xIndex);
	}

	function executePickBeeper() {
		if (!karelWorld.beeperPresent(yIndex, xIndex)) {
			alert("no beepers present");
			error();
		} else {
			karelWorld.pickBeeper(yIndex, xIndex);
		}
	}

	function executePaintCorner(color) {
		karelWorld.paintCorner(yIndex, xIndex, color);
	}

	function executeTurnLeft() {
		var newD = direction;
		switch(direction) {
			case KAREL_EAST:  newD = KAREL_NORTH; break;
			case KAREL_WEST:  newD = KAREL_SOUTH; break;
			case KAREL_NORTH: newD = KAREL_WEST; break;
			case KAREL_SOUTH: newD = KAREL_EAST; break;	
			default: alert("invalid direction: " + virtualDirection); break;	
		}
		direction = newD;
	}

	function executeMove() {
		var newX = xIndex;
		var newY = yIndex;
		switch(direction) {
			case KAREL_EAST: newX = newX + 1; break;
			case KAREL_WEST: newX = newX - 1; break;
			case KAREL_NORTH: newY = newY - 1; break;
			case KAREL_SOUTH: newY = newY + 1; break;
			default: alert("invalid direction: " + virtualDirection); break;		
		}
		if (karelWorld.isMoveValid(xIndex, yIndex, newX, newY)) {
			xIndex = newX;
			yIndex = newY;
		} else {
			alert("karel blocked");
			error();
		}
	}

	function executeTurnRight() {
		var newD = direction;
		switch(direction) {
			case KAREL_EAST:  newD = KAREL_SOUTH; break;
			case KAREL_WEST:  newD = KAREL_NORTH; break;
			case KAREL_NORTH: newD = KAREL_EAST; break;
			case KAREL_SOUTH: newD = KAREL_WEST; break;	
			default: alert("invalid direction: " + virtualDirection); break;	
		}
		direction = newD;
	}

	function error() {
		actionBuffer = new Array();
		actionIndex = -1;
	}

	
	this.clearError = function() {
		if(actionIndex == -1) {
			actionBuffer = new Array();
			actionIndex = 0;
		}
	}
}




