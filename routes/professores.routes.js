const express = require("express")
const router = express.Router()
const db = require("../db")

// quando criar um arquivo router usa express.Router() //

router.get("/", async (req, res) => {
    const [professores] = await db.execute("SELECT * FROM professor")
    return res.json(professores)
})

router.post("/", async (req, res) => {
    const{nome, especialidade } = req.body 

if(!nome || !especialidade){
    return res.status(400).json({error: "Nome e especialidade são obrigatorios"})
}

if(nome.length < 3) {
    return res.status(400).json({error: "Nome precisa ter mais de 3 caracteres"})
}
const [resultado] = await db.execute(
     "INSERT INTO professor (nome,especialidade) VALUES ( ?,?)",
     [nome, especialidade]
)

     return res.status(201).json({id: resultado.insertId, nome, especialidade})

})

module.exports = router 