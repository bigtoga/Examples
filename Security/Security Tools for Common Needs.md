# Windows Server

- SMB Signing: [nmap and the smb2-security-mode.nse script](https://nmap.org/nsedoc/scripts/smb2-security-mode.html)

# TLS / SSL / Ciphers

- Scan website for TLS vulnerabilities: 
   - [sslscan](https://github.com/rbsec/sslscan)
   - [Qualys SSL Labs](https://www.ssllabs.com/ssltest/)

- Scan SFTP server for cipher strength:
   - testssl.sh
      - [Script and source code](https://github.com/drwetter/testssl.sh)
      - [Web page with instructions](https://testssl.sh/)
      - [A "How To"](https://www.whiteoaksecurity.com/blog/installation-use-of-testssl-sh-tool/)
      - [hexdump for Windows](https://www.di-mgt.com.au/hexdump-for-windows.html)
      - **Reminder** that you must run it from command line like this: `./testssl.sh`
   - [sshscan](https://github.com/evict/SSHScan)

# Resources

- [Kali toolset](https://en.kali.tools/all/?)
