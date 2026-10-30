# Restart DSH when the desktop process is gone. Run by Task Scheduler every few minutes.
$exe = Join-Path $env:LOCALAPPDATA 'Programs\DeepSeek Harness\DeepSeek Harness.exe'
$log = Join-Path $env:LOCALAPPDATA 'DeepSeek Harness\supervisor.log'
if (-not (Test-Path $exe)) { exit 1 }
if (Get-Process -Name 'DeepSeek Harness' -ErrorAction SilentlyContinue) { exit 0 }
Start-Process $exe
Add-Content -Path $log -Value ((Get-Date).ToString('o') + ' restarted')
