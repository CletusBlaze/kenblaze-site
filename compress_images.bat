@echo off
echo Compressing images using PowerShell...

powershell -Command "
Add-Type -AssemblyName System.Drawing
$inputFolder = 'pics_original'
$outputFolder = 'pics'
$quality = 80
$maxWidth = 1200

if (!(Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder
}

Get-ChildItem $inputFolder -Filter *.jpg | ForEach-Object {
    $inputPath = $_.FullName
    $outputPath = Join-Path $outputFolder $_.Name
    
    $img = [System.Drawing.Image]::FromFile($inputPath)
    
    if ($img.Width -gt $maxWidth) {
        $ratio = $maxWidth / $img.Width
        $newHeight = [int]($img.Height * $ratio)
        $newImg = New-Object System.Drawing.Bitmap($maxWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        $graphics.DrawImage($img, 0, 0, $maxWidth, $newHeight)
        $graphics.Dispose()
        $img.Dispose()
        $img = $newImg
    }
    
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {$_.MimeType -eq 'image/jpeg'}
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
    
    $img.Save($outputPath, $encoder, $encoderParams)
    $img.Dispose()
    Write-Host 'Compressed:' $_.Name
}

Get-ChildItem $inputFolder -Filter *.jpeg | ForEach-Object {
    $inputPath = $_.FullName
    $outputPath = Join-Path $outputFolder $_.Name
    
    $img = [System.Drawing.Image]::FromFile($inputPath)
    
    if ($img.Width -gt $maxWidth) {
        $ratio = $maxWidth / $img.Width
        $newHeight = [int]($img.Height * $ratio)
        $newImg = New-Object System.Drawing.Bitmap($maxWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        $graphics.DrawImage($img, 0, 0, $maxWidth, $newHeight)
        $graphics.Dispose()
        $img.Dispose()
        $img = $newImg
    }
    
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {$_.MimeType -eq 'image/jpeg'}
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
    
    $img.Save($outputPath, $encoder, $encoderParams)
    $img.Dispose()
    Write-Host 'Compressed:' $_.Name
}

Write-Host 'Image compression complete!'
"

pause