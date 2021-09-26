import styles from "../styles/Resposta.module.css"
import RespostaModel from "../models/resposta";

interface RespostaProps {
    valor: RespostaModel
    indice: number
    letra: string
    corFundoLetra: string
    // Função que passa o índice da resposta clicada para o componente pai via comunicação direta
    onResponse: (indice: number) => void
}

export default function Resposta(props: RespostaProps) {
    const resposta = props.valor

    return (
        <div
            className={styles.resposta}
            onClick={() => props.onResponse(props.indice)}
        >
            <div className={styles.conteudoResposta}>

                {!resposta.revelada ? (
                    <div className={styles.frente}>
                        <div className={styles.letra} style={{ backgroundColor: props.corFundoLetra }}>
                            {props.letra}
                        </div>
                        <div className={styles.valor}>
                            {resposta.valor}
                        </div>
                    </div>
                ) : (
                    <div className={styles.verso}>
                        {resposta.certa ? (
                            <div className={styles.certa}>
                                <div className="">A resposta certa é...</div>
                                <div className={styles.valor}>
                                    {resposta.valor}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.errada}>
                                <div className="">A resposta certa é...</div>
                                <div className={styles.valor}>
                                    {resposta.valor}
                                </div>
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    )
}