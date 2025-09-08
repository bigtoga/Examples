```bash
sudo grep 'Failed password' /var/log/auth.log

sudo grep 'Accepted password' /var/log/auth.log

# Or for successful root logins:
sudo grep 'Accepted password' /var/log/auth.log | grep 'root'

sudo grep 'COMMAND=' /var/log/auth.log

```

- `last` - displays a list of recently logged-in users
- `lastlog` - Last login time for each user
- - `journalctl -u sshd` - SSH logins
