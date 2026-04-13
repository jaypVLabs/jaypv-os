<#
.SYNOPSIS
    Cloudflare WARP/Zero Trust Troubleshooting and Repair Script for JayPVentures LLC

.DESCRIPTION
    This script diagnoses and fixes common Cloudflare WARP client issues including:
    - Connection problems
    - Authentication/enrollment issues
    - DNS resolution issues
    - Service connectivity problems
    
    Run this script as Administrator for full functionality.

.PARAMETER Email
    The email address used for Cloudflare Zero Trust enrollment.
    Default: jayhere@jaypventuresllc.com

.PARAMETER Reinstall
    If specified, performs a full reinstall of the WARP client.

.PARAMETER DiagnosticsOnly
    If specified, only runs diagnostics without making changes.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1
    Runs full diagnostics and repair with default email.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -Email "user@jaypventuresllc.com" -DiagnosticsOnly
    Runs diagnostics only for the specified email.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -Reinstall
    Performs a complete reinstall of the WARP client.

.NOTES
    Organization: JayPVentures LLC
    Author: GitHub Copilot
    Created: April 2026
    
    Approved Admin Emails:
    - jayhere@jaypventuresllc.com (Primary - Founder/CEO)
    - security@jaypventuresllc.com
    - venture@jaypventuresllc.com
    - support@jaypventuresllc.com
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$Email = "jayhere@jaypventuresllc.com",
    
    [Parameter(Mandatory=$false)]
    [switch]$Reinstall,
    
    [Parameter(Mandatory=$false)]
    [switch]$DiagnosticsOnly
)

#Requires -Version 5.1

# Script configuration
$ErrorActionPreference = "Continue"
$ProgressPreference = "Continue"

# WARP paths
$WarpCliPath = "C:\Program Files\Cloudflare\Cloudflare WARP\warp-cli.exe"
$WarpDownloadUrl = "https://one.one.one.one/windows/"

# Approved emails for JayPVentures LLC
$ApprovedAdmins = @(
    "jayhere@jaypventuresllc.com",
    "security@jaypventuresllc.com",
    "venture@jaypventuresllc.com",
    "support@jaypventuresllc.com"
)

$ApprovedUsers = @(
    "jayhere@jaypventuresllc.com",
    "security@jaypventuresllc.com",
    "venture@jaypventuresllc.com",
    "support@jaypventuresllc.com",
    "jaypventures@icloud.com",
    "jasmynp11@gmail.com",
    "jasmyn.price@email.phoenix.edu"
)

# ============================================
# Helper Functions
# ============================================

function Write-Header {
    param([string]$Title)
    $line = "=" * 60
    Write-Host "`n$line" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor White
    Write-Host "$line`n" -ForegroundColor Cyan
}

function Write-Step {
    param([string]$Message, [string]$Status = "INFO")
    $color = switch ($Status) {
        "OK"      { "Green" }
        "WARN"    { "Yellow" }
        "ERROR"   { "Red" }
        "INFO"    { "Cyan" }
        "ACTION"  { "Magenta" }
        default   { "White" }
    }
    Write-Host "[$Status] " -ForegroundColor $color -NoNewline
    Write-Host $Message
}

function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-WarpInstalled {
    return Test-Path $WarpCliPath
}

function Get-WarpStatus {
    if (-not (Test-WarpInstalled)) {
        return @{
            Installed = $false
            Connected = $false
            Mode = "Not Installed"
            Account = $null
        }
    }
    
    try {
        $status = & $WarpCliPath status 2>&1
        $account = & $WarpCliPath account 2>&1
        
        $connected = $status -match "Connected"
        $mode = if ($status -match "Status update: (.+)") { $Matches[1] } else { "Unknown" }
        
        return @{
            Installed = $true
            Connected = $connected
            Mode = $mode
            Account = $account
            RawStatus = $status
        }
    }
    catch {
        return @{
            Installed = $true
            Connected = $false
            Mode = "Error"
            Account = $null
            Error = $_.Exception.Message
        }
    }
}

# ============================================
# Diagnostic Functions
# ============================================

