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

    // Recebe um índice da resposta escolhida na questão e retorna um novo objeto com a resposta escolhida e a resposta correta reveladas
    responderCom(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa

        const respostas = this.#respostas.map((resposta, i) => {
            const respostaSelecionada = (indice === i)

            // Situações em que deve-se revelar a resposta
            // A resposta atual da iteração do map vai ser revelada se ela foi a selecionada ou é a resposta certa, as demais não serão reveladas
            const deveRevelar = (respostaSelecionada || resposta.certa)

            return deveRevelar ? resposta.revelar() : resposta
        })

        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
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
            respondida: this.respondida,
            acertou: this.#acertou,
        }
    }
}