#requires -Version 7.0
Describe 'JPV legacy repository GitHub Actions retirement' {
  It 'keeps executable Actions absent' {
    Test-Path -LiteralPath '.github/workflows' -PathType Container | Should -BeFalse
  }
  It 'retains native tracked-secret verification' {
    Test-Path -LiteralPath 'scripts/Test-JPVTrackedSecrets.ps1' -PathType Leaf | Should -BeTrue
    Test-Path -LiteralPath 'scripts/Invoke-JPVNativeVerification.ps1' -PathType Leaf | Should -BeTrue
  }
  It 'does not let Dependabot maintain GitHub Actions' {
    $text = Get-Content -LiteralPath '.github/dependabot.yml' -Raw
    $text | Should -Not -Match 'package-ecosystem:\s*["'']?github-actions'
  }
}
