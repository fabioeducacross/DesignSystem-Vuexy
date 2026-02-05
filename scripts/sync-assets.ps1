# Script de Sincronização de Assets
# Este script copia todos os assets do educacross-frontoffice para o Storybook

Write-Host "🚀 Iniciando sincronização de assets..." -ForegroundColor Cyan
Write-Host ""

# 1. Criar diretórios
Write-Host "📁 Criando estrutura de diretórios..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path ".storybook\public\images" -Force | Out-Null
New-Item -ItemType Directory -Path ".storybook\public\css" -Force | Out-Null
New-Item -ItemType Directory -Path ".storybook\public\fonts" -Force | Out-Null
Write-Host "✅ Diretórios criados" -ForegroundColor Green
Write-Host ""

# 2. Copiar imagens
Write-Host "🖼️  Copiando imagens..." -ForegroundColor Yellow
try {
    Copy-Item -Path "educacross-frontoffice\src\assets\images\*" -Destination ".storybook\public\images\" -Recurse -Force -ErrorAction Stop
    $imageCount = (Get-ChildItem ".storybook\public\images" -Recurse -File | Measure-Object).Count
    Write-Host "✅ $imageCount arquivos de imagem copiados" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao copiar imagens: $_" -ForegroundColor Red
}
Write-Host ""

# 3. Copiar CSS
Write-Host "🎨 Copiando CSS..." -ForegroundColor Yellow
try {
    Copy-Item -Path "educacross-frontoffice\src\assets\css\*" -Destination ".storybook\public\css\" -Recurse -Force -ErrorAction Stop
    Copy-Item -Path "educacross-frontoffice\src\assets\tailwind\*" -Destination ".storybook\public\css\tailwind\" -Recurse -Force -ErrorAction Stop
    $cssCount = (Get-ChildItem ".storybook\public\css" -Recurse -File | Measure-Object).Count
    Write-Host "✅ $cssCount arquivos CSS copiados" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao copiar CSS: $_" -ForegroundColor Red
}
Write-Host ""

# 4. Copiar fontes
Write-Host "🔤 Copiando fontes..." -ForegroundColor Yellow
try {
    Copy-Item -Path "educacross-frontoffice\src\assets\fonts\*" -Destination ".storybook\public\fonts\" -Recurse -Force -ErrorAction Stop
    $fontCount = (Get-ChildItem ".storybook\public\fonts" -Recurse -File | Measure-Object).Count
    Write-Host "✅ $fontCount arquivos de fonte copiados" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao copiar fontes: $_" -ForegroundColor Red
}
Write-Host ""

# 5. Resumo
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📊 RESUMO DA SINCRONIZAÇÃO" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "Imagens:  $imageCount arquivos" -ForegroundColor White
Write-Host "CSS:      $cssCount arquivos" -ForegroundColor White
Write-Host "Fontes:   $fontCount arquivos" -ForegroundColor White
Write-Host ""

$totalSize = (Get-ChildItem ".storybook\public" -Recurse -File | Measure-Object -Property Length -Sum).Sum
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "Tamanho total: $totalSizeMB MB" -ForegroundColor White
Write-Host ""
Write-Host "✅ Sincronização concluída com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Dica: Execute este script sempre que atualizar assets no educacross-frontoffice" -ForegroundColor Yellow
