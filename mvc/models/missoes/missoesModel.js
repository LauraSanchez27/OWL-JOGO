class Missoes{
    #id
    #nome
    #desc
    #recompensa

    constructor(nome,desc,recompensa, id){
        this.#nome = nome,
        this.#desc = desc,
        this.#recompensa = recompensa
        this.#id = id
    }

    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }
    get nome(){
        return this.#nome
    }
    set nome(value){
        this.#nome = value
    }
    get desc(){
        return this.#desc
    }
    set desc(value){
        this.#desc = value
    }
    get recompensa(){
        return this.#recompensa
    }
    set recompensa(value){
        this.#recompensa = value
    }

    toJson(){
        return{
            "id": this.#id,
            "nome" : this.#nome,
            "desc" : this.#desc,
            "recompensa" : this.#recompensa
        }
    }

}
module.exports = Missoes
