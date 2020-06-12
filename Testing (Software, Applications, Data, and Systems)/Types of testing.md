So many... Maybe 100 different types of tests for internet facing applications and systems. I always liked this layout though it’s focused on machine learning (can’t remember where this is from though):

![?](https://i.imgur.com/4K7whrp_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# Generic terms that can be applied to almost any of the below
- Validation tests
- Domain tests (check for valid input formats and values)
- Verification tests

# Visibility 
Glass box - test has full access to source code, access to running app, and has been coded/modified to know running app logic

Black box - test has no access to source code, no awareness of anything about the app

White box - test has access to source code but not running app. Doesn’t know logic or attempt to evaluate runtime 

Gray box - varies but test has some access to both source code and running version of app

# Testing within the test
The types of “things to look for” or “techniques that multiple tests use over and over”

**Error handling tests** test how the system/page/“thing” handles “known bad” situations 

**Boundary value tests**

**Fuzz tests** (a.k.a. fuzzing) are a general term for specifically providing bad inputs to a program to find bugs, crashes, and faults that could be exploited

**Destructive tests**

**Mutation tests** modify parameters to try to break things 

# Manual tests (generally, some can be automated)
**Exploratory tests**

**End to end tests**

**IAST (interactive application security testing) tests**

**Smoke tests**

**Scream tests**

**User acceptance tests** 

**Cross browser compatibility tests**

# Testing levels
**Unit tests** 

**Compliance tests**

**Component tests**

**Configuration tests**

**Integration tests** a.k.a. system tests - multiple approaches:
- white box
- black box
- sandwich
- Bottom up - testing modules are developed first, then application modules are developed
- Top Down
- Big Bang, similar in scope to end to end system tests. Ties the entire system together to ensure all components work together 

**Functional tests** 
- black box

**Benchmark tests** a.k.a. load or performance or concurrency tests - to get before, during, and after values 

# Automated tests you run and only review if they report issues
**Regression tests**

# Automated tests you run and review results
The best test suites and testing tools also include:
- Correlation analysis
- Crash analysis
- Provide developers/administrators with exact repro steps 
- Provide admins w exact fix steps, links for additional info
- Severity rating 
- Links to applicable CVEs

**Vulnerability scans (which are vulnerability tests)**

**Load tests a.k.a. Performance tests**

**SAST (static application security tests)**
- white box testing
- Requires access to the source code
- Occurs before build and compile
- Flags “known bad” vulnerabilities, techniques 
- Works by running a pre-configured set of rules and capabilities 
- Tests “the source code”, not the application 
- Pros:
   - Provides exact source code method, page, lone numbers for easier remediation 
   - Integrates security In beginning of SDLC (a.k.a. shift left)
   - Helps developers learn secure coding by flagging items in active development 
   - Ensure the organization learns of insecure code before deployment to PROD
- Cons:
   - Many false positives, both upfront and when new apps/techniques are introduced by developers 
   - The best are very costly
   - The pre-configured rules and capabilities may not model your user’s behavior, which can lead to many false positives 
   - Generally not helpful for dynamic code or dynamic types

**DAST (dynamic) tests**
- Black box testing
- Does not require access to source code
- Tests “the application’s response”, not the source code

**Open source software vulnerability scanners** - a type of test that lists known vulnerabilities in the OSS libraries that an application depends on

# Runtime tests
**RASP (runtime application self protection)** measures can ensure that, when an app encounters an anomaly, the app halts or creates counter measures to ensure no additional harm

**Anti-malware detection** applications create a safety wrapper around executing applications to detect “known bad” events and act on those

**File integrity and change monitoring tests a.k.a. FIM)** tests for changes to critical application or system files and can optionally respond

# Misc tests
**Accessibility tests** ensure that applications are available to blind, limited vision, or hearing impaired persons

**Backward compatibility tests**

**Globalization / translation / internationalization localization tests**
