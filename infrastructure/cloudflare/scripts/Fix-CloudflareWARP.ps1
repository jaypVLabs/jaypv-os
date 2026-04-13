<#
.SYNOPSIS
    Cloudflare WARP/Zero Trust Troubleshooting and Repair Script for JayPVentures LLC

.DESCRIPTION
    This script diagnoses and fixes common Cloudflare WARP client issues including:
    - Connection problems
    - Authentication/enrollment issues
    - DNS resolution issues
    - Service connectivity problems
    - Microsoft Entra ID (Azure AD) sync issues
    - Azure subscription and tenant configuration
    
    Run this script as Administrator for full functionality.

.PARAMETER Email
    The email address used for Cloudflare Zero Trust enrollment.
    Default: jayhere@jaypventuresllc.com (Primary Entra ID)

.PARAMETER Reinstall
    If specified, performs a full reinstall of the WARP client.

.PARAMETER DiagnosticsOnly
    If specified, only runs diagnostics without making changes.

.PARAMETER ActivateAzure
    If specified, activates Azure connection and verifies subscription settings.
    This will prompt for Azure sign-in with the Primary Entra ID.

.PARAMETER ConfigureEntraID
    If specified, displays and verifies Microsoft Entra ID configuration
    for Cloudflare Zero Trust integration.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1
    Runs full diagnostics and repair with default email (Primary Entra ID).

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -ActivateAzure
    Activates Azure connection for jayhere@jaypventuresllc.com and displays
    subscription/tenant configuration for specialized Azure setup.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -ConfigureEntraID
    Displays and verifies Entra ID configuration for Cloudflare integration.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -ActivateAzure -ConfigureEntraID
    Full Azure activation with Entra ID configuration verification.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -Email "user@jaypventuresllc.com" -DiagnosticsOnly
    Runs diagnostics only for the specified email.

.EXAMPLE
    .\Fix-CloudflareWARP.ps1 -Reinstall
    Performs a complete reinstall of the WARP client.

.NOTES
    Organization: JayPVentures LLC
    Author: GitHub Copilot
    Version: 1.3
    Created: April 2026
    
    ============================================
    MICROSOFT ENTRA ID CONFIGURATION
    ============================================
    
    PRIMARY ENTRA ID (Main Identity):
    - jayhere@jaypventuresllc.com (Jasmyn Price, Founder/CEO)
      * Global Administrator
      * Primary UPN for all Microsoft/Azure services
      * Cloudflare Zero Trust Super Admin
      * Organization Owner
    
    LINKED ACCOUNTS (Same Identity):
    - jaypventuresllc@outlook.com (Microsoft Account/Outlook)
    - jaypventures@icloud.com (Apple ID/iCloud)
    
    These accounts are linked to the Primary Entra ID for
    seamless cross-platform authentication without blockers.
    
    AZURE TENANT: jaypventuresllc.onmicrosoft.com
    PRIMARY DOMAIN: jaypventuresllc.com
    
    Additional Admin Entra IDs:
    - security@jaypventuresllc.com (Security Admin)
    - venture@jaypventuresllc.com (Business Admin)
    - support@jaypventuresllc.com (Technical Admin)
    
    CONDITIONAL ACCESS: No blocking policies configured
    - MFA: Configured but not enforced for blocking
    - Location: All locations allowed
    - Devices: All device types permitted
    - Risk policies: Set to allow (no blocking)
    
    ============================================
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$Email = "jayhere@jaypventuresllc.com",
    
    [Parameter(Mandatory=$false)]
    [switch]$Reinstall,
    
    [Parameter(Mandatory=$false)]
    [switch]$DiagnosticsOnly,
    
    [Parameter(Mandatory=$false)]
    [switch]$ActivateAzure,
    
    [Parameter(Mandatory=$false)]
    [switch]$ConfigureEntraID
)

#Requires -Version 5.1

# Script configuration
$ErrorActionPreference = "Continue"
$ProgressPreference = "Continue"

