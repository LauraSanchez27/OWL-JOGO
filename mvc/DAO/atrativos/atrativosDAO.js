const Atrativo = require("../../models/atrativos/atrativosModel")
const Db = require("../../../repositorio/database")

class AtrativoDAO{

    #db

    constructor(){
        this.#db = new Db()
    }

    async consultarTodos(){

        let list_atrativos = []

        const query = await this.#db.selectAtrativos()

        for (let index = 0; index < query.length; index++) {

            const atrativo = new Atrativo()

            atrativo.id = query[index].id_atrativo
            atrativo.nome = query[index].nome_atrativo
            atrativo.lat = query[index].lat_atrativo
            atrativo.long = query[index].long_atrativo
            atrativo.desc = query[index].desc_atrativo
            atrativo.image = query[index].image_atrativo

            list_atrativos.push(atrativo.toJson())     
        }
       
        return list_atrativos
    }

    async consultarUm(id){      

        const query = await this.#db.selectAtrativoId(id)

        const atrativo = new Atrativo()

        if(query){
            atrativo.id = query[0].id_atrativo
            atrativo.nome = query[0].nome_atrativo
            atrativo.lat = query[0].lat_atrativo
            atrativo.long = query[0].long_atrativo
            atrativo.desc = query[0].desc_atrativo
            atrativo.image = query[0].image_atrativo 
        }

      
        return atrativo.toJson()
    }    
    async apagar(id){
        const linhasAfetadas =  await this.#db.deleteAtrativos(id)
        return linhasAfetadas.affectedRows
        }
     async atualizar(nome, lat, long, desc, image, id){
        const atrativo = new Atrativo(nome, lat, long, desc, image, id)

        const r = await this.#db.updateAtrativo(
            atrativo.nome,
            atrativo.lat,
            atrativo.long,
            atrativo.desc,
            atrativo.image,
            atrativo.id
        )

        return r.affectedRows;

    }
    async cadastrar(nome, lat, long, desc, image){
       const atrativo = new Atrativo(nome, lat, long, desc, image)
       const sql = await this.#db.insertAtrativo(atrativo.toJson())
       return sql.insertId;
    } 

    
   
    

}


module.exports = AtrativoDAO