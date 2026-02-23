# terraform-projeto/providers.tf

terraform {
  required_version = ">= 1.0" # Especifica a versão mínima do Terraform

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0" # Especifica a versão mínima do provedor AzureRM
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-globalstuff-prd"
    storage_account_name = "tfstateaccounteduca"
    container_name       = "tf-terraformstate"
    key                  = "terraform.tfstate_frontoffice"
  }

}

# Configuração do provedor Azure Resource Manager
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  # O Terraform usará as credenciais configuradas via Azure CLI (az login)
  # Nenhuma configuração adicional de autenticação é necessária aqui.
}