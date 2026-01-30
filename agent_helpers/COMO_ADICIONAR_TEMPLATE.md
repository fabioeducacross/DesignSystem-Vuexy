# 🚨 Como Adicionar o Template Vuexy ao Repositório

## Situação Atual

O template Vuexy está no **seu computador local**, mas não está no repositório GitHub nem no ambiente de CI/CD. 

Preciso que você adicione o template ao repositório para que eu possa integrá-lo ao Storybook.

---

## 📍 Template que Você Tem

```
themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/
└── vuexy-admin-v10.9.0/
    ├── html-version/          ← PRECISAMOS DESTA PASTA
    ├── vue-version/
    ├── laravel-version/
    └── documentation/
```

---

## 🎯 Método Recomendado: Git Local

### Passo 1: Clone o Repositório (se ainda não fez)

```bash
# No seu computador local
git clone https://github.com/fabioeducacross/DesignSystem-Vuexy.git
cd DesignSystem-Vuexy
```

### Passo 2: Crie a Branch

```bash
git checkout -b add-vuexy-template
```

### Passo 3: Copie o Template

**Opção A - Copiar tudo (mais fácil, mas maior)**
```bash
# No seu terminal, ajuste o caminho conforme necessário
cp -r /caminho/para/themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/vuexy-admin-v10.9.0 ./vuexy-template-source

# Ou no Windows (PowerShell):
Copy-Item -Path "C:\caminho\para\vuexy-admin-v10.9.0" -Destination ".\vuexy-template-source" -Recurse
```

**Opção B - Copiar só HTML version (recomendado, menor)**
```bash
# Linux/Mac
mkdir -p vuexy-template-source
cp -r /caminho/para/vuexy-admin-v10.9.0/html-version ./vuexy-template-source/

# Windows PowerShell
New-Item -ItemType Directory -Force -Path "vuexy-template-source"
Copy-Item -Path "C:\caminho\para\vuexy-admin-v10.9.0\html-version" -Destination ".\vuexy-template-source\" -Recurse
```

### Passo 4: Adicione ao Git

```bash
git add vuexy-template-source
```

### Passo 5: Verifique o Tamanho

```bash
# Ver tamanho da pasta
du -sh vuexy-template-source

# Se for maior que 100MB, veja "Opção para Templates Grandes" abaixo
```

### Passo 6: Commit e Push

```bash
# Commit
git commit -m "Add Vuexy v10.9.0 template source"

# Push
git push origin add-vuexy-template
```

### Passo 7: Crie um Pull Request

1. Vá para https://github.com/fabioeducacross/DesignSystem-Vuexy
2. Você verá uma notificação para criar Pull Request
3. Crie o PR da branch `add-vuexy-template` para `main`

---

## 📦 Opção para Templates Grandes (> 100MB)

Se o template for muito grande, use Git LFS:

### Setup Git LFS

```bash
# Instalar Git LFS (uma vez no computador)
# Ubuntu/Debian
sudo apt-get install git-lfs

# Mac
brew install git-lfs

# Windows - baixe de: https://git-lfs.github.com/

# Inicializar LFS no repositório
git lfs install
```

### Configurar LFS

```bash
# Adicionar tipos de arquivo ao LFS
git lfs track "*.woff"
git lfs track "*.woff2"
git lfs track "*.ttf"
git lfs track "*.eot"
git lfs track "*.otf"
git lfs track "vuexy-template-source/**"

# Commit o .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS for Vuexy template"
```

### Adicionar Template

```bash
# Copiar template (mesmo comando anterior)
cp -r /caminho/para/vuexy-admin-v10.9.0/html-version ./vuexy-template-source/

# Adicionar ao git
git add vuexy-template-source
git commit -m "Add Vuexy v10.9.0 template source (via LFS)"
git push origin add-vuexy-template
```

---

## 🌐 Alternativa: Via Interface Web do GitHub (para arquivos menores)

Se o template não for muito grande, você pode fazer upload direto:

### Passo 1: Compacte o Template

```bash
# Linux/Mac
cd /caminho/para/vuexy-admin-v10.9.0
zip -r html-version.zip html-version/

# Windows
# Clique com botão direito na pasta > Enviar para > Pasta compactada
```

### Passo 2: Upload via GitHub

