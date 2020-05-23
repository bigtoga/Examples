# Linear regression using scipy.stat's linregress

~~~

import matplotlib.pyplot as plt
from scipy import stats

x = [0.2, 337.4, 118.2, 884.6, 10.1, 226.5, 666.3, 996.3, 448.6, 777.0,
     558.2, 0.4, 0.6, 775.5, 666.9, 338.0, 447.5, 11.6, 556.0, 228.1,
     995.8, 887.6, 120.2, 0.3, 0.3, 556.8, 339.1, 887.2, 999.0, 779.0,
     11.1, 118.3, 229.2, 669.1, 448.9, 0.5]

y = [0.1, 338.8, 118.1, 888.0, 9.2, 228.1, 668.5, 998.5, 449.1, 778.9,
     559.2, 0.3, 0.1, 778.1, 668.8, 339.3, 448.9, 10.8, 557.7, 228.3,
     998.0, 888.8, 119.6, 0.3, 0.6, 557.6, 339.3, 888.0, 998.5, 778.9,
     10.2, 117.6, 228.9, 668.4, 449.2, 0.2]

round_to = 12

# Expected values
exp_slope = round(1.00211681802045, round_to)
exp_intercept = round(-0.262323073774029, round_to)
exp_rsquared = round(0.999993745883712, round_to)

print('----------------------------')
print('Expected results:')
print(f'   - Slope: {exp_slope}')
print(f'   - Intercept: {exp_intercept}')
print(f'   - R-squared: {exp_rsquared}')

print('----------------------------')

actual = stats.linregress(x, y)
# Returns: 
# LinregressResult(slope=1.0021168180204543, intercept=-0.26232307377398456, rvalue=0.9999968729369666, pvalue=4.654040852584279e-90, stderr=0.00042979684820064804)

actual_slope = round(actual.slope, round_to)
actual_intercept = round(actual.intercept, round_to)
actual_rsquared = round(actual.rvalue**2, round_to)
print('----------------------------')
print('Actual results:')
print(f'   - Slope: {actual_slope}')
print(f'   - Intercept: {actual_intercept}') # interceptexp_intercept
print(f'   - R-squared: {actual_rsquared}')


print('----------------------------')

# Unit tests:
assert (exp_slope == actual_slope), 'Slope is different!'
assert (exp_intercept == actual_intercept), 'Intercept is different!'
assert (exp_rsquared == actual_rsquared), 'r-squared is different!'

~~~
