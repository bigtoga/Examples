# The Breast Cancer dataset
UCI’s [breast cancer dataset](http://archive.ics.uci.edu/ml/datasets/Breast+Cancer) contains 9 features (attributes) describing 286 women that have suffered and survived breast cancer and whether or not breast cancer recurred within 5 years. Of the 286 women, 201 did not suffer a recurrence of breast cancer, leaving the remaining 85 that did. Using this dataset, create a machine learning model that predicts whether a woman with breast cancer will have a recurrence.

# Accuracy
The default for most classification algorithms. Answers “What percentage of predictions were correct?” i.e. `True Positives / total predictions` (TP + FP)

## Prediction: “All No Recurrence”

A model that only predicted no recurrence of breast cancer would achieve an accuracy of (201/286)*100 or 70.28%. We’ll call this our “All No Recurrence”. This is a high accuracy, but a terrible model. If it was used alone for decision support to inform doctors (impossible, but play along), it would send home 85 women with incorrectly thinking their breast cancer was not going to reoccur (high False Negatives).

## Prediction: “All Recurrence”

A model that only predicted the recurrence of breast cancer would achieve an accuracy of (85/286)*100 or 29.72%. We’ll call this our “All Recurrence”. This model has terrible accuracy and would send home 201 women thinking that had a recurrence of breast cancer but really didn’t (high False Positives).

# Question 1: what is more important: identifying True Positives or False Negatives?
To determine whether to focus on “high accuracy “, “high precision”, “high recall”, or “high f1”, we first need to answer this question as it relates to “cost”. The confusion matrix helps here:
- If a patient is predicted as “cancer will return” but the cancer does not return (False Positive)
- If a patient is predicted as “cancer will return” and the cancer does re-occur (True Positive)
- If a patient is predicted as “cancer will not return” but the cancer does return (False Negative)
- If a patient is predicted as “cancer will not return” and the cancer does not return (True Negative)

We always want all models to correctly predict 100% of cases, however this is impossible and we must make trade offs. In the above scenario, the “cost” of a False Negative is the worst possible outcome - 
> if we have a model that accurately predicts True Positives but also “misses” and creates a large number of False Negatives, this would lead to many woman not seeking future medical assistance and the likely outcomes for the False Negative cohort would be an early death due to both the recurrence of the cancer as well as these women not seeking medical assistance because they had been told they were not going to get cancer again in the future 


Recall is the most important metric of the cost of a False Negative is high
