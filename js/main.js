var connection = new WebSocket('ws://' + location.hostname + '/ws', ['arduino']);

connection.onopen = function () {
	connection.send('Received from Client');
	console.log('Connected');
};

connection.onerror = function (error) {
  console.log('WebSocket Error', error);
};

connection.onmessage = function (e) {
    console.log('Received from server: ', e.data);
    processReceived(e.data);
};

connection.onclose = function () {
  console.log('WebSocket connection closed');
};

function processReceived(data)
{
	json = JSON.parse(data)
	if(json.command == 'updateGPIO')
	{
		updateGPIO(json.id, json.status);
	}
	if(json.command == 'updateAutoApagado')
	{
		updateAutoApagado(json.id, json.value);
	}
	if (json.command == 'updateSensor') {
		refreshGauge(json.id, json.value);
	}
	if (json.command == 'updateProgress') {
		updateProgressBar(json.id, json.value);
	}
}

function sendGPIO(id, status)
{  

	if(status==true && document.getElementById(id).disabled==true)
	{
		document.getElementById(id).parentNode.MaterialCheckbox.enable();
	}
	else if(status==false && document.getElementById(id).disabled==false)
	{   if(document.getElementById('1').checked==true){document.getElementById('1').click();}
		document.getElementById(id).parentNode.MaterialCheckbox.disable();
	}


	let data = {
		command : "setGPIO",
		id: id,
		status: status
	}

  let json = JSON.stringify(data);
  connection.send(json);
}

function activateSPB(id,status)
{   
	element1 = document.getElementById('slider-text-'+id);
	element2 = document.getElementById('slider-'+id);
	element3 = document.getElementById("sliders");
	element4 = document.getElementById("progress");
	check = document.getElementById(id);

	if (check.checked) {
		element1.disabled=false;
		element2.disabled=false;
		element3.style.display='block';
		element4.style.display='block';
		element1.textContent=0;
		element2.MaterialSlider.change(0);

		document.getElementById('p'+id).MaterialProgress.setProgress(0);
	}
	else if (document.getElementById("1").checked==false && document.getElementById("2").checked==false && document.getElementById("3").checked==false && document.getElementById("4").checked==false) {
		element1.disabled=true;
		element2.disabled=true;
		element3.style.display='none';
		element4.style.display='none';
	}
	else if (check.checked==false){

		element1.disabled=true;
		element2.disabled=true;

	}

	let data = {
		command : "activateSPB",
		id: id,
		status: status
	}

  let json = JSON.stringify(data);
  connection.send(json);
}

function sendPWM(id, pwm)
{
	updateSliderText(id, pwm);

	let data = {
		command : "setPWM",
		id: id,
		pwm: pwm
	}

  let json = JSON.stringify(data);
  connection.send(json);
}

function updateGPIO(id, status)
{   
	if(status == true && document.getElementById('switch-1').checked==false)
	{
	document.getElementById('switch-1').click();
	}
	else if(status == false && document.getElementById('switch-1').checked==true)
	{
	document.getElementById('switch-1').click();

	}
}

function updateSliderText(id, value) {
	document.getElementById('slider-' + id).value = value; 
	document.getElementById('slider-text-'+ id).textContent = ' '+ value; 
  }

  var desactivar=0;

function updateProgressBar(id, value) {
    var segundos=0;
	var minutos=0;
	var cero="0";
	desactivar=1;

    segundos=value%60;
    minutos=value%3600/60;

	if(segundos>9){cero="";}

	document.getElementById('p'+id).MaterialProgress.setProgress(value*100/(document.getElementById('slider-' + id).value*60));
	document.getElementById('p1tool').textContent=parseInt(minutos)+":"+cero+parseInt(segundos);

  }

function refreshGauge(id, value) {

var gauge1=document.gauges.get('Temp');

 if(id=="1")
 {
	gauge1.value=value;
	gauge1.update({ units: '°C', majorTicks: ['0','10','20','30','40','50'],    
	highlights: [{ from: 0, to: 10, color: 'rgba(0,0, 255, .5)' },
                 { from: 10, to: 25, color: 'rgba(9, 255, 0, .5)' },
				 { from: 25, to: 50, color: 'rgba(255, 0, 0, .5)' }],
     minValue: 0, maxValue: 50 });
 }
 else if(id=="2")
 {
	gauge1.value=value;
	gauge1.update({ units: '°F', majorTicks: ['50','60','70','80','90','100'],    
	highlights: [{ from: 50, to: 70, color: 'rgba(0,0, 255, .5)' },
                 { from: 70, to: 90, color: 'rgba(9, 255, 0, .5)' },
				 { from: 90, to: 100, color: 'rgba(255, 0, 0, .5)' }],
     minValue: 50, maxValue: 100 });
 }
 else if(id=="3")
 {
	var gauge2=document.gauges.get('Hum');
	gauge2.value=value;

 }
}

function updateAutoApagado(id, value)
{   
	if(document.getElementById('switch-1').checked == true && document.getElementById('1').disabled==true)
	{
		document.getElementById('1').parentNode.MaterialCheckbox.enable();
	}
	else if(document.getElementById('switch-1').checked == false && document.getElementById('1').disabled==false)
	{
		document.getElementById('1').disabled=true;
	}

	if(value!=0)
	{   if(document.getElementById(id).checked==false)
		{
		document.getElementById(id).click();
	    }

		document.getElementById('slider-' + id).MaterialSlider.change(value);
		document.getElementById('slider-text-'+ id).textContent = ' '+ value;
	}
	else if(value==0 && desactivar==1)
	{
		document.getElementById('slider-' + id).MaterialSlider.change(0);
		document.getElementById('slider-text-'+ id).textContent = ' '+ value;
		document.getElementById('p'+id).MaterialProgress.setProgress(0);
		if(document.getElementById(id).checked==true)
		{
		document.getElementById(id).click();
	    }
		desactivar=0;
	}
}