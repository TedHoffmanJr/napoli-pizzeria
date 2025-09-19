# PowerShell Script to Convert Menu Images for Toast POS
# Converts WebP images to JPEG with 750x450px dimensions and optimized file size

# Define paths
$sourceDir = "public\menu-images-compressed"
$outputDir = "public\menu-images-toast"
$magickPath = "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"

Write-Host "Starting batch conversion for Toast POS..." -ForegroundColor Green
Write-Host "Source: $sourceDir" -ForegroundColor Yellow
Write-Host "Output: $outputDir" -ForegroundColor Yellow

# Counter for progress
$totalFiles = 0
$processedFiles = 0

# First, count total files
Get-ChildItem -Path $sourceDir -Recurse -Filter "*.webp" | ForEach-Object {
    $totalFiles++
}

Write-Host "Found $totalFiles WebP files to convert" -ForegroundColor Cyan

# Process each WebP file
Get-ChildItem -Path $sourceDir -Recurse -Filter "*.webp" | ForEach-Object {
    $processedFiles++
    $inputFile = $_.FullName
    $relativePath = $_.FullName.Substring((Resolve-Path $sourceDir).Path.Length + 1)
    $outputFile = Join-Path $outputDir ($relativePath -replace "\.webp$", ".jpg")

    Write-Host "[$processedFiles/$totalFiles] Converting: $($_.Name)" -ForegroundColor White

    # Create output directory if it doesn't exist
    $outputFileDir = Split-Path $outputFile -Parent
    if (!(Test-Path $outputFileDir)) {
        New-Item -ItemType Directory -Path $outputFileDir -Force | Out-Null
    }

    # Convert using ImageMagick
    & $magickPath $inputFile -resize "750x450^" -gravity center -extent "750x450" -quality 85 -strip $outputFile

    if ($LASTEXITCODE -eq 0) {
        # Get file size
        $fileSize = [math]::Round((Get-Item $outputFile).Length / 1KB, 1)
        Write-Host "  Success! Size: ${fileSize}KB" -ForegroundColor Green
    } else {
        Write-Host "  Failed to convert $($_.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Conversion complete!" -ForegroundColor Green
Write-Host "Processed $processedFiles files" -ForegroundColor Cyan
Write-Host "Output directory: $outputDir" -ForegroundColor Yellow

# Display summary of output files
Write-Host ""
Write-Host "Output Summary:" -ForegroundColor Cyan
Get-ChildItem -Path $outputDir -Recurse -Filter "*.jpg" | Group-Object Directory | ForEach-Object {
    $categoryName = Split-Path $_.Name -Leaf
    Write-Host "  ${categoryName}: $($_.Count) images" -ForegroundColor White
}

Write-Host ""
Write-Host "All images are now ready for Toast POS upload!" -ForegroundColor Green