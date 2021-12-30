var mongoose = require("mongoose");
var cadenaconexion="mongodb+srv://AQNPRUEBA:CHIQUITIN31sA@clusteraqn.njhm6.mongodb.net/tareacamacho?retryWrites=true&w=majority";
var Schema= mongoose.Schema;
mongoose.connect(cadenaconexion,{useNewUrlParse:true,
useUnifiedTopology:true},(err,res)=>{
    if(err){
        console.log("Ocurrio un error");
    }else{
        console.log("Se conectó correctamente");
    }

})

var objeto = new Schema({
    _id:Schema.Types.String,
    matricula: Schema.Types.String,
    nombre:Schema.Types.String,
    apellido_paterno:Schema.Types.String,
    ap_materno:Schema.Types.String, 
    carrera:Schema.Types.String
},{collection:"alumnos"})

var Alumnos = mongoose.model("alumnos",objeto);
class ProductoController{
    getAll(request,response){
        Alumnos.aggregate([
            {
                $project:{
                    _id:1, matricula:1, nombre:1, apellido_paterno:1, ap_materno:1, carrera:1

                }
            }    
        ]).then(res=>{
            response.json(res)
        }).catch(err=>{
            response.end("Ocurrio un error");
        })
    }

    getFindId(request,response){
        var id= request.params.id;
        Alumnos.aggregate([{$match:{_id:id}},
        {
            $project:{
                _id:1,
                matricula:1,
                nombre:1,
                apellido_paterno:1,
                ap_materno:1,
                carrera:1
            }
        }
        ]).then(res=>{
            response.json(res);

        }).catch(err=>{
            response.end(err);
        })

    }

    //Crear un método exclusivo para eliminar
    deleteid(request,response){
        var id= request.params.id;
        Alumnos.deleteOne({_id:id}).then(res=>{
            response.json({estado:"OK"});

        }).catch(err=>{
            response.json({estado:"Error"})
        })
 
    }

    updateAlumno(request,response){
        var id=request.body._id;
        var matricula=request.body.matricula;
        var nombre=request.body.nombre;
        var apellido_paterno=request.body.apellido_paterno;
        var ap_materno=request.body.ap_materno;
        var carrera=request.body.carrera;

        Alumnos.updateOne({_id:id},{
            $set:{
                matricula:matricula,
                nombre:nombre,
                apellido_paterno:apellido_paterno,
                ap_materno:ap_materno,
                carrera:carrera
            }

        }).then(res=>{
            response.json({estado:"OK"});
        }).catch(err=>{
            response.json({estado:"Error"});
        })
    }

    insertalumno(request,response){
        var id=mongoose.Types.ObjectId();
        var matricula=request.body.matricula;
        var nombre=request.body.nombre;
        var apellido_paterno=request.body.apellido_paterno;
        var ap_materno=request.body.ap_materno;
        var carrera=request.body.carrera;

        var Oalumnos= new Alumnos({
            _id:id,
            matricula:matricula,
            nombre:nombre,
            apellido_paterno:apellido_paterno,
            ap_materno:ap_materno,
            carrera:carrera
        });
        Oalumnos.save(function(err,res){
            if(err){
                console.log("Error al registrar");

            }else{
                console.log("OK");
                response.json({estado:"OK"})
            }
        })
    }
}

module.exports= new ProductoController();