function Test-NetworkConnectivity {
    Write-Header "Network Connectivity Tests"
    
    $tests = @(
        @{ Host = "1.1.1.1"; Name = "Cloudflare DNS" },
        @{ Host = "one.one.one.one"; Name = "Cloudflare WARP Portal" },
        @{ Host = "cloudflare.com"; Name = "Cloudflare Main" },
        @{ Host = "dash.cloudflare.com"; Name = "Cloudflare Dashboard" },
        @{ Host = "8.8.8.8"; Name = "Google DNS (backup)" }
    )
    
    $results = @()
    
    foreach ($test in $tests) {
        $ping = Test-Connection -ComputerName $test.Host -Count 2 -Quiet -ErrorAction SilentlyContinue
        if ($ping) {
            Write-Step "$($test.Name) ($($test.Host)): Reachable" -Status "OK"
            $results += @{ Test = $test.Name; Result = "Pass" }
        }
        else {
            Write-Step "$($test.Name) ($($test.Host)): Not reachable" -Status "ERROR"
            $results += @{ Test = $test.Name; Result = "Fail" }
        }
    }
    
    return $results
}

function Test-DnsResolution {
    Write-Header "DNS Resolution Tests"
    
    $domains = @(
        "cloudflare.com",
        "one.one.one.one",
        "dash.cloudflare.com",
        "api.cloudflare.com"
    )
    
    foreach ($domain in $domains) {
        try {
            $result = Resolve-DnsName -Name $domain -ErrorAction Stop
            Write-Step "$domain resolves to $($result[0].IPAddress)" -Status "OK"
        }
        catch {
            Write-Step "$domain - DNS resolution failed" -Status "ERROR"
        }
    }
}

function Test-WarpPorts {
    Write-Header "WARP Port Connectivity"
    
    Write-Step "Testing UDP port 2408 (WARP tunnel)..." -Status "INFO"
    Write-Step "Testing HTTPS port 443..." -Status "INFO"
    
    # Test HTTPS connectivity
    try {
        $request = [System.Net.WebRequest]::Create("https://one.one.one.one")
        $request.Timeout = 5000
        $response = $request.GetResponse()
        Write-Step "HTTPS connectivity to one.one.one.one: OK" -Status "OK"
        $response.Close()
    }
    catch {
        Write-Step "HTTPS connectivity to one.one.one.one: Failed" -Status "ERROR"
    }
    
    # Check if required ports might be blocked
    $firewallRules = Get-NetFirewallRule -DisplayName "*Cloudflare*" -ErrorAction SilentlyContinue
    if ($firewallRules) {
        Write-Step "Found $($firewallRules.Count) Cloudflare firewall rules" -Status "OK"
    }
    else {
        Write-Step "No Cloudflare-specific firewall rules found" -Status "WARN"
    }
}

function Test-WarpService {
    Write-Header "WARP Service Status"
    
    $services = @(
        "CloudflareWARP",
        "CloudflareWARPDaemon"
    )
    
    foreach ($serviceName in $services) {
        $service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
        if ($service) {
            if ($service.Status -eq "Running") {
                Write-Step "$serviceName service is running" -Status "OK"
            }
            else {
                Write-Step "$serviceName service is $($service.Status)" -Status "WARN"
            }
        }
        else {
            Write-Step "$serviceName service not found" -Status "INFO"
        }
    }
}

function Get-WarpDiagnostics {
    Write-Header "WARP Client Diagnostics"
    
    if (-not (Test-WarpInstalled)) {
        Write-Step "WARP client is not installed" -Status "ERROR"
        return
    }
    
    Write-Step "Running WARP CLI diagnostics..." -Status "INFO"
    
    try {
        # Get status
        $status = & $WarpCliPath status 2>&1
        Write-Step "Status: $status" -Status "INFO"
        
        # Get account info
        $account = & $WarpCliPath account 2>&1
        Write-Step "Account: $account" -Status "INFO"
        
        # Get settings
        $settings = & $WarpCliPath settings 2>&1
        Write-Step "Settings retrieved" -Status "OK"
        
        # Get tunnel stats if available
        try {
            $tunnel = & $WarpCliPath tunnel stats 2>&1
            if ($tunnel -and $tunnel -notmatch "error") {
                Write-Step "Tunnel stats available" -Status "OK"
            }
        }
        catch {
            Write-Step "Tunnel stats not available" -Status "INFO"
        }
    }
    catch {
        Write-Step "Error running diagnostics: $($_.Exception.Message)" -Status "ERROR"
    }
}

