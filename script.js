// Basic settings
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const bubbleArray = []; // Define empty array for holding bubbles
const colourPalette = [ // Define array for holding colours for bubbles
    'rgb(45, 226, 230)', // Cyan
    'rgb(253, 29, 83)',  // Coral
    'rgb(247, 6, 207)',  // Neon pink
    'rgb(146, 0, 117)']; // Plum

// Define mouse coordinates
const mouse = {
    x: undefined,
    y: undefined,
};

// Tracks canvas resizing and adjusts accordingly
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
});

// Track mouse clicks and bursts bubbles at mouse position
canvas.addEventListener('click', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 10; i++){
        bubbleArray.push(new Bubble());
    }
});

class Bubble {
    constructor(){
        // Define bubbles initial position
        this.x = mouse.x;
        this.y = mouse.y;

        this.size = Math.random() * 29 + 1; // Define a  random radius for bubbles
        
        // Defines number for random speed and random omnidirectional moving
        this.speedX = Math.random() * 20 - 10;
        this.speedY = Math.random() * 20 - 10;
        
        this.color =  colourPalette[Math.floor(Math.random() * colourPalette.length)] ; //Defines randomised colours for each bubble
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
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Draws bubbles and updates in each index step
function handlesBubbles(){
    for (let i = 0; i < bubbleArray.length; i++){
    bubbleArray[i].update();  // Updated bubble for index i 
    bubbleArray[i].draw();  // Draws bubble for index i   

        // Makes bubbles bounce off sides
        if (bubbleArray[i].y + bubbleArray[i].speedY < Bubble.size || bubbleArray[i].y + bubbleArray[i].speedY > canvas.height-Bubble.size){
            bubbleArray[i].speedY = -bubbleArray[i].speedY;
        }
        if (bubbleArray[i].x + bubbleArray[i].speedX < Bubble.size || bubbleArray[i].x + bubbleArray[i].speedX > canvas.width-Bubble.size){
            bubbleArray[i].speedX = -bubbleArray[i].speedX;
        }

        // Removes bubbles if very small
        if (bubbleArray[i].size <= 0.2){    
            bubbleArray.splice(i, 1);
            i--; // Resets index after removal
        }
    }
};

// Animates the bubbles
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handlesBubbles();
    requestAnimationFrame(animate);
};

animate();