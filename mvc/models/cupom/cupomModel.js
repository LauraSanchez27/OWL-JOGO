class Cupom{
    #id
    #codigo
    #nome
    #validade
    #valor

    constructor(codigo,nome,validade, valor, id){
        this.#codigo = codigo
        this.#nome = nome
        this.#validade = validade
        this.#valor = valor
        this.#id = id
    }

    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }
    get codigo(){
        return this.#codigo
    }
    set codigo(value){
        this.#codigo = value
    }
    get nome(){
        return this.#nome
    }
    set nome(value){
        this.#nome = value
    }
    get validade(){
        return this.#validade
    }
    set validade(value){
        this.#validade = value
    }
    get valor(){
        return this.#valor
    }
    set valor(value){
        this.#valor = value
    }

    toJson(){
        return{
            "id": this.#id,
            "codigo": this.#codigo,
            "nome" : this.#nome,
            "validade" : this.#validade,
            "valor" : this.#valor
        }
    }
}
module.exports = Cupom
