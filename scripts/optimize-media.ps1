# scripts/optimize-media.ps1
Add-Type -AssemblyName System.Drawing

function Save-Optimized-Jpeg($srcPath, $destPath, $maxDim = 1440, $quality = 78) {
    try {
        $img = [System.Drawing.Image]::FromFile($srcPath)
        $w = $img.Width
        $h = $img.Height

        if ($w -gt $maxDim -or $h -gt $maxDim) {
            $scale = [math]::Min($maxDim / $w, $maxDim / $h)
            $newW = [int]($w * $scale)
            $newH = [int]($h * $scale)
        } else {
            $newW = $w
            $newH = $h
        }

        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $newW, $newH)

        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

        $tempPath = $destPath + ".tmp"
        $bmp.Save($tempPath, $encoder, $encoderParams)

        $img.Dispose()
        $g.Dispose()
        $bmp.Dispose()

        if (Test-Path $destPath) {
            Remove-Item $destPath -Force
        }
        Move-Item $tempPath $destPath -Force

        return (Get-Item $destPath).Length
    } catch {
        Write-Error "Failed to optimize $srcPath : $_"
        return 0
    }
}

Write-Host "Starting Image Optimization..." -ForegroundColor Cyan

# 1. Convert heavy photographic PNGs to lightweight JPGs
$heavyPngs = @(
    "public\images\cta-bg.png",
    "public\aboutpage.png",
    "public\images\cta-bg1.png",
    "public\real-projects\before.png",
    "public\real-projects\Luxury 4BHK Penthouse Renovation.png",
    "public\real-projects\after.png",
    "public\images\aboutbenner.png",
    "public\images\aboutbenner1.png"
)

$totalSaved = 0

foreach ($png in $heavyPngs) {
    if (Test-Path $png) {
        $oldSize = (Get-Item $png).Length
        $jpgPath = [System.IO.Path]::ChangeExtension($png, ".jpg")
        $newSize = Save-Optimized-Jpeg $png $jpgPath 1440 78
        $saved = $oldSize - $newSize
        $totalSaved += $saved
        Remove-Item $png -Force
        Write-Host "Converted $png -> $([System.IO.Path]::GetFileName($jpgPath)): $([math]::Round($oldSize/1KB,1)) KB -> $([math]::Round($newSize/1KB,1)) KB (Saved $([math]::Round($saved/1KB,1)) KB)" -ForegroundColor Green
    }
}

# 2. Compress existing large JPEGs (>300 KB) in public/real-projects and public/images
$jpegs = Get-ChildItem -Path public\real-projects, public\images -Filter "*.jpg" -File | Where-Object { $_.Length -gt 300000 }
foreach ($jpg in $jpegs) {
    $oldSize = $jpg.Length
    $newSize = Save-Optimized-Jpeg $jpg.FullName $jpg.FullName 1440 78
    $saved = $oldSize - $newSize
    if ($saved -gt 0) {
        $totalSaved += $saved
        Write-Host "Compressed $($jpg.Name): $([math]::Round($oldSize/1KB,1)) KB -> $([math]::Round($newSize/1KB,1)) KB (Saved $([math]::Round($saved/1KB,1)) KB)" -ForegroundColor Yellow
    }
}

Write-Host "`nTOTAL BANDWIDTH SAVED: $([math]::Round($totalSaved / 1MB, 2)) MB!" -ForegroundColor Magenta
