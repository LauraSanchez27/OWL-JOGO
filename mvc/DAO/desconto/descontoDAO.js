const Desconto = require("../../models/desconto/descontoModel")
const Db = require("../../../repositorio/database")
// const atrativosController = require("../controllers/atrativosController")
 
class CoinsDao{
 
    #db
 
    constructor(){
        this.#db = new Db()
    }
 
    async consultarTodos(){
 
        let list_desct = []
 
        const query = await this.#db.selectDesconto()
 
        for (let index = 0; index < query.length; index++) {
 
            const descoonto = new Desconto()
            descoonto.id = query[index].id_desconto
            descoonto.valor = query[index].valor_desconto
            list_desct.push(descoonto.toJson())    
        }
       console.log(list_desct)
        return list_desct
    }
 
    async consultarUm(id){      
 
        const query = await this.#db.selectDescontoId(id)
 
        const desconto = new Desconto()
 
        if(query){
            desconto.id = query[0].id_desconto
            desconto.valor = query[0].valor_desconto
        }      
        return desconto.toJson()
    }    
    async apagar(id){
        const linhasAfetadas =  await this.#db.deleteDesconto(id)
        return linhasAfetadas.affectedRows
        }
     async atualizar(valor, id){
        const desconto = new Desconto(valor, id)
 
        const r = await this.#db.updateDesconto(
            desconto.valor,
            desconto.id
        )
 
        return r.affectedRows;
 
    }
    async cadastrar(valor){
 
       const desconto = new Desconto(valor)
 
 
       const sql = await this.#db.insertDesconto(desconto.toJson())
       
       return sql.insertId;
    }
 
   
   
   
 
}
 
 
module.exports = CoinsDao