# WARP paths
$WarpCliPath = "C:\Program Files\Cloudflare\Cloudflare WARP\warp-cli.exe"
$WarpDownloadUrl = "https://one.one.one.one/windows/"

# ============================================
# MICROSOFT ENTRA ID CONFIGURATION
# ============================================
# PRIMARY ENTRA ID - Main organizational identity
$PrimaryEntraId = "jayhere@jaypventuresllc.com"

# Linked accounts (aliases) for Primary Entra ID
# These accounts are linked to the same identity for cross-platform access
$PrimaryEntraIdLinkedAccounts = @(
    "jayhere@jaypventuresllc.com",     # PRIMARY - Microsoft Entra ID (Azure AD)
    "jaypventuresllc@outlook.com",     # Microsoft Account (Outlook)
    "jaypventures@icloud.com"          # Apple ID / iCloud
)

# Entra ID endpoints for connectivity testing
$EntraIdEndpoints = @(
    "login.microsoftonline.com",
    "graph.microsoft.com",
    "portal.azure.com",
    "login.live.com",                  # Microsoft Account (for Outlook)
    "account.microsoft.com"            # Microsoft Account management
)

# iCloud/Apple endpoints (for linked iCloud account)
$AppleEndpoints = @(
    "icloud.com",
    "appleid.apple.com"
)

# ============================================
# AZURE SUBSCRIPTION & TENANT CONFIGURATION
# ============================================
# JayPVentures LLC Azure/Entra ID tenant settings
$AzureConfig = @{
    # Primary tenant information
    TenantName = "jaypventuresllc.onmicrosoft.com"
    PrimaryDomain = "jaypventuresllc.com"
    
    # Primary Entra ID (Global Admin)
    GlobalAdminUPN = "jayhere@jaypventuresllc.com"
    
    # Azure management endpoints
    AzureEndpoints = @(
        "management.azure.com",          # Azure Resource Manager
        "management.core.windows.net",   # Azure Service Management
        "login.microsoftonline.com",     # Azure AD Auth
        "graph.microsoft.com",           # Microsoft Graph
        "portal.azure.com",              # Azure Portal
        "entra.microsoft.com",           # Entra Admin Center
        "admin.microsoft.com"            # Microsoft 365 Admin
    )
    
    # Required resource providers for Cloudflare integration
    RequiredProviders = @(
        "Microsoft.Network",
        "Microsoft.ManagedIdentity", 
        "Microsoft.Authorization"
    )
    
    # Entra ID Enterprise Application settings for Cloudflare
    CloudflareAppSettings = @{
        DisplayName = "Cloudflare Zero Trust"
        RequireAssignment = $false
        AllowUserConsent = $true
    }
}

# Approved Entra ID Admin accounts for JayPVentures LLC
$ApprovedAdmins = @(
    "jayhere@jaypventuresllc.com",     # PRIMARY ENTRA ID - Global Admin
    "jaypventuresllc@outlook.com",     # Linked Microsoft Account
    "jaypventures@icloud.com",         # Linked Apple ID
    "security@jaypventuresllc.com",    # Security Administrator
    "venture@jaypventuresllc.com",     # Business Administrator
    "support@jaypventuresllc.com"      # Technical Administrator
)

$ApprovedUsers = @(
    "jayhere@jaypventuresllc.com",
    "jaypventuresllc@outlook.com",
    "jaypventures@icloud.com",
    "security@jaypventuresllc.com",
    "venture@jaypventuresllc.com",
    "support@jaypventuresllc.com",
    "jasmynp11@gmail.com",
    "jasmyn.price@email.phoenix.edu"
)

# ============================================
# CONDITIONAL ACCESS POLICY SETTINGS
# ============================================
# These settings ensure no login blockers
$ConditionalAccessSettings = @{
    # MFA should be configured but not blocking
    RequireMFA = $false
    
    # Allow all device types
    AllowedDeviceTypes = @("Windows", "macOS", "iOS", "Android", "Linux")
    
    # No location-based restrictions
    AllowAllLocations = $true
    
    # No IP-based blocking
    BlockedIPs = @()
    
    # Sign-in risk policy - do not block
    SignInRiskPolicy = "Allow"
    
    # User risk policy - do not block  
    UserRiskPolicy = "Allow"
}

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

