# terraform-projeto/apps.tf




data "azurerm_container_registry" "acr" {
  name                = "creduxrdatalke"
  resource_group_name = "rg-datalake-prd"
}
