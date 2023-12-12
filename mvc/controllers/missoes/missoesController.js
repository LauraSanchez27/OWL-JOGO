const MissoesDao = require('../../DAO/missoes/missoesDAO')
const path = require('path')

module.exports = (app) => {

    app.get("/missoes", async (req, res) => {        
        const missoesDao = new MissoesDao()
        res.setHeader("Access-Control-Allow-Origin","*") 
        res.json(await missoesDao.consultarTodos())        
    })

    app.post("/missao", async (req, res) => {      
        const missoesDao = new MissoesDao()

        const {
            txtid: id,
            txtnamemis: nome,
            txtdescmis: desc,
            txtvaluemis: recompensa
        } = req.body

        res.setHeader("Access-Control-Allow-Origin","*")

        let status;

        if(!id){
            console.log(nome,desc, recompensa)
            status = await missoesDao.cadastrar(nome, desc, recompensa)
        }
        else{
            console.log(id,nome,desc,recompensa)
            status = await missoesDao.atualizar(id, nome,desc, recompensa)
        }   
        res.redirect("/listmissoes")
    })

    app.delete("/missao/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const missoesDao = new MissoesDao()

        const status = await missoesDao.apagar(req.params.id)

        res.json({
            status
        })
    })
    app.put("/missao/:id", async (req, res) =>{
        const missoesDao = new MissoesDao()
        
        const {
            nome,
            desc,
            recompensa,
            id
        } = req.body;
      
        if(id == req.params.id){
          const r =  await missoesDao.atualizar(nome,desc,recompensa, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }     

    })

    app.get("/listmissoes", (req, res) => {
        res.render('missoes/listmissoes', {  })
    }) 

    app.get("/altermissao/:id", async (req, res) =>{
        
        const coin = new MissoesDao()        
        const r = await coin.consultarUm(req.params.id)
        res.render('missoes/altermissao', { r })
    })

    app.get("/addmissao", (req, res) => {
        res.render('missoes/addmissao', {  })
    })
}