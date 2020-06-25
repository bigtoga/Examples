General guidance:
- Don’t use IQR on seasonal data - you will need to do more sophisticated timeseries breakdowns first (such as FE-trending or breaking the data into specific trends)
- Don’t use IQR if “the definition of normal” changes within the data. This occurs generally as malicious adversaries find out how you are identifying them then “flip the script” on you
- **Extreme outliers** occur below Q1-(3*IQR) and above Q3+3*IQR)
- **Mild outliers** occur below Q1-(1.5*IQR) or above Q3+(1.5*IQR)

IQR is used to build boxplots 
- In a boxplot, the highest and lowest occurring value within this limit are indicated by whiskers of the box (frequently with an additional bar at the end of the whisker) and any outliers as individual points

```python   
q75, q25 = np.percentile(x, [75 ,25])
iqr = q75 - q25

``` 


![?](https://i.imgur.com/rhCnTpC_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

https://en.wikipedia.org/wiki/Interquartile_range

https://link.medium.com/Fd5zh8GuB7