# bundle_dlls.ps1 — Copia VCRUNTIME140.dll junto al .exe para releases locales
# GitHub Actions CI usa +crt-static (no necesita esta DLL)

param(
    [string]$ReleaseDir = "$PSScriptRoot\target\release"
)

$exe = Join-Path $ReleaseDir "mejia.exe"
if (-not (Test-Path $exe)) {
    Write-Host "❌ No se encuentra $exe. Ejecuta 'cargo build --release' primero."
    exit 1
}

# Buscar VCRUNTIME140.dll
$dllPaths = @(
    "$env:SystemRoot\System32\vcruntime140.dll",
    "$env:SystemRoot\SysWOW64\vcruntime140.dll"
)

$found = $false
foreach ($path in $dllPaths) {
    if (Test-Path $path) {
        Copy-Item $path $ReleaseDir -Force
        Write-Host "✅ Copiado: $path → $ReleaseDir"
        $found = $true
    }
}

if (-not $found) {
    Write-Host "⚠️ VCRUNTIME140.dll no encontrada en el sistema."
    Write-Host "   Descárgala desde: https://aka.ms/vs/17/release/vc_redist.x64.exe"
    exit 1
}

# Verificar que el .exe funciona
Write-Host "🔍 Verificando binario..."
$output = & "$ReleaseDir\mejia.exe" --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ $output"
} else {
    Write-Host "❌ Error al ejecutar: $output"
    exit 1
}

Write-Host ""
Write-Host "📦 Release lista en: $ReleaseDir"
Write-Host "   Incluye: mejia.exe + vcruntime140.dll"
