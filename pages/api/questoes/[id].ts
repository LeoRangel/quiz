import questoes from '../bancoDeQuestoes'

export default function questoesPorId(req, res) {
    const idSelecionado = +req.query.id

    // Usar filter para encontrar e retornar questao com o id informado na url
    // Retorna em um array
    const unicaQuestaoOuNada = questoes.filter(
        questao => questao.id === idSelecionado
    )

    if (unicaQuestaoOuNada.length === 1) {
        const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()

        res.status(200).json(questaoSelecionada.toObject())

    } else {
        res.status(204).send()
    }
}