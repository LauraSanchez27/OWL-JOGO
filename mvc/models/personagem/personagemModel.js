class Personagem{
    #id
    #nome
    #genero
    #tipo
    #totalcoin
    #startlat
    #startlong

    constructor(tipo,nome){
        this.#tipo = tipo
        this.#nome = nome
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
    get genero(){
        return this.#genero
    }
    set genero(value){
        this.#genero = value
    }
    get tipo(){
        return this.#tipo
    }
    set tipo(value){
        this.#tipo = value
    }
    get totalcoin(){
        return this.#totalcoin
    }
    set totalcoin(value){
        this.#totalcoin = value
    }
    get startlat(){
        return this.#startlat
    }
    set startlat(value){
        this.#startlat = value
    }
    get startlong(){
        return this.#startlong
    }
    set startlong(value){
        this.#startlong = value
    }

    
    toJson(){
        return{
            "nome" : this.#nome,
            "genero" : this.#genero,
            "tipo" : this.#tipo,
            "totalcoin" : this.#totalcoin,
            "startlat" : this.#startlat,
            "startlong" : this.#startlong,
        }
    }

   
}
module.exports = Personagem