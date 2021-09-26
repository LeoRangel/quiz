import QuestaoModel from "../models/questao"
import styles from "../styles/Questao.module.css"
import Enunciado from "./Enunciado"
import Resposta from "./Resposta"
import Temporizador from "./Temporizador"

const letras = [
    { valor: 'A', cor: '#F2C866' },
    { valor: 'B', cor: '#F266BA' },
    { valor: 'C', cor: '#85D4F2' },
    { valor: 'D', cor: '#BCE596' },
]

interface QuestaoProps {
    valor: QuestaoModel
    tempoResposta?: number
    // Função que recebe do componente filho o índice de uma resposta clicada e passa para o componente pai via comunicação direta
    onResponse: (indice: number) => void
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    // Renderiza todas as respostas da questão
    function renderizarRespostas() {
        return questao.respostas.map((resposta, i) => {

            return (
                <Resposta
                    key={`${questao.id}-${i}`}
                    valor={resposta}
                    indice={i}
                    letra={letras[i].valor}
                    corFundoLetra={letras[i].cor}
                    onResponse={props.onResponse}
                />
            )
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado} />

            <Temporizador
                key={questao.id}
                duracao={props.tempoResposta ?? 10}
                tempoEsgotado={props.tempoEsgotado}
            />

            {renderizarRespostas()}
        </div>
    )
}