So many... I always liked this layout (can’t remember where this is from though):

![?](https://i.imgur.com/4K7whrp_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# Manual tests (generally, some can be automated)
**End to end tests**

**Fuzz tests** (a.k.a. fuzzing) are a general term for specifically providing bad inputs to a program to find bugs, crashes, and faults that could be exploited

**IAST (interactive application security testing) tests**

# Tests you write 
**Unit tests** 

**Integration tests**

# Automated tests you run and review results
The best test suites and testing tools also include:
- Correlation analysis
- Crash analysis
- Provide developers/administrators with exact repro steps 
- Provide admins w exact fix steps, links for additional info
- Severity rating 
- Links to applicable CVEs

**Vulnerability scans (which are vulnerability tests)**

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

