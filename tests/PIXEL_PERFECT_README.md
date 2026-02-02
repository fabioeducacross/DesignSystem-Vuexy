# 🎯 Validação Pixel-Perfect - Educacross Design System

## 📊 Resumo dos Resultados

| Métrica | Valor |
|---------|-------|
| **Total de Stories** | 868 |
| **Stories Educacross** | 371 |
| **Stories Manuais (Pixel-Perfect)** | 99 |
| **Screenshots Gerados** | **470** (99 + 371) |
| **Testes Manuais Passando** | **99/99 (100%)** |
| **Testes Todos Componentes** | **371/371 (100%)** |
| **Tolerância Estáticos** | 0 pixels |
| **Tolerância Animados** | 50.000 pixels |

## ✅ Componentes Validados

Os seguintes componentes manuais estão com validação pixel-perfect:

1. **AppCollapse** - 6 variantes
2. **AppCollapseItem** - 1 variante
3. **AppLanguageSelector** - 1 variante
4. **ButtonWaitAction** - 7 variantes
5. **Divider** - 7 variantes
6. **DynamicMediaCard** - 1 variante
7. **ESelect** - 12 variantes
8. **LegendCard** - 4 variantes
9. **ListTable** - 8 variantes
10. **MediaCard** - 8 variantes
11. **MediaCardIcon** - 1 variante
12. **MultipleDropdown** - 8 variantes
13. **ProgressBar** - 12 variantes
14. **TabCards** - 6 variantes
15. **VerticalDivider** - 1 variante
16. **ZipLoading** - 7 variantes
17. **Dividers (educacross-components)** - 6 variantes

## ⚠️ Componentes com Animações

4 componentes têm tolerância maior devido a estados dinâmicos:

1. **ListTable - Loading** - Animação de skeleton/loading
2. **TabCards - Horizontal Scroll** - Posição do scroll variável
3. **ZipLoading - Processing** - Animação de progresso
4. **ButtonWaitAction - Loading** - Spinner animado

Estes componentes usam `maxDiffPixels: 50000` ao invés de `0`.

## 🛠️ Como Usar

### Gerar novos baselines
```bash
npx playwright test --grep "Pixel Perfect - Componentes Manuais" --update-snapshots
```

### Validar screenshots (tolerância zero)
```bash
npx playwright test --grep "Pixel Perfect - Componentes Manuais"
```

### Rodar todos os testes (inclui Vuexy)
```bash
npx playwright test
```

### Ver relatório HTML
```bash
npx playwright show-report
```

## 📁 Estrutura de Arquivos

```
tests/
├── educacross-pixel-perfect.spec.js  # Arquivo principal de testes
├── PIXEL_PERFECT_README.md           # Esta documentação
└── educacross-pixel-perfect.spec.js-snapshots/
    ├── educacross-components-v2-forms-eselect--default-chromium-win32.png
    ├── educacross-components-v2-layout-divider--default-chromium-win32.png
    └── ... (99 arquivos .png)
```

## ⚙️ Configuração

O arquivo `playwright.config.js` está configurado com:

```javascript
{
  workers: 4,                    // 4 workers paralelos
  retries: 1,                    // 1 retry para flakiness
  timeout: 30000,                // 30s timeout
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 0,          // Tolerância ZERO
      threshold: 0               // Sem margem de erro
    }
  }
}
```

## 🚀 CI/CD - GitHub Actions

A validação pixel-perfect está integrada ao CI/CD via GitHub Actions.

### Workflow Automático

O workflow `.github/workflows/pixel-perfect-validation.yml` executa automaticamente quando:
- **Push** para branches `main`, `v1`, `v1.1`
- **Pull Requests** para essas branches
- **Mudanças** em `src/stories/**`, `tests/**`, `.storybook/**`

### Executar Manualmente

No GitHub, vá em **Actions** > **Pixel-Perfect Validation** > **Run workflow**:
- Marque `update_snapshots: true` para atualizar baselines

### Artefatos Gerados

| Artefato | Quando | Retenção |
|----------|--------|----------|
| `playwright-report` | Sempre | 30 dias |
| `screenshot-diffs` | Falha | 7 dias |
| `updated-snapshots` | Update | 7 dias |

### Fluxo de Trabalho

```
1. Push/PR → Workflow inicia
2. Build Storybook → Gera static site
3. Playwright Tests → Compara screenshots
4. ✅ Pass → Merge permitido
5. ❌ Fail → Ver diffs nos artefatos
```

## 📝 Próximos Passos

1. [x] ~~Resolver animações em Loading e Horizontal Scroll~~
2. [x] ~~Estender validação para todos os 371 componentes Educacross~~
3. [x] ~~Integrar com CI/CD (GitHub Actions)~~
4. [ ] Gerar screenshots para múltiplos viewports (mobile/tablet/desktop)

## 🔗 Links Úteis

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Storybook Testing](https://storybook.js.org/docs/writing-tests)
- [GitHub Actions](https://docs.github.com/en/actions)
