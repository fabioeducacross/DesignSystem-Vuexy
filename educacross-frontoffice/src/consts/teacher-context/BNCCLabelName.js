const MATH_LABEL = {
  knowledgeAxis: {
    singularFirstCapitalLetters: 'Unidade Temática',
    singularLowercase: 'unidade temática',
    pluralFirstCapitalLetters: 'Unidades Temáticas',
    pluralLowercase: 'unidades temáticas',
  },
  descriptor: {
    singularFirstCapitalLetters: 'Habilidade',
    singularLowercase: 'habilidade',
    pluralFirstCapitalLetters: 'Habilidades',
    pluralLowercase: 'habilidades',
  },
}

const PORTUGUESE_LABEL = {
  knowledgeAxis: {
    singularFirstCapitalLetters: 'Campo de Atuação',
    singularLowercase: 'campo de atuação',
    pluralFirstCapitalLetters: 'Campos de Atuação',
    pluralLowercase: 'campos de atuação',
  },
  descriptor: {
    singularFirstCapitalLetters: 'Habilidade',
    singularLowercase: 'habilidade',
    pluralFirstCapitalLetters: 'Habilidades',
    pluralLowercase: 'habilidades',
  },
}

const MULTILITERACY_LABEL = {
  knowledgeAxis: {
    singularFirstCapitalLetters: 'Campo de Experiências',
    singularLowercase: 'campo de experiências',
    pluralFirstCapitalLetters: 'Campos de Experiências',
    pluralLowercase: 'campos de experiências',
  },
  descriptor: {
    singularFirstCapitalLetters: 'Objetivo de Aprendizagem e Desenvolvimento',
    singularLowercase: 'objetivo de aprendizagem e desenvolvimento',
    pluralFirstCapitalLetters: 'Objetivos de Aprendizagem e Desenvolvimento',
    pluralLowercase: 'objetivos de aprendizagem e desenvolvimento',
  },
}

function BNCC_LABEL_NAME(key, label, subjectId) {
  if (subjectId === 1 || subjectId === 4) return MATH_LABEL[key][label]
  if (subjectId === 2) return PORTUGUESE_LABEL[key][label]
  if (subjectId === 3) return MULTILITERACY_LABEL[key][label]
}

export default BNCC_LABEL_NAME