1. Vá para: https://github.com/fabioeducacross/DesignSystem-Vuexy
2. Clique em **"Add file"** > **"Upload files"**
3. Crie uma nova branch: `add-vuexy-template`
4. Arraste o arquivo `html-version.zip`
5. Commit: "Add Vuexy v10.9.0 template (compressed)"
6. Crie Pull Request

### Passo 3: Descompacte no Repositório

Depois do merge, eu posso descompactar automaticamente com:
```bash
unzip vuexy-template-source/html-version.zip -d vuexy-template-source/
```

---

## ⚡ Alternativa Rápida: Apenas Assets Necessários

Se quiser ser mais rápido, copie apenas o essencial:

```bash
# Criar estrutura
mkdir -p vuexy-template-source/html-version

# Copiar apenas pastas necessárias
cp -r /caminho/para/html-version/css vuexy-template-source/html-version/
cp -r /caminho/para/html-version/fonts vuexy-template-source/html-version/
cp -r /caminho/para/html-version/vendors vuexy-template-source/html-version/
cp -r /caminho/para/html-version/js vuexy-template-source/html-version/
cp -r /caminho/para/html-version/images vuexy-template-source/html-version/

# Copiar pelo menos 1 arquivo HTML de exemplo
cp /caminho/para/html-version/index.html vuexy-template-source/html-version/

# Adicionar ao git
git add vuexy-template-source
git commit -m "Add Vuexy v10.9.0 essential assets"
git push origin add-vuexy-template
```

---

## 🔄 Depois que Você Adicionar o Template

Uma vez que o template esteja no repositório, eu posso:

1. ✅ Executar o script de integração automaticamente
2. ✅ Copiar todos os assets para `packages/vuexy_theme/public/vuexy/`
3. ✅ Analisar a estrutura e extrair ordem dos CSS
4. ✅ Atualizar o Storybook com o tema real
5. ✅ Gerar screenshots do resultado

**Comando que executarei**:
```bash
npm run integrate-vuexy ./vuexy-template-source/html-version
```

---

## 📊 Estrutura Final Desejada

Depois que você adicionar:

```
DesignSystem-Vuexy/
├── vuexy-template-source/        ← VOCÊ ADICIONA ISSO
│   └── html-version/
│       ├── css/
│       ├── fonts/
│       ├── vendors/
│       ├── js/
│       ├── images/
│       └── *.html
├── packages/
│   └── vuexy_theme/
│       └── public/vuexy/          ← EU COPIO PARA CÁ
│           ├── css/
│           ├── fonts/
│           └── ...
└── ...
```

---

## 🆘 Problemas Comuns

### "Arquivo muito grande para Git"

**Solução**: Use Git LFS (veja seção acima) ou comprima e use release do GitHub.

### "Não consigo fazer push"

**Solução**: Verifique se tem permissão no repositório ou se o arquivo não excede limite do GitHub (100MB por arquivo).

### "Template tem mais de 1GB"

**Solução**: 
1. Copie apenas `html-version/`
2. Remova arquivos de documentação desnecessários
3. Use Git LFS
4. Ou: mantenha template localmente e copie apenas assets essenciais (css, fonts, vendors)

### "Quero testar localmente primeiro"

```bash
# No seu computador, clone o repo
git clone https://github.com/fabioeducacross/DesignSystem-Vuexy.git
cd DesignSystem-Vuexy

# Copie o template
cp -r /caminho/para/html-version ./vuexy-template-source/

# Execute integração
npm install
npm run integrate-vuexy ./vuexy-template-source/html-version

# Teste
npm run storybook

# Se funcionar, commit e push!
git add .
git commit -m "Add and integrate Vuexy template"
git push
```

---

## ✅ Checklist

Antes de adicionar o template, verifique:

- [ ] Tenho o template Vuexy v10.9.0 no meu computador
- [ ] Identifiquei a pasta `html-version`
- [ ] Clonei o repositório DesignSystem-Vuexy
- [ ] Criei uma branch nova
- [ ] Copiei o template para `vuexy-template-source/`
- [ ] Verifiquei o tamanho (se > 100MB, considerar LFS)
- [ ] Fiz commit e push
- [ ] Criei Pull Request (se aplicável)

---

## 🎯 Resumo

**Você precisa**: Copiar a pasta do template do seu computador para o repositório GitHub

**Método mais fácil**: 
1. Clone o repo
2. Copie a pasta `html-version` para `vuexy-template-source/`
3. Commit e push

**Depois**: Eu executo o script de integração e integro tudo automaticamente!

---

**Tem dúvidas?** Pergunte! 😊
