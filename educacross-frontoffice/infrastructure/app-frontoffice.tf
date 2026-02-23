# Cria o Container App para o frontoffice
resource "azurerm_container_app" "ca_frontoffice" {
  name                         = "ca-frontoffice"
  container_app_environment_id = "/subscriptions/df4e256e-32dc-4e27-9cf6-1fc0c7a85fcb/resourceGroups/rg-ai-hub-prd/providers/Microsoft.App/managedEnvironments/env-ai-hub-aca"
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  secret {
    name  = "acr-password"
    value = data.azurerm_container_registry.acr.admin_password
  }

  registry {
    server               = data.azurerm_container_registry.acr.login_server
    username             = data.azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password"
  }

  # Configuração do Ingress
  ingress {
    external_enabled           = true   # Habilita o acesso externo
    target_port                = 80     # Porta interna do contêiner frontoffice que receberá o tráfego
    transport                  = "auto" # O ACA gerencia o protocolo (HTTP/1 ou HTTP/2)
    allow_insecure_connections = false  # Força HTTPS
    client_certificate_mode    = "ignore"

    cors {
      allow_credentials_enabled = false
      allowed_headers = [
        "*",
      ]
      allowed_methods = []
      allowed_origins = [
        "https://educacrossformhtml.z22.web.core.windows.net",
      ]
      exposed_headers    = []
      max_age_in_seconds = 0
    }

    # O bloco ip_security_restriction não é suportado no Terraform para ACA.
    # Controle de acesso deve ser feito via NSG ou Application Gateway se necessário.
    # Adicionando bloco traffic_weight obrigatório.
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  template {
    container {
      name   = "frontoffice"
      image  = "creduxrdatalke.azurecr.io/frontofficev4:latest"
      cpu    = 0.5
      memory = "1Gi"


      env {
        name  = "DUMMY_VAR"
        value = var.dummy_var
      }

      env {
        name  = "COMPANY_NAME"
        value = "EDUCACROSS"
      }

    }


    # Configuração de escala (pode escalar para 0 se não houver uso)
    min_replicas = 1 # Pode escalar para zero para economizar custos
    max_replicas = 2 # Permite escalar até 1 instâncias

    http_scale_rule {
      name = "scale-to-zero"
      # Escala baseada em requisições HTTP
      concurrent_requests = "50" # Escala quando há 50 requisições concorrentes
    }

  }

  tags = var.tags

}
