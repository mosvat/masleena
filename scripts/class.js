function c(p) {
return parseInt(p,10) 
}

function universal(e,c,s,x0,y0) {   //element,className,speed,x,y
	e.className = c;
	e.style.left = (35+(Math.round(Math.random()*(wsX-75)))+"px");
	e.style.top = "0px";
	e.speed = s;
	e.x = x0;
	e.y = y0;
}

function cath(el1,el2) {   //element,className,speed,x,y

}

window.onkeypress = function(event) {
if((event.charCode == 1103) || (event.charCode == 122)){
	var z0 = document.getElementById('css2');
	if(z0.getAttribute("admin") == 0){z0.setAttribute('admin', '1'); z0.setAttribute('href', 'styles/objects.css');}else
		{z0.setAttribute('admin', '0'); z0.setAttribute('href', 'styles/objectsC.css');}
	};	
};

window.onkeyup = function(event) {
//document.getElementById('css2').setAttribute('href', 'styles/objects.css');	
};