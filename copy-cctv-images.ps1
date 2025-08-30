# PowerShell script to copy images for CCTV camera section
Copy-Item -Path "image/about/about.jpg" -Destination "image/cctv/cctv-main.jpg" -Force
Copy-Item -Path "image/about/about1.jpg" -Destination "image/cctv/dome-camera.jpg" -Force
Copy-Item -Path "image/about/about2.jpg" -Destination "image/cctv/bullet-camera.jpg" -Force
Copy-Item -Path "image/about/about3.jpg" -Destination "image/cctv/ptz-camera.jpg" -Force
Copy-Item -Path "image/about/about4.jpg" -Destination "image/cctv/ip-camera.jpg" -Force
Copy-Item -Path "image/about/about1.jpg" -Destination "image/cctv/cctv-benefits.jpg" -Force

Write-Output "CCTV camera images copied successfully!" 