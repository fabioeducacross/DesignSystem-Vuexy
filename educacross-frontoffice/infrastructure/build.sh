echo "Fazendo login no Azure Container Registry 'creduxrdatalke'..."
az acr login --name creduxrdatalke

echo "Buildando imagem Docker para frontoffice"
docker build \
  --platform linux/amd64 \
  -t creduxrdatalke.azurecr.io/frontofficev4:latest \
  -f ../docker/Dockerfile.dev ../
# docker run --env-file .env -p 80:80 -it --rm creduxrdatalke.azurecr.io/frontoffice-v4:latest

if [ $? -eq 0 ]; then
    docker push creduxrdatalke.azurecr.io/frontofficev4:latest
    echo "Build e push finalizados com sucesso"
else
    echo -e "\033[31mErro no build do Docker\033[0m"
fi

echo "Script finalizado"
