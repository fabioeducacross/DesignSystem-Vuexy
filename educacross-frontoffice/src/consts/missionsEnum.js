import classroomIcon from '@/assets/icons/classroom.svg'
import houseIcon from '@/assets/icons/house.svg'
import missaoColetiva from '@/assets/icons/mission-icons/missao-coletiva.svg'
import missaoIndividual from '@/assets/icons/mission-icons/missao-individual.svg'
import missaoMista from '@/assets/icons/mission-icons/missao-mista.svg'

export const applicationTypeEnum = {
  1: {
    label: 'Missão para sala',
    inputLabel: 'Missão para sala',
    icon: 'school',
    variant: 'applicationSchool',
    img: classroomIcon,
    tooltip: 'Missão para o aluno realizar na sala de aula',
    id: 1,
  },
  2: {
    label: 'Missão para casa',
    inputLabel: 'Missão para casa',
    icon: 'home',
    variant: 'applicationHouse',
    img: houseIcon,
    tooltip: 'Missão para o aluno realizar em casa',
    id: 2,
  },
}

export const rankingOptions = [
  {
    text: 'Habilitado',
    value: true,
  },
  {
    text: 'Desabilitado',
    value: false,
  },
]

export const fluxOptions = [
  { text: 'Livre', value: 1 },
  { text: 'Sequencial', value: 2 },
]

export const studentMessageSuggestions = [
  {
    id: 1,
    text: 'Querido(a) aluno(a),\nSelecionei esses jogos, pois são temas que estamos estudando.\nConfio em você! Divirta-se!\nProf. Professor',
  },
  {
    id: 2,
    text: 'Querido(a) aluno(a),\nComo sei que você gosta de desafios selecionei uma missão especial para você!\nAprenda e divirta-se!\nProf. Professor',
  },
  {
    id: 3,
    text: 'Querido(a) aluno(a),\nVocê tem um potencial enorme, por isso selecionei alguns desafios para você!\nEspero que divirta-se e aprenda bastante!\nProf. Professor',
  },
  {
    id: 4,
    text: 'Querido(a) aluno(a),\nSei que você é capaz de solucionar muitos desafios e conto com suas habilidades nessas missões!\nConfio em você!\nProf. Professor',
  },
  {
    id: 5,
    text: 'Querido(a) aluno(a),\nPara potencializar ainda mais o conteúdo que estamos estudando, selecionei alguns desafios para você.\nBoa jornada!\nProf. Professor',
  },
  {
    id: 6,
    text: 'Querido(a) aluno(a),\nQue tal unir aprendizagem e diversão? Pensando nisso, selecionei alguns jogos especialmente para você.\nDivirta-se!\nProf. Professor',
  },
  {
    id: 7,
    text: 'Querido(a) aluno(a),\nSei que você gosta de desafios novos, então preparei uma missão especial para você.\nDivirta-se!\nProf. Professor',
  },
]

export const missionTypeEnum = {
  1: {
    id: 1,
    label: 'Individual',
    icon: 'person',
    variant: 'individual',
    image: missaoIndividual,
    map: 'Individual',
  },
  2: {
    id: 2,
    label: 'Coletiva',
    icon: 'groups',
    variant: 'collective',
    image: missaoColetiva,
    map: 'Collective',
  },
  3: {
    id: 3,
    label: 'Mista',
    icon: 'person_add',
    variant: 'mix',
    image: missaoMista,
    map: 'Mixed',
  },
}

export const mapMissiontypeEnum = typeString => {
  const missionTypeEnumValues = Object.values(missionTypeEnum)
  const status = missionTypeEnumValues.find(m => m.map === typeString)

  if (!status) return false

  return status.id
}

export const EGuideSituation = {
  NotSent: 0,
  NotStarted: 1,
  Started: 2,
  Finished: 3,
  Cancelled: 4,
}

export const missionStatusEnum = {
  0: { id: 0, label: 'Não enviada', variant: 'legend-basic', map: 'NotSent' },
  1: { id: 1, label: 'Não iniciada', variant: 'legend-in-progress', map: 'NotStarted' },
  2: { id: 2, label: 'Iniciada', variant: 'legend-proficient', map: 'Started' },
  3: { id: 3, label: 'Finalizada', variant: 'legend-advanced', map: 'Finished' },
  4: { id: 4, label: 'Cancelada', variant: 'legend-below-basic', map: 'Cancelled' },
}
