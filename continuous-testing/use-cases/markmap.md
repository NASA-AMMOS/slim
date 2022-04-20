* Continuous Testing
    * For Development APIs
        * For module testing (xUnit)
            * Using (Java) [JUnit](https://junit.org/junit5/) [&#x1F3C1; STARTER KIT(TBD)](../starter-kits/#unit-teting-with-java)
            * Using (Python) [PyUnit](https://docs.python.org/3/library/unittest.html#module-unittest) [&#x1F3C1; STARTER KIT(TBD)](../starter-kits/#unit-testing-with-python)
            * Using (C#) [NUnit](https://nunit.org/)
            * Using (C/C++) [cUnit](http://cunit.sourceforge.net/)/[CppUnit](https://freedesktop.org/wiki/Software/cppunit/)
        * For mocking, stubbing and simulating test services
            * Using Java
                * Using [Mockito](https://site.mockito.org/)
                * Using [EasyMock](https://easymock.org/)
                * Using [JMock](http://jmock.org/)
            * Using Python
                * Using [PyTest](https://docs.pytest.org/)
                * Using [Nose2](https://docs.nose2.io/en/latest/)
                * Using [Mock](https://mock.readthedocs.io/en/latest/)
            * Using C#
                * Using [Moq](https://github.com/moq/moq)
                * Using [NSubstitute](https://nsubstitute.github.io/)
                * Using [FakeItEasy](https://fakeiteasy.github.io/)
            * Using C/C++
                * Using [CMock](https://github.com/ThrowTheSwitch/CMock)
                * Using [cpp-stub](https://github.com/coolxv/cpp-stub)
                * Using [googletest](https://github.com/google/googletest)
    * For Code Analysis
        * For static analysis
            * Using Java
                * Using [Checkstyle](https://checkstyle.sourceforge.io/)
                * Using [Spotbugs](https://github.com/spotbugs/spotbugs)
                * Using [PMD](https://github.com/pmd/pmd)
            * Using Python
                * Using [PyLint](https://pylint.pycqa.org/en/latest/)
                * Using [Pyflakes](https://github.com/PyCQA/pyflakes)
                * Using [PMD](https://github.com/pmd/pmd)
            * Using C#
                * Using [StyleCop](https://github.com/StyleCop/StyleCop)
                * Using [Gendarme](https://www.mono-project.com/docs/tools+libraries/tools/gendarme/)
                * Using [PMD](https://github.com/pmd/pmd)
            * Using C/C++
                * Using [CppCheck](https://github.com/danmar/cppcheck)
                * Using [Clang Static Analyzer](https://clang-analyzer.llvm.org/) / [tidy](https://clang.llvm.org/extra/clang-tidy/)
                * Using [PMD](https://github.com/pmd/pmd)
        * For dynamic analysis
            * For test coverage
                * Using Java
                    * Using [Jacoco](https://www.jacoco.org/jacoco/)
                    * Using [Cobertura](https://github.com/cobertura/cobertura)
                * Using Python
                    * Using [Coverage](https://github.com/nedbat/coveragepy)
                    * Using [PyTest-cov](https://github.com/pytest-dev/pytest-cov)
                * Using C#
                    * Using [AltCover](https://github.com/SteveGilham/altcover)
                    * Using [NCover](http://ncover.sourceforge.net/)
                * Using C/C++
                    * Using [lcov](https://github.com/linux-test-project/lcov)
                    * Using [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage)
            * For complexity analysis and runtime performance
                * Using Java
                    * Using [JMeter](https://jmeter.apache.org/)
                    * Using [JProfiler](https://www.ej-technologies.com/products/jprofiler/overview.html)
                    * Using [JPF](https://github.com/javapathfinder/jpf-core)
                * Using Python
                    * Using [Scalene](https://github.com/plasma-umass/scalene)
                    * Using [trace](https://docs.python.org/3/library/trace.html)/[inspect](https://docs.python.org/3/library/inspect.html)/[pdb](https://docs.python.org/3/library/pdb.html)
                * Using C#
                    * Using [Performance Profiler](https://docs.microsoft.com/en-us/visualstudio/profiling/profiling-feature-tour?view=vs-2022#analyze-performance-legacy-tools)
                    * Using [Parasoft Dottest](https://www.parasoft.com/products/parasoft-dottest/)
                    * Using [ANTS Profiler](https://www.red-gate.com/products/dotnet-development/ants-performance-profiler/)
                * Using C/C++
                    * Using [Valgrind](https://valgrind.org/)
                    * Using [Gcov](https://gcc.gnu.org/onlinedocs/gcc/Gcov.html)
        * For security
            * Using [Scrub/Coverity/CodeQL](https://nasa.github.io/scrub/usage.html#supported-cots-tools-and-languages)
            * Using [SonarQube](https://www.sonarqube.org/)
    * For Web Applications
        * For Service Endpoints (APIs)
            * For RESTful endpoints
                * Using [JMeter](https://jmeter.apache.org/)
                * Using [Postman](https://www.postman.com/)
                * Using [REST Assured (REST, RPC)](https://rest-assured.io/)
                * Using [SOAPUI](https://www.soapui.org/)
            * Using RPC/remote processing
                * Using [Powershell](https://devblogs.microsoft.com/scripting/testing-rpc-ports-with-powershell-and-yes-its-as-much-fun-as-it-sounds/)
                * Using [PortQry Interactive](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/portqry-command-line-port-scanner-v2#step-2-specialized-tests)
        * For User Interfaces (UIs)
            * Using [Robot Framework](https://robotframework.org/)
            * Using [Selenium variants \[Cucumber, etc.\]](https://github.com/SeleniumHQ/selenium)
            * Using [Cypress](https://www.cypress.io/)
            * Using [Playwright](https://github.com/microsoft/playwright)
    * For Performance testing
        * Using [JMeter](https://jmeter.apache.org/)
        * Using [Robot Framework](https://robotframework.org/)
        * Using [Cucumber Open](https://cucumber.io/tools/cucumber-open/)
        * Using [Chaos Monkey](https://netflix.github.io/chaosmonkey/)
    * For Mobile
        * Using all platforms
            * Using [Appium](https://appium.io/)
        * Using Android
            * Using [Selenium/Selendroid](http://selendroid.io/)
            * Using [Espresso](https://developer.android.com/training/testing/espresso)
        * Using iOS
            * Using [Selenium/ios-driver](http://ios-driver.github.io/ios-driver/)
            * Using [XCTest](https://developer.apple.com/documentation/xctest)
    * For Reporting
        * For unified analyses (dynamic and static)
            * Using [SonarQube](https://www.sonarqube.org/)
            * Using [Scrub/Unified](https://nasa.github.io/scrub/usage.html#supported-cots-tools-and-languages)
        * For status reporting
            * Using [Testrail API reporting](https://www.gurock.com/testrail/)
            * Using [Jenkins](https://www.jenkins.io/) with [Code Coverage API Plugin](https://plugins.jenkins.io/code-coverage-api/)
            * Using [Travis CI](https://travis-ci.org/) with [Code Climate](https://docs.travis-ci.com/user/code-climate/) or [Codecov](https://about.codecov.io/tool/travis-ci/)
        * For real-time validation and stability
            * Using [Jenkins](https://www.jenkins.io/)
            * Using [GitHub Actions](https://github.com/features/actions)
            * Using [Docker Container](https://docs.docker.com/get-started/)
