# 常驻 / Headless 部署

本插件本身不拥有进程；常驻能力由 DSH 宿主 + 系统服务提供。

## 1. 安装到 headless profile

```bash
dsh plugin --profile headless add github:EternalNight996/dsh-pixel-team#v0.1.76
```

profile 中必须包含持久会话存储与 subagent 提供方（DSH base 已提供）。

## 2. 保持进程存活

### Windows（当前环境）

以管理员 PowerShell 运行：

```powershell
pwsh -File scripts/install-dsh-supervisor.ps1
```

它会注册登录时启动的计划任务 `DSH Pixel Team Supervisor`，每 5 分钟检查一次
`DeepSeek Harness.exe`，发现退出就重新启动；日志：
`%LOCALAPPDATA%\DeepSeek Harness\supervisor.log`。

同时关闭 Windows 睡眠/休眠：

```powershell
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
```

### Linux（systemd）

```ini
[Unit]
Description=DSH Pixel Team
After=network-online.target

[Service]
Type=simple
User=%i
WorkingDirectory=%h
ExecStart=/usr/local/bin/dsh --profile headless
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## 3. 健康检查

```bash
node scripts/headless-healthcheck.mjs --workspace . --stale-min 20
```

输出 JSON：活跃团队、开放任务、超时任务、已验收数；有超时任务时退出码 1。
建议每 5 分钟跑一次并接入告警。插件自身的 Watchdog 默认 15 分钟无进展会把
空闲/丢失成员的 attempt 标记失败并唤醒掌门。

## 4. 说明

- 宿主重启后，active Goal 会变为 disarmed；需要用户显式 resume 才会继续自动轮次。
- 团队状态、任务与验收记录在 `<workspace>/.agent-teams/`，进程重启不会丢失。
- 本仓库不包含云端托管；24/7 需要一台常开机器或宿主自身的托管能力。
