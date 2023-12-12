const DescontoDAO = require('../../DAO/desconto/descontoDAO')
const path = require('path')
 
module.exports = (app) => {
 
    app.get("/descontos", async (req, res) => {        
        const descontoDAO = new DescontoDAO()
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await descontoDAO.consultarTodos())        
    })
 
    app.post("/desconto", async (req, res) => {        
        const descontoDAO = new DescontoDAO()
 
        const {
            txtid: id,
            txtvalordct: valor
        } = req.body
 
     
        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;
 
        if(!id){
            status = await descontoDAO.cadastrar(valor)
        }
        else{
            status = await descontoDAO.atualizar(id, valor)
        }  
        res.redirect("/listdescontos")
    })
 
    app.delete("/desconto/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const descontoDAO = new DescontoDAO()
 
        const status = await descontoDAO.apagar(req.params.id)
 
        res.json({
            status
        })
    })
    app.put("/desconto/:id", async (req, res) =>{
        const descontoDAO = new DescontoDAO()
       
        const {
            valor,
            id
        } = req.body;
     
        if(id == req.params.id){
          const r =  await descontoDAO.atualizar(valor, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }    
 
    })
 
    app.get("/listdescontos", (req, res) => {
       res.render('desconto/listdescontos.ejs',{})
    })
 
    app.get("/alterdesconto/:id", async (req, res) =>{
       
        const atrativo = new DescontoDAO()        
        const r = await atrativo.consultarUm(req.params.id)
        res.render('desconto/alterdesconto.ejs', { r })
    })
 
    app.get("/adddesconto", (req, res) => {
       res.render('desconto/adddesconto.ejs',{})
 
    })
       
}