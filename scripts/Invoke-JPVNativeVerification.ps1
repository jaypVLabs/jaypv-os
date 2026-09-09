#requires -Version 7.0
[CmdletBinding()]
param([string]$RepositoryRoot=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path)
$ErrorActionPreference='Stop'
Set-StrictMode -Version Latest
Push-Location $RepositoryRoot
try {
  $head=(git rev-parse HEAD).Trim()
  if($LASTEXITCODE -ne 0 -or $head -notmatch '^[0-9a-f]{40}$'){throw 'Unable to resolve exact repository HEAD.'}
  if(Test-Path -LiteralPath '.github/workflows' -PathType Container){throw 'Retired GitHub Actions workflow surface is present.'}
  & ./scripts/Test-JPVTrackedSecrets.ps1
  if($LASTEXITCODE -ne 0){throw 'Tracked-secret verification failed.'}
  if(-not (Test-Path -LiteralPath '.jpv/jpv-os-governance.json' -PathType Leaf)){throw 'Missing JPV-OS governance inheritance.'}
  if(-not (Test-Path -LiteralPath 'governance/security/JPV-SECURITY-INHERITANCE.json' -PathType Leaf)){throw 'Missing security inheritance.'}
  $dependabot=Get-Content -LiteralPath '.github/dependabot.yml' -Raw
  if($dependabot -match 'package-ecosystem:\s*["'']?github-actions'){throw 'Dependabot still maintains retired GitHub Actions.'}
  New-Item -ItemType Directory -Force '.jpv/receipts' | Out-Null
  [ordered]@{schema_version='jpv.native-verification.v1';repository='jaypVLabs/jaypv-os';commit_sha=$head;state='PASS';verification_authority='JPV_NATIVE';github_actions_authority=$false;verified_at_utc=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath '.jpv/receipts/native-verification.json' -Encoding utf8
  Write-Host "JPV native verification: PASS ($head)"
}
finally { Pop-Location }
