import { embaralhar } from "../function/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean

    constructor(id: number, enunciado: string, respostas: any[], acertou = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id() {
        return this.#id
    }
    get enunciado() {
        return this.#enunciado
    }
    get respostas() {
        return this.#respostas
    }
    get acertou() {
        return this.#acertou
    }
    // Verifica se há alguma resposta revalada, se não, retorna que pergunta não foi respondida (false)
    get respondida() {
        for (let resposta of this.respostas) {
            if (resposta.revelada) return true
        }
        return false
    }

    // Embaralha respostas e retorna em uma nova instância do objeto
    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    // Retorna em formato de objeto
    toObject() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp => resp.toObject()),
            acertou: this.#acertou,
        }
    }
}