import questoes from '../bancoDeQuestoes'

export default function questoesProId(req, res) {
    const idSelecionado = +req.query.id

    // Usar filter para encontrar e retornar questao com o id informado na url
    const unicaQuestaoOuNada = questoes.filter(
        questao => questao.id === idSelecionado
    )

    if (unicaQuestaoOuNada.length === 1) {
        const questaoSelecionada = unicaQuestaoOuNada[0]
        res.status(200).json(questaoSelecionada.toObject())
    } else {
        res.status(204).send()
    }
}