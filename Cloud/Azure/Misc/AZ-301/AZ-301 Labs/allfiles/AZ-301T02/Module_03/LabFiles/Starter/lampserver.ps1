configuration lampserver {
    Import-DSCResource -module "nx"
    Node localhost {
        $requiredPackages = @("httpd", "mod_ssl", "php", "php-mysql", "mariadb", "mariadb-server")
        $enabledServices = @("httpd", "mariadb")
        ForEach ($package in $requiredPackages) {
            nxPackage $Package {
                Ensure         = "Present"
                Name           = $Package
                PackageManager = "yum"
            }
        }
        ForEach ($service in $enabledServices) {
            nxService $service {
                Enabled    = $true
                Name       = $service
                Controller = "SystemD"
                State      = "running"
            }
        }
    }
}