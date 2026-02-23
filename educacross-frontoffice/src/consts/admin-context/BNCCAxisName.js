const MATH_AXIS = {
  firstAxis: 'Álgebra',
  secondAxis: 'Geometria',
  thirdAxis: 'Grandezas e Medidas',
  fourthAxis: 'Números',
  fifthAxis: 'Probabilidade e Estatística',
}

const PORTUGUESE_AXIS = {
  firstAxis: 'Todos os campos de atuação',
  secondAxis: 'Campo da vida cotidiana',
  thirdAxis: 'Campo da vida pública',
  fourthAxis: 'Campo das práticas de estudo e pesquisa',
  fifthAxis: 'Campo artístico-literário',
}

const MULTILITERACY_AXIS = {
  firstAxis: 'O eu, o outro e o nós',
  secondAxis: 'Corpo, gestos e movimentos',
  thirdAxis: 'Traços, sons, cores e formas',
  fourthAxis: 'Escuta, fala, pensamento e imaginação',
  fifthAxis: 'Espaços, tempos, quantidades, relações e transformações',
}

function BNCC_AXIS_NAME(type) {
  if (type === 'Matematica') return MATH_AXIS
  if (type === 'Portugues') return PORTUGUESE_AXIS
  if (type === 'LigaDasCorujinhas') return MULTILITERACY_AXIS
}

export default BNCC_AXIS_NAME
