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
        var image = new Image();  

        // waits for image to load to get dimonsions and sets mario's properties
        image.onload = function() {
            that.marioWidth = this.width;
            that.marioHeight = this.height;
        }

        image.src = "./images/mario-facing-screen.jpeg";      
        this.context.drawImage(image, this.mx-this.marioWidth/2, this.my); 
        this.checkBoundary();

        console.log("mario width ", this.marioWidth)
        console.log("Canvas width ", this.canvas.width)
        console.log("x " + this.mx, "y " + this.my);
    }

    checkBoundary() {
        if(this.mx <= this.marioWidth/2) this.outOfBoundsLeft = true;
        if(this.mx >= this.canvas.width-this.marioWidth/2) this.outOfBoundsRight = true;
    }

    marioMoveRight() {
        if(!this.outOfBoundsRight) {
            // checks if mario should still move a certain pixels until he goes out of bounds
            this.mx <= this.canvas.width-this.marioWidth ? this.mx += this.marioMoveSpeed : this.mx=this.canvas.width-this.marioWidth/2;
        }
        this.outOfBoundsLeft=false;
    }

    marionMoveLeft() {
        if(!this.outOfBoundsLeft) { 
            this.mx >= this.marioWidth/2 + this.marioMoveSpeed ? this.mx -= this.marioMoveSpeed : this.mx=this.marioWidth/2;
        }
        this.outOfBoundsRight=false;
    }

    marioJump() {
        // every 25 ms have mario jump 20 pixels up until readches maximum then vice versa for bring mario back down
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

    // registers event listeners to be used for mario actions
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
    width = 1200;
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


