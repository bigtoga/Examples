# Four Vs of Big Data

This is IBM’s way that they identify what defines big data 
* Velocity
* Volume
* Variety
* Veracity

This is their graphic from https://www.ibmbigdatahub.com/infographic/four-vs-big-data

![?](https://i.imgur.com/11pCm3a_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

If you tack on "unusual" or "a lot of", makes more sense to say, "Big data is data that meets one or more of the following criteria:"
* Unusual volume
* Unusual velocity
* Unusual variety
* Unusual veracity

Note - I like the 4Vs model as it is all true, but I also think there are other factors that make certain problems more 'Big Data-like' in certain situations/scenarios
1. 'Big data' can be a *relevant-to-you* term. 
  * If we only consider any of the 4Vs in the context of "How much data {the largest company in the world} can ingest per minute?", we minimize literally every other company's/employee's business problems that they are unable to solve as quickly/in the manner they would like
  * "I'm a Google employee solving a Google or customer business problem. What is 'Big Data' to me in this situation, knowing the compute and storage Google has, their budget, and their willingness to spend $$$ to solve business problems / R&D?"
  * "I'm a Netflix employee solving a Netflix business problem. What is 'Big Data' to me in this situation, knowing the historical Netflix trend to willingly invest in data science, machine learning, and desire to be known as a world 'thought leader' for AI/ML?"
  * "I work for my local city as a data analyst - what is 'Big Data' to me when I'm solving a business problem we have (a.k.a. my boss' boss asked for a report)? I have no budget, and I don't even have a server. Is 'Big Data' just really 'anything that I cannot load in Excel'?"
2. Big data is an expiring term 
  * Personally, I like the idea that there's a spin/way of looking at 'big data' as though it is a euphemism for a data problem that you cannot solve using your current hardware/software/knowledge/architecture within the time the business needs it
  * Expectation in that scenario is that eventually, given the right market conditions (a.k.a. your company continues to profit, or makes more money, or a new CEO comes in who invests in addressing those issues, etc), your 'big data' problem above is resolved by either buying newer or faster hardware, better/different software with additional capabilities or better performance (via newer or better algorithms for example), or maybe they hire (or train) people in new/different skills/tech/etc, or maybe they prioritize refactoring / rebuild of the application / data architectures, or even 'They hire a consulting firm to get us there'
2. What percentage of the data is unstructured? Makes a massive difference in terms of human effort required to build the solution upfront but no real impact once solution is in place
3. What is the rate of schema change to the data? During COVID-19 early days (Feb/Mar 2020), people/companies were building big pipelines to ingest data via scraping or other means then the underlying data source would change and overnight "everything you build broke". 
3. Expectations - if you are expected to aggregate, predict against it, and create up to the minute interactive visualizations within 30 seconds of the data being added to the system of record, you could argue that is Big Data b/c you cannot process it using your current methods in the time the business wants it processed.

Big data in a more "relevant to me" way is "anything you need to load that you cannot load within the time you need to load it"

I also add **Time Expectations** - what is the company’s wish or aspirations of using the data?
- “We want real time insights”
- Were okay with the analytics data being 30 days old or older”

I also add **Diversity of Technologies Required** as another layer of complexity

Lastly I think you also have to consider **How frequently does the underlying data for the models you need change / require re-training?**
- More re-training creates more overhead/delays

Those combined with the 4Vs are required for any solutions architect to create an end to end solution 

# Big 4Vs of Big Data

Big four V’s of big data - **can be any one or any combination of the below**

* **Volume**: Big data is always large in terms of volume. Some have predicted that the amount of data generated in the last 
two years is more than what has been created before that throughout human history. 
- 2019: projected that 2.3 *trillion* 
GB of data are generated each day
- 2019: Each trading day on the NYSE generates over 1tb of OLTP data

* **Variety**: The endless variety of data is more impressive than its sheer volume. The diversity is not only regarding 
devices or sources of data generation but also the type of data, along with structured and unstructured data. 

One type of “variety” is related to how the data is generated - it might be 
generated through laptops, fitness trackers, tablets, smartphones, supercomputers, and many other mediums. 

One of the most substantial sources is social media platforms with Twitter, Facebook, and Instagram producing more data than any other communication tools. This data might be in the form of a social media comment, voice recording, video recording, or media files. 

The format of this data might be structured or unstructured also which requires development teams to have flexibility in both the tools they use to load, clean, and analyZe the data but also in terms of the technologies they use. 

* **Velocity**: The frequency of incoming data is also increasing each day. For example, many reports published on what 
happens in an internet second show overwhelming numbers. 

In an internet second:
- more than 50,000 Google searches are 
completed
- more than 125,000 YouTube videos are viewed
- 7,000 tweets are sent out
- more than 2 million emails 
are sent

The flow of data is huge and constant, which can help researchers and companies to make valuable decisions.

* **Veracity** may or may not be applicable to all, but is related to unusually high requirements placed on the data science team to “present and defend” their data and analysis:
- to/from untrusting Executives 
- when data was from previously or known to have inaccurate data sources
- from apps/sources with known or specious data quality history / issues

I tend to think of this one not as a stand-alone personally but as more of a combiner - medium volume + high veracity requirements might make this a big data problem

Veracity generally requires a cultural or process-based solution rather than a technology solution but I have seen technical solutions such as giving users ability to see data lineage or “sign off” by various teams/team members on the final visualizations/presentation 