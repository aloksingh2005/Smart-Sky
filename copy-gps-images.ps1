# PowerShell script to copy images from about folder to gps folder

# Create the gps folder if it doesn't exist
if (-not (Test-Path -Path "image/gps")) {
    New-Item -Path "image/gps" -ItemType Directory
}

# Copy images from about folder to gps folder with new names
Copy-Item -Path "image/about/about1.jpg" -Destination "image/gps/gps-main.jpg"
Copy-Item -Path "image/about/about2.jpg" -Destination "image/gps/vehicle-tracker.jpg"
Copy-Item -Path "image/about/about3.jpg" -Destination "image/gps/personal-tracker.jpg"
Copy-Item -Path "image/about/about4.jpg" -Destination "image/gps/asset-tracker.jpg"
Copy-Item -Path "image/about/about1.jpg" -Destination "image/gps/tracking-system.jpg"
Copy-Item -Path "image/about/about2.jpg" -Destination "image/gps/gps-benefits.jpg"

Write-Host "Images copied successfully to the gps folder." 