# Git Branching and GitFlow

Neste tutorial, vamos aprender como criar branches para features, hotfixes e como usar o GitFlow no Git.

## Criando Branches

### 1. Branch de Feature

As branches de feature são usadas para desenvolver novas funcionalidades e isolar o desenvolvimento das mesmas do restante do código. Para criar uma branch de `feature`, siga os seguintes passos:

```
git checkout -b feature/EC-XXXX-nome-da-feature
```
```
git push -u origin feature/EC-XXXX-nome-da-feature
```


`EC-XXXX` é o número da issue no DevOps. O nome da feature deve ser descritivo.


### 2. Branch de Hotfix

As branches de hotfix são usadas para corrigir bugs críticos encontrados na produção. Para criar uma branch de `hotfix`, siga os passos abaixo:


```
git checkout master
```
```
git checkout -b hotfix/EC-XXXX-nome-do-hotfix
```
```
git push -u origin hotfix/EC-XXXX-nome-do-hotfix
```


## Merge e Pull Request
Após o desenvolvimento da feature ou do hotfix, é necessário fazer o `Pull Request` ou o `Merge` com a branch `develop`, `homolog` ou `master`, respectivamente.

### 1. Pull Request


1. Acesse o repositório no DevOps e clique em `New pull request`.
2. Selecione a branch de origem e a branch de destino.
3. Selecione os `Reviewers`.
4. Selecione o `Work item` e clique em `Create pull request`.


Toda a feature ou hotfix deve ser revisada por pelo menos um outro desenvolvedor antes de ser mergeada na branch de destino. O `Pull Request` é uma forma de garantir que o código esteja de acordo com os padrões de qualidade e que não haja conflitos com o código já existente.


A `feature` deve ser mergeada na branch `develop` e o `hotfix` deve ser mergeada na branch `master`, `homolog` e `develop`.


### 2. Merge


Quando existem conflitos no `Pull Request`, o desenvolvedor deve resolver os conflitos e fazer o `Merge` manualmente. Para fazer o `Merge` manualmente, siga os passos abaixo:


1. Faça o `Pull` da branch de destino:
2. Crie uma nova brach a partir da branch de destino: `git checkout -b nome-da-branch`
3. Faça o `Merge` da branch de origem na branch de destino: `feature/EC-XXXX-nome-da-feature`
4. Resolva os conflitos.
5. Publique a branch de destino: `git push origin nome-da-branch`
6. Abra um `Pull Request` da branch de destino para a branch de origem.

Exemplos:

### feature

```
git checkout develop
```
```
git pull
```
```
git checkout -b feature/EC-XXXX-nome-da-feature-develop
```
```
git merge feature/EC-XXXX-nome-da-feature
```
```
git push origin feature/EC-XXXX-nome-da-feature-develop
```


### hotfix

```
git checkout master
```
```
git pull
```
```
git checkout -b hotfix/EC-XXXX-nome-do-hotfix-master
```
```
git merge hotfix/EC-XXXX-nome-do-hotfix
```
```
git push origin hotfix/EC-XXXX-nome-do-hotfix-master
```
```
git checkout homolog
```
```
git pull
```
```
git checkout -b hotfix/EC-XXXX-nome-do-hotfix-homolog
```
```
git merge hotfix/EC-XXXX-nome-do-hotfix
```
```
git push origin hotfix/EC-XXXX-nome-do-hotfix-homolog
```
```
git checkout develop
```
```
git pull
```
```
git checkout -b hotfix/EC-XXXX-nome-do-hotfix-develop
```
```
git merge hotfix/EC-XXXX-nome-do-hotfix
```
```
git push origin hotfix/EC-XXXX-nome-do-hotfix-develop
```


<!-- ## GitFlow

O GitFlow é um modelo de gerenciamento de branches que facilita a organização e o fluxo de trabalho no Git. Ele define um conjunto de regras e convenções para a criação de branches e o uso do Git. Para utilizar o GitFlow, siga os passos abaixo:

1. Instale o GitFlow:

- No Linux e macOS:


brew install git-flow-avh


- No Windows:


choco install gitflow-avh.portable


2. Inicialize o GitFlow no seu repositório Git:


git flow init


3. Para criar uma branch de feature:


git flow feature start nome-da-feature
git flow feature publish nome-da-feature


4. Para criar uma branch de hotfix:


git flow hotfix start nome-do-hotfix
git flow hotfix publish nome-do-hotfix


5. Para finalizar a branch de feature e fazer o merge com a branch 'develop':


git flow feature finish nome-da-feature


6. Para finalizar a branch de hotfix e fazer o merge com as branches 'master' e 'develop':


git flow hotfix finish nome-do-hotfix


Esperamos que este tutorial tenha sido útil para entender como criar branches de features, hotfixes e como usar o GitFlow no Git -->