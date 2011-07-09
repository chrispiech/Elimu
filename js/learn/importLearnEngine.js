
function ImportLearnEngine() {
   var learnEngine = KarelLearnEngine();
   window.onresize = learnEngine.onWindowResize;

   var settings = {
      tl: { radius: 5 },
      tr: { radius: 5 },
      bl: { radius: 5 },
      br: { radius: 5 },
      antiAlias: true
    }
   //curvyCorners(settings, ".rounded");
}

window.onload = function() {
   ImportLearnEngine();
}
