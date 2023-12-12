const Cupom = require("../../models/cupom/cupomModel")
const Db = require("../../../repositorio/database")
// const atrativosController = require("../controllers/atrativosController")

class CuponsDao{

    #db

    constructor(){
        this.#db = new Db()
    }

    async consultarTodos(){

        let list_cupons = []

        const query = await this.#db.selectCupom()

        for (let index = 0; index < query.length; index++) {

            const cupon = new Cupom()

            cupon.id = query[index].id_cupom
            cupon.codigo = query[index].codigo_cupom
            cupon.nome = query[index].nome_cupom
            cupon.validade = query[index].validade_cupom
            cupon.valor = query[index].valor_cupom

            list_cupons.push(cupon.toJson())     
        }
       
        return list_cupons
    }

    async consultarUm(id){      

        const query = await this.#db.selectCupomId(id)

        const cupon = new Cupom()

        if(query){
            cupon.id = query[0].id_cupom
            cupon.codigo = query[0].codigo_cuoid_cupom
            cupon.nome = query[0].nome_cuoid_cupom
            cupon.validade = query[0].validade_cuoid_cupom
            cupon.valor = query[0].valor_cupom
        }      
        return cupon.toJson()
    }    
    async apagar(id){
        const linhasAfetadas =  await this.#db.deleteCupom(id)
        return linhasAfetadas.affectedRows
        }
     async atualizar(codigo, nome, validade,valor, id){
        const cupon = new Cupom(codigo,nome, validade, valor, id)

        const r = await this.#db.updateCupom(
            cupon.codigo,
            cupon.nome,
            cupon.validade,
            cupon.valor,
            cupon.id
        )

        return r.affectedRows;

    }
    async cadastrar(codigo, nome, validade,valor){

       const cupon = new Cupom(codigo, nome, validade,valor)


       const sql = await this.#db.insertCupom(cupon.toJson())
       
       return sql.insertId;
    } 

    
   
    

}


module.exports = CuponsDao