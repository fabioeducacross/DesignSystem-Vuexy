import belinhaTodas from '@/assets/icons/belinha-opcao-todas.svg'
import missaoLdc from '@/assets/icons/mission-icons/missao-ldc.svg'
import missaoMathIng from '@/assets/icons/mission-icons/missao-math-ing.svg'
import missaoMath from '@/assets/icons/mission-icons/missao-math.svg'
import missaoPortugues from '@/assets/icons/mission-icons/missao-portugues.svg'

export const SubjectEnum = {
  1: {
    label: 'Matemática',
    value: 1,
    image: missaoMath,
    map: 'Math',
    textVariant: 'color-math',
    variant: 'math',
  },
  2: {
    label: 'Língua Portuguesa',
    value: 2,
    image: missaoPortugues,
    map: 'Portuguese',
    textVariant: 'color-port',
    variant: 'port',
  },
  3: {
    label: 'Liga das Corujinhas',
    value: 3,
    image: missaoLdc,
    textVariant: 'color-liga',
    map: 'LigaDasCorujinhas',
    variant: 'liga',
  },
  4: {
    label: 'Math',
    value: 4,
    image: missaoMathIng,
    textVariant: 'color-math-ing',
    map: 'MathEnglish',
    variant: 'math-ing',
  },
  5: {
    label: 'Todas',
    value: null,
    image: belinhaTodas,
    map: 'OptionAll',
  },
}

/**
 * Subject prefixes for use in phrases.
 * @type {Object<number, string>}
 */
export const subjectPrefix = {
  [SubjectEnum['1'].value]: 'da',
  [SubjectEnum['2'].value]: 'da',
  [SubjectEnum['3'].value]: 'da',
  [SubjectEnum['4'].value]: 'de',
}
