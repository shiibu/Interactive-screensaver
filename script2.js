// Basic settings
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const bubbleArray = []; // Define empty array

// Define mouse coordinates
const mouse = {
    x: undefined,
    y: undefined,
}

// Track mouse clicks
canvas.addEventListener('click', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 10; i++){
        bubbleArray.push(new Bubble());
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

class Bubble {
    constructor(){
        // Define bubbles initial position
        this.x = mouse.x;
        this.y = mouse.y;

        this.size = Math.random() * 49 + 1; // Define a  random radius (1-50) for bubbles
        
        // Defines number for random speed and random omnidirectional moving
        this.speedX = Math.random() * 50 - 25;
        this.speedY = Math.random() * 50 - 25;
    }
    // Updates bubble size and position 
    update(){
        if (this.size>0.2) this.size -= 0.1; // Reduces size of bubble

        // Makes speed number into vector 
        this.x += this.speedX;
        this.y += this.speedY;
    }
    // Draws bubble
    draw(){
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function handlesBubbles(){
    for (let i = 0; i < bubbleArray.length; i++){
    bubbleArray[i].update();
    bubbleArray[i].draw();
        if (bubbleArray[i].size <= 0.2){
            bubbleArray.splice(i, 1);
            i--;
        }
    }
}



function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handlesBubbles();
    requestAnimationFrame(animate);
};

animate();