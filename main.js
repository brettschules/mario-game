class MarioGame {
   main() {

    function animate(callback) {
        window.requestAnimationFrame(callback);
    }

    var canvas = new Canvas();
    var context = canvas.getContext("2d"); 
    var mario = new Mario(context, canvas);
    
    function render() {
        mario.drawMario();
    };


    function step() {
        render();
        animate(step);
      };

      animate(step);
   }
}

class Mario {
    mx = 0;
    my = 370;
    context = null;
    canvas = null;

    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.marioIsMoving = false;
        this.intervalId;
        this.mx = this.canvas.width/2;
        this.marioJumpUpEvent();
    }

    drawMario() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // console.log("x " + this.mx, "y " + this.my);
        // this.mx = 200;
        // this.my = 200;
        var image = new Image();
        image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4b_4gyvaRc1GeiEvr5x4FEVwJni-hf3A8qdxg70loeqY6GpxdHaIlpVi";      
        this.context.drawImage(image, this.mx, this.my); 
    }

    marioJumpUpEvent() {
        document.addEventListener("keydown", (e) => {
            if(e.keyCode == 32 && !this.marioIsMoving) this.intervalId = setInterval(moveMarioUp.bind(this), 25);
        }, false);

        function moveMarioUp() {
            this.marioIsMoving = true;
            this.my = this.my - 20;
            if(this.my <= 150) {
                console.log("x " + this.mx, "y " + this.my);
                clearInterval(this.intervalId);
                this.intervalId = setInterval(moveMarioDown.bind(this), 25);
            }
        }
        function moveMarioDown() {
            this.my = this.my + 20;
            if(this.my >= 370) {
                clearInterval(this.intervalId);
                this.marioIsMoving = false;
            }
        }
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


