
function ImportLearnEngine() {
   var learnEngine = KarelLearnEngine();
   window.onresize = learnEngine.onWindowResize;
}

window.onload = function() {
   ImportLearnEngine();
}
