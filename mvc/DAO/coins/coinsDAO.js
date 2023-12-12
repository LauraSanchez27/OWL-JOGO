const Coin = require("../../models/coins/coinModel")
const Db = require("../../../repositorio/database")
// const atrativosController = require("../controllers/atrativosController")

class CoinsDao {

    #db

    constructor() {
        this.#db = new Db()
    }

    async consultarTodos() {

        let list_coins = []

        const query = await this.#db.selectCoins()

        for (let index = 0; index < query.length; index++) {

            const coin = new Coin()

            coin.id = query[index].id_coin
            coin.nome = query[index].nome_coin
            coin.value = query[index].value_coin
            coin.image = query[index].image_coin

            list_coins.push(coin.toJson())
        }

        return list_coins
    }

    async consultarUm(id) {

        const query = await this.#db.selectCoinId(id)

        const coin = new Coin()

        if (query) {
            coin.id = query[0].id_coin
            coin.nome = query[0].nome_coin
            coin.value = query[0].value_coin
            coin.image = query[0].image_coin
        }
        return coin.toJson()
    }
    async apagar(id) {
        const linhasAfetadas = await this.#db.deleteCoins(id)
        return linhasAfetadas.affectedRows
    }


    async atualizar(nome, value, image, id) {
        const coin = new Coin(nome, value)
        coin.id = id
        coin.image = image

        const r = await this.#db.updateCoin(
            coin.nome,
            coin.value,
            coin.image,
            coin.id
        )

        return r.affectedRows;

    }
    async cadastrar(nome, value, image) {

        const coin = new Coin(nome, value, image)


        const sql = await this.#db.insertCoins(coin.toJson())

        return sql.insertId;
    }





}


module.exports = CoinsDao