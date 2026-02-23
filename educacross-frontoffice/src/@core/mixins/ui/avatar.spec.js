import useInitials from '@/@core/mixins/ui/avatar.js'

describe('useInitials - Extração de Iniciais de Nomes', () => {
  let getInitials

  beforeEach(() => {
    // Arrange
    ;({ getInitials } = useInitials())
  })

  describe('Casos de Uso Real - Nomes de Alunos', () => {
    test.each([
      // [nomeCompleto, iniciaisEsperadas]
      ['João Silva', 'JS'],
      ['Maria Santos', 'MS'],
      ['Pedro Henrique Costa', 'PC'], // Nome composto
      ['Ana Paula da Silva', 'AS'], // Com preposição
      ['Carlos Eduardo Oliveira Lima', 'CL'], // 4 nomes
      ['josé', 'J'], // Nome simples minúsculo
      ['MARIA', 'M'], // Nome simples maiúsculo
    ])('deve extrair "%s" para "%s"', (nomeCompleto, iniciaisEsperadas) => {
      // Act
      const result = getInitials(nomeCompleto)

      // Assert
      expect(result).toBe(iniciaisEsperadas)
    })
  })

  describe('Tratamento de Espaços e Formatação', () => {
    test('deve remover espaços extras no início e fim', () => {
      // Arrange & Act
      const result = getInitials('  João Silva  ')

      // Assert
      expect(result).toBe('JS')
    })

    test('deve tratar múltiplos espaços entre nomes', () => {
      // Arrange & Act
      const result = getInitials('  João    Silva  ')

      // Assert
      expect(result).toBe('JS')
    })
  })

  describe('Caracteres Especiais - Nomes Brasileiros', () => {
    test.each([
      ['João Silva', 'JS'],
      ['Ana-Luiza Pereira', 'AP'],
    ])('deve processar nome com caracteres especiais: "%s"', (nome, esperado) => {
      // Act
      const result = getInitials(nome)

      // Assert
      expect(result).toBe(esperado)
    })
  })

  describe('Valores Inválidos e Casos Limite', () => {
    test.each([
      [null, ''],
      [undefined, ''],
      ['', ''],
    ])('deve retornar string vazia para entrada inválida: %s', (input, expected) => {
      // Act
      const result = getInitials(input)

      // Assert
      expect(result).toBe(expected)
    })
  })

  describe('Regra de Negócio: Primeira e Última Inicial', () => {
    test('deve retornar apenas primeira letra para nome simples', () => {
      // Arrange & Act
      const result = getInitials('Maria')

      // Assert
      expect(result).toBe('M')
    })

    test('deve retornar primeira e última inicial para nomes compostos', () => {
      // Arrange
      const nomeComposto = 'Pedro James William Smith'

      // Act
      const result = getInitials(nomeComposto)

      // Assert
      expect(result).toBe('PS') // Pedro Smith (primeira + última)
    })

    test('deve ignorar nomes do meio', () => {
      // Arrange
      const nomeCompleto = 'Maria da Silva Santos'

      // Act
      const result = getInitials(nomeCompleto)

      // Assert
      expect(result).toBe('MS') // Maria Santos
    })
  })

  describe('Capitalização - Sempre Maiúsculas', () => {
    test.each([
      ['joão silva', 'JS'],
      ['MARIA SANTOS', 'MS'],
      ['Pedro HenriQUE', 'PH'],
    ])('deve capitalizar iniciais independente do input: "%s"', (input, expected) => {
      // Act
      const result = getInitials(input)

      // Assert
      expect(result).toBe(expected)
    })
  })
})
