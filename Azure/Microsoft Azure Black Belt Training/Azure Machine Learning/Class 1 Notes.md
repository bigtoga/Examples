MSFT - Sri G, Scott D, Matt W

## Agenda
* Class 1: Overview of Azure AI - Knowledge Mining, Cognitive Services, Azure Machine Learning, Azure ML Studio 
* Class 2: Azure LM Deep Dive - SDK, Managed compute, deployment, Pipelines – Intro to MLOps
* Class 3: Azure Machine Learning Hands-on: Using a pre-canned set of labs to walk through concepts covered in previous sessions
* Class 4: TBD

### AI in Microsoft Azure
Two flavors:

#### Custom AI
* Azure Machine Learning

#### Pre-Built AI
* Cognitive Services
* Knowledge Mining
* Azure Bot Framework
* Auto ML

### Personas in Microsoft Azure AI
Wants "No Code" but Has Deep ML Expertise
* Azure Maching Learning (Designer)

Wants "Code" And Has Deep ML Expertise
* Azure Machine Learning (Notebooks)

Wants "No Code" and Has No ML Expertise
* Azure Machine Learning (Automated ML)
* AI Builder (Power Apps)
* AI Insights (Power BI)

Wants "Code" and Has No ML Expertise
* Azure Cognitive Services
* Knowledge Mining

### Containerization and Azure AI
Example of containers being used - Sri has a customer who wants shutdown a drilling/etc rig if flame is detected. Can't deploy expensive devices 10,000 feet below easily but they can (a) built a rugged device, (b) create a model that detects accurately an unsafe situation, (c) deploy that model to a container that runs on that device, and (d) have the device shut down if an unsafe condition is met. Form of automation that is more accurate than hand-written code-based

### Intelligent Kiosk app
Form Recognizer - takes forms, reads, converts to JSON


### Demo: https://oilgas.azurewebsites.net
https://oilgas.azurewebsites.net is built on:
* Azure Search
* Cognitive Search
* Text Analytics
* Computer Vision

1. Uploaded lots of random documents
2. Asked Azure Cognitive Services to search using mix of pre-built and some custom code. Cognitive Services scans the documents and creates index + graph / hierarchy over all 
1. Behind the scenes, he added the translation tool so that it auto-translates documents
1. Built portal to search
1. If you search for anything, it can search both English and other languages now. It can find "car" even if the text is "auto" in Spanish.

## What is Azure Machine Learning?
Combo of a set of Azure Cloud Services + Python or R SDK that enable you to:
1. Prepare the data
2. Build models
3. Train models
1. Manage models
1. Track experiments
1. Deploy models - this is where Sri sees the most problems w customers

# Questions
1. Cold path / hot path covered? 
2. Databricks coverage?
3. Comparison of costs of auto ML vs. hand-built?
   * Time costs
   * Specialization costs
   * Consumption costs
4. Biggest mistake you have seen customers at our point ("awareness" phase) make over the next six months? 12 months?
