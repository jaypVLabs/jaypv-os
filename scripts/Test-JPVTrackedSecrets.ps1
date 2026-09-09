#requires -Version 7.0
[CmdletBinding()]
param([string]$RepositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
function Fail([string]$Message) { throw "JPV_TRACKED_SECRET_SCAN_FAILURE: $Message" }
$patterns = [ordered]@{
  PRIVATE_KEY_LEGACY='-----BEGIN (RSA|OPENSSH|EC|DSA) PRIVATE KEY-----'
  PRIVATE_KEY_PKCS8='-----BEGIN PRIVATE KEY-----'
  PRIVATE_KEY_ENCRYPTED='-----BEGIN ENCRYPTED PRIVATE KEY-----'
  GITHUB_CLASSIC_TOKEN='gh[pousr]_[A-Za-z0-9]{36,}'
  GITHUB_FINE_GRAINED_TOKEN='github_pat_[A-Za-z0-9_]{50,}'
  AWS_ACCESS_KEY='AKIA[0-9A-Z]{16}'
  GOOGLE_API_KEY='AIza[0-9A-Za-z_-]{35}'
  STRIPE_LIVE_SECRET='sk_live_[0-9A-Za-z]{16,}'
  STRIPE_LIVE_RESTRICTED='rk_live_[0-9A-Za-z]{16,}'
  NPM_ACCESS_TOKEN='npm_[A-Za-z0-9]{30,}'
  SLACK_TOKEN='xox[baprs]-[A-Za-z0-9-]{20,}'
  DATABASE_URL_WITH_PASSWORD='(?i)(postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s:@\/]+:[^\s@\/]+@'
  BASIC_AUTH_URL='(?i)https?:\/\/[^\s:@\/]+:[^\s@\/]+@'
  PASSWORD_LITERAL='(?i)\b(password|passwd|pwd)\b\s*[:=]\s*["''][^"'']{8,}["'']'
  SERVICE_ACCOUNT_PRIVATE_KEY='(?i)"private_key"\s*:\s*"-----BEGIN (?:ENCRYPTED )?PRIVATE KEY-----'
}
$exclude = 'scripts/Test-JPVTrackedSecrets.ps1'
$files = @(& git -C $RepositoryRoot ls-files)
if ($LASTEXITCODE -ne 0) { Fail 'git tracked-file inventory failed' }
$hits = [System.Collections.Generic.List[string]]::new()
foreach ($relative in $files) {
  if ($relative -eq $exclude) { continue }
  $path = Join-Path $RepositoryRoot $relative
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { continue }
  try { $content = Get-Content -LiteralPath $path -Raw -ErrorAction Stop } catch { continue }
  foreach ($entry in $patterns.GetEnumerator()) { if ($content -match $entry.Value) { $hits.Add("$relative [$($entry.Key)]") } }
}
if ($hits.Count -gt 0) { Fail "credential/private-key exposure detected: $($hits -join ', ')" }
[ordered]@{schema_version='jpv.tracked-secret-scan.v1';status='PASS';authority='canonical JPV security governance';tracked_files_scanned=$files.Count;signature_classes=$patterns.Count;credential_findings=0;validated_at_utc=[DateTimeOffset]::UtcNow.ToString('o')} | ConvertTo-Json -Depth 10
