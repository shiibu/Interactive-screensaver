const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // drawCircle();
        handleParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
    for(let i =0; i < 10; i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
    for(let i =0; i < 5; i++){
        particlesArray.push(new Particle());
    }
});

// function drawCircle(){
//     ctx.strokeStyle = 'red';
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
//     ctx.stroke();
// }

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// function init(){
//     for (let i = 0; i < 100; i++){
//         particlesArray.push(new Particle());
//     }
// }
// init();

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
} 

function animate(){
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // drawCircle();
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();
