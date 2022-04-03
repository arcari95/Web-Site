function ActHora(){
    var d = new Date();

    var Hora = d.getHours();
    var Minuto = d.getMinutes();
    var Segundo = d.getSeconds();
    var Dia = d.getDate();
    var Mes = d.getMonth() + 1;//empieza en 0 y llega a 11
    var Anho = d.getFullYear();

    var URL = "setHour?Horas="+Hora+"&Minutos="+Minuto+"&Segundos="+Segundo+"&Dia="+Dia+"&Mes="+Mes+"&Anho="+Anho;
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
      
    }
  };
   xhttp.open("GET", URL, true);
  xhttp.send();
}

function twoDigits(i){
if(i<10){
i='0'+i;
}
return i;
}
setInterval(function() {
  // Call a function repetatively with 1 Second interval
  setHoraClient();
}, 1000); //2000mSeconds update rate

function setHoraClient() {
  var d = new Date();
  
  if(d.getHours()>12){
	var Horas = d.getHours() - 12;
	var meridiano = 'PM';
  }
  else{
  var Horas = d.getHours();
  var meridiano = 'AM';
  }

  document.getElementById("HoraLocal").innerHTML = Horas +':'+twoDigits(d.getMinutes())+':'+twoDigits(d.getSeconds())+meridiano;
};