class Main {
   main() {
    var c = document.getElementById("superMario");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
   }
}

window.onload = function() {
    var m = new Main().main();
}


