Step 1: Browse to C:\Program Files\New Relic\newrelic-infra

Step 2: Create a folder named "logging.d" if one does not already exist

Step 3: Copy the appropriate logging file to C:\Program Files\New Relic\newrelic-infra\logging.d\

Step 4: Generate some activity that should be found in infrastructure logs

Step 5: Verifying that it shows up in New Relic is a two phase process: 
- 5.1 - Go to New Relic Infrastructure and filter for this host
- 5.2 - Scroll to the bottom and click on "See logs". If you do not see this, follow the troubleshooting steps
- 5.3 - Verify that the logs are showing up. See below if you need to generate logs manually

Step 6: Verify that this host now shows up in the Logs UI
- There is a 5-10 minute lag between Infrastructure and Logs (so do Step 5 first)
- In the New Relic Logs UI, enter "hostname:" in the search. In about 10-30 seconds, you will see the list of hosts that are reporting logs. If your server is not reporting, either no traffic has been generated or you might want to restart the NR Infra service
- Tip: Filter for hostname:"servername" (ex: enter hostname:"my-vm-2" with no space after the colon), then click on "Livetail", it will auto-refresh every 1 second


/****************************************************************
  TROUBLESHOOTING
****************************************************************/

If you still see nothing:

1. Make sure you have a supported version of NR Infra agent installed (at least 1.11.4). Easiest way is to go to New Relic UI and look at the agent version in Infrastructure

https://docs.newrelic.com/docs/infrastructure/install-infrastructure-agent/get-started/install-infrastructure-agent/

2. Manually write a record to the Application event log - must run Powershell as an Administrator:

```powershell
New-EventLog –LogName Application –Source “Testing”

Write-EventLog -LogName "Application" -Source "Testing" -EventID 3001 -EntryType Information -Message "Testing New Relic Infrastructure logging" -Category 1 -RawData 10,20
```
======================
Last updated 2021-07-12 by Scott

https://docs.newrelic.com/docs/logs/enable-log-management-new-relic/enable-log-monitoring-new-relic/forward-your-logs-using-infrastructure-agent/

New Relic repo showing Windows logging options: https://github.com/newrelic/infrastructure-agent/tree/master/assets/examples/logging/windows
