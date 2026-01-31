# Script para substituir todas as imagens externas por placeholders SVG inline
# Execute: powershell -ExecutionPolicy Bypass -File .\scripts\replace-external-images.ps1

$ErrorActionPreference = "Stop"
$root = "C:\Users\Educacross\Documents\Educacross\DesignSystem-Vuexy"

# Definir placeholders SVG
$AVATAR_PRIMARY_40 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E"
$AVATAR_SUCCESS_40 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E"
$AVATAR_WARNING_40 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E"
$AVATAR_DANGER_40 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ff4c51'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ERP%3C/text%3E%3C/svg%3E"
$AVATAR_INFO_40 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2316b1ff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ESK%3C/text%3E%3C/svg%3E"
$AVATAR_PRIMARY_32 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='11' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E"
$AVATAR_PRIMARY_80 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='28' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E"

$PRODUCT_60 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23f5f5f9'/%3E%3Cpath d='M24,20 L36,20 L36,32 L32,40 L28,40 L24,32 Z' fill='%23dbdade'/%3E%3Ccircle cx='30' cy='24' r='3' fill='%23696cff'/%3E%3C/svg%3E"
$PRODUCT_100 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f9'/%3E%3Cpath d='M40,33 L60,33 L60,53 L53,67 L47,67 L40,53 Z' fill='%23dbdade'/%3E%3Ccircle cx='50' cy='40' r='5' fill='%23696cff'/%3E%3C/svg%3E"

$BANNER_1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E"
$BANNER_2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E"
$BANNER_3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E"

$PROFILE_BANNER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='300'%3E%3Cdefs%3E%3ClinearGradient id='profGrad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='300' fill='url(%23profGrad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dy='.35em'%3EProfile Banner%3C/text%3E%3C/svg%3E"

$AUTH_LOGIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3ELogin%3C/text%3E%3C/svg%3E"
$AUTH_REGISTER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3ERegister%3C/text%3E%3C/svg%3E"
$AUTH_FORGOT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3EForgot%3C/text%3E%3C/svg%3E"
$ERROR_404 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23f5f5f9'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial' font-size='120' fill='%23e7e7ff' text-anchor='middle'%3E404%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='24' fill='%2399a1b7' text-anchor='middle'%3EPage Not Found%3C/text%3E%3C/svg%3E"

# Função para substituir em arquivo
function Replace-InFile {
    param(
        [string]$FilePath,
        [string]$OldPattern,
        [string]$NewValue
    )
    if (Test-Path $FilePath) {
        try {
            $content = Get-Content $FilePath -Raw -Encoding UTF8
            $newContent = $content -replace [regex]::Escape($OldPattern), $NewValue
            if ($content -ne $newContent) {
                Set-Content $FilePath -Value $newContent -Encoding UTF8 -NoNewline
                Write-Host "✓ Substituído em: $FilePath" -ForegroundColor Green
                return 1
            }
        }
        catch {
            Write-Host "✗ Erro em $FilePath : $_" -ForegroundColor Red
        }
    }
    return 0
}}

$totalReplaced = 0

Write-Host "`n=== INICIANDO SUBSTITUIÇÃO DE IMAGENS EXTERNAS ===" -ForegroundColor Cyan
Write-Host "Diretório: $root`n"

# 1. Substituir avatares locais (/vuexy/img/avatars/1.png)
Write-Host "`n[1/8] Substituindo avatares locais..." -ForegroundColor Yellow
$files = @(
    "$root\src\stories\organisms\navigation\Navbar.stories.js",
    "$root\src\stories\templates\application-layouts\Dashboard.stories.js"
)
foreach ($file in $files) {
    $totalReplaced += Replace-InFile $file "/vuexy/img/avatars/1.png" $AVATAR_PRIMARY_40
}

# 2. Substituir avatares externos (demos.themeselection.com/.../ avatars/1.png)
Write-Host "`n[2/8] Substituindo avatares externos (avatars/1.png)..." -ForegroundColor Yellow
$files = @(
    "$root\src\stories\molecules\content\ListGroup.stories.js",
    "$root\src\stories\organisms\content\Timeline.stories.js",
    "$root\src\stories\organisms\content\Carousel.stories.js",
    "$root\src\stories\organisms\apps\ChatInterface.stories.js",
    "$root\src\stories\templates\user\Profile.stories.js",
    "$root\src\stories\templates\user\UserView.stories.js",
    "$root\src\stories\organisms\apps\KanbanBoard.stories.js",
    "$root\src\stories\organisms\apps\EmailList.stories.js"
)
foreach ($file in $files) {
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" $AVATAR_PRIMARY_40
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png" $AVATAR_PRIMARY_40
}

