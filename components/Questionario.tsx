import styles from "../styles/Questionario.module.css";
import QuestaoModel from "../models/questao";
import Questao from "./Questao";
import Botao from "./Botao";

interface QuestionarioProps {
    questao: QuestaoModel
    ultimaPergunta: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProximoPasso: () => void
}

export default function Questionario(props: QuestionarioProps) {

    // Função que recebe o indice de uma resposta clicada do componente filho via comunicação direta
    // O índice é captado no componente Resposta, quando uma resposta é clicada, é passado para o componente Questão, que então passa para esta função
    function onResponse(indice: number) {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {props.questao ?
                <Questao
                    valor={props.questao}
                    tempoResposta={10}
                    onResponse={onResponse}
                    tempoEsgotado={props.irParaProximoPasso}
                />
                : false
            }
            <Botao
                onClick={props.irParaProximoPasso}
                texto={props.ultimaPergunta ? 'Finalizar' : 'Próxima'}
            />
        </div>
    )
}