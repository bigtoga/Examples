Basic fundamentals of dependency inversion are:
1. High level modules should not depend on lower level modules; both should depend on abstractions 
- Lower level modules change more frequently than higher-level modules
- By abstracting the power level modules to most basic, generic form, it shields the high-level modules from basic changes in the lower-level modules 

2. The abstractions of the higher and lower level modules should not depend on details; instead you invert this such that the *details depend on the abstractions*
- You are creating two dependencies with this pattern:
   1. The higher level module has a dependency on the abstraction
   2. The lower level module has a dependency on the abstraction
- Key takeaway: both are dependent on **the same abstraction**
   - There is only one abstraction 