
const { response } = require("express");
var express = require("express");
const { request } = require("http");


var app= express(); 
//Modulo path
var path=require("path");
var bodyParse=require("body-parser");
//Le indicamos al servidor que existe bootstrap 
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));

app.use("/files", express.static(path.join(__dirname,"files")));
app.use(bodyParse.json());
//Recibimos el archivo conexion js
var cn = require("./mongo/conexion");

//Indicamos que página saldrá al iniciar
app.get("/",(request,response)=>{
    response.sendFile(path.join(__dirname,"pages/alumnos.html"))
})
//Response nos indica que se va observar en pantalla
app.get("/listaralumnos",(request,response)=>{
    cn.getAll(request,response);

})

app.put("/eliminaralumno/:id",(request,response)=>{
    //cn.getAll(request,response);
    cn.deleteid(request,response);
})
app.post("/insertarAlumno",(request,response)=>{
    cn.insertalumno(request,response);

});
app.post("/actualizaralumno",(request,response)=>{
    cn.updateAlumno(request,response);

});
app.get("/recuperarAlumno/:id",(request,response)=>{
    cn.getFindId(request,response);
})

app.listen("9000",()=>{
    console.log("El servidor está iniciado");
})