# 3. Substituir avatars/2.png (SUCCESS)
Write-Host "`n[3/8] Substituindo avatars/2.png..." -ForegroundColor Yellow
foreach ($file in $files) {
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/2.png" $AVATAR_SUCCESS_40
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/2.png" $AVATAR_SUCCESS_40
}

# 4. Substituir avatars/3.png (WARNING)
Write-Host "`n[4/8] Substituindo avatars/3.png..." -ForegroundColor Yellow
foreach ($file in $files) {
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/3.png" $AVATAR_WARNING_40
}

# 5. Substituir avatars/4.png (DANGER) e 5.png (INFO)
Write-Host "`n[5/8] Substituindo avatars/4.png e 5.png..." -ForegroundColor Yellow
foreach ($file in $files) {
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/4.png" $AVATAR_DANGER_40
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/5.png" $AVATAR_INFO_40
}

# 6. Substituir banners de carousel (card-advance-1/2/3.png)
Write-Host "`n[6/8] Substituindo banners de carousel..." -ForegroundColor Yellow
$carouselFile = "$root\src\stories\organisms\content\Carousel.stories.js"
$totalReplaced += Replace-InFile $carouselFile "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" $BANNER_1
$totalReplaced += Replace-InFile $carouselFile "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" $BANNER_2
$totalReplaced += Replace-InFile $carouselFile "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" $BANNER_3

# 7. Substituir produtos
Write-Host "`n[7/8] Substituindo imagens de produtos..." -ForegroundColor Yellow
$productFiles = @(
    "$root\src\stories\organisms\navigation\Offcanvas.stories.js",
    "$root\src\stories\organisms\forms\Wizard.stories.js"
)
foreach ($file in $productFiles) {
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/products/1.png" $PRODUCT_100
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/products/2.png" $PRODUCT_100
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/1.png" $PRODUCT_60
    $totalReplaced += Replace-InFile $file "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/2.png" $PRODUCT_60
}

# 8. Substituir ilustrações (auth, error pages)
Write-Host "`n[8/8] Substituindo ilustrações..." -ForegroundColor Yellow
$totalReplaced += Replace-InFile "$root\src\stories\templates\auth\Login.stories.js" "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/illustrations/auth-login-illustration-light.png" $AUTH_LOGIN
$totalReplaced += Replace-InFile "$root\src\stories\templates\auth\Register.stories.js" "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/illustrations/auth-register-illustration-light.png" $AUTH_REGISTER
$totalReplaced += Replace-InFile "$root\src\stories\templates\auth\ForgotPassword.stories.js" "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/illustrations/auth-forgot-password-illustration-light.png" $AUTH_FORGOT
$totalReplaced += Replace-InFile "$root\src\stories\templates\misc\Error404.stories.js" "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/illustrations/page-misc-error-light.png" $ERROR_404
$totalReplaced += Replace-InFile "$root\src\stories\templates\user\Profile.stories.js" "https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/pages/profile-banner.png" $PROFILE_BANNER

Write-Host "`n=== SUBSTITUIÇÃO CONCLUÍDA ===" -ForegroundColor Cyan
Write-Host "Total de substituições: $totalReplaced" -ForegroundColor Green

Write-Host "`n=== VALIDANDO IMAGENS RESTANTES ===" -ForegroundColor Cyan
$remaining = Get-ChildItem -Path "$root\src\stories" -Filter "*.stories.js" -Recurse | Select-String -Pattern "demos\.themeselection\.com|/vuexy/img/avatars"
if ($remaining) {
    Write-Host "`nAinda existem $($remaining.Count) referências:" -ForegroundColor Yellow
    $remaining | ForEach-Object { Write-Host "  - $($_.Path):$($_.LineNumber)" }
} else {
    Write-Host "`n✓ Nenhuma referência externa encontrada!" -ForegroundColor Green
}

Write-Host "`n=== CONCLUÍDO ===" -ForegroundColor Cyan
