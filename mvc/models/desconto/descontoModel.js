class Desconto{
    #id
    #valor
 
    constructor(valor,id){
        this.#valor = valor
        this.#id = id
    }
    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }
    get valor(){
        return this.#valor
    }
    set valor(value){
        this.#valor = value
    }
 
    toJson(){
        return{
            "valor" : this.#valor,
            "id" : this.#id
        }
    }
}
module.exports = Desconto