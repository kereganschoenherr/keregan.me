
//Canvas Setup

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Event Listeners

var mouse = {
	x: undefined,
	y: undefined,
	influence: Math.max(canvas.width,canvas.height)
}

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
});

window.addEventListener('mousemove',function(event){
mouse.x = event.x;
mouse.y = event.y;


});



function Circle(x,y,radius,dx,dy,color){
	
	this.partners = [];
	this.radiusPrime = radius;
	this.connected = false;
	//this.color = color;
	this.strokeFade = 1;
	this.strokeColor = 'rgba(255,255,255,'+String(this.strokeFade)+')';
	
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.dxPrime = this.radius*.3;
	this.dyPrime = -this.radius*.3;
	this.dx = this.radius*.3*Math.sign(dx);
	this.dy = -this.radius*.3*Math.sign(dy);
	
	c.strokeStyle = "white";
	c.fillStyle = "white";
	
	
	

	this.draw = function(){
		
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		
		
		c.strokeStyle = "white";
		c.fillStyle = "white";
	

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
		// MOUSE INTERACTIVITY

		
		if(mouse.x - this.x < mouse.influence && mouse.x - this.x > -mouse.influence && mouse.y - this.y < mouse.influence && mouse.y -this.y >-mouse.influence){
			this.dx = this.radius*((canvas.width/2) - mouse.x) / canvas.width;
			this.dy = this.radius*((canvas.height/2) - mouse.y) / canvas.height;
		}
		else{
			this.dx = this.dxPrime;
			this.dy = this.dyPrime;
		}

	

		
		this.x += this.dx;
		this.y += this.dy/2;
	

		

		this.draw();
		

	}
}

var lineArray = [];
var circleArray = [];
var colorArray = ['#E94858','#F3A32A','#82BF6E','#3CB4CB'];
var currentdx = Math.round(Math.random()) * 2 - 1;
var currentdy = Math.round(Math.random()) * 2 - 1;
//var nodeCount = 80;
var nodeCount = Math.min(Math.floor((canvas.width / 12)),80);
alert(nodeCount)

console.log(nodeCount);
for(i = 0; i <nodeCount; i++){
var x = Math.random() * canvas.width; 
var y = Math.random() * canvas.height;
var radius = (Math.random() + .1) * 2;
var dx = (Math.random() - .5) * .01;
var dy = (Math.random() - .5) * .01;
var color = colorArray[Math.floor(Math.random() * colorArray.length)];

circleArray.push(new Circle(x,y,radius,currentdx,currentdy,color));
}

function animate(){

	c.clearRect(0,0,canvas.width,canvas.height);
	requestAnimationFrame(animate);
	for(i = 0; i < circleArray.length;i++){

		for(j = circleArray.length - 20; j < circleArray.length; j++){
			
				
				

		var dist_x = Math.abs(circleArray[i].x - circleArray[j].x);
		var dist_y = Math.abs(circleArray[i].y - circleArray[j].y);
		
		if(dist_x < circleArray[i].radius*50 && dist_y < circleArray[i].radius*50){
			
			

			
			c.strokeStyle = circleArray[i].color;
			
			
			
			c.beginPath();
			c.moveTo(circleArray[i].x,circleArray[i].y);
			c.lineTo(circleArray[j].x,circleArray[j].y);
			c.stroke();
			

		}
	
		
}
		
		circleArray[i].update();
		

	}



}
animate();


