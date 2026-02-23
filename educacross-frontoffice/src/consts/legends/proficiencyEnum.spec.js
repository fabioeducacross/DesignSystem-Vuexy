import {
  proficiency,
  proficiencyWithInProgress,
  proficiencyWithNotCompleted,
} from '@/consts/legends/proficiencyEnum'

describe('proficiencyEnum - Classificação de Proficiência de Alunos', () => {
  describe('Estrutura e Integridade dos Dados', () => {
    test('deve ter exatamente 4 níveis de proficiência básicos', () => {
      expect(proficiency).toHaveLength(4)
    })

    test('deve ter todos os níveis com propriedades obrigatórias', () => {
      proficiency.forEach(level => {
        expect(level).toHaveProperty('id')
        expect(level).toHaveProperty('label')
        expect(level).toHaveProperty('rule')
        expect(level).toHaveProperty('performanceRule')
        expect(level).toHaveProperty('variant')
        expect(level).toHaveProperty('icon')
      })
    })
  })

  describe('Classificação por ID - Regra de Negócio', () => {
    test.each([
      [1, 'Abaixo do Básico', 'sentiment_dissatisfied'],
      [2, 'Básico', 'sentiment_neutral'],
      [3, 'Proficiente', 'sentiment_satisfied'],
      [4, 'Avançado', 'sentiment_very_satisfied'],
    ])('ID %i deve classificar como "%s" com ícone "%s"', (id, expectedLabel, expectedIcon) => {
      // Arrange
      const level = proficiency.find(p => p.id === id)

      // Assert
      expect(level.label).toBe(expectedLabel)
      expect(level.icon).toBe(expectedIcon)
      expect(level.rule(id)).toBe(true)
    })

    test('deve retornar false quando ID não corresponde ao nível', () => {
      // Arrange & Act
      const abaixoBasico = proficiency[0]

      // Assert
      expect(abaixoBasico.rule(2)).toBe(false)
      expect(abaixoBasico.rule(3)).toBe(false)
      expect(abaixoBasico.rule(4)).toBe(false)
    })
  })

  describe('Classificação por Percentual - Regra de Negócio CRÍTICA', () => {
    test.each([
      // [percentual, nivelEsperado]
      [0, 'Abaixo do Básico'],
      [10, 'Abaixo do Básico'],
      [24.99, 'Abaixo do Básico'],
      [25, 'Básico'],
      [30, 'Básico'],
      [49.99, 'Básico'],
      [50, 'Proficiente'],
      [60, 'Proficiente'],
      [69.99, 'Proficiente'],
      [70, 'Avançado'],
      [85, 'Avançado'],
      [100, 'Avançado'],
    ])('aluno com %s%% de acerto deve ser classificado como "%s"', (percentual, nivelEsperado) => {
      // Act
      const level = proficiency.find(p => p.performanceRule(percentual))

      // Assert
      expect(level.label).toBe(nivelEsperado)
    })
  })

  describe('Faixas de Classificação - Limites Críticos', () => {
    test('fronteiras da classificação Básico (25% ≤ x < 50%)', () => {
      const basico = proficiency.find(p => p.label === 'Básico')

      // Arrange & Assert
      expect(basico.performanceRule(24.99)).toBe(false) // Limite inferior
      expect(basico.performanceRule(25)).toBe(true) // Início
      expect(basico.performanceRule(49.99)).toBe(true) // Fim
      expect(basico.performanceRule(50)).toBe(false) // Limite superior
    })

    test('fronteiras da classificação Proficiente (50% ≤ x < 70%)', () => {
      const proficiente = proficiency.find(p => p.label === 'Proficiente')

      // Arrange & Assert
      expect(proficiente.performanceRule(49.99)).toBe(false)
      expect(proficiente.performanceRule(50)).toBe(true)
      expect(proficiente.performanceRule(69.99)).toBe(true)
      expect(proficiente.performanceRule(70)).toBe(false)
    })

    test('fronteiras da classificação Avançado (x ≥ 70%)', () => {
      const avancado = proficiency.find(p => p.label === 'Avançado')

      // Arrange & Assert
      expect(avancado.performanceRule(69.99)).toBe(false)
      expect(avancado.performanceRule(70)).toBe(true)
      expect(avancado.performanceRule(100)).toBe(true)
    })
  })

  describe('Variantes com Status Adicionais', () => {
    test('proficiencyWithInProgress deve incluir status "Em Andamento"', () => {
      // Arrange & Act
      const emAndamento = proficiencyWithInProgress[0]

      // Assert
      expect(proficiencyWithInProgress).toHaveLength(5)
      expect(emAndamento.id).toBe(0)
      expect(emAndamento.label).toBe('Em Andamento')
      expect(emAndamento.icon).toBe('directions_walk')
      expect(emAndamento.rule(0)).toBe(true)
    })

    test('proficiencyWithNotCompleted deve incluir status "Não fizeram"', () => {
      // Arrange & Act
      const naoFizeram = proficiencyWithNotCompleted[0]

      // Assert
      expect(proficiencyWithNotCompleted).toHaveLength(5)
      expect(naoFizeram.id).toBe(0)
      expect(naoFizeram.label).toBe('Não fizeram')
      expect(naoFizeram.icon).toBe('no_accounts')
      expect(naoFizeram.rule(0)).toBe(true)
    })

    test('variantes devem manter os 4 níveis básicos após o status adicional', () => {
      // Assert
      expect(proficiencyWithInProgress[1].label).toBe('Abaixo do Básico')
      expect(proficiencyWithInProgress[4].label).toBe('Avançado')

      expect(proficiencyWithNotCompleted[1].label).toBe('Abaixo do Básico')
      expect(proficiencyWithNotCompleted[4].label).toBe('Avançado')
    })
  })

  describe('Casos de Uso Real - Cenários de Avaliação', () => {
    test('turma com 30 alunos: classificar grupo de 8 alunos com 72% de acerto', () => {
      // Arrange
      const percentualAcerto = 72

      // Act
      const classificacao = proficiency.find(p => p.performanceRule(percentualAcerto))

      // Assert
      expect(classificacao.label).toBe('Avançado')
      expect(classificacao.id).toBe(4)
    })

    test('identificar aluno em risco: percentual abaixo de 25%', () => {
      // Arrange
      const alunoEmRisco = proficiency.find(p => p.performanceRule(18))

      // Assert
      expect(alunoEmRisco.label).toBe('Abaixo do Básico')
      expect(alunoEmRisco.id).toBe(1)
    })

    test('classificar desempenho na faixa intermediária (50-69%)', () => {
      // Arrange
      const desempenhoIntermediario = proficiency.find(p => p.performanceRule(55))

      // Assert
      expect(desempenhoIntermediario.label).toBe('Proficiente')
      expect(desempenhoIntermediario.id).toBe(3)
    })
  })
})