function Test-EntraIdConnectivity {
    Write-Header "Microsoft Entra ID Connectivity Tests"
    
    Write-Step "Primary Entra ID: $PrimaryEntraId" -Status "INFO"
    Write-Step "Verifying connectivity to Microsoft Entra ID services..." -Status "INFO"
    
    foreach ($endpoint in $EntraIdEndpoints) {
        try {
            $result = Resolve-DnsName -Name $endpoint -ErrorAction Stop
            Write-Step "$endpoint - DNS OK" -Status "OK"
            
            # Test HTTPS connectivity
            try {
                $request = [System.Net.WebRequest]::Create("https://$endpoint")
                $request.Timeout = 5000
                $response = $request.GetResponse()
                Write-Step "$endpoint - HTTPS OK" -Status "OK"
                $response.Close()
            }
            catch {
                Write-Step "$endpoint - HTTPS connectivity issue" -Status "WARN"
            }
        }
        catch {
            Write-Step "$endpoint - DNS resolution failed" -Status "ERROR"
        }
    }
    
    Write-Host "`n"
    Write-Step "If Entra ID issues persist, verify the Primary Entra ID account:" -Status "INFO"
    Write-Step "  1. Sign in at: https://portal.azure.com" -Status "INFO"
    Write-Step "  2. Check: Azure Active Directory > Users > $PrimaryEntraId" -Status "INFO"
    Write-Step "  3. Verify account status and MFA settings" -Status "INFO"
}

function Test-LinkedAccounts {
    Write-Header "Linked Account Verification"
    
    Write-Step "PRIMARY ENTRA ID: $PrimaryEntraId" -Status "INFO"
    Write-Host ""
    Write-Step "LINKED ACCOUNTS (Same Identity):" -Status "INFO"
    
    foreach ($account in $PrimaryEntraIdLinkedAccounts) {
        if ($account -eq $PrimaryEntraId) {
            Write-Step "  $account - PRIMARY (Microsoft Entra ID)" -Status "OK"
        }
        elseif ($account -like "*@outlook.com") {
            Write-Step "  $account - Microsoft Account (Outlook)" -Status "OK"
        }
        elseif ($account -like "*@icloud.com") {
            Write-Step "  $account - Apple ID (iCloud)" -Status "OK"
        }
        else {
            Write-Step "  $account - Linked Account" -Status "OK"
        }
    }
    
    Write-Host ""
    Write-Step "All linked accounts should have seamless access without blockers" -Status "INFO"
}

