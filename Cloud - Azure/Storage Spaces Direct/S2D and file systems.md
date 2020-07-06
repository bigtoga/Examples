ReFS is the recommended setup for S2D

# Resilient File System (ReFS) 
ReFS is the premier filesystem purpose-built for virtualization. It includes dramatic accelerations for .vhdx file operations such as creation, expansion, and 
checkpoint merging, and built-in checksums to detect and correct bit errors. It also introduces real-time tiers that rotate data between so-called 
"hot" and "cold" storage tiers in real-time based on usage.

# Cluster Shared Volumes 

The CSV file system  (CSVFS)unifies all the ReFS volumes into a single namespace accessible through any server, so that to each server, every volume 
looks and acts like it's mounted locally.

# Using compression with S2D clusters
Typically, you would only want to run compression on a spinning disk as it does impact performance. You have premium disks on these clusters, 
so you would be paying for the overhead of an expensive disc and then trying to compress storage. Are you doing this strictly from a cost aspect?
Do you need to cap a database size to work with a different point of your application? We're happy to talk through this with you. 
However, if it is just because you've always done it that way, this is no longer something you should pursue with this configuration of Azure S2D. 
