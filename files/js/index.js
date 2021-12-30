const { append } = require("express/lib/response");

window.onload=function(){
    listar();

}

function listar(){
    //Conexion entre el cliente y servidor
    fetch("/listaralumnos").then(res=>{
        res.json().then(json=>{
            listarAlumnos(json);
        })
    })

}

function verFormulario(id){
    limpiar();
    
    document.getElementById("divFormulario").style.display="block";
    if(id!=null){
       recuperarInformacion(id);
    }
}

function recuperarInformacion(id){
    fetch("/recuperarAlumno/"+id).then(res=>{
        res.json().then(json=>{
            var data=json[0];
            document.getElementById("txtid").value=data._id;
            document.getElementById("txtmatricula").value=data.matricula;
            document.getElementById("txtnombre").value=data.nombre;
            document.getElementById("txtap_paterno").value=data.apellido_paterno;
            document.getElementById("txtap_materno").value=data.ap_materno;
            document.getElementById("txtcarrera").value=data.carrera;
        });
    }).catch(err=>{
        alert(err);
    })

}

function limpiar(){
    document.getElementById("txtid").value="";
    document.getElementById("txtmatricula").value="";
    document.getElementById("txtnombre").value="";
    document.getElementById("txtap_paterno").value="";
    document.getElementById("txtap_materno").value="";
    document.getElementById("txtcarrera").value="";
}

function ocultarFormulario(){
    document.getElementById("divFormulario").style.display="none";
}
function listarAlumnos(res){

    var contenido=`
    
    <table class='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Carrera</th>
                <th>Operaciones</th>

            </tr>
        </thead>


    
    `;
    contenido+="<tbody>";
    var data;
    for(var i=0; i<res.length; i++){
        data = res[i];
        contenido+=`
            <tr>
                <td>${data._id}</td>
                <td>${data.matricula}</td>
                <td>${data.nombre}</td>
                <td>${data.apellido_paterno}</td>
                <td>${data.ap_materno}</td>
                <td>${data.carrera}</td>

                <td>
                <button class='btn btn-primary' onclick='verFormulario("${data._id}")'>
                Editar
                </button>

                <button class='btn btn-danger' onclick='Eliminar("${data._id}")'>
                Eliminar
                </button>
                </td>

            </tr>
        
        
        `;
    }
    contenido+="</tbody>";


    contenido+="</table>";
    document.getElementById("divAlumno").innerHTML=contenido;
   
}
function Eliminar(id){
    if(confirm("¿Quieres eliminar el registro?")==1){
        fetch("/eliminaralumno/"+id,{
            method:"PUT"
        }).then(res=>{
            res.json().then(rpta=>{
                if(rpta.estado=="OK"){
                    alert("Se eliminó correctamente :v");
                    listar();

                }else{
                    alert("Ocurrio un error");
                }
            })
        }).catch(err=>{

        });

    }

}

function enviarDatos(){
    var ruta="";
    var id=document.getElementById("txtid").value;
    var matricula=document.getElementById("txtmatricula").value;
    var nombre=document.getElementById("txtnombre").value;
    var paterno=document.getElementById("txtap_paterno").value;
    var materno=document.getElementById("txtap_materno").value;
    var carrera=document.getElementById("txtcarrera").value;
    if(id==""){
        ruta="/insertarAlumno";
    }else{
        ruta="/actualizaralumno";
    }
        fetch(ruta,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                "_id":id,
                "matricula":matricula,
                "nombre":nombre,
                "apellido_paterno":paterno,
                "ap_materno":materno,
                "carrera":carrera
            })
        }).then(res=>{
            alert("Se guardó correctamente");
            listar();
            ocultarFormulario();
        }).catch(err=>{
            alert("Hubo un errror :(");

        })
}
