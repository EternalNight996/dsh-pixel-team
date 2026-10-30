# Register a per-user supervisor task. Run in an elevated PowerShell once.
$script = Join-Path $PSScriptRoot 'dsh-supervisor.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument ('-NoProfile -WindowStyle Hidden -File "' + $script + '"')
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName 'DSH Pixel Team Supervisor' -Action $action -Trigger $trigger -Settings $settings -Description 'Restart DeepSeek Harness when it exits' -Force
Write-Host 'Registered task: DSH Pixel Team Supervisor'
