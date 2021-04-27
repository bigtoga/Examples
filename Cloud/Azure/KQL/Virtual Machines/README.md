
# Failed logins to a VM

```
SecurityEvent
| where TimeGenerated > ago(3d)
| where AccountType == 'User' and EventId == 4625
| simmarize failed_login_attempts = Count()
latest_failed_login = arg_max(TimeGenerated by Account)
| where failed_login_attempts > 5
```