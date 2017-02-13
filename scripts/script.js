//======================================================================================/
var Masleeny=[];

var score=0;
var miss=0;

var speedS=1;
var speedRand=3;

var main,workspace,mousepace,bandit,korzina;

var x,y,left0;
var wsX,wsY,wsL,kX,kY,mX,mY;

var stop0 = true;
var mus,vid;

var healt = 10;
//======================================================================================/



window.onblur = function () {stop();}
window.onresize = function() {wsL = parseInt(main.offsetLeft,10);}



window.onload = function() {
	

	
	mus = document.getElementById('hellfire'); mus.volume = 0; mus.play(); mus.onended = function () {mus.play();} 
	main = document.getElementById('main'); //Блок в котором находяться маслины и чел с ведром
	workspace = document.getElementById('workspace'); //Блок в котором находяться маслины и чел с ведром
	mousepace = document.getElementById('mousepace'); //Невидемый блок по которому гоняет курсор
	bandit = document.getElementById('bandit'); //Непосредственно чел с ведром 
	korzina = document.getElementById('korzina'); //Корзина куда попадают маслины, необходима для вычислений

	wsX = 750; 
	wsL = parseInt(main.offsetLeft,10);
	bX = 150;
	kX = 150;
	kY = 50;
	mX = 10;
	mY = 10;

mousepace.onclick = function(event) {stop();}

mousepace.onmousemove = function(event) {
	if(!stop0){
			x = event.pageX;
			document.getElementsByTagName('p')[0].innerHTML = event.pageX + " " + event.pageY + " | " + (x-wsL);
			
			left0 = x-(wsL+Math.round(kX/2)+15);
			
			if(left0<0){left0=0}else{
				if(left0>(wsX-bX)){left0=wsX-bX}
			};
			
			korzina.innerHTML = left0;
			//bandit.style.transitionDuration = ((wsL/(x-wsL))/10)+"s";
			bandit.style.left = (left0+"px");
		}
	}
}

function stop() {	
	stop0 = true; //alert("stop");
	document.getElementById('mainmenu').style.display = "block";
	clearInterval(kek);
	clearInterval(kek1); 
	clearInterval(kek2); 
}

var kek,kek1,kek2;

function start() {	
	stop0 = false; //alert("start");
	document.getElementById('mainmenu').style.display="none"
	//setTimeout('window.onmouseout = function(){stop();};',1000);
	kek = setInterval('create();',1000);
	kek1 = setInterval('move();',10);
	kek2 = setInterval(function(){speedRand++},10000);
}

function show(obj) {	
	var o = document.getElementById(obj);
	if(o.style.display == 'block'){o.style.display = 'none'}else{o.style.display = 'block'};
}

function create() {
	var Masleena = document.createElement('div');
    var speedA = speedS+(Math.round(Math.random()*speedRand)); 
	workspace.appendChild(Masleena);

	if((Math.random()*100)<10){universal(Masleena,"vodka",5,5,10);}else{
		if((Math.random()*100)<50){universal(Masleena,"shelupon",1,20,20);}else{
			universal(Masleena,"masleena",3,10,10);
			}
		}
	
	Masleeny.push(Masleena);
}

function del(item,n,col) {
	item.className = "delete";
	item.innerHTML = n; 
	item.style.color = col;
	
	
	var pos;
	pos = (parseInt(item.style.top,10)-10);
	if(pos>=(wsX-50)){pos=pos-50};
	
	setTimeout(function() { item.style.transitionDuration = "2s";item.style.top =pos+"px"; item.style.opacity = "0";},1000);
	setTimeout(function() { item.remove(); },2000);
}

function move() {
	Masleeny.forEach(function(item, i, arr) {
	var a = parseInt(item.style.top,10);
	var b = parseInt(item.style.left,10);
	var h = parseInt(item.style.height,10);
	
	//item.innerHTML = a;
	item.style.top = (a+item.speed)+"px";

	if(a>730){
	if((left0<(b+kX))&&(left0>(b-kX))&&(a<740)){
		switch (item.className) {
			case "vodka":
				console.log("Catch vodka");
				document.getElementById('smallmedkit1').play();
				delete Masleeny[i];
				del(item,"[+1] vodke","green");
				score+=50; healt+=1;
				break;
			case "shelupon":
				console.log("Catch shelupon");
				delete Masleeny[i];
				del(item,"[-3] vodke","red");
				score-=25; if(healt>0){healt-=3};
				break;
			default:
				console.log("Catch masleeena");
				document.getElementById('pickup').play();
				if((Math.random()*100)<10){gotcha1.play()};
				delete Masleeny[i];
				del(item,"+15","green");
				score+=15; 
		}			
	}	
	if(a>=740){
		switch (item.className) {
			case "vodka":
				console.log("loss vodka");
				delete Masleeny[i];
				del(item,"","green");
				break;
			case "shelupon":
				console.log("loss shelupon");
				delete Masleeny[i];
				del(item,"GOOD","green");
				break;
			default:
				console.log("loss masleeena");
				delete Masleeny[i];
				del(item,"[-1] vodke","red");
				score+=15; 
				miss+=1; if(healt>0){healt-=1};
		}	
	}

	document.getElementById('heal').style.width = (healt*30)+"px";
	document.getElementsByTagName('p')[2].innerHTML = "Miss: " + miss;
	document.getElementsByTagName('p')[1].innerHTML = "Score: " + score;	
	}
	//console.log(parseInt(item.style.top,10));
	});	
}

function souCh(vol) {
	[].forEach.call(document.getElementsByTagName('audio'), function(item, i, arr) {item.volume = vol});
	mus.volume = document.getElementById('ratio0').value;
	document.getElementById('gotcha1').play();
}	


function sky(check) {
	sky1 = document.getElementById('sky1');
	if(check){sky1.style.animation = "move 10s infinite linear";}else{sky1.style.animation = "";}
}