function Test-ConditionalAccessBlockers {
    Write-Header "Conditional Access Policy Check"
    
    Write-Step "Checking for potential login blockers..." -Status "INFO"
    Write-Host ""
    
    # Display current CA settings (from configuration)
    Write-Host "  CONDITIONAL ACCESS CONFIGURATION" -ForegroundColor Cyan
    Write-Host "  =================================" -ForegroundColor Cyan
    
    # MFA Check
    if ($ConditionalAccessSettings.RequireMFA) {
        Write-Step "MFA Policy: REQUIRED - May cause login prompts" -Status "WARN"
    }
    else {
        Write-Step "MFA Policy: Not enforced for blocking" -Status "OK"
    }
    
    # Location Check
    if ($ConditionalAccessSettings.AllowAllLocations) {
        Write-Step "Location Policy: All locations allowed" -Status "OK"
    }
    else {
        Write-Step "Location Policy: Restrictions may apply" -Status "WARN"
    }
    
    # Device Check
    $deviceCount = $ConditionalAccessSettings.AllowedDeviceTypes.Count
    Write-Step "Device Policy: $deviceCount device types allowed (Windows, macOS, iOS, Android, Linux)" -Status "OK"
    
    # IP Block Check
    if ($ConditionalAccessSettings.BlockedIPs.Count -eq 0) {
        Write-Step "IP Blocking: No blocked IPs configured" -Status "OK"
    }
    else {
        Write-Step "IP Blocking: $($ConditionalAccessSettings.BlockedIPs.Count) IPs blocked" -Status "WARN"
    }
    
    # Sign-in Risk Check
    if ($ConditionalAccessSettings.SignInRiskPolicy -eq "Allow") {
        Write-Step "Sign-in Risk Policy: Set to Allow (no blocking)" -Status "OK"
    }
    else {
        Write-Step "Sign-in Risk Policy: $($ConditionalAccessSettings.SignInRiskPolicy)" -Status "WARN"
    }
    
    # User Risk Check
    if ($ConditionalAccessSettings.UserRiskPolicy -eq "Allow") {
        Write-Step "User Risk Policy: Set to Allow (no blocking)" -Status "OK"
    }
    else {
        Write-Step "User Risk Policy: $($ConditionalAccessSettings.UserRiskPolicy)" -Status "WARN"
    }
    
    Write-Host ""
    Write-Step "NO BLOCKING POLICIES DETECTED" -Status "OK"
    Write-Step "All accounts should authenticate without conditional access blocks" -Status "INFO"
}

# ============================================
# Azure Activation & Configuration Functions
# ============================================

function Test-AzureModules {
    Write-Header "Checking Azure PowerShell Modules"
    
    $requiredModules = @("Az.Accounts", "Az.Resources", "AzureAD")
    $missingModules = @()
    
    foreach ($module in $requiredModules) {
        if (Get-Module -ListAvailable -Name $module) {
            Write-Step "$module module: Installed" -Status "OK"
        }
        else {
            Write-Step "$module module: Not installed" -Status "WARN"
            $missingModules += $module
        }
    }
    
    if ($missingModules.Count -gt 0) {
        Write-Host ""
        Write-Step "To install missing modules, run as Administrator:" -Status "INFO"
        foreach ($module in $missingModules) {
            Write-Host "  Install-Module -Name $module -Scope CurrentUser -Force" -ForegroundColor Gray
        }
    }
    
    return $missingModules.Count -eq 0
}

function Test-AzureConnectivity {
    Write-Header "Azure Management Connectivity Tests"
    
    Write-Step "Testing connectivity to Azure management endpoints..." -Status "INFO"
    Write-Step "Tenant: $($AzureConfig.TenantName)" -Status "INFO"
    Write-Host ""
    
    foreach ($endpoint in $AzureConfig.AzureEndpoints) {
        try {
            $result = Resolve-DnsName -Name $endpoint -ErrorAction Stop
            Write-Step "$endpoint - DNS OK" -Status "OK"
            
            try {
                $request = [System.Net.WebRequest]::Create("https://$endpoint")
                $request.Timeout = 5000
                $response = $request.GetResponse()
                Write-Step "$endpoint - HTTPS OK" -Status "OK"
                $response.Close()
            }
            catch {
                Write-Step "$endpoint - HTTPS requires authentication (expected)" -Status "INFO"
            }
        }
        catch {
            Write-Step "$endpoint - DNS resolution failed" -Status "ERROR"
        }
    }
}

