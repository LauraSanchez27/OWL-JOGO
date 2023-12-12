const res = require('express/lib/response');
var mysql = require('mysql2');

class DatabaseMySQL {
    #connection

    constructor() {
        this.#connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bdgp'
        }).promise()

    }
    // ATRATIVOS 
    async deleteAtrativos(id) {
        const sql = 'delete from atrativos where id_atrativo = ' + id

        const res = await this.#connection.execute(sql)
        console.log(res)
        return res[0]
    }
    async selectAtrativos() {
        const query = await this.#connection.query('select * from atrativos')
        return query[0]
    }
    async selectAtrativoId(id) {
        const query = await this.#connection.query('select * from atrativos where id_atrativo =' + id)
        return query[0]
    }
    async insertAtrativo(param) {
        const sql = `insert into atrativos (nome_atrativo, lat_atrativo, long_atrativo, desc_atrativo, image_atrativo)
         values ('${param.nome}','${param.lat}','${param.long}','${param.desc}','${param.image}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async updateAtrativo(nome, lat, long, desc, image, id) {
        const sql = `update atrativos
        set nome_atrativo = "${nome}",
            lat_atrativo = ${lat},
            long_atrativo = ${long},
            desc_atrativo = "${desc}",
            image_atrativo = "${image}"
        where id_atrativo = ${id}`

        const r = await this.#connection.execute(sql)
        return r[0]
    }
    // FIM ATRATIVOS

    // CUPOM
    async deleteCupom(id) {
        const sql = 'delete from cupons where id_cupom = ' + id

        const res = await this.#connection.execute(sql)
        console.log(res)
        return res[0]
    }
    async selectCupom() {
        const query = await this.#connection.query('select * from cupons')
        return query[0]
    }
    async selectCupomId(id) {
        const query = await this.#connection.query('select * from cupons where id_cupom =' + id)
        return query[0]
    }


    async insertCupom(param) {
        const sql = `insert into cupons (codigo_cupom, nome_cupom, validade_cupom, valor_cupom)
         values ('${param.codigo}','${param.nome}','${param.validade}','${param.valor}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }


    async updateCupom(codigo, nome, validade, valor, id) {
        const sql = `update cupons
        set codigo_cupom = "${codigo}",
            nome_cupom = "${nome}",
            validade_cupom = ${validade},
            valor_cupom = ${valor}
        where id_cupom = ${id}`

        const r = await this.#connection.execute(sql)
        return r[0]
    }
    // FIM CUPOM

    // MISSOES
    async deleteMissoes(id) {
        const sql = 'delete from missoes where id_missao = ' + id

        const res = await this.#connection.execute(sql)
        console.log(res)
        return res[0]
    }
    async selectMissoes() {
        const query = await this.#connection.query('select * from missoes')
        return query[0]
    }
    async selectMissoesId(id) {
        const query = await this.#connection.query('select * from missoes where id_missao =' + id)
        return query[0]
    }
    async insertMissoes(param) {
        const sql = `insert into missoes (nome_missao, desc_missao, recompensa_missao)
         values ('${param.nome}','${param.desc}','${param.recompensa}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async updatemissoes(nome, desc, recompensa, id) {
        const sql = `update missoes
        set nome_missao = "${nome}",
            desc_missao = "${desc}",
            recompensa_missao = ${recompensa}
        where id_missao = ${id}`

        const r = await this.#connection.execute(sql)
        return r[0]
    }
    // FIM MISSAO
    // async selectPersonagens() {
    //     const query = await this.#connection.query('select * from personagens')
    //     return query[0]
    // }
    // async selectSkins() {
    //     const query = await this.#connection.query('select * from skins')
    //     return query[0]
    // }
    async deleteDesconto(id){
        const sql = 'delete from descontos where id_desconto = '+id
 
        const res = await this.#connection.execute(sql)
        console.log(res)
        return res[0]
    }
    async selectDesconto(){
        const query = await this.#connection.query('select * from descontos')
        return query[0]
    }
    async selectDescontoId(id){
        const query = await this.#connection.query('select * from descontos where id_desconto ='+id)
        return query[0]
      }
    async insertDesconto(param){
        const sql = `insert into descontos (valor_desconto)
         values ('${param.valor}')`
         
        const query = await this.#connection.execute(sql)
        return query[0]
      }
      async updateDesconto( valor, id){
        const sql = `update descontos
        set valor_desconto = ${valor}
            where id_desconto = ${id}`
 
        const r = await this.#connection.execute(sql)
        return r[0]
    }


    async deleteCoins(id){
        const sql = 'delete from coins where id_coin = '+id
 
        const res = await this.#connection.execute(sql)
        console.log(res)
        return res[0]
    }
    async selectCoins(){
        const query = await this.#connection.query('select * from coins')
        return query[0]
    }
    async selectCoinId(id){
        const query = await this.#connection.query('select * from coins where id_coin ='+id)
        return query[0]
      }
    async insertCoins(param){
        const sql = `insert into coins (nome_coin, value_coin, image_coin)
         values ('${param.nome}','${param.value}','${param.image}')`
         
        const query = await this.#connection.execute(sql)
        return query[0]
      }
      async updateCoin(nome, value, image, id){
        const sql = `update coins
        set nome_coin = "${nome}",
            value_coin = "${value}",
            image_coin = "${image}"
        where id_coin = ${id}`
 
        const r = await this.#connection.execute(sql)
        return r[0]
    }


}




module.exports = DatabaseMySQL
