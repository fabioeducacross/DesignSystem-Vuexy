# Plano de Substituição de Imagens Externas

## Resumo
Total de arquivos com imagens externas: **16 arquivos**
Total de instâncias encontradas: **~80 substituições**

## Estratégia

### Avatares (circular, usuário)
```javascript
// Substituir:
/vuexy/img/avatars/1.png
https://demos.themeselection.com/.../avatars/1.png

// Por:
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E
```

### Produtos (cart, e-commerce)
```javascript
// Substituir:
https://demos.themeselection.com/.../products/1.png

// Por:
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%23f5f5f9'/%3E%3Cpath d='M60,50 L90,50 L90,80 L80,100 L70,100 L60,80 Z' fill='%23dbdade'/%3E%3Ccircle cx='75' cy='60' r='8' fill='%23696cff'/%3E%3C/svg%3E
```

### Banners/Slides (carousel, hero)
```javascript
// Substituir:
https://demos.themeselection.com/.../card-advance-1.png

// Por:
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3E800x400%3C/text%3E%3C/svg%3E
```

### Ilustrações (auth, error pages)
```javascript
// Substituir:
https://demos.themeselection.com/.../illustrations/auth-login-illustration-light.png

// Por:
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f5f5f9'/%3E%3Ccircle cx='100' cy='80' r='30' fill='%23e7e7ff'/%3E%3Crect x='70' y='110' width='60' height='70' rx='5' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='12' fill='%23696cff' text-anchor='middle'%3EIllustration%3C/text%3E%3C/svg%3E
```

## Arquivos por Prioridade

### Alta Prioridade (componentes usados frequentemente)

1. **Navbar.stories.js** (4 instâncias)
   - Linha 92, 101, 294, 303
   - Tipo: Avatares de usuário
   - Tamanho: 40x40px

2. **Carousel.stories.js** (36 instâncias!)
   - Linhas 98-439
   - Tipos mistos: Banners (800x400), Avatares (40x40), Produtos (150x150)
   - Múltiplas stories afetadas

3. **ChatInterface.stories.js** (15 instâncias)
   - Linhas 90-469
   - Tipo: Avatares de usuário + mensagens dinâmicas
   - Tamanho: 40x40px

4. **Timeline.stories.js** (3 instâncias)
   - Linhas 265, 282, 304
   - Tipo: Avatares
   - Tamanho: 40x40px

5. **ListGroup.stories.js** (2 instâncias)
   - Linhas 252, 266
   - Tipo: Avatares
   - Tamanho: 40x40px

### Média Prioridade

6. **KanbanBoard.stories.js** (10 instâncias)
   - Linhas 135-304
   - Tipo: Avatares de membros
   - Tamanho: 32x32px

7. **Profile.stories.js** (8 instâncias)
   - Linhas 78-492
   - Tipos: Banner (1200x300) + Avatares (80x80)

8. **Wizard.stories.js** (2 instâncias)
   - Linhas 119, 145
   - Tipo: Produtos
   - Tamanho: 100x100px

9. **Offcanvas.stories.js** (2 instâncias)
   - Linhas 256, 270
   - Tipo: Produtos no carrinho
   - Tamanho: 60x60px

10. **Tooltip.stories.js** (1 instância)
    - Linha 149
    - Tipo: Avatar
    - Tamanho: 32x32px

### Baixa Prioridade (templates menos usados)

11. **Dashboard.stories.js** (1 instância)
12. **UserView.stories.js** (2 instâncias)
13. **EmailList.stories.js** (4 instâncias)
14. **Login.stories.js** (1 instância - ilustração)
15. **Register.stories.js** (1 instância - ilustração)
16. **ForgotPassword.stories.js** (1 instância - ilustração)
17. **Error404.stories.js** (2 instâncias - ilustração)

## Presets de Avatares

```javascript
// Usar cores diferentes para distinguir usuários:
const AvatarColors = {
  user1: { bg: '#696cff', initials: 'JD' },  // John Doe - Primary
  user2: { bg: '#56ca00', initials: 'JS' },  // Jane Smith - Success  
  user3: { bg: '#ffb400', initials: 'MB' },  // Maria Brown - Warning
  user4: { bg: '#ff4c51', initials: 'RP' },  // Robert Parker - Danger
  user5: { bg: '#16b1ff', initials: 'SK' },  // Sarah Klein - Info
}
```

## Padrão de Substituição

Para cada arquivo:
1. Identificar o tipo de imagem (avatar/produto/banner/ilustração)
2. Escolher o placeholder SVG adequado
3. Substituir mantendo classes e atributos
4. Testar no Storybook

## Validação

- [ ] Substituir todas as 80+ instâncias
- [ ] Testar cada story no Storybook
- [ ] Confirmar zero 404s no console
- [ ] Verificar renders visuais corretos
- [ ] Commit e push das alterações

## Comando de Validação

```bash
# Verificar se ainda existem referências externas
Get-ChildItem -Path src/stories -Filter *.stories.js -Recurse | Select-String -Pattern "demos.themeselection.com|/vuexy/img/avatars"
```
