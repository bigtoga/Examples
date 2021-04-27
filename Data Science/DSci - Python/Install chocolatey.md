Windows 10 - open an elevated command prompt and run:

~~~
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
~~~

You now have chocolatety installed, but your cmd doesn't know about the new path variables. Run **refreshenv** to re-load the variables.

https://stackoverflow.com/questions/45137395/how-do-i-upgrade-the-python-installation-in-windows-10
