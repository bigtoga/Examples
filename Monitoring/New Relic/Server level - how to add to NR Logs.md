## Steps:

1. Review New Relic Infrastructure agent version - update if below required
     - New Relic -> Infrastructure -> filter to Host -> Look at Agent Version
	
2. Is the host already reporting logs?	
     - New Relic -> Infrastructure -> filter to Host -> Look at Agent Version -> Scroll to bottom
		 - If you see **Enable logs**, this host is not enabled	
	
3. Restart the NR Infrastructure agent on the host
	net stop newrelic-infra
	net start newrelic-infra

5. Add the logging files to logging.d	
	
https://download.newrelic.com/infrastructure_agent/windows/newrelic-infra.msi

https://github.com/newrelic/infrastructure-agent/tree/master/assets/examples/logging

https://docs.newrelic.com/docs/logs/enable-log-management-new-relic/enable-log-monitoring-new-relic/forward-your-logs-using-infrastructure-agent/

https://docs.newrelic.com/docs/logs/log-management/ui-data/query-syntax-logs/

verbose:3
log_format: json

