# DISM: Deployment Image Servicing and Management

- [Documentation](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/what-is-dism)
- [Commands reference](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/deployment-image-servicing-and-management--dism--command-line-options)

**Scan health**
`DISM /online /cleanup-image /ScanHealth`

**Restore health**
`DISM /online /cleanup-image /RestoreHealth`

## Clean up disk space

`dism /Online /Cleanup-Image /AnalyzeComponentStore`

`dism /online /Cleanup-Image /StartComponentCleanup`

1. Open **Settings**
2. Click on **System**
3. Click on **Storage**
4. Click on **Temporary Files**
5. Check the box for **Windows Update Cleanup**, **Temporary Windows Installation Files**

# SFC: Source File Checker
