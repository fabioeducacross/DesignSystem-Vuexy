import { calcPercent, formatDecimalPlace } from '@/utils/number'

describe('number - Cálculos Numéricos para Avaliações', () => {
  describe('calcPercent - Cálculo de Percentual', () => {
    describe('Regra de Negócio: Cálculo de Taxa de Acerto', () => {
      test.each([
        // [acertos, total, percentualEsperado]
        [50, 100, 50],
        [25, 100, 25],
        [100, 100, 100],
        [0, 100, 0],
        [1, 3, 33.33],
        [2, 3, 66.66],
        [15, 30, 50],
        [8, 25, 32],
        [5, 22, 22.72],
      ])('deve calcular %i/%i = %s%%', (value, total, expected) => {
        // Act
        const result = calcPercent(value, total)

        // Assert
        expect(result).toBe(expected)
      })
    })

    describe('Arredondamento - Sempre para baixo (floor)', () => {
      test.each([
        [10, 30, 33.33], // 33.333... → 33.33
        [20, 30, 66.66], // 66.666... → 66.66
        [1, 7, 14.28], // 14.285... → 14.28
        [2, 7, 28.57], // 28.571... → 28.57
      ])('deve arredondar %i/%i para %s (floor)', (value, total, expected) => {
        // Act
        const result = calcPercent(value, total)

        // Assert
        expect(result).toBe(expected)
      })
    })

    describe('Casos Limite e Proteção contra Erros', () => {
      test.each([
        // [value, total, expectedResult]
        [0, 100, 0], // Zero acertos
        [50, 0, 0], // Divisão por zero (protegido)
        [null, 100, 0], // Valor nulo
        [50, null, 0], // Total nulo
        [undefined, 100, 0], // Valor undefined
        [50, undefined, 0], // Total undefined
        [0, 0, 0], // Ambos zero
      ])('deve retornar 0 para casos inválidos: calcPercent(%s, %s)', (value, total, expected) => {
        // Act
        const result = calcPercent(value, total)

        // Assert
        expect(result).toBe(expected)
      })
    })

    describe('Valores acima de 100%', () => {
      test('deve permitir percentual > 100% (valor maior que total)', () => {
        // Arrange & Act
        const result = calcPercent(150, 100)

        // Assert
        expect(result).toBe(150)
      })
    })
  })

  describe('formatDecimalPlace - Formatação de Decimais', () => {
    describe('Arredondamento para 2 casas decimais', () => {
      test.each([
        // [input, expectedOutput]
        [3.456, 3.45],
        [10.789, 10.78],
        [99.999, 99.99],
        [7.856, 7.85], // Caso real: média de notas
        [45.234, 45.23], // Caso real: tempo médio
      ])('deve arredondar %s para %s', (input, expected) => {
        // Act
        const result = formatDecimalPlace(input)

        // Assert
        expect(result).toBe(expected)
      })
    })

    describe('Números inteiros - Sem alteração', () => {
      test.each([[5], [10], [100], [0]])('deve retornar %i sem modificação', input => {
        // Act
        const result = formatDecimalPlace(input)

        // Assert
        expect(result).toBe(input)
      })
    })

    describe('Proteção contra Valores Inválidos', () => {
      test.each([
        [null, 0],
        [undefined, 0],
        ['', 0],
      ])('deve retornar 0 para valor inválido: %s', (input, expected) => {
        // Act
        const result = formatDecimalPlace(input)

        // Assert
        expect(result).toBe(expected)
      })
    })
  })

  describe('Integração - Casos de Uso Real', () => {
    test('calcular e formatar percentual de aprovação de turma', () => {
      // Arrange
      const aprovados = 18
      const totalAlunos = 25

      // Act
      const percentual = calcPercent(aprovados, totalAlunos)
      const formatado = formatDecimalPlace(percentual)

      // Assert
      expect(percentual).toBe(72) // 18/25 = 72%
      expect(formatado).toBe(72)
    })

    test('calcular percentual de alunos proficientes e formatar média', () => {
      // Arrange
      const proficientes = 7
      const totalAlunos = 22

      // Act
      const percentual = calcPercent(proficientes, totalAlunos)

      // Assert
      expect(percentual).toBe(31.81) // 7/22 = 31.818... → 31.81
    })

    test('identificar quando nenhum aluno completou avaliação', () => {
      // Arrange
      const completaram = 0
      const totalAlunos = 30

      // Act
      const percentual = calcPercent(completaram, totalAlunos)

      // Assert
      expect(percentual).toBe(0)
    })
  })
})
