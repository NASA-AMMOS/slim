* Continuous Testing
    * For Development APIs
        * For Unit Testing, Integration, Dependency and Stub Mocking
            * xUnit for build-time testing
            * Simulate dependencies
            * Stub out coupled services for planned results
            * Mock specific application behavior
            * Tools
                * Java
                    * JUnit
                    * Mockito
                    * EasyMock
                    * JMock
                * Python
                    * PyUnit
                    * PyTest
                    * Nose2
                    * Mock
                * C#
                    * NUnit
                    * Moq
                    * NSubstitute
                    * FakeItEasy
                * C/C++
                    * cUnit/CppUnit
                    * CMock
                    * cpp-stub
                    * googletest
    * For Code Analysis
        * For Static Analysis
            * Code formatting
            * Application structure and layout
            * Compliance with development standards
            * Tools
                * Java
                    * PMD
                    * Checkstyle
                    * Spotbugs
                * Python
                    * PyLint
                    * Pyflakes
                    * Mypy
                    * Prospector
                    * PMD
                * C#
                    * StyleCop
                    * Gendarme
                    * Nitriq
                    * PMD
                * C/C++
                    * CppCheck
                    * Clang Static Analyzer / tidy
                    * CppDepend
                    * Sourcetrail
                    * PMD
                    * FlawFinder
        * For Dynamic Analysis
            * Runtime performance
            * Testing coverage
            * Code complexity
            * Tools
                * Java
                    * JProfiler
                    * JMeter
                    * Jacoco
                    * Cobertura
                    * JPF
                * Python
                    * Typo
                    * Scalene
                    * sys.settrace()/inspect/pdb
                * C#
                  * VS Debugger
                  * Performance Profiler
                  * Parasoft Ensure
                  * ANTS Profiler
                * C/C++
                    * Gcov
                    * Valgrind
                    * LLVM/Clang
        * For Code Quality (unified, both dynamic and static analyses)
            * Unified analysis of static and dynamic code metrics
            * Tools
                * SonarQube
                * Coverity
        * For Security
            * Verify and report vulnerabilities
            * Check code security
            * Tools
                * Semmle
                * Veracode
    * For Web Applications
        * For Service Endpoints (APIs)
            * Messaging-based
                * RESTful Services
                * SOAP
                * Tools (JSON/XML)
                    * Using Apache JMeter
                    * Using Insomnia
                    * Using Paw
                    * Using Postman
                    * Using REST-Assured (REST, RPC)
                    * Using SOAPUI
            * Procedure-based
                * Initiate remote processing
                * RPC
                    * Using Shell/Powershell
                    * Using PortQry
        * For Web Interfaces (browsers)
            * Using Cypress
            * Using Playwright
            * Using Robot Framework
            * Using Selenium + Add-on
                * Cucumber* (Java + others) / Behave (Python) / Specflow (C#)
                * Watir (Ruby)
                * Home Grown
    * For Load testing
        * Failure profiles
        * Resource requirements
        * Maximize performance
        * Tools
            * Apache JMeter
            * Chaos Monkey
            * Robot Framework
            * Cucumber Open
    * For Mobile
        * UI and viewability
        * Accessibility
        * Feature parity with Web implementation or requirements
        * Tools
            * Selendroid
            * BrowserStack
            * MonkeyTalk
            * Espresso + XCUI
    * For Reporting
        * For Continuous Integration and Deployment
            * Test and verify commits
            * Customizations on commit or build
            * Build stability using containerization or standards
            * Tools
                * JenkinsCI
                * GitHub Actions
                * Custom Tooling
        * For Test Reporting
            * Monitor code compliance
            * Unit testing success or failure
            * Integration test results
            * Tools
                * TestRail
                * JenkinsCI
                * Serenity