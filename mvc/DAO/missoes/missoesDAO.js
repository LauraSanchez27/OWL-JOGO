const Missoes = require("../../models/missoes/missoesModel")
const Db = require("../../../repositorio/database")
// const atrativosController = require("../controllers/atrativosController")

class MissaoDao{

    #db

    constructor(){
        this.#db = new Db()
    }

    async consultarTodos(){

        let list_missoes = []

        const query = await this.#db.selectMissoes()

        for (let index = 0; index < query.length; index++) {

            const missao = new Missoes()

            missao.id = query[index].id_missao
            missao.nome = query[index].nome_missao
            missao.desc = query[index].desc_missao
            missao.recompensa = query[index].recompensa_missao

            list_missoes.push(missao.toJson())     
        }
       
        return list_missoes
    }

    async consultarUm(id){      

        const query = await this.#db.selectMissoesId(id)

        const missao = new Missoes()

        if(query){
            missao.id = query[0].id_missao
            missao.nome = query[0].nome_missao
            missao.desc = query[0].desc_missao
            missao.recompensa = query[0].recompensa_missao
        }      
        return missao.toJson()
    }    
    async apagar(id){
        const linhasAfetadas =  await this.#db.deleteMissoes(id)
        return linhasAfetadas.affectedRows
        }
     async atualizar(nome, desc, recompensa, id){
        const missao = new Missoes(nome, desc, recompensa, id)

        const r = await this.#db.updatemissoes(
            missao.nome,
            missao.desc,
            missao.recompensa,
            missao.id
        )

        return r.affectedRows;

    }
    async cadastrar(nome, desc, recompensa){

       const missao = new Missoes(nome, desc, recompensa)

       const sql = await this.#db.insertMissoes(missao.toJson())
       
       return sql.insertId;
    }     

}


module.exports = MissaoDao