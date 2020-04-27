# Poisson Process
A `Poisson Process` is a model for a series of discrete "events" where the 
average time between events is known, but the exact timing of events 
is random. The arrival of an event is independent of the event before 
or after. We work with Poisson processes all day, every day:
* Website uptime % - we know that, on average, our website will be
offline for 1 hour and 36 minutes on average this year
according to our SLA with our web host. However if the site
goes offline today for two minutes, we cannot predict when the
next outage is not for how long. 

For example, suppose we own a website which our content delivery network 
(CDN) tells us goes down on average once per 60 days, but one failure 
doesn’t affect the probability of the next. All we know is the average 
time between failures. This is a Poisson process that looks like:

The important point is we know the average time between events but they are randomly spaced (stochastic). We might have back-to-back failures, but we could also go years between failures due to the randomness of the process.
A Poisson Process meets the following criteria (in reality many phenomena modeled as Poisson processes don’t meet these exactly):
Events are independent of each other. The occurrence of one event does not affect the probability another event will occur.
The average rate (events per time period) is constant.
Two events cannot occur at the same time.
The last point — events are not simultaneous — means we can think of each sub-interval of a Poisson process as a Bernoulli Trial, that is, either a success or a failure. With our website, the entire interval may be 600 days, but each sub-interval — one day — our website either goes down or it doesn’t.

Calculate the number of events over a continuous time period/ 

# Additional resources
https://towardsdatascience.com/the-poisson-distribution-and-poisson-process-explained-4e2cb17d459
