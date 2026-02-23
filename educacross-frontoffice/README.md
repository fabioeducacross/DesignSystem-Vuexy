# Vuexy - Vuejs, React, HTML & Laravel Admin Dashboard Template

**Vuexy – Vuejs, React, HTML & Laravel Admin Dashboard Template** – is the most developer friendly & highly customizable Admin Dashboard Template based on Bootstrap 4, Bootstrap Vue & Reactstrap.

---

## Branch principal

- nave-develop

## Guia da instalação

- Node v12 é o mais ideal
- Instalando dependências
    - npm install
- Rodando a aplicação
    - npm run serve

## Processo de Login

- Acessar o link: [https://account-test.educacross.com.br/login](https://account-test.educacross.com.br/login)
- Pedir os dados de acesso para um dos colaboradores.
- Acessar o perfil que tem uma coroa, que é o perfil de **administrador geral.**
- Inspecionar o elemento da página, ir na **aplication** e pegar o **token** e o **refresh_token.**
- Iniciar o projeto npm run serve
- Inserir na URL o link com os respectivos tokens copiados da aplication do manager-test: [http://localhost:8080/login?accessToken=&refreshToken=](http://localhost:8080/login?accessToken=&refreshToken=)
- Se escolhquiser logar no perfil de professor, inspecionar o elemento da página, ir na **aplication** e pegar o **access_token** e o **access_refresh_token.**

## Executando com Docker

### Build da Imagem de Teste

```bash
# Build da imagem usando o Dockerfile de teste
docker build -f docker/Dockerfile.test -t educacross-frontoffice:test .
```

### Executar o Container

```bash
# Executar em modo detached com nome específico
docker run -d -p 8080:80 --name educacross-test-container educacross-frontoffice:test

# Executar em modo interativo (ver logs em tempo real)
docker run -p 8080:80 --name educacross-test-container educacross-frontoffice:test
```

### Acessar a Aplicação

Após executar o container, acesse: [http://localhost:8080](http://localhost:8080)

### Comandos Úteis do Docker

```bash
# Ver logs do container
docker logs educacross-test-container

# Ver logs em tempo real
docker logs -f educacross-test-container

# Parar o container
docker stop educacross-test-container

# Iniciar o container novamente
docker start educacross-test-container

# Remover o container
docker rm educacross-test-container

# Remover a imagem
docker rmi educacross-frontoffice:test

# Rebuild e restart (quando houver alterações)
docker stop educacross-test-container && docker rm educacross-test-container
docker build -f docker/Dockerfile.test -t educacross-frontoffice:test .
docker run -d -p 8080:80 --name educacross-test-container educacross-frontoffice:test
```

### Usando Docker Compose (Alternativa)

Também é possível usar o docker-compose existente:

```bash
# Iniciar com docker-compose
docker-compose up --build

# Iniciar em background
docker-compose up -d --build

# Parar os containers
docker-compose down
```

## API
- Link: [https://apieducacrossmanager-test.azurewebsites.net/index.html](https://apieducacrossmanager-test.azurewebsites.net/index.html)
