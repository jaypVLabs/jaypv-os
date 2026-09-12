$ErrorActionPreference = 'Stop'

$policy = Join-Path $PSScriptRoot '..\governance\JPV-EVIDENCE-INTENT-RESOLUTION.md'
if (-not (Test-Path $policy)) { throw 'Missing JPV evidence/intent resolution policy.' }
$text = Get-Content -Raw $policy

$required = @(
  'INTENT_SUBSTITUTION',
  'SETTLED_STATE_REGRESSION',
  'EVIDENCE_INFLATION',
  'EVIDENCE_ERASURE',
  'REDUNDANT_VALIDATION',
  'TERMINOLOGY_WITHHOLDING',
  'SCOPE_RESET',
  'PROSE_FOR_EXECUTION',
  'Monotonic progression applies',
  'Claims of provenance require provenance evidence',
  'Resolve terminology requests directly',
  'Preserve question scope across follow-ups'
)

foreach ($token in $required) {
  if ($text -notmatch [regex]::Escape($token)) { throw "Missing required invariant: $token" }
}

Write-Host 'JPV evidence/intent resolution gate: PASS'
