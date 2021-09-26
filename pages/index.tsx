import { useState } from "react";
import Questao from "../components/Questao";
import QuestaoModel from "../models/questao";
import RespostaModel from "../models/resposta";

const questaoMock = new QuestaoModel(1, 'Qual bicho transmite a Doença de Chagas?', [
  RespostaModel.errada('Abelha'),
  RespostaModel.errada('Barata'),
  RespostaModel.errada('Pulga'),
  RespostaModel.certa('Barbeiro'),
])

export default function Home() {
  const [questao, setQuestao] = useState(questaoMock)

  // Função que recebe o indice de uma resposta clicada do componente filho via comunicação direta
  // O índice é captado no componente Resposta, quando uma resposta é clicada, é passado para o componente Questão, que então passa para esta função
  function onResponse(indice: number) {
    setQuestao(questao.responderCom(indice))
    console.log(indice)
  }

  return (
    <div>
      <Questao valor={questao} onResponse={onResponse} />
    </div>
  )
}
