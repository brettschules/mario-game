class MarioGame {
   main() {

    function animate(callback) {
        window.requestAnimationFrame(callback);
    }

    var canvas = new Canvas();
    var context = canvas.getContext("2d");

    var mario = new Mario(context);
    
    // context.moveTo(0, 0);
    // context.lineTo(200, 200);
    // context.stroke();

    function update() {
    };
    
    function render() {
        mario.drawMario()
    };

    function step() {
        update();
        render();
        animate(step);
      };

      animate(step);
   }
}

class Mario {
    context = null;

    constructor(context) {
        this.context = context;
    }

    drawMario() {
        var image = new Image();
        image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4b_4gyvaRc1GeiEvr5x4FEVwJni-hf3A8qdxg70loeqY6GpxdHaIlpVi";
        this.context.drawImage(image, 200, 200);
    }
}



class Canvas {
    width = 500;
    height = 500;
    canvas = null;

    constructor() {
        this.canvas = document.getElementById("superMario");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        return this.canvas;
    }    
}



window.onload = function() {
    var m = new MarioGame().main();
}


