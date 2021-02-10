
https://github.com/Azure/fta-azuresentinel

Andrew N (Infra, Sec), Peter P (DevSecOps), Mark G (Infra, Sec)

**Step 1**: Define your use cases (high level) of what you want to capture

## The "Use Case Triangle"

Gartner Research talk about use cases requiring three things, that they call the "Use Case Triangle". A simple methodology aimed at the following:
- Insight - examples are the things you're looking to find, like User or Asset behavior
- Data - examples are Events and Logs, things you see in your environment
- Analytics - this seems simple, "build rules" BUT it's not just aimed there. Think about pattern matching or machine learning. Big picture things

These use cases are important, you need to understand what **Insight** you're trying to gain with your SIEM, making sure you have the right **Data** for that Insight and then that you're applying the right **Analytics** for that Insight

## Example Use Cases

Brexit - people used to be able to look at data from any EU country but now there is a government requirement to not only prevent that access to UK data from outside the UK, but you must log attempts from outside the UK

## Sentinel connectors

- [Grand list of Sentinel Connectors](https://techcommunity.microsoft.com/t5/azure-sentinel/azure-sentinel-the-connectors-grand-cef-syslog-direct-agent/ba-p/803891#:~:text=The%20Grand%20List%20%20%20Vendor%20%20,Sentinel%20built-in%20connector%20%2032%20more%20rows%20)
- [Create custom connectors to Sentinel](https://techcommunity.microsoft.com/t5/azure-sentinel/azure-sentinel-creating-custom-connectors/ba-p/864060)

## Cost Mgmt for Sentinel

**Logic apps for cost metrics** - https://techcommunity.microsoft.com/t5/azure-sentinel/ingestion-cost-alert-playbook/ba-p/2006003

# Questions

#### For Infrastructure Team

**How to share certain SIEM information w other teams easily?**
- Ops team wants to know whenever software is installed/updated
- Ops team wants to know whenever Front Door WAF blocks
- "Create a workbook inside Sentinel then give the Ops team access to that workbook. If you don't want to give them access to Sentinel portal, can provide Kusto query ability"

**Azure DevOps integration**
- We don't use Github
- 
