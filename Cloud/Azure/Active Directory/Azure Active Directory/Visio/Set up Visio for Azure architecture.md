# Disable Shape Protection

From [this page](https://support.microsoft.com/en-us/office/prevent-or-allow-changes-to-shapes-e65decf4-0eed-4fd6-a7d9-b286abcbc7eb):
1. File -> Options -> Advanced -> Enable Developer tab
2. Click on the shape -> Change to Developer tab -> Click on **Protection** icon -> Disable "Format" protection

# Use the Azure Stencils

If you have Visio 2, it includes the Azure stencils already
* File -> New -> Templates -> Network -> Azure

If you have Visio 1, you have to "go the hard way"
1. Browse to `Documents\My Shapes` folder
2. Clone [Sandro Periera's Azure icons repo](https://github.com/sandroasp/Microsoft-Integration-and-Azure-Stencils-Pack-for-Visio) into the same folder
  * `git clone https://github.com/sandroasp/Microsoft-Integration-and-Azure-Stencils-Pack-for-Visio'
5. Clone [Azure Kid's Visio stenciles](https://github.com/azurekid/Azure-Stencils) in the `My Shapes` folder
  * `git clone https://github.com/azurekid/Azure-Stencils`
6. Launch Visio and add these via **More Shapes**
1. Download [the Azure Icons pack from Microsoft](https://docs.microsoft.com/en-us/azure/architecture/icons/) and extract to a new directory
1. Import the SVGs as needed
