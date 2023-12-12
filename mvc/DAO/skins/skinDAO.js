const Pers = require("../../models/skins/skinModel")
const Db = require("../../../repositorio/database")

class PersDAO{
    #db 

    constructor(){
        this.#db = Db
    }

    async consultarPers(){
        
        let listPers = []

        const query = await this.#db.selectPersonagens()
        console.log(query)
        for(let index = 0; index < query.length; index++){

            const persDAO = new Pers()
            

            persDAO.id  = query[index].idpersonagens
            persDAO.nome = query[index].nome_personagem
            persDAO.value = query[index].genero_personagem
            persDAO.value = query[index].tipo_personagem
            persDAO.value = query[index].totalcoin_personagem
            persDAO.value = query[index].start_latitude
            persDAO.value = query[index].start_longitude
            listPers.push(persDAO.toJson())

        }
        return listPers
    }
}
module.exports = PersDAO