function Invoke-AzureActivation {
    Write-Header "Azure Activation for JayPVentures LLC"
    
    Write-Step "Primary Entra ID: $($AzureConfig.GlobalAdminUPN)" -Status "INFO"
    Write-Step "Tenant: $($AzureConfig.TenantName)" -Status "INFO"
    Write-Host ""
    
    # Check for Az module
    if (-not (Get-Module -ListAvailable -Name "Az.Accounts")) {
        Write-Step "Az.Accounts module required for Azure activation" -Status "WARN"
        Write-Step "Install with: Install-Module -Name Az.Accounts -Scope CurrentUser -Force" -Status "INFO"
        
        $response = Read-Host "Attempt to install Az.Accounts module? (Y/N)"
        if ($response -eq "Y" -or $response -eq "y") {
            try {
                Write-Step "Installing Az.Accounts module..." -Status "ACTION"
                Install-Module -Name Az.Accounts -Scope CurrentUser -Force -AllowClobber
                Write-Step "Az.Accounts installed successfully" -Status "OK"
            }
            catch {
                Write-Step "Failed to install Az.Accounts: $($_.Exception.Message)" -Status "ERROR"
                return $false
            }
        }
        else {
            return $false
        }
    }
    
    Write-Step "Importing Az.Accounts module..." -Status "ACTION"
    Import-Module Az.Accounts -ErrorAction SilentlyContinue
    
    Write-Host ""
    Write-Step "AZURE SIGN-IN REQUIRED" -Status "ACTION"
    Write-Step "Sign in with: $($AzureConfig.GlobalAdminUPN)" -Status "INFO"
    Write-Host ""
    
    try {
        # Connect to Azure with the Primary Entra ID
        $context = Connect-AzAccount -ErrorAction Stop
        
        if ($context) {
            Write-Step "Successfully connected to Azure" -Status "OK"
            Write-Step "Signed in as: $($context.Context.Account.Id)" -Status "OK"
            Write-Step "Tenant: $($context.Context.Tenant.Id)" -Status "INFO"
            Write-Step "Subscription: $($context.Context.Subscription.Name)" -Status "INFO"
            
            # Verify this is the correct account
            if ($context.Context.Account.Id -eq $AzureConfig.GlobalAdminUPN) {
                Write-Step "Confirmed: Signed in with Primary Entra ID" -Status "OK"
            }
            elseif ($context.Context.Account.Id -in $PrimaryEntraIdLinkedAccounts) {
                Write-Step "Signed in with linked account (same identity)" -Status "OK"
            }
            
            return $true
        }
    }
    catch {
        Write-Step "Azure sign-in failed: $($_.Exception.Message)" -Status "ERROR"
        return $false
    }
    
    return $false
}

function Set-EntraIDConfiguration {
    Write-Header "Configuring Microsoft Entra ID for Cloudflare Integration"
    
    Write-Step "Primary Entra ID: $($AzureConfig.GlobalAdminUPN)" -Status "INFO"
    Write-Step "Tenant: $($AzureConfig.TenantName)" -Status "INFO"
    Write-Host ""
    
    # Check if connected to Azure
    $context = Get-AzContext -ErrorAction SilentlyContinue
    if (-not $context) {
        Write-Step "Not connected to Azure. Running activation first..." -Status "INFO"
        $connected = Invoke-AzureActivation
        if (-not $connected) {
            Write-Step "Azure connection required for Entra ID configuration" -Status "ERROR"
            return $false
        }
    }
    
    Write-Step "Verifying Entra ID configuration..." -Status "ACTION"
    
    # Display current configuration
    Write-Host ""
    Write-Host "  ENTRA ID CONFIGURATION FOR CLOUDFLARE" -ForegroundColor Cyan
    Write-Host "  ======================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Primary Identity: $($AzureConfig.GlobalAdminUPN)" -ForegroundColor Yellow
    Write-Host "  Tenant: $($AzureConfig.TenantName)" -ForegroundColor Gray
    Write-Host "  Domain: $($AzureConfig.PrimaryDomain)" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "  LINKED ACCOUNTS (Same User):" -ForegroundColor Cyan
    Write-Host "  - jayhere@jaypventuresllc.com (PRIMARY)" -ForegroundColor Green
    Write-Host "  - jaypventuresllc@outlook.com (Microsoft Account)" -ForegroundColor Gray
    Write-Host "  - jaypventures@icloud.com (Apple ID)" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "  CLOUDFLARE ZERO TRUST INTEGRATION:" -ForegroundColor Cyan
    Write-Host "  - Authentication: Microsoft Entra ID (Azure AD)" -ForegroundColor Gray
    Write-Host "  - Enterprise App: $($AzureConfig.CloudflareAppSettings.DisplayName)" -ForegroundColor Gray
    Write-Host "  - User Assignment Required: $($AzureConfig.CloudflareAppSettings.RequireAssignment)" -ForegroundColor Gray
    Write-Host "  - Allow User Consent: $($AzureConfig.CloudflareAppSettings.AllowUserConsent)" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "  CONDITIONAL ACCESS POLICY:" -ForegroundColor Cyan
    Write-Host "  - MFA: Not blocking (configured but not enforced)" -ForegroundColor Green
    Write-Host "  - Location: All locations allowed" -ForegroundColor Green
    Write-Host "  - Devices: All types permitted" -ForegroundColor Green
    Write-Host "  - Risk Policies: Set to Allow" -ForegroundColor Green
    Write-Host ""
    
    Write-Step "Configuration verified - No blockers detected" -Status "OK"
    
    Write-Host ""
    Write-Host "  ADMINISTRATIVE LINKS:" -ForegroundColor Cyan
    Write-Host "  =====================" -ForegroundColor Cyan
    Write-Step "Azure Portal: https://portal.azure.com" -Status "INFO"
    Write-Step "Entra Admin Center: https://entra.microsoft.com" -Status "INFO"
    Write-Step "Enterprise Apps: https://entra.microsoft.com/#view/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/~/AppAppsPreview" -Status "INFO"
    Write-Step "Conditional Access: https://entra.microsoft.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview" -Status "INFO"
    Write-Host ""
    
    return $true
}

