function KarelEvalEngine(karel) {

   var that = {};

   var MOVE = 0;
	var TURN_LEFT = 1;
	var TURN_RIGHT = 2;
	var PUT_BEEPER = 3;
	var PICK_BEEPER = 4;
	var PAINT_CORNER = 5;
	var MAX_ACTIONS = 1000000;

	var actionBuffer, actionIndex;

   var virtualKarelModel = null;

   that.compile = function(code) {
      virtualKarelModel = karel.getModel().deepCopy();
      actionBuffer = new Array();
		actionIndex = 0;
      try {
			eval(code);
		} catch(e) {
			alert(e);
		}
   }

   that.executeStep = function() {
   
      if (actionIndex >= actionBuffer.length || actionIndex == -1) {
			return true;
		}
		if (actionIndex == MAX_ACTIONS) {
			alert("karel has executed "+MAX_ACTIONS+" "+
			 	"commands and appears to be in an " +
				"infinite loop.");
		} 

		var action = actionBuffer[actionIndex];
		var actionId = action.getId();
		actionIndex = actionIndex + 1;		

      try {
		   switch(actionId) {
			   case MOVE: karel.move(); break;
			   case TURN_LEFT: karel.turnLeft(); break;
			   case TURN_RIGHT: karel.turnRight(); break;
			   case PUT_BEEPER: karel.putBeeper(); break;
			   case PICK_BEEPER: karel.pickBeeper(); break;
			   case PAINT_CORNER: karel.paintCorner(action.getParam()); break;
			   default: alert("invalid action"); break;
		   }
	   } catch (msg) {
         alert(msg);
	   }

		return false;
   }

   function addToActionBuffer(action) {
		if (actionBuffer.length > MAX_ACTIONS) {
			throw("infinite loop");
		}
		actionBuffer.push(action);
	}


	//--------------- Karel Commands ----------------------//

   function turnRight() {
		virtualKarelModel.turnRight();
		addToActionBuffer(new Action(TURN_RIGHT, null));
	}

	function turnAround() {
		turnLeft();
		turnLeft();
	}

	function randomChance() {
		return randomChance(0.5);
	}

	function randomChance(chance) {
		return Math.random() < chance;
	}

	function paintCorner(color) {
		addToActionBuffer(new Action(PAINT_CORNER, color));
		virtualKarelModel.paintCorner(color);
	}

	function move() {
		addToActionBuffer(new Action(MOVE, null));
		virtualKarelModel.move();
	}

	function turnLeft() {
		addToActionBuffer(new Action(TURN_LEFT, null));
		virtualKarelModel.turnLeft();
	}

	function frontIsClear() {
		return virtualKarelModel.frontIsClear();
	}

	function frontIsBlocked() {
		return !virtualKarelModel.frontIsClear();
	}

	function putBeeper() {
		addToActionBuffer(new Action(PUT_BEEPER, null));
		virtualKarelModel.putBeeper();
	}

	function pickBeeper() {
		addToActionBuffer(new Action(PICK_BEEPER, null));
		virtualKarelModel.pickBeeper();
	}

	function beepersPresent() {
		return virtualKarelModel.beeperPresent();
	}

	function noBeepersPresent() {
		return !virtualKarelModel.beeperPresent();
	}

	function leftIsClear() {
		return virtualKarelModel.leftIsClear();	
	}

	function leftIsBlocked() {
		return !virtualKarelModel.leftIsClear();	
	}

	function rightIsClear() {
		return virtualKarelModel.rightIsClear();	
	}

	function rightIsBlocked() {
		return !virtualKarelModel.rightIsClear();	
	}

	function facingEast() {
		return virtualKarelModel.facingEast();
	}

	function notFacingEast() {
		return !virtualKarelModel.facingEast();
	}

	function facingWest() {
		return virtualKarelModel.facingWest();
	}

	function notFacingWest() {
		return !virtualKarelModel.facingWest();
	}

	function facingNorth() {
		return virtualKarelModel.facingNorth();
	}

	function notFacingNorth() {
		return !virtualKarelModel.facingNorth();
	}

	function facingSouth() {
		return virtualKarelModel.facingSouth();
	}

	function notFacingSouth() {
		return !virtualKarelModel.facingSouth();
	}

   return that;

}
