- Uses CoreDNS
- Easy to customize

https://learn.microsoft.com/en-us/azure/aks/coredns-custom

In the Portal:
- Make sure you have access to the cluster (can telnet 443)
- Browse to cluster => **Configuration** => `coredns-custom`
- Make whatever updates needed and save

Via command line:
- Create a file named `corednsms.yaml`
- Create the config map from the file using `kubectl apply -f corednsms.yaml`
- Hot reload the config map "live" without downtime using `kubectl -n kube-system rollout restart deployment coredns`
