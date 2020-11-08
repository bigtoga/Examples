Kusto was re-branded as the **Azure Data Explorer** (ADE) in October, 2020. You can run queries directly in 

**Azure has a dedicated website for interactive queries using ADE**
- https://dataexplorer.azure.com
- [Sample queries can be queried easily](https://dataexplorer.azure.com/clusters/help/databases/Samples?query=H4sIAAAAAAAAAwsuyS/KdS1LzSspVuDlqlEoz0gtSlUILkksKgnJzE1VsLNVSEksSS0BsjWMDAzMdQ0NdQ0MNRUS81KQVNmgKzICKUIxryRVwdZWQcnNxz/I08VRSQFsW3J+aV6JAgAwMx4+hAAAAA==)

**[KQL Quick Reference](https://docs.microsoft.com/en-us/azure/data-explorer/kql-quick-reference)**

**[KQL Samples documentation from Microsoft](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/samples)**

**[KQL Best Practices](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/best-practices)

**[Deep dive into tech stack behind it](https://xhinker.medium.com/understand-kusto-inside-out-and-why-kusto-is-so-fast-54697e6648d7)**

**[KQL Cheatsheet for SQL People](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/sqlcheatsheet)**

**How to write SQL queries and have Kusto tell you how to write it in KQL**

```sql
EXPLAIN 
SELECT COUNT_BIG(*) as C FROM StormEvents
```

**[Main KQL documentation page](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/)**

