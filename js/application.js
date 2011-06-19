
// constants
var DEFAULT_CORNER_SIZE = 40;
var BACKGROUND_COLOR = "#fff";

// globals
var application = new Application();
var karelImages = new KarelImages();

/****************************************************
 *                    MAIN                          *
 ****************************************************/

window.onload = function() {
	initTabs();

	try {
  		canvas = document.getElementById('canvas');
  	} catch(err) {
  		var wrapper = document.getElementById('content');
  		wrapper.innerHTML = '<br/><center><h3>Oh snap! It looks like you are using a browser that does not support HTML 5. Try loading this website using Firefox, Chrome or IE 9.</h3></center>';
  		application.addSocialButtons();
  	}
	
	if (!canvas) {
		application.addSocialButtons();
		return;
	}

	parameters = canvas.innerHTML.split(',');
	world = parameters[0];
	width = parameters[1];
	height = parameters[2];
	cookieName = parameters[3];
	deployed = parameters[4] == "true";

	// Check the element is in the DOM and the browser supports canvas
	if(canvas && canvas.getContext) {
		canvas.width = width;
		canvas.height = height;
		application.init(world, width, height, cookieName, deployed);			
	} else {
		alert("canvas not supported by your browser");	
	}
}

window.onbeforeunload = function (e) {
	application.saveToCookie();
}

/****************************************************
 *                   PUBLIC                         *
 ****************************************************/
function Application() {
	// constants
	var ACTION_HEARTBEATS = 1;
	var HEART_BEAT = 8;	
	var COOKIE_SAVE_INTERVAL = 2000;
	var REFRESH_HEARTBEATS = 100;

	// instance variables
	var canvas = null;
	var context = null;
	var karel = null;
	var karelWorld = null;
	var animating = false;
	var actionCountdown = ACTION_HEARTBEATS;
	var refreshCountdown = REFRESH_HEARTBEATS;
	var codeMirror = null;
	var worldName = null;
	var cookie = null;
	var canvasWidth = 0;
	var canvasHeight = 0;
	var imagesReady = false;
	var codeMirrorReady = false;
	var deployed = false;

	this.init = function (world, width, height, cookieName, isDeployed) {
		canvasWidth = width;
		canvasHeight = height;
		karelWorld = new KarelWorld(canvasWidth, canvasHeight);
		karel = new Karel(karelWorld);
		cookie = new Cookie(cookieName);
		deployed = isDeployed;
		initCodeMirror();

		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');

		worldName = world;
		karelImages.loadImages(imagesLoaded);
		application.addSocialButtons();
		setInterval("application.heartbeat();", HEART_BEAT);
	}

	this.changeWorld = function(selector) {
		worldName = selector.options[selector.selectedIndex].text;
		loadCurrentWorld();
	}

	this.addSocialButtons = function() {
		var socialDiv = document.getElementById('social');
		if (socialDiv != null) {  			
			var line = getRandomSocialLine();
			var facebookTest = '<iframe src="http://www.facebook.com/plugins/like.php?href=stanfordkarel.com&amp;layout=standard&amp;show_faces=false&amp;width=225&amp;action=like&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:225px; height:35px;" allowTransparency="true"></iframe>';
			var facebook = ' <iframe src="http://www.facebook.com/plugins/like.php?	'+			
				'href=stanfordkarel.com&amp;layout=button_count&amp;show_faces=false&amp;width=110&amp;action=like&amp;'+
				'colorscheme=light&amp;height=30" scrolling="no" frameborder="0" style="border:none; overflow:hidden; '+
				'width:110px; height:30px;" allowTransparency="true"></iframe>';
			var twitter = '<iframe allowtransparency="true" frameborder="0" scrolling="no" '+
				'src="http://platform.twitter.com/widgets/tweet_button.html" style="width:110px; height:50px;"></iframe>';
			
			socialDiv.innerHTML = facebookTest;
		}
	}

	function getRandomSocialLine() {
		var lines = new Array();
		lines[0] = "Thumbs up if you like Karel: ";	
		/*lines[1] = "Thumbs up to show karel some love.";
		lines[2] = "Karel would like to be your friend.";
		lines[3] = "If you had a website Karel would like it.";
		lines[4] = "No facebook? Tell friends by email!";
		lines[5] = "Thumbs up if you're having fun!";
		lines[6] = "Spread the word.";
		lines[7] = "Programming should be accessible to everyone.";
		lines[8] = "Thumbs up for free education.";*/
		var randValue = Math.floor(Math.random() * lines.length);
		return lines[randValue];
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

	this.stopButton = function() {
		animating = false;
		loadCurrentWorld();
	}

	this.runButton = function () {
		var code = application.getCode();
		var karelApplication = new KarelApplication(code, karel);
		animating = true;
		loadCurrentWorld();
		karelApplication.start();
	}

	this.heartbeat = function() {
	
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

	function initCodeMirror() {
		var textArea = document.getElementById('code');

		if(textArea == null) {
			codeMirrorReady = true;
			return;
		}

		codeMirror = CodeMirror.fromTextArea(textArea, {
  			parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
  			path: "../codeMirror/js/",
  			stylesheet: "../codeMirror/css/jscolors.css",
  			indentUnit:4,
			height: 1,
			initCallback: codeMirrorLoaded,
			onChange: application.saveToCookie(),
			disableSpellcheck: true,
			readOnly: deployed
			//lineNumbers: true
		});
	}

	this.getCode = function() {
		if (codeMirror == null) return null;
		return codeMirror.getCode();
	}

	function codeMirrorLoaded() {
		var code = cookie.readCookie();
		if (code != null && !deployed) {
			codeMirror.setCode(code);
		}
		codeMirror.setSpellcheck(false);
		codeMirrorReady = true;
		
	}

	this.saveToCookie = function() {	
		if (cookie == null || codeMirror == null) return;	
		cookie.saveTextToCookie(codeMirror.getCode(), 1);
	}

	this.stepMoveKarel = function() {
		karel.clearError();	
		karel.move();
		animating = true;
	}

	this.stepTurnLeftKarel = function() {
		karel.clearError();	
		karel.turnLeft();
		animating = true;	
	}

	this.stepTurnRightKarel = function() {
		karel.clearError();	
		karel.turnRight();
		animating = true;	
	}

	this.stepPutBeeper = function() {
		karel.clearError();	
		karel.putBeeper();
		animating = true;	
	}

	this.stepPickBeeper = function() {
		karel.clearError();	
		karel.pickBeeper();
		animating = true;	
	}
}

