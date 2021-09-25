import { embaralhar } from '../../../function/arrays'
import questoes from '../bancoDeQuestoes'

export default function questionario(req, res) {
    // Retorna array de ids de todas as questões
    const questoesIds = questoes.map(questao => questao.id)

    // Retorna ids embaralhados
    res.status(200).json(embaralhar(questoesIds))
}