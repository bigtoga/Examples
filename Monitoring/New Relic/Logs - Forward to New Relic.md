https://docs.newrelic.com/docs/logs/enable-log-management-new-relic/enable-log-monitoring-new-relic/forward-your-logs-using-infrastructure-agent/

Step 1: Browse to C:\Program Files\New Relic\newrelic-infra

Step 2: Create a folder named "logging.d" if one does not already exist

Step 3: Copy the appropriate logging file to C:\Program Files\New Relic\newrelic-infra\logging.d\

Step 4: Generate some activity that should be found in infrastructure logs

Step 5: Verify in New Relic Logs that you can find the hostname by searching for the hostname you deployed it to
          - Tip: If you go to the New Relic Logs UI, enter "hostname:" in the search. In about 10-30 seconds, you will see the list of hosts that are reporting logs
                 If your server is not reporting, either no traffic has been generated or you might want to restart the NR Infra service
======================

New Relic repo showing Windows logging options: https://github.com/newrelic/infrastructure-agent/tree/master/assets/examples/logging/windows