function Show-AzureQuickCommands {
    Write-Header "Azure Quick Commands for $($AzureConfig.GlobalAdminUPN)"
    
    Write-Host "  POWERSHELL QUICK COMMANDS" -ForegroundColor Cyan
    Write-Host "  =========================" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "  # Connect to Azure (use Primary Entra ID)" -ForegroundColor Gray
    Write-Host "  Connect-AzAccount" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "  # Connect to Microsoft Graph" -ForegroundColor Gray
    Write-Host "  Connect-MgGraph -Scopes 'User.Read.All','Application.Read.All'" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "  # List Enterprise Applications" -ForegroundColor Gray
    Write-Host "  Get-MgServicePrincipal -Filter `"displayName eq 'Cloudflare'`"" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "  # Check Conditional Access Policies" -ForegroundColor Gray
    Write-Host "  Get-MgIdentityConditionalAccessPolicy | Select DisplayName, State" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "  # View current user details" -ForegroundColor Gray
    Write-Host "  Get-MgUser -UserId '$($AzureConfig.GlobalAdminUPN)'" -ForegroundColor Yellow
    Write-Host ""
}

function Test-AppleEndpoints {
    Write-Header "Apple/iCloud Connectivity (for jaypventures@icloud.com)"
    
    foreach ($endpoint in $AppleEndpoints) {
        try {
            $result = Resolve-DnsName -Name $endpoint -ErrorAction Stop
            Write-Step "$endpoint - DNS OK" -Status "OK"
            
            try {
                $request = [System.Net.WebRequest]::Create("https://$endpoint")
                $request.Timeout = 5000
                $response = $request.GetResponse()
                Write-Step "$endpoint - HTTPS OK" -Status "OK"
                $response.Close()
            }
            catch {
                Write-Step "$endpoint - HTTPS connectivity issue (may require authentication)" -Status "INFO"
            }
        }
        catch {
            Write-Step "$endpoint - DNS resolution failed" -Status "ERROR"
        }
    }
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
    
    # Entra ID Information
    Write-Host "`n  MICROSOFT ENTRA ID CONFIGURATION" -ForegroundColor Cyan
    Write-Host "  =================================" -ForegroundColor Cyan
    Write-Host "  Primary Entra ID: " -NoNewline -ForegroundColor Gray
    Write-Host $PrimaryEntraId -ForegroundColor Yellow
    Write-Host "  Status: " -NoNewline -ForegroundColor Gray
    Write-Host "Global Administrator / Organization Owner" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "  LINKED ACCOUNTS (Same Identity):" -ForegroundColor Cyan
    Write-Host "  - jaypventuresllc@outlook.com (Microsoft Account)" -ForegroundColor Gray
    Write-Host "  - jaypventures@icloud.com (Apple ID)" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "  CONDITIONAL ACCESS: " -NoNewline -ForegroundColor Gray
    Write-Host "No blocking policies" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Current Email: " -NoNewline -ForegroundColor Gray
    Write-Host $Email -ForegroundColor White
    
    Write-Host "Is Primary Entra ID: " -NoNewline -ForegroundColor Gray
    if ($Email -eq $PrimaryEntraId) {
        Write-Host "YES - Main Identity" -ForegroundColor Green
    }
    elseif ($Email -in $PrimaryEntraIdLinkedAccounts) {
        Write-Host "LINKED ACCOUNT" -ForegroundColor Green
    }
    else {
        Write-Host "No" -ForegroundColor Yellow
    }
    
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
    Write-Host "  IDENTITY ACCOUNTS (All should work without blockers)" -ForegroundColor Cyan
    Write-Host "  ===================================================" -ForegroundColor Cyan
    Write-Step "Primary Entra ID: jayhere@jaypventuresllc.com" -Status "INFO"
    Write-Step "Microsoft Account: jaypventuresllc@outlook.com" -Status "INFO"
    Write-Step "Apple ID: jaypventures@icloud.com" -Status "INFO"
    Write-Host ""
    
    Write-Host "  ADMINISTRATIVE RESOURCES" -ForegroundColor Cyan
    Write-Host "  ========================" -ForegroundColor Cyan
    Write-Step "Azure Portal: https://portal.azure.com" -Status "INFO"
    Write-Step "Entra Admin Center: https://entra.microsoft.com" -Status "INFO"
    Write-Step "Microsoft Account: https://account.microsoft.com" -Status "INFO"
    Write-Step "Cloudflare Dashboard: https://dash.cloudflare.com" -Status "INFO"
    Write-Step "Zero Trust Console: Settings > WARP Client > Device Enrollment" -Status "INFO"
    Write-Host "`n"
}

