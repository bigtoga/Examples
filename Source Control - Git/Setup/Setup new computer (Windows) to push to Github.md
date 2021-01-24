If you have two-factor enabled, this is non-trivial.

1. View your existing settings on github for SSH keys - https://github.com/settings/keys

2. Create a new SSH key using [the Github instructions](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

3. Backup this new key in your password manager of choice. Be sure to get:
- Type
- Format
- Passphrase
- Private key (text)
- Public key (text)
- Make physical copies of everything in `c:\users\your_name\.ssh\*` 

4. Back to [github's SSH page](https://github.com/settings/keys) and add your new key. Paste the text of your **public key** into the text box

5. Follow these steps to [test your SSH connection to Github](https://docs.github.com/en/github/authenticating-to-github/testing-your-ssh-connection)

6. Configure `ssh-gen` to run automatically on Windows by following [these instructions](https://docs.github.com/en/github/authenticating-to-github/working-with-ssh-key-passphrases)
