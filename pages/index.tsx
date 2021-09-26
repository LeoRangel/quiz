import { useEffect, useState } from "react";
import Questionario from "../components/Questionario";
import QuestaoModel from "../models/questao";
import { useRouter } from 'next/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  // Armazena um array de numeros
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  // Armazena um objeto do tipo questão
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)


  // Acessa a api de ids das questões
  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()

    setIdsDasQuestoes(idsDasQuestoes)
  }

  // Acessa a api de dados da questão
  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()

    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)

    setQuestao(novaQuestao)
  }


  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])


  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)

    // Se resposta certa somar + 1 ao estado
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  // Retorna o id da próxima questão no array
  function idProximaPergunta() {
    const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
    return idsDasQuestoes[proximoIndice]
  }

  function irParaProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }


  return (
    questao ? (
      <Questionario
        questao={questao}
        ultimaPergunta={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={irParaProximoPasso}
      />
    ) : false
  )
}