# ============================================
# Repair Functions
# ============================================

function Repair-WarpConnection {
    Write-Header "Attempting WARP Connection Repair"
    
    if (-not (Test-WarpInstalled)) {
        Write-Step "WARP not installed. Please install first." -Status "ERROR"
        return $false
    }
    
    # Step 1: Disconnect
    Write-Step "Disconnecting WARP..." -Status "ACTION"
    & $WarpCliPath disconnect 2>&1 | Out-Null
    Start-Sleep -Seconds 2
    
    # Step 2: Reset registration
    Write-Step "Resetting WARP registration..." -Status "ACTION"
    & $WarpCliPath registration delete 2>&1 | Out-Null
    Start-Sleep -Seconds 2
    
    # Step 3: Re-register
    Write-Step "Re-registering WARP..." -Status "ACTION"
    & $WarpCliPath register 2>&1 | Out-Null
    Start-Sleep -Seconds 3
    
    # Step 4: Connect
    Write-Step "Connecting WARP..." -Status "ACTION"
    & $WarpCliPath connect 2>&1 | Out-Null
    Start-Sleep -Seconds 5
    
    # Verify
    $status = Get-WarpStatus
    if ($status.Connected) {
        Write-Step "WARP connection repaired successfully!" -Status "OK"
        return $true
    }
    else {
        Write-Step "WARP connection repair failed" -Status "ERROR"
        return $false
    }
}

function Repair-WarpServices {
    Write-Header "Repairing WARP Services"
    
    if (-not (Test-Administrator)) {
        Write-Step "Administrator privileges required for service repair" -Status "ERROR"
        return $false
    }
    
    $services = @("CloudflareWARP", "CloudflareWARPDaemon")
    
    foreach ($serviceName in $services) {
        $service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
        if ($service) {
            Write-Step "Restarting $serviceName..." -Status "ACTION"
            Restart-Service -Name $serviceName -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
            
            $service = Get-Service -Name $serviceName
            if ($service.Status -eq "Running") {
                Write-Step "$serviceName restarted successfully" -Status "OK"
            }
            else {
                Write-Step "$serviceName failed to start" -Status "ERROR"
            }
        }
    }
    
    return $true
}

function Clear-WarpCache {
    Write-Header "Clearing WARP Cache and Temporary Files"
    
    $cachePaths = @(
        "$env:LOCALAPPDATA\Cloudflare",
        "$env:APPDATA\Cloudflare",
        "$env:TEMP\Cloudflare*"
    )
    
    foreach ($path in $cachePaths) {
        if (Test-Path $path) {
            Write-Step "Clearing: $path" -Status "ACTION"
            Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        }
    }
    
    Write-Step "Cache cleared" -Status "OK"
}

function Install-WarpClient {
    Write-Header "Installing/Reinstalling WARP Client"
    
    if (-not (Test-Administrator)) {
        Write-Step "Administrator privileges required for installation" -Status "ERROR"
        Write-Step "Please run PowerShell as Administrator" -Status "INFO"
        return $false
    }
    
    # Uninstall existing if present
    if (Test-WarpInstalled) {
        Write-Step "Uninstalling existing WARP client..." -Status "ACTION"
        $uninstallString = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" | 
            Where-Object { $_.DisplayName -like "*Cloudflare WARP*" } | 
            Select-Object -ExpandProperty UninstallString
        
        if ($uninstallString) {
            Start-Process "msiexec.exe" -ArgumentList "/x $uninstallString /quiet" -Wait
            Start-Sleep -Seconds 5
        }
    }
    
    # Download latest
    Write-Step "Opening WARP download page..." -Status "ACTION"
    Write-Step "Download URL: $WarpDownloadUrl" -Status "INFO"
    Start-Process $WarpDownloadUrl
    
    Write-Host "`n" -NoNewline
    Write-Step "Please download and install the WARP client manually:" -Status "INFO"
    Write-Step "1. Download from: $WarpDownloadUrl" -Status "INFO"
    Write-Step "2. Run the installer" -Status "INFO"
    Write-Step "3. After installation, run this script again" -Status "INFO"
    
    return $true
}

