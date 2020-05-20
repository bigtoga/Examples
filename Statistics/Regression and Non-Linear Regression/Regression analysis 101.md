# Regression Analysis 
The goal of regression analysis is to provide you with understandable equations that predict a single outcome based on multiple 
predictor variables

## Example of a salary predictor equation
A good example from Barton Paulson's Data Science course - let's create an app that asks the user: 
   - <kbd>What is the base salary today for a `data scientist`?</kbd> - $50,000
   - <kbd>How many years of experience does this person have?</kbd> - 4
   - <kbd>On a scale of 1-5, what is their negotiating ability (1 is low)?</kbd> - 2
   - <kbd>Is this person a founder?</kbd> - No
   
We then want a regression algorithm to predict what the data scientists' salary will be based on the inputs. The regression analysis will apply *coefficients* (values to multiply the inputs by to get to a final, single result) and look like this:

Result = $50,000 (a.k.a. the intercept) 
   - + (4 (years_of_experience) * calculated_years_of_experience_coefficient)
   - + (2 (negotiate_ability) * calculated_negotiating_ability_coefficient)
   - + ($0 (is_founder) * calculated_founder_bonus_coefficient)
---------------------------------------------------------
The data scientist's predicted salary is $137,000. Why? The regression tool has added:   
   Result = $50,000 (a.k.a. the intercept) 
   - + (4 (years_of_experience) * $2,000 (coefficient))
   - + (2 (negotiate_ability) * $5,000 (coef.))
   - + ($0 (is_founder) * $30,000 (coef.))
