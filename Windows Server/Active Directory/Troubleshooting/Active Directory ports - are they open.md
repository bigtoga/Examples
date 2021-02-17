# Port Query v2 is your friend

[GUI version](https://www.microsoft.com/en-us/download/details.aspx?id=24009) - [command line version](https://www.microsoft.com/en-us/download/details.aspx?id=17148)

UI version has Active Directory ports

# Command line

DCDIAG /TEST:DNS /V /E /F:"C:\DNS Logs\20210216_0140.txt"

NLTEST /DSGETDC:mydomain.com >> "C:\DNS Logs\nltest_mydomain.txt"
NLTEST /DSGETDC:stg.mydomain.com >> "C:\DNS Logs\nltest_stg.txt"

NLTEST /DSGETDC:mydomain.com /GC >> "C:\DNS Logs\nltest_forest.txt"
