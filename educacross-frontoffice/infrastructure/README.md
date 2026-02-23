# frontoffice Azure Container Apps - Provisionamento com Terraform

Este projeto automatiza o deploy da frontoffice-v4

## Pré-requisitos

- [Terraform >= 1.0](https://www.terraform.io/downloads)
- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)
- Permissões para criar recursos no Azure


## Como usar

 **Configure as variáveis**

    Baixe a versão mais recente do terraform.tfvars com os valores de variaveis sensíveis, utilizando o comando:
    `$ az storage blob download  --account-name tfstateaccounteduca  --container-name tf-terraformstate  --name terraform-frontoffice.tfvars  --file terraform.tfvars`

**Faça login no Azure**
    ```sh
    az login
    ```
w
**Inicialize o Terraform**
    ```sh
    terraform init
    ```

**Valide a configuração**
    ```sh
    terraform validate
    ```

**Planeje a execução**
    ```sh
    terraform plan
    ```

**Aplique o deploy**
    ```sh
    terraform apply
    ```

**Observações**


Segurança: Nunca versionar senhas ou segredos. Use variáveis de ambiente ou Azure Key Vault para produção.

### Referências
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure Container Apps](https://learn.microsoft.com/pt-pt/azure/container-apps/)


>Projeto mantido por [Educacross](https://educacross.com.br/)