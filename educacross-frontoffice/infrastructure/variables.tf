
variable "resource_group_name_prefix" {
  type    = string
  default = "frontoffice-dev"
}

variable "location" {
  type    = string
  default = "West US" # Escolha uma região adequada para você
}

variable "tags" {
  type = map(string)
  default = {
    environment = "dev"
    project     = "frontoffice"
  }
}

variable "subscription_id" {
  type = string
}


variable "dummy_var" {
  type    = string
  default = "frontoffice-v4"
}

