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
	if (json.command == 'updateUnit') {
		updateUnit(json.id, json.value);
	}
	if (json.command == 'updatePIRstate') {
		updatePIRstate(json.id, json.value, json.tiempo);
	}
	if (json.command == 'updateOTA') {
		updateOTA(json.id, json.value);
	}
	if (json.command == 'updateWIFIParam') {
		updateWIFIParam(json.Mod,json.Ip, json.Name, json.Pass);
	}
	if (json.command == 'fileState') {
		ShowResetDialog(json.status);
	}
}

function sendUnit(id, status) {

		let data = {
			command : "setUnit",
			id: id,
			status: status
		}
	
	  let json = JSON.stringify(data);
	  connection.send(json);

}

function updateUnit(id, value) {
	   if(value==false)
	   {

		document.getElementById('radio-1').click();


	   }
	   else if(value==true)
	   {
		document.getElementById('radio-2').click();


	   }
	
}
function setPIR(id, status) {

	document.getElementById('slider-5').disabled=status ? false : true;

	let data = {
		command : "setPIR",
		id: id,
		status: status
	}

  let json = JSON.stringify(data);
  connection.send(json);

}
function setPIRvalue(id, value) {

	document.getElementById('slider-text-5').textContent = value;
	
	let data = {
		command : "setPIRvalue",
		id: id,
		value: value
	}

  let json = JSON.stringify(data);
  connection.send(json);

}

function updatePIRstate(id, status, tiempo) {
	
	document.getElementById('slider-5').disabled=status ? false : true;
	document.getElementById('slider-5').MaterialSlider.change(tiempo);
	document.getElementById('slider-text-5').textContent = tiempo;

	if(status == true && document.getElementById('switch-5').checked==false)
	{
	document.getElementById('switch-5').click();
	}
	if(status == false && document.getElementById('switch-5').checked==true)
	{
	document.getElementById('switch-5').click();
	}

}

function setOTA(id, status) {
 
	if(document.getElementById('workmode').value=='Modo Estación (STA)')
	{
	  document.getElementById('ipdir').style.display='block';
	}

	let data = {
		command : "setOTA",
		id: id,
		status: status
	}

  let json = JSON.stringify(data);
  connection.send(json);

}


function updateOTA(id, status) {
	
	if(status == true && document.getElementById('switch-6').checked==false)
	{
	document.getElementById('switch-6').click();
	}
	if(status == false && document.getElementById('switch-6').checked==true)
	{
	document.getElementById('switch-6').click();
	}

}

function updateWIFIParam(mode, Ip , ssid, pass) {
	
	document.getElementById('workmode').parentElement.MaterialTextfield.change(mode);
	document.getElementById('profile-floating-name').parentElement.MaterialTextfield.change(Ip);
	document.getElementById('profile-floating-first-name').parentElement.MaterialTextfield.change(ssid);
	document.getElementById('profile-floating-last-name').parentElement.MaterialTextfield.change(pass);

}

function SaveConfig() {

	let data = {
		command : "GuardarConfig",
		mode: document.getElementById('workmode').value,
		ip: document.getElementById('profile-floating-name').value,
		name: document.getElementById('profile-floating-first-name').value,
		pass: document.getElementById('profile-floating-last-name').value
	}

  let json = JSON.stringify(data);
  connection.send(json);


}

function ResetSys(id, status) {

	let data = {
		command : "ResetSys",
		id: id,
		status: status

	}

  let json = JSON.stringify(data);
  connection.send(json);

}

function ShowResetDialog(status) {
if(status==true)
{
	document.getElementById('more2').click();
}
}


function viewPassword() {
	
	if(document.getElementById('profile-floating-last-name').type=='password')
	{
		document.getElementById('profile-floating-last-name').type='text';
		document.getElementById('see').style.display='none';
		document.getElementById('see2').style.display='block';
	}
	else
	{
		document.getElementById('profile-floating-last-name').type='password';
		document.getElementById('see').style.display='block';
		document.getElementById('see2').style.display='none';
	}

}	


/*document.getElementById("profile-floating-name").addEventListener("invalid",myfunction());

function myfunction()
{
	document.getElementById('workmode').click();

}*/




//Segmento correspondiente a la ventana modal 1

var dialog2 = document.getElementById('dialog-one');
var showModalButton2 = document.querySelector('.show-modal1');
if (! dialog2.showModal) {
  dialogPolyfill.registerDialog(dialog2);
}
showModalButton2.addEventListener('click', function() {
  dialog2.showModal();
});
dialog2.querySelector('.close3').addEventListener('click', function() {
  dialog2.close();
});
dialog2.querySelector('.close4').addEventListener('click', function() {
	dialog2.close();
  });  

//Segmento correspondiente a la ventana modal 2

var dialog1 = document.getElementById('dialog-two');
var showModalButton = document.querySelector('.show-modal2');
if (! dialog1.showModal) {
  dialogPolyfill.registerDialog(dialog1);
}
showModalButton.addEventListener('click', function() {
  dialog1.showModal();
});
dialog1.querySelector('.close').addEventListener('click', function() {
  dialog1.close();
});
dialog1.querySelector('.close2').addEventListener('click', function() {
	dialog1.close();
  });

