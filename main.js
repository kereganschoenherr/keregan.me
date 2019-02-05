



var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});



function Circle(x,y,radius,dx,dy,color,gravity){
	c.beginPath();
	this.radiusPrime = radius;
	this.connected = false;
	this.color = color;
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.dxPrime = this.radius*.3;
	this.dyPrime = -this.radius*.3;
	this.dx = this.radius*.3*Math.sign(dx);
	this.dy = -this.radius*.3*Math.sign(dy);
	
	c.strokeStyle = color;
	c.fillStyle = color;
	c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
	c.stroke();
	
	

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		c.strokeStyle = color;
		c.fillStyle = color;
		c.stroke();
		
		c.fill();
	
	}
	

	
	this.update = function(){
		
		if(this.x > canvas.width + this.radius){
			this.x = -this.radius;
		}
		else if(this.x < -this.radius){
			this.x = canvas.width+this.radius;
		}

		if(this.y < -this.radius){
			this.y = this.radius + canvas.height;
		}
		
		
		else if(this.y > canvas.height + this.radius){
			this.y = -this.radius;
		}
	
		this.x += this.dx;
		this.y += this.dy/2;
		this.draw();
	}
}
var circleArray = [];
var currentdx = Math.round(Math.random()) * 2 - 1;
var currentdy = Math.round(Math.random()) * 2 - 1;
for(i = 0; i < 60; i++){
var x = Math.random() * canvas.width; 
var y = Math.random() * canvas.height;
var radius = (Math.random() + .1) * 2;
var dx = (Math.random() - .5) * .01;
var dy = (Math.random() - .5) * .01;
var color = "#333"

circleArray.push(new Circle(x,y,radius,currentdx,currentdy,color,.5));
}

function animate(){

	c.clearRect(0,0,canvas.width,canvas.height);
	requestAnimationFrame(animate);
	for(i = 0; i < circleArray.length;i++){
		circleArray[i].update();
	}
}
animate();