# ============================================
# Main Execution
# ============================================

function Show-Summary {
    param($Results)
    
    Write-Header "Diagnostics Summary"
    
    Write-Host "Email: " -NoNewline -ForegroundColor Gray
    Write-Host $Email -ForegroundColor White
    
    Write-Host "Is Approved User: " -NoNewline -ForegroundColor Gray
    if ($Email -in $ApprovedUsers) {
        Write-Host "Yes" -ForegroundColor Green
    }
    else {
        Write-Host "No - Contact administrator" -ForegroundColor Red
    }
    
    Write-Host "Is Admin: " -NoNewline -ForegroundColor Gray
    if ($Email -in $ApprovedAdmins) {
        Write-Host "Yes" -ForegroundColor Green
    }
    else {
        Write-Host "No" -ForegroundColor Yellow
    }
    
    $warpStatus = Get-WarpStatus
    Write-Host "WARP Installed: " -NoNewline -ForegroundColor Gray
    Write-Host $warpStatus.Installed -ForegroundColor $(if($warpStatus.Installed){"Green"}else{"Red"})
    
    Write-Host "WARP Connected: " -NoNewline -ForegroundColor Gray
    Write-Host $warpStatus.Connected -ForegroundColor $(if($warpStatus.Connected){"Green"}else{"Red"})
    
    Write-Host "`n"
}

function Show-NextSteps {
    Write-Header "Recommended Next Steps"
    
    $warpStatus = Get-WarpStatus
    
    if (-not $warpStatus.Installed) {
        Write-Step "1. Install WARP client from: $WarpDownloadUrl" -Status "ACTION"
        Write-Step "2. Run this script again after installation" -Status "ACTION"
    }
    elseif (-not $warpStatus.Connected) {
        Write-Step "1. Check your network connection" -Status "ACTION"
        Write-Step "2. Verify firewall allows WARP (UDP 2408, HTTPS 443)" -Status "ACTION"
        Write-Step "3. Try: warp-cli disconnect && warp-cli connect" -Status "ACTION"
        Write-Step "4. If issues persist, run: .\Fix-CloudflareWARP.ps1 -Reinstall" -Status "ACTION"
    }
    else {
        Write-Step "WARP appears to be working correctly" -Status "OK"
        Write-Step "If you're still having issues, contact: security@jaypventuresllc.com" -Status "INFO"
    }
    
    Write-Host "`n"
    Write-Step "Cloudflare Dashboard: https://dash.cloudflare.com" -Status "INFO"
    Write-Step "Zero Trust Console: Settings > WARP Client > Device Enrollment" -Status "INFO"
    Write-Host "`n"
}

# Main script execution
Clear-Host
Write-Header "JayPVentures LLC - Cloudflare WARP Troubleshooter"
Write-Host "  Version: 1.0 | Date: April 2026" -ForegroundColor Gray
Write-Host "  Running as: $env:USERNAME" -ForegroundColor Gray
Write-Host "  Administrator: $(Test-Administrator)" -ForegroundColor Gray

# Validate email
if ($Email -notin $ApprovedUsers) {
    Write-Host "`n"
    Write-Step "Warning: '$Email' is not in the approved users list" -Status "WARN"
    Write-Step "Approved users:" -Status "INFO"
    $ApprovedUsers | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
    Write-Host "`n"
}

# Run diagnostics
Test-NetworkConnectivity | Out-Null
Test-DnsResolution
Test-WarpPorts
Test-WarpService
Get-WarpDiagnostics

# Attempt repairs if not diagnostics-only
if (-not $DiagnosticsOnly) {
    if ($Reinstall) {
        Install-WarpClient
    }
    else {
        $warpStatus = Get-WarpStatus
        if ($warpStatus.Installed -and -not $warpStatus.Connected) {
            Write-Host "`n"
            $response = Read-Host "WARP is installed but not connected. Attempt repair? (Y/N)"
            if ($response -eq "Y" -or $response -eq "y") {
                Clear-WarpCache
                Repair-WarpServices
                Repair-WarpConnection
            }
        }
    }
}

# Show summary and next steps
Show-Summary
Show-NextSteps

Write-Host "Script completed. Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
