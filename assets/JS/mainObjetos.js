
function Pasajero(nombrePasajero, apellidoPasajero, dniPasajero, asiento) {
    this.nombrePasajero = nombrePasajero;
    this.apellidoPasajero = apellidoPasajero;
    this.dniPasajero = dniPasajero;
    this.asiento = asiento;

    this.listar = function () { 
        var html = "";
        html += "Nombre: " + this.nombrePasajero + "<br>";
        html += "Apellido: "+ this.apellidoPasajero + "<br>";
        html += "DNI: " + this.dniPasajero+ "<br>";
        html += "Nro Asiento: " + this.asiento + "<br>";
        return html;
    }
}

function AsientosReserva() {
    this.asientos = [];
    this.global = undefined ;

    this.add = function(pasajero){
        this.asientos.push(pasajero);

        this.global.style.backgroundColor = "#66ff33";

    }
    this.buscar = function(dniBusqueda){
        for(var i=0; i<this.asientos.length ; i++){
            var datos = this.asientos[i];
            if(datos.dniPasajero == dniBusqueda){       

               document.getElementById("txtNombre").value = datos.nombrePasajero;
               document.getElementById("txtApellido").value = datos.apellidoPasajero;
               document.getElementById("txtDNI").value =datos.dniPasajero;
               
            }
        }
    }
    this.cancelar = function(dniBusqueda){
        for(var i in this.asientos){
            var datos = this.asientos[i];
            if(datos.dniPasajero == dniBusqueda){
                this.asientos.splice(i,1);
            }
        }
        this.global.style.backgroundColor = "white";

    }
    this.listar = function(element){
        for(var i in this.asientos){
            var datos = this.asientos[i];
            element.innerHTML += datos.listar();
        }
       
    }
    this.limpiar = function(){
       document.getElementById("txtNombre").value="";
       document.getElementById("txtApellido").value="";
       document.getElementById("txtDNI").value="";
       document.getElementById("resultado").innerHTML="";
    }
    this.seleccionar = function  (celda) {

            var numAsiento=celda.textContent;
            var numero = parseInt(numAsiento);
            for(var i=0; i< this.asientos.length; i++){
                var datos = this.asientos[i];
                if( datos.asiento == numero){
                    document.getElementById("txtNombre").value=datos.nombrePasajero;
                    document.getElementById("txtApellido").value=datos.apellidoPasajero;
                    document.getElementById("txtDNI").value=datos.dniPasajero;
                    document.getElementById("resultado").innerHTML=""; 
                    
                }
            }
            this.global = celda;
    }

}

var asientoReserva = new AsientosReserva();

var bntBuscar = document.getElementById("bntBuscar");
btnBuscar.onclick = function () {
    var dniBusqueda = document.getElementById("dniBusqueda").value;
    asientoReserva.buscar(dniBusqueda);

}

var resultado = document.getElementById("resultado");
var btnlistar = document.getElementById("btnlistar");
btnlistar.onclick = function () {   
    asientoReserva.listar(resultado);
     
}

var btnReservar = document.getElementById("btnReservar");
btnReservar.onclick = function () {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var DNI = document.getElementById("txtDNI").value;
    var asiento = parseInt(asientoReserva.global.textContent);
    console.log("asiento: " + asiento);
    asientoReserva.add(new Pasajero(nombre,apellido,DNI,asiento));
    alert("Asiento reservado");
    asientoReserva.limpiar();
}

var btnCancelar = document.getElementById("btnCancelar");
btnCancelar.onclick = function () {
    var DNI = document.getElementById("txtDNI").value;
    asientoReserva.cancelar(DNI);
    asientoReserva.limpiar();
    alert("Pasajero eliminado");
}

var celdas = document.getElementsByTagName('td');
for (var i = 0; i < celdas.length; i++) {
    celdas[i].onclick = function (event) {
        asientoReserva.seleccionar (event.target);
    }
}

