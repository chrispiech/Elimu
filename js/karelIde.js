
/**
 * KarelImages
 * -----------
 * This variable is in the global scope so that all classes can 
 * use the preloaded images. As soon as the class is constructed
 * it starts fetching the necessary images.
 */
var karelImages = new KarelImages();

/**
 * Karel IDE
 * ---------
 * This is the main class for the Karel Ide. It provides the 
 * API availible to manipulate Karel. This class is in charge
 * of maintaining the karelImages singleton and making sure
 * that Karel doesn't try to render before images have been
 * loaded.
 */
function KarelIde(codeArea, canvas) {

   // I am using the class style described in JavaScript the good parts
   var that = {};

	// constants
	var ACTION_HEARTBEATS = 1;
	var HEART_BEAT = 8;	
	var REFRESH_HEARTBEATS = 100;
   var BACKGROUND_COLOR = "#fff";
   var DEFAULT_WORLD = '15x15.w';
   var DEFAULT_CANVAS_WIDTH = 557;
   var DEFAULT_CANVAS_HEIGHT = 475;
   var COOKIE_NAME = 'karelCode';

	// instance variables
	var context = canvas.getContext('2d');
	var actionCountdown = ACTION_HEARTBEATS;
	var refreshCountdown = REFRESH_HEARTBEATS;
	var worldName = DEFAULT_WORLD;
	var canvasModel = CanvasModel(DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
	
	var karel = Karel(canvasModel);
	var compileEngine = KarelEvalEngine(karel);

	// state flags
	var animating = false;
	var imagesReady = false;

   /**
    * Init
    * ----
    * Setup the variables, create a animation callback loop
    * and load images.
    */ 
	function init() {
		canvas.width = canvasModel.getWidth();
	   canvas.height = canvasModel.getHeight();
	   karelImages.loadImages(imagesLoaded);
	   setInterval(heartbeat, HEART_BEAT);	
	}

	//----------------------------- PUBLIC METHODS ---------------------------------//

   /**
    * Stop Button
    * --------------
    * Public method that stops animation and resets the current world.
    * Note that this method doesn't remove any closure methods created by
    * the user. Should be called when the stop button is pressed.
    */
	that.stopButton = function() {
		animating = false;
		loadWorld(worldName);
	}

   /**
    * Play Button
    * --------------
    * Runs the code from the IDE editor, creates a new karel application,
    * executes the code (which buffers animations) and then sets the animation
    * flag to be true so that the program starts rendering Karel's progress.
    * Should be called when the play button is pressed.
    */
	that.playButton = function () {
		var code = getCode();
		animating = true;
		compileEngine.compile(code);
	}

   /**
    * Change World
    * ------------
    * Sets the world to be the given fileName. Assumes that the fileName given
    * exists (doesn't do any checking).
    */
	that.changeWorld = function(fileName) {
		worldName = fileName;
		if (imagesReady) {
		   loadWorld(fileName);
		}
	}

   /**
    * Step Move Karel
    * ---------------
    * Make Karel take a single step forward.
    */
	that.stepMove = function() {
		step(karel.move);
	}

   /**
    * Step Turn Left Karel
    * ---------------
    * Make Karel turn left once.
    */
	that.stepTurnLeft = function() {
		step(karel.turnLeft);
	}

   /**
    * Step Turn Right Karel
    * ---------------
    * Make Karel turn right once.
    */
	that.stepTurnRight = function() {
		step(karel.turnRight);
	}

   /**
    * Step Put Beeper Karel
    * ---------------
    * Make Karel place a single beeper.
    */
	that.stepPutBeeper = function() {
		step(karel.putBeeper);
	}

   /**
    * Step Pick Beeper Karel
    * ---------------
    * Make Karel pick up a single beeper.
    */
	that.stepPickBeeper = function() {
		step(karel.pickBeeper);
	}


	//----------------------------- PRIVATE METHODS --------------------------//

	/**
    * Step
    * ----
    * Make karel execute a single action (the passed in stepFunction).
    * Clears karel of any errors and turns on animation so that karel will
    * animate the action.
    */
	function step(stepFunction) {
	   try {
	      stepFunction();
	   } catch (msg) {
	      alert(msg);
      }
	   draw();
	}

   /**
    * ImagesLoaded
    * ------------
    * This method is the callback for when images have finished loading. 
    * Updates the imagesReady flag and loads the current world.
    * Usage: karelImages.loadImages(imagesLoaded);
    */
	function imagesLoaded() {
		imagesReady = true;
		loadWorld(worldName);
	}

   /**
    * WorldFileLoaded
    * ------------
    * This method is the callback for when a world has finished loading. 
    * Updates the karelWorld instance and redraws the canvas.
    * Usage: loadDoc(worldUrl, worldFileLoaded);
    */
	function worldFileLoaded(text) {	
		karel.loadWorld(text, canvasModel);
		draw();
	}

   /**
    * Load World
    * ----------
    * Loads a new Karel World. Assumes that images have already been
    * preloaded.
    */
	function loadWorld(worldName) {
	   if (!imagesReady) {
	      alert('load world called before images ready');
	   }
	   if (worldName == '15x15.w') {
	      worldFileLoaded('Dimension: (15,15)');
	   } else {
		   var url = "worlds/" + worldName;
		   loadDoc(url, worldFileLoaded);
	   }
	}

	/**
	 * Heartbeat
	 * ---------
	 * Animation callback method which is executed once every HEART_BEAT
	 * milliseconds. Only updates and draws if the animating flag is true
	 */
	function heartbeat() {
		if (animating) {;
			update();
			draw();
		}
	}

   /**
    * Update
    * ------
    * Updates the world once every ACTION_HEATRTBEATS number of heartbeats.
    */
	function update() {
		actionCountdown = actionCountdown - 1;
		if (actionCountdown == 0 ) {
			animating = !compileEngine.executeStep();
			actionCountdown = ACTION_HEARTBEATS;
		}
	}

   /**
    * Draw
    * ----
    * Clears the canvas and draws a new version of Karel. Assumes that a
    * world has been loaded. Draws Karel infront of beepers but behind walls.
    */
	function draw() {
		clear();
		karel.draw(context);
	}

   /**
    * Clear
    * -----
    * Clears the canvas by filling it with a rectangle colored BACKGROUND_COLOR
    */
	function clear() {
		context.fillStyle = BACKGROUND_COLOR;
		context.fillRect(0, 0, canvasModel.getWidth(), canvasModel.getHeight());
	}

   /**
    * Get Code
    * -----
    * Returns the code in the Karel IDE as a String.
    */
	function getCode() {
		if (codeArea == null) return null;
		return codeArea.value;
	}

   // Initialize and return the instance (based on JavaScript the
   // Good Parts)
	init();
	return that;
}

