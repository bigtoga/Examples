
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


# Questions

#### For Infrastructure Team

**How to share certain SIEM information w other teams easily?**
- Ops team wants to know whenever software is installed/updated
- Ops team wants to know whenever Front Door WAF blocks

**Azure DevOps integration**
- We don't use Github
- 
