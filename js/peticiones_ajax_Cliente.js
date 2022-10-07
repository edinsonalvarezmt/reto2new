//EVENTOS O FUNCIONALIDADES PARA TABLA GASTOS


//Funcion limpiar campos del formulario

function limpiar_formulario(){
	//if (confirm("Esta seguro que desea limpiar el formulario?")){
		var campoTextoID = document.getElementById("codigo");
		var campoTextoNombre = document.getElementById("name");
		var campoTextoEmail = document.getElementById("email");
		var campoTextoEdad = document.getElementById("age");
		//var campoTextoDesc = document.getElementById("desc");
		//var campoTextoUser = document.getElementById("user");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoNombre.value = "";
		campoTextoEmail.value = "";
		campoTextoEdad.value = "";
		//campoTextoDesc.value = "";
		//campoTextoUser.value = "";		
		divResultado.innerHTML = ""
		
		//Otra forma de limpiar las cajas del html
		
		/*
		$("#codigo").val("");
		$("#name").val("");
		$("#fecha").val("");
		$("#valor").val("");
		$("#desc").val("");
		$("#user").val("");
		*/
	//}
}


//Funcion (GET) consultar o traer toda la informacion o registro de la tabla gastos
function consultar_todo(){
    $.ajax({
        url:"https://gcfd9f35194e15c-jn68qx7m5o55w9x5.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion -- cod. estado: ' + xhr.status);
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaGastos(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>NOMBRE:</th> <th>EMAIL:</th> <th>EDAD</th> </tr> </tr>"
                                                      //<th>DESCRIPCION</th> <th>USUARIO</th> </tr> </tr>"
			total = 0;
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td>" + json.items[i].email + "</td>";
				filas += "<td>" + json.items[i].age + "</td>";
				 //filas += "<td>" + json.items[i].descripcion + "</td>";
				 //filas += "<td>" + json.items[i].nombre_usuario + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				total += json.items[i].valor
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "<tr><th colspan='2'>TOTAL:<td>$" + total + "</center>")
			console.log(json)
			
			
        }

    });
}


//Otra forma de construir la anterior consultar o traer resultado de la tabla gastos es:
//Tiene que descomentar las lineas 20 y 21 de la funcion consultar o traer informacion
//Tambien eliminar todas las lineas de la 23 hasta la linea 41 y descomente esta funcion:

/* 
function crearRespuestaGastos(items){

    let myTable ="<table border='1'>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].nombre+"</td>";
        myTable+="<td>"+items[i].fecha+"</td>";
        myTable+="<td>"+items[i].valor+"</td>";
        myTable+="<td>"+items[i].descripcion+"</td>";
		myTable+="<td>"+items[i].nombre_usuario+"</td>";
        myTable+="<td> <button onclick='borrarElementoRoom("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}
*/


function validarCampo(campoTexto){
	if(campoTexto.val() != ""){
		return true;
	}
	else{
		return false;
	}
}



//Funcion (GET) para buscar o Consultar por ID

function consultaID(id){
	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar"+id.attr("id"));
	
	}
	else{

		$.ajax({
			url: 'https://gcfd9f35194e15c-jn68qx7m5o55w9x5.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client/:id'+ id.val(),
			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NOMBRE:<td>" + json.items[0].name
					filas += "<tr><th>EMAIL:<td>" + json.items[0].email
					filas += "<tr><th>EDAD:<td>" + json.items[0].age
					//filas += "<tr><th>DESCRIPCION:<td>" + json.items[0].description
					//filas += "<tr><th>USUARIO:<td>" + json.items[0].nombre_usuario
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('ha ocurrido un problema, Error: ' + xhr.status);
			},
			
			complete: function(xhr, status){
				alert('La peticion ha sido realizada,' + xhr.status);
				
			}		

		});
	}
}





//Funcion (POST) Registrar o Guardar toda la informacion en la tabla Cliente

function guardarInformacion(){
	
	if(!validarCampo($("#name"))){
		alert("Debe ingresar el nombre");
		return;
	}
	
	if(!validarCampo($("#valor"))){
		alert("Debe ingresar un valor");
		return;
	}	
	
    $.ajax({
        url: 'https://gcfd9f35194e15c-jn68qx7m5o55w9x5.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
		
		data:{
			name: $("#name").val(),
			//fecha: "23/09/2022",
			//fecha: $("#stars").val("date"),
			 email: $("#email").val(),
                                                          age: $("#age").val(),
                                                       // valor: $("#valor").val(),			
			//descripcion: $("#desc").val(),
			//nombre_usuario: $("#user").val()			
		},
		
		type: 'POST',
		
		dataType: 'json',
		
				
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr.status == 200){
				console.log("registro guardado con exito");
			}
			else{
				console.log("Favor revise que los datos esten correctos");
			}
		},
		
		complete: function(xhr, status){
			alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultar_todo();
			
		},	
    });
}








//Funcion (PUT) Editar o Actualizar registro de la tabla Cliente
function editar_Informacion(){
    let myData={
        id:$("#codigo").val(),
        nombre:$("#name").val(),
        Email:$("#email").val(),
        Edad:$("#age").val(),

       //fecha:$("#fecha").val(),
		fecha: "23/09/2022",
		valor:$("#valor").val(),
        //descripcion:$("#desc").val(),
       // nombre_usuario:$("#user").val()
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Está seguro de eliminar el registro:  " + $("#codigo").val() + "  ??")){
		
		$.ajax({
			url:"https://gcfd9f35194e15c-jn68qx7m5o55w9x5.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
			type:"PUT",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			success:function(respuesta){
				$("#resultado").empty();

				consultar_todo();
				alert("se ha realizado la Actualicion del registro correctamente")
			}
		});
	}
}






//Funcion (DELETE) Borrar o Eliminar registro de la tabla Cliente
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Está seguro de eliminar el registro:  " + idElemento + "  ??")){
	
		$.ajax({
			url:"https://gcfd9f35194e15c-jn68qx7m5o55w9x5.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(respuesta){
				$("#resultado").empty();
				limpiar_formulario();
				consultar_todo();
				alert("El registro se ha Eliminado correctamente.")
				
			}
		});
	}
}