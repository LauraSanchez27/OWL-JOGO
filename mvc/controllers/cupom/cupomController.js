const CuponsDao = require('../../DAO/cupom/cupomDAO')
const path = require('path')

module.exports = (app) => {

    app.get("/cupons", async (req, res) => {        
        const cuponsDao = new CuponsDao()

        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await cuponsDao.consultarTodos())        
    })

    app.post("/cupom", async (req, res) => {        
        const cuponsDao = new CuponsDao()

        const {
            txtid: id,
            txtcodcupom: codigo,
            txtnomecupom: nome,
            dtvalcupom: validade,
            valorcupom: valor
        } = req.body

      
        res.setHeader("Access-Control-Allow-Origin","*")

        let status;

        if(!id){
            status = await cuponsDao.cadastrar(codigo, nome, validade, valor)
        }
        else{
            status = await cuponsDao.atualizar(id,codigo, nome, validade, valor)
        }   
        res.redirect("/listcupom")
    })

    app.delete("/cupom/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const cuponsDao = new CuponsDao()

        const status = await cuponsDao.apagar(req.params.id)

        res.json({
            status
        })
    })
    app.put("/cupom/:id", async (req, res) =>{
        const cuponsDao = new CuponsDao()
        
        const {
            nome,
            codigo,
            validade,
            valor,
            id
        } = req.body;
      
        if(id == req.params.id){
          const r =  await cuponsDao.atualizar(codigo,nome,validade,valor, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }     

    })

    app.get("/listcupons", (req, res) => {
        res.render('cupom/listcupom', {})
    }) 

    app.get("/altercupom/:id", async (req, res) =>{
        
        const coin = new CuponsDao()        
        const r = await coin.consultarUm(req.params.id)
        res.render('cupom/altercupom', { r })
    })

    app.get("/addcupons", (req, res) => {
        res.render('cupom/addcupom', {})
    })
        
}