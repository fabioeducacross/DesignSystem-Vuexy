#!/bin/bash

# Define variáveis do container app e resource group
containerAppName="ca-frontoffice"
resourceGroup="rg-frontoffice-dev"

# Obtem a revisão ativa
revisionName=$(az containerapp revision list \
    --name "$containerAppName" \
    --resource-group "$resourceGroup" \
    --query "[].name | [0]" \
    --output tsv)

if [ -n "$revisionName" ]; then
    echo "Reiniciando revisão ativa: $revisionName"

    az containerapp revision restart \
        --name "$containerAppName" \
        --resource-group "$resourceGroup" \
        --revision "$revisionName"
else
    echo "❌ Nenhuma revisão ativa encontrada para $containerAppName"
fi
