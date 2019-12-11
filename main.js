class MarioGame {
   main() {

    function animate(callback) {
        window.requestAnimationFrame(callback);
    }

    var canvas = new Canvas();
    var context = canvas.getContext("2d"); 
    var mario = new Mario(context, canvas);
    
    // redrawl mario constantly in 60fps
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
    marioWidth = 0;
    marioHeight = 0;
    marioIsJumping = false;
    outOfBoundsLeft = false;
    outOfBoundsRight = false;
    marioMoveSpeed = 20;

    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.intervalId;
        this.mx = this.canvas.width/2;
        this.addEventListeners();
    }

    drawMario() {
        var that = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log("x " + this.mx, "y " + this.my);

        var image = new Image();  

        // waits for image to load to get dimonsions and sets mario's properties
        image.onload = function() {
            that.marioWidth = this.width;
            that.marioHeight = this.height;
        }



        image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4b_4gyvaRc1GeiEvr5x4FEVwJni-hf3A8qdxg70loeqY6GpxdHaIlpVi";      
        this.context.drawImage(image, this.mx, this.my); 
        this.checkBoundary();
    }

    checkBoundary() {
        console.log("width, ", this.marioWidth)
        console.log("Canvas width ", this.canvas.width)
        if(this.mx <= 0) this.outOfBoundsLeft = true;
        // todo: fix
    }

    marioMoveRight() {
        if(!this.outOfBoundsRight) {
            this.mx <= this.canvas.width-this.marioWidth ? this.mx += this.marioMoveSpeed : this.mx=this.canvas.width-this.marioWidth;
        }
        this.outOfBoundsLeft=false;
    }

    marionMoveLeft() {
        if(!this.outOfBoundsLeft) { 
            this.mx >= this.marioMoveSpeed ? this.mx -= this.marioMoveSpeed : this.mx=0;
        }
        this.outOfBoundsRight=false;
    }

    marioJump() {
        // every 25 ms have mario jump 20 pixels up until readches maxium then vice versa for bring mario back down
        this.intervalId = setInterval(moveMarioUp.bind(this), 25);
        function moveMarioUp() {
            this.marioIsJumping = true;
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
                this.marioIsJumping = false;
            }
        }
    }

    addEventListeners() {
        document.addEventListener("keydown", (e) => {
            e.stopPropagation();
            if(e.keyCode == 32 && !this.marioIsJumping) this.marioJump()
            if(e.keyCode == 39) this.marioMoveRight();
            if(e.keyCode == 37) this.marionMoveLeft();
            
        }, false);
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


