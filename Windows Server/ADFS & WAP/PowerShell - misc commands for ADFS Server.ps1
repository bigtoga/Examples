# Start here
Get-AdfsProperties

# If you need certificate info:
Get-AdfsProperties | Format-List AutoCert*, Certificate*

# Change from default of 1 year certificates to 2 years:
Set-ADFSProperties -CertificateDuration 730

# Download the Federation XML metadata
# Set the file path
$FilePath = "C:\Users\yourusername\Desktop\ADFS-MetaData-2021-06-10.xml"

# Export MetaData XML
$mUrl = (Get-ADFSEndpoint | where Protocol -eq "Federation Metadata").FullUrl.ToString()
$httpHelper = new-object System.Net.WebClient
$metadataAsString = $httpHelper.DownloadString($mUrl)
$httpHelper.DownloadFile($mUrl , "$($FilePath)")

# https://itpro.outsidesys.com/2017/10/14/adfs-token-certificate-rollover/


