Very confusing but if you only want to be notified if the condition is met continuously over a sustained period, you have to set the "Aggregation type" to **Total** instead of `Min`, `Max`, `Sum`, etc. 

The `Lookback period` then defines the minimum sustained period

Example:
- What I want: An alert if Redis Cache "Server Load" metric stays at 80% continuously for at least 15 minutes
- Threshold type: Static
- Aggregation type: Total
- Value is: Greater than or equal to
- Threshold: 80
- Check every: 5 minutes
- Lookback period: 15 minutes
