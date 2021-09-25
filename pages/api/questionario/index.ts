import questoes from '../bancoDeQuestoes'

export default function questionario(req, res) {
    // Retorna array de ids de todas as questões
    const questoesIds = questoes.map(questao => questao.id)

    res.status(200).json(questoesIds)
}