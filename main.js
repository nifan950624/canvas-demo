

//1.初始化变量
var canvas = document.getElementById('xxx')
getCanvasSize(canvas)
getUserView(canvas)       
var context = canvas.getContext('2d');
var lineWidth = context.lineWidth 
    lineWidth = 5;
   

//2.事件监测 touch  mouse
ListeningUser(canvas,context);




//3.按钮
clickButton(context);
var ereaseuseing = false;




/*************功能函数**************/  

function getPoint(x,y,radius){
   context.beginPath();
   context.arc(x, y,radius,0,Math.PI*2);
   context.fill()
}


function getCanvasSize(canvas){
   var pageWidth = document.documentElement.clientWidth;
   var pageHeight = document.documentElement.clientHeight;
   canvas.width = pageWidth;
   canvas.height = pageHeight;  
}


function getUserView(canvas){
   window.resize = function(){
   var pageWidth = document.documentElement.clientWidth;
   var pageHeight = document.documentElement.clientHeight;
   canvas.width = pageWidth;
   canvas.height = pageHeight; 
   }
}


function drawLine(x1,y1,x2,y2){
    context.lineJoin = 'round';
    context.beginPath();
    context.lineCap = 'round';
    context.moveTo(x1,y1);   
    context.lineWidth = lineWidth;
    context.lineTo(x2,y2);   
    context.stroke();
    context.closePath();
} 


function ListeningUser(canvas,context){
var point = {
   x:undefined,
   y:undefined
}   
var useing = false;
if(document.body.ontouchstart !== undefined){
   canvas.ontouchstart = function(aaa) {
       useing = true;
       var x = aaa.touches[0].clientX;
       var y = aaa.touches[0].clientY;         
   if(ereaseuseing){
       context.clearRect(x-10, y-10, 20, 20) 
   } else{   
       getPoint(x, y, lineWidth/2)            
       point.x = x;
       point.y = y; 
   }  
}
   canvas.ontouchmove = function(aaa) {
       var x = aaa.touches[0].clientX;
       var y = aaa.touches[0].clientY;
       var newPoint = {
           x:x,
           y:y
       }   
       if(ereaseuseing){
           if(useing){
               context.clearRect(x-10, y-10, 30, 30) 
           }            
       } else{
           if(useing){                
           drawLine( point.x,point.y ,newPoint.x,newPoint.y)
           point = newPoint;
       }
   }    
}
   canvas.ontouchend = function(aaa) {
       useing = false;
   }
}   else{
       canvas.onmousedown = function(onc){
   useing = true;
   var x = onc.clientX;
   var y = onc.clientY;         
   if(ereaseuseing){
       context.clearRect(x-10, y-10, 20, 20) 
   } else{   
       getPoint(x, y, lineWidth/2)            
       point.x = x;
       point.y = y; 
   }                    
}

canvas.onmousemove = function(move){
       var x = move.clientX;
       var y = move.clientY;
       var newPoint = {
           x:x,
           y:y
       }   
       if(ereaseuseing){
           if(useing){
               context.clearRect(x, y, 20, 20) 
           }            
       } else{
           if(useing){                
           drawLine( point.x,point.y ,newPoint.x,newPoint.y)
           point = newPoint;
       }
   }      
}

canvas.onmouseup = function(end){
   useing = false;
        }
    }     
}

colorButton(context)
function colorButton(context) {
    black.onclick = function() {
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        black.classList.add('action');
        red.classList.remove('action');
        blue.classList.remove('action');
        yellow.classList.remove('action');    
    }
    red.onclick = function() {
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        red.classList.add('action');
        blue.classList.remove('action');
        yellow.classList.remove('action'); 
        black.classList.remove('action');   
    }
    blue.onclick = function() {
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        red.classList.remove('action');
        blue.classList.add('action');
        yellow.classList.remove('action'); 
        black.classList.remove('action');  
    }
    yellow.onclick = function() {
        context.fillStyle = 'yellow';
        context.strokeStyle = 'yellow';
        red.classList.remove('action');
        blue.classList.remove('action');
        yellow.classList.add('action'); 
        black.classList.remove('action');  
    }
}

function clickButton(context){   
    erease.onclick = function() {
       ereaseuseing = true;
       action.className = 'actions x';
    }
    brush.onclick = function() {
       ereaseuseing = false;
       action.className = 'actions';
    }
    delet.onclick = function() {
        context.clearRect(0,0,canvas.width,canvas.height) 
    }
    save.onclick = function() {
        var url = canvas.toDataURL("png/image")
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = '我的画儿';
        a.target = '_black'
        a.click();
    }
    
    thin.onclick = function() {
        lineWidth = 5;
    }
    thick.onclick = function() {
        lineWidth = 10;
    }    
}