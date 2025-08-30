# PowerShell script to copy images for biometric section
Copy-Item -Path "image/about/about.jpg" -Destination "image/biometric/biometric-main.jpg" -Force
Copy-Item -Path "image/about/about1.jpg" -Destination "image/biometric/fingerprint-scanner.jpg" -Force
Copy-Item -Path "image/about/about2.jpg" -Destination "image/biometric/facial-recognition.jpg" -Force
Copy-Item -Path "image/about/about3.jpg" -Destination "image/biometric/multibiometric.jpg" -Force
Copy-Item -Path "image/about/about4.jpg" -Destination "image/biometric/access-control.jpg" -Force
Copy-Item -Path "image/about/about1.jpg" -Destination "image/biometric/biometric-benefits.jpg" -Force

Write-Output "Images copied successfully!" 