
export default class RespostaModel {
    #valor: string
    #certa: boolean
    #revelada: boolean

    constructor(valor: string, certa: boolean, revelada = false) {
        this.#valor = valor
        this.#certa = certa
        this.#revelada = revelada
    }

    // Método estático que instância uma pergunta verdadeira
    static certa(valor: string) {
        return new RespostaModel(valor, true)
    }

    // Método estático que instância uma pergunta falsa
    static errada(valor: string) {
        return new RespostaModel(valor, false)
    }

    get valor() {
        return this.#valor
    }

    get certa() {
        return this.#certa
    }

    get revelada() {
        return this.#revelada
    }

    revelar() {
        return new RespostaModel(this.#valor, this.#certa, true)
    }

    // Método estático que serve para criar um RespostaModel a partir de um objeto json
    static criarUsandoObjeto(obj: RespostaModel): RespostaModel {
        return new RespostaModel(obj.valor, obj.certa, obj.revelada)
    }

    // Retorna em formato de objeto
    toObject() {
        return {
            valor: this.#valor,
            certa: this.#certa,
            revelada: this.#revelada
        }
    }
}