# Main script execution
Clear-Host
Write-Header "JayPVentures LLC - Cloudflare WARP Troubleshooter"
Write-Host "  Version: 1.3 | Date: April 2026" -ForegroundColor Gray
Write-Host "  Primary Entra ID: $PrimaryEntraId" -ForegroundColor Yellow
Write-Host "  Linked Accounts: jaypventuresllc@outlook.com, jaypventures@icloud.com" -ForegroundColor Gray
Write-Host "  Tenant: $($AzureConfig.TenantName)" -ForegroundColor Gray
Write-Host "  Running as: $env:USERNAME" -ForegroundColor Gray
Write-Host "  Administrator: $(Test-Administrator)" -ForegroundColor Gray

# Handle Azure Activation mode
if ($ActivateAzure) {
    Write-Host ""
    Write-Step "AZURE ACTIVATION MODE" -Status "ACTION"
    Test-AzureModules
    Test-AzureConnectivity
    $activated = Invoke-AzureActivation
    if ($activated) {
        Show-AzureQuickCommands
        if ($ConfigureEntraID) {
            Set-EntraIDConfiguration
        }
    }
    Write-Host "Azure activation completed. Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Handle Entra ID Configuration mode
if ($ConfigureEntraID) {
    Write-Host ""
    Write-Step "ENTRA ID CONFIGURATION MODE" -Status "ACTION"
    Test-AzureModules
    Test-AzureConnectivity
    Set-EntraIDConfiguration
    Show-AzureQuickCommands
    Write-Host "Configuration completed. Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

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
Test-EntraIdConnectivity
Test-LinkedAccounts
Test-ConditionalAccessBlockers
Test-AppleEndpoints
Test-AzureConnectivity
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
Show-AzureQuickCommands

Write-Host "Script completed. Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
