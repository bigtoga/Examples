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
   
# Invert your way of thinking 
Typical app has four layers with the “order of dependency” flowing from Presentation down:
1. Presentation layer
1. Application layer
1. Business logic layer
1. Data access layer

In other words:
1. The Presentation layer is dependent on the Application Layer
1. The Application layer is dependent on the Business Logic 
1. The Business Logic is dependent on the Data Access layer

You could even say that this is a bottom up development model:
1. Data Access layer development is done first 
1. Only once Data Access is defined can Business Logic development begin
1. Application layer development must wait for Business Logic to be finished 
1. Presentation has to wait on Application development 

# Dependency Inversion is a Top Down approach to software development 
Same four layers but now:
1. Presentation layer design defines what it needs and wants from the Application layer in abstracted form
1. The Application layer developers review the Presentation “requirements” and use those to then define what they want from the Business Logic layer in abstracted form
1. The Business Logic developers review the Application “requirements”, then define high level abstractions of what they need from the Data Access layer
1. The Data Access developers review Business Logic requirements then begin actual development 

This graphic [from here](https://www.intertech.com/Blog/the-dependency-inversion-principle-with-c-examples/) shows example flow:

![?](https://i.imgur.com/KRrZWiP_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

**Dependency inversion requires more of a Design thinking approach to software development**