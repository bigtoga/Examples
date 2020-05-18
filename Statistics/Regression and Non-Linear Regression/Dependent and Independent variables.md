Dependent variable (a.k.a. response variable, y-variable, or output variable) is "the thing you want to measure"
* Cancer cell growth
* Height

Independent variables (a.k.a. x-variables, predictor variables) are "the factors you think might have an influence on the dependent variable". Use then to *explain* the reaponse variable's change in value. 
* Amount of sugar intake
* Number of chemotherapy sessions taken
* Age

Example of a plant growth study: 
* What are you wanting to learn? "Which factors influence plant growth the most?"
* What is your dependent variable? "Plant growth during the study in inches"
* What factors do you want to use to see whether they have any impact? "We will measure daily the amount of fertilizer applied, the soil moisture, and the amount of sunlight"

```mermaid
graph LR;
   x[Independent variable]-->y[Dependent variable];
   a[Cause: fertilizer amount]-->b[Effect: plant growth];
   v[Manipulated]-->c[Measured];
   s[Applied to]-->t[Response recorded]
   
graph TD;
   a[Given 10mg of medicine]-->r[Patient response];
   b[Given a placebo]-->r
```