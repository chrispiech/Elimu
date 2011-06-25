
// globals
var karelImages = new KarelImages();

/****************************************************
 *                   PUBLIC                         *
 ****************************************************/
function KarelIde(codeId, canvasId) {

    var that = {};

	// constants
	var ACTION_HEARTBEATS = 1;
	var HEART_BEAT = 8;	
	var COOKIE_SAVE_INTERVAL = 2000;
	var REFRESH_HEARTBEATS = 100;
    var BACKGROUND_COLOR = "#fff";
    var DEFAULT_WORLD = '15x15.w';
    var CANVAS_WIDTH = 557;
    var CANVAS_HEIGHT = 475;
    var COOKIE_NAME = 'karelCode';

	// instance variables
	var canvas = null;
	var context = null;
	var karel = null;
	var karelWorld = null;
	var animating = false;
	var actionCountdown = ACTION_HEARTBEATS;
	var refreshCountdown = REFRESH_HEARTBEATS;
	var codeMirror = null;
	var worldName = DEFAULT_WORLD;
	var cookie = null;
	var cookieName = COOKIE_NAME;
	var canvasWidth = CANVAS_WIDTH;
	var canvasHeight = CANVAS_HEIGHT;
	var imagesReady = false;
	var codeMirrorReady = false;
	var deployed = false;

	that.init = function () {
	    karelWorld = new KarelWorld(canvasWidth, canvasHeight);
		karel = new Karel(karelWorld);
		cookie = new Cookie(cookieName);
		deployed = false;

		canvas = document.getElementById(canvasId);
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		context = canvas.getContext('2d');
		
		karelImages.loadImages(imagesLoaded);
		setInterval(that.heartbeat, HEART_BEAT);
	}

	that.changeWorld = function(selector) {
		worldName = selector.options[selector.selectedIndex].text;
		loadCurrentWorld();
	}

	function imagesLoaded() {
		imagesReady = true;
		loadCurrentWorld();
	}

	function worldFileLoaded(text) {	
		karelWorld.loadWorld(text, karel);
		draw();
	}

	function loadCurrentWorld() {
		var url = "worlds/" + worldName;
		loadDoc(url, worldFileLoaded);
	}

	that.stopButton = function() {
		animating = false;
		loadCurrentWorld();
	}

	that.runButton = function () {
		var code = that.getCode();
		var karelApplication = new KarelApplication(code, karel);
		animating = true;
		loadCurrentWorld();
		karelApplication.start();
	}

	that.heartbeat = function() {
	
		if (animating) {	
			update();
			draw();
		}
	}

	function update() {
		actionCountdown = actionCountdown - 1;
		if (actionCountdown == 0 ) {
			animating = karel.executeNextAction();
			actionCountdown = ACTION_HEARTBEATS;
		}
	}

	function draw() {
		clear();
		karelWorld.draw(context);
		karel.draw(context);
		karelWorld.drawWalls(context);
	}


	function clear() {
		context.fillStyle = BACKGROUND_COLOR;
		context.fillRect(0, 0, canvasWidth, canvasHeight);
	}

	that.getCode = function() {
	    var textArea = document.getElementById(codeId);
		if (textArea == null) return null;
		return textArea.value;
	}

	that.saveToCookie = function() {	
		if (cookie == null || codeMirror == null) return;	
		cookie.saveTextToCookie(codeMirror.getCode(), 1);
	}

	that.stepMoveKarel = function() {
		karel.clearError();	
		karel.move();
		animating = true;
	}

	that.stepTurnLeftKarel = function() {
		karel.clearError();	
		karel.turnLeft();
		animating = true;	
	}

	that.stepTurnRightKarel = function() {
		karel.clearError();	
		karel.turnRight();
		animating = true;	
	}

	that.stepPutBeeper = function() {
		karel.clearError();	
		karel.putBeeper();
		animating = true;	
	}

	that.stepPickBeeper = function() {
		karel.clearError();	
		karel.pickBeeper();
		animating = true;	
	}

    
	that.init();
	return that;
}

