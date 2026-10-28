# scripts/optimize-service-images.ps1
Add-Type -AssemblyName System.Drawing

function Save-Optimized-Jpeg($srcPath, $destPath, $maxDim = 1024, $quality = 78) {
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

Write-Host "Optimizing Service Images & OG Image..." -ForegroundColor Cyan

$servicePngs = @(
    "public\images\bungalow-construction.png",
    "public\images\interior-work.png",
    "public\images\swimming-pool.png",
    "public\images\compound-wall-real.png",
    "public\images\bathroom-renovation.png",
    "public\images\tiles-work.png",
    "public\images\kitchen-work.png",
    "public\images\flooring-work.png",
    "public\images\pop-work.png",
    "public\images\plaster-work.png",
    "public\images\cta-bg2.png"
)

$totalSaved = 0

foreach ($png in $servicePngs) {
    if (Test-Path $png) {
        $oldSize = (Get-Item $png).Length
        $jpgPath = [System.IO.Path]::ChangeExtension($png, ".jpg")
        $newSize = Save-Optimized-Jpeg $png $jpgPath 1024 78
        $saved = $oldSize - $newSize
        $totalSaved += $saved
        Remove-Item $png -Force
        Write-Host "Converted $png -> $([System.IO.Path]::GetFileName($jpgPath)): $([math]::Round($oldSize/1KB,1)) KB -> $([math]::Round($newSize/1KB,1)) KB (Saved $([math]::Round($saved/1KB,1)) KB)" -ForegroundColor Green
    }
}

# Also optimize og-image.jpg and diwali-chhath-offer.jpg
$heavyJpgs = @(
    "public\og-image.jpg",
    "public\diwali-chhath-offer.jpg"
)

foreach ($jpg in $heavyJpgs) {
    if (Test-Path $jpg) {
        $oldSize = (Get-Item $jpg).Length
        $newSize = Save-Optimized-Jpeg $jpg $jpg 1200 78
        $saved = $oldSize - $newSize
        if ($saved -gt 0) {
            $totalSaved += $saved
            Write-Host "Compressed ${jpg}: $([math]::Round($oldSize/1KB,1)) KB -> $([math]::Round($newSize/1KB,1)) KB (Saved $([math]::Round($saved/1KB,1)) KB)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nTOTAL ADDITIONAL BANDWIDTH SAVED: $([math]::Round($totalSaved / 1MB, 2)) MB!" -ForegroundColor Magenta
