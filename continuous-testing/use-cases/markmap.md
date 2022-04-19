* Continuous Testing
    * For Development APIs
        * For unit testing, integration, dependency and stub mocking
            * For module testing
                * Using xUnit
                    * (Java) JUnit [:checkered_flag: STARTER KIT](../starter-kits/#unit-teting-with-java)
                    * (Python) PyUnit [:checkered_flag: STARTER KIT](../starter-kits/#unit-teting-with-python)
                    * (C#) NUnit
                    * (C/C++) cUnit/CppUnit
            * For mocking, stubbing and simulating test services
                * Using Java
                    * Mockito
                    * EasyMock
                    * JMock
                * Using Python
                    * PyTest
                    * Nose2
                    * Mock
                * Using C#
                    * Moq
                    * NSubstitute
                    * FakeItEasy
                * Using C/C++
                    * CMock
                    * cpp-stub
                    * googletest
    * For Code Analysis
        * For static analysis
            * For formatting, standards and structure
                * Using Java
                    * Checkstyle
                    * Spotbugs
                    * PMD
                * Using Python
                    * PyLint
                    * Pyflakes
                    * PMD
                * Using C#
                    * StyleCop
                    * Gendarme
                    * PMD
                * Using C/C++
                    * CppCheck
                    * Clang Static Analyzer / tidy
                    * PMD
        * For dynamic analysis
            * For test coverage
                * Using Java
                    * Jacoco
                    * Cobertura
                * Using Python
                    * Coverage
                    * PyTest-cov
                * Using C#
                    * OpenCover
                    * NCover
                * Using C/C++
                    * Gcov
                    * lcov
            * For complexity analysis and runtime performance
                * Using Java
                    * JProfiler
                    * JMeter
                    * JPF
                * Using Python
                    * Scalene
                    * sys.settrace()/inspect/pdb
                * Using C#
                    * Performance Profiler
                    * Parasoft Ensure
                    * ANTS Profiler
                * Using C/C++
                    * Valgrind
                    * LLVM/Clang
        * For security
            * For vulnerability reporting and code checks
                * Using most languages
                    * Scrub
                    * Veracode
    * For Web Applications
        * For service endpoints (APIs)
            * For RESTful endpoints
                * Using API platforms
                    * Apache JMeter
                    * Insomnia
                    * Paw
                    * Postman
                    * REST-Assured (REST, RPC)
                    * SOAPUI
            * For procedural-based endpoints
                * Using RPC/remote processing
                    * Shell/Powershell
                    * PortQry
        * For web interfaces
            * For user interaction
                * Using browser simulation
                    * Cypress
                    * Playwright
                    * Robot Framework
                    * Selenium + Cucumber* (Java + others) / Behave (Python) / Specflow (C#)
                    * Selenium + Watir (Ruby)
                    * Selenium + Home Grown
    * For Load testing
        * For failure profiles and resource analysis
            * For server deployments
                * Using request automation
                    * Apache JMeter
                    * Chaos Monkey
                    * Robot Framework
                    * Cucumber Open
    * For Mobile
        * For feature validation
            * For UI views and accessibility
                * Using mobile device simulation
                    * Selendroid
                    * BrowserStack
                    * MonkeyTalk
                    * Espresso + XCUI
    * For Reporting
        * For Continuous Reporting
            * For unified analyses (dynamic and static)
                * Using a Web application
                    * SonarQube
                    * Coverity
            * For status reporting
                * Using build platforms 
                    * Testrail API reporting
                    * Jenkins Code Coverage API Plugin
                    * Travis CI using Code Climate or Codecov
            * For real-time validation and stability
                * Using CI/CD Platforms
                    * JenkinsCI
                    * GitHub Actions
                    * Custom Tooling