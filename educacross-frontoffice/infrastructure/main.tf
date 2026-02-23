# azure/main.tf

# Cria um Resource Group para organizar os recursos
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.resource_group_name_prefix}"
  location = var.location
  tags     = var.tags
}