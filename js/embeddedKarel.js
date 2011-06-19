
// constants
var KAREL_SIZE = 40;
var CANVAS_WIDTH = 610;
var CANVAS_HEIGHT = 610;



/****************************************************
 *                   PUBLIC                         *
 ****************************************************/
function EmbeddedKarel(world) {
	// constants
	var ACTION_HEARTBEATS = 1;
	var HEART_BEAT = 10;	
	var COOKIE_NAME = "karel_code_CHANGE";
	var COOKIE_SAVE_INTERVAL = 2000;

	// instance variables
	var canvas = null;
	var context = null;
	var karel = null;
	var karelWorld = null;
	var animating = false;
	var actionCountdown = ACTION_HEARTBEATS;
	var codeMirror = null;
	var cookie = null;

	karelWorld = new KarelWorld();
	karel = new Karel(karelWorld);

	this.init = function () {
		cookie = new Cookie(COOKIE_NAME);
		initCodeMirror();

		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');

		worldName = "12x12.w";
		loadCurrentWorld();
		setInterval("application.heartbeat();", HEART_BEAT);

	}

	this.changeWorld = function(selector) {
		worldName = selector.options[selector.selectedIndex].text;
		loadCurrentWorld();
	}

	function loadCurrentWorld() {
		karelWorld.loadWorld(worldName, karel);
		draw();
	}

	this.runButton = function () {
		var code = codeMirror.getCode();
		var karelApplication = new KarelApplication(code, karel);
		animating = true;
		loadCurrentWorld();
		karelApplication.start();
	}

	this.heartbeat = function() {
		if (!animating) return;
			
		update();
		draw();
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
		context.fillStyle = "#91b9df";
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	function initCodeMirror() {
		var textArea = document.getElementById('code');

		codeMirror = CodeMirror.fromTextArea(textArea, {
  			parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
  			path: "../codeMirror/js/",
  			stylesheet: "../codeMirror/css/jscolors.css",
  			indentUnit:4,
			height: 1,
			initCallback: codeMirrorLoaded,
			disableSpellcheck: true
		});

	}

	function codeMirrorLoaded() {
		codeMirror.setCode(cookie.readCookie());
		setInterval(function(){application.saveToCookie()}, 
			COOKIE_SAVE_INTERVAL);
		codeMirror.setSpellcheck(true);
	}

	this.saveToCookie = function() {	
		if (cookie == null || codeMirror == null) return;	
		cookie.saveTextToCookie(codeMirror.getCode());
	}
}

