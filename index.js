const express = require("express")
const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://sebasrojasm1:Dipamagri1*@cluster0.govfesq.mongodb.net/`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexion a la base de datos"));


db.once("open", () => {
    console.log("La conexion se ha establecido.")

    userSchema = mongoose.Schema({
        nombres: String,
        apellidos: String
    })


    const User = mongoose.model("usuarios", userSchema);
    const Empresa = mongoose.model("empresas", userSchema);

    const app = express();
    app.use(express.json())

    //USUARIOS

    /*Imprime todos los usuarios */
    app.get("/api/usuarios", async(req, res) => {
        const usuarios = await User.find()
        res.json(usuarios)
    })


    /*Limit 10 -  */
    app.get("/api/usuarios/top10", async(req, res) => {
        const usuariosTop10 = await User.find().limit(10)
        res.json(usuariosTop10)
    })



    /*EMPRESAS */
    /*Imprime todos las empresas */
    app.get("/api/empresas", async(req, res) => {
        const empresas = await Empresa.find()
        res.json(empresas)
    })

    /*listado de usuarios que sean de la empresa id 5. */
    app.get("/api/usuarios/usersId5", async(req, res) => {
        const userId5 = await User.find({empresa_id: 5})
        res.json(userId5)
    })

    /*listado de usuarios que sean de Bangladesh. */
    app.get("/api/usuarios/bangladeshusers", async(req, res) => {
        const userBanglaseh = await User.find({pais: "Bangladesh"})
        res.json(userBanglaseh)
    })
    

    /*listado de empresas de la ciudad Bangladesh. */
    app.get("/api/empresas/bangladeshempresas", async(req, res) => {
        const empresaBangladesh = await Empresa.find({ciudad: "Bangladesh"})
        res.json(empresaBangladesh)
    })



    /*Asignar puerto: */
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })

})