# Poisson Process
A `Poisson Process` is a model for a series of discrete "events" where the 
average time between events is known, but the exact timing of events 
is random. The arrival of an event is independent of the event before 
or after. We work with Poisson processes all day, every day:

A good example is "Website uptime %".  
On average we know that our website will be
offline for 1 hour and 36 minutes this year
according to our SLA with our web host. However if the site
goes offline today for two minutes, we cannot predict when the
next outage is not for how long. 

Criteria to determine whether you are 
working with a `Poisson Process`:
1. Events are randomly occurring (stochastic)
2. Events are independent of one another 
3. Two Events cannot occur simultaneously 

We might have back-to-back failures, but we could also go years
between failures due to the randomness of the process.
The occurrence of one event does not affect the probability another event will occur.
The average rate (events per time period) is constant.
Two events cannot occur at the same time.

### ELI5
Calculate the number of events over a continuous time period/ 

# Additional resources
https://towardsdatascience.com/the-poisson-distribution-and-poisson-process-explained-4e2cb17d459
