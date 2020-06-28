From a Solutions architect perspective 

IBM’s definition of big data:
* Velocity
* Volume
* Variety
* Veracity

I also add **Time Expectations** - what is the company’s wish or aspirations of using the data?
- “We want real time insights”
- Were okay with the analytics data being 30 days old or older”

Another wrinkle is related to storage: **Storage Expectations**

And yet another wrinkle is **Performance Expectations**

And then there’s the **Hosting Requirements** - are we required to design an on-premise solution or are we open to using the cloud?

Another revolves around **Privacy Considerations** - are we able to have Production data in Development and Staging environments or do we have to create a “Golden data set” 

I also add **Diversity of Technologies Required** as another layer of complexity

Lastly I think you also have to consider **How frequently does the underlying data for the models you need change / require re-training?**
- More re-training creates more overhead/delays

Those combined with the 4Vs are required for any solutions architect to create an end to end solution 

# Tools for handling volume problems
Volume issues are scale issues, however you cannot define a solution to volume sues in a vacuum - you must also know the answers to the “variety“ and “velocity” components along with “Time Expectations” and “Diversity of Technologies Required” . Example:
- “We need to be able to see near real time analysis of our 10,000 transactions per second OLTP system, be able to correlate that with data from our CRM system, and provide NLP to our customer-facing chatbot so that it can react in real time to anticipate customer needs and questions”
   - Follow up questions:
      - Where is the data that needs to integrate and work with the models for the NLP system?
      - How frequently does the NLP model(s) need to be retrained and redeployed?
      - How long do you need to store the OLTP data online hot?

# Tools for handling velocity problems


# Tools for handling variety problems



# Tools for handling veracity problems
Being able to show data lineage and/or “sign off” within the front end can go a long way to satisfy untrusting executives and stakeholders. 
- Tableau can show who approved or worked on a data source
