* Continuous Testing
    * For Development APIs
        * For module testing (xUnit)
            * (Java) [JUnit](https://junit.org/junit5/) [&#x1F3C1; STARTER KIT](../starter-kits/#unit-teting-with-java)
            * (Python) [PyUnit](https://docs.python.org/3/library/unittest.html#module-unittest) [&#x1F3C1; STARTER KIT](../starter-kits/#unit-teting-with-python)
            * (C#) [NUnit](https://nunit.org/)
            * (C/C++) [cUnit](http://cunit.sourceforge.net/)/[CppUnit](https://freedesktop.org/wiki/Software/cppunit/)
        * For mocking, stubbing and simulating test services
            * Using Java
                * [Mockito](https://site.mockito.org/)
                * [EasyMock](https://easymock.org/)
                * [JMock](http://jmock.org/)
            * Using Python
                * [PyTest](https://docs.pytest.org/)
                * [Nose2](https://docs.nose2.io/en/latest/)
                * [Mock](https://mock.readthedocs.io/en/latest/)
            * Using C#
                * [Moq](https://github.com/moq/moq)
                * [NSubstitute](https://nsubstitute.github.io/)
                * [FakeItEasy](https://fakeiteasy.github.io/)
            * Using C/C++
                * [CMock](https://github.com/ThrowTheSwitch/CMock)
                * [cpp-stub](https://github.com/coolxv/cpp-stub)
                * [googletest](https://github.com/google/googletest)
    * For Code Analysis
        * For static analysis
            * Using Java
                * [Checkstyle](https://checkstyle.sourceforge.io/)
                * [Spotbugs](https://github.com/spotbugs/spotbugs)
                * [PMD](https://github.com/pmd/pmd)
            * Using Python
                * [PyLint](https://pylint.pycqa.org/en/latest/)
                * [Pyflakes](https://github.com/PyCQA/pyflakes)
                * [PMD](https://github.com/pmd/pmd)
            * Using C#
                * [StyleCop](https://github.com/StyleCop/StyleCop)
                * [Gendarme](https://www.mono-project.com/docs/tools+libraries/tools/gendarme/)
                * [PMD](https://github.com/pmd/pmd)
            * Using C/C++
                * [CppCheck](https://github.com/danmar/cppcheck)
                * [Clang Static Analyzer](https://clang-analyzer.llvm.org/) / [tidy](https://clang.llvm.org/extra/clang-tidy/)
                * [PMD](https://github.com/pmd/pmd)
        * For dynamic analysis
            * For test coverage
                * Using Java
                    * [Jacoco](https://www.jacoco.org/jacoco/)
                    * [Cobertura](https://github.com/cobertura/cobertura)
                * Using Python
                    * [Coverage](https://github.com/nedbat/coveragepy)
                    * [PyTest-cov](https://github.com/pytest-dev/pytest-cov)
                * Using C#
                    * [AltCover](https://github.com/SteveGilham/altcover)
                    * [NCover](http://ncover.sourceforge.net/)
                * Using C/C++
                    * [lcov](https://github.com/linux-test-project/lcov)
                    * [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage)
            * For complexity analysis and runtime performance
                * Using Java
                    * [JMeter](https://jmeter.apache.org/)
                    * [JProfiler](https://www.ej-technologies.com/products/jprofiler/overview.html)
                    * [JPF](https://github.com/javapathfinder/jpf-core)
                * Using Python
                    * [Scalene](https://github.com/plasma-umass/scalene)
                    * [trace](https://docs.python.org/3/library/trace.html)/[inspect](https://docs.python.org/3/library/inspect.html)/[pdb](https://docs.python.org/3/library/pdb.html)
                * Using C#
                    * [Performance Profiler](https://docs.microsoft.com/en-us/visualstudio/profiling/profiling-feature-tour?view=vs-2022#analyze-performance-legacy-tools)
                    * [Parasoft Dottest](https://www.parasoft.com/products/parasoft-dottest/)
                    * [ANTS Profiler](https://www.red-gate.com/products/dotnet-development/ants-performance-profiler/)
                * Using C/C++
                    * [Valgrind](https://valgrind.org/)
                    * [Gcov](https://gcc.gnu.org/onlinedocs/gcc/Gcov.html)
        * For security
            * [Scrub/Coverity/CodeQL](https://nasa.github.io/scrub/usage.html#supported-cots-tools-and-languages)
            * [SonarQube](https://www.sonarqube.org/)
    * For Web Applications
        * For Service Endpoints (APIs)
            * For RESTful endpoints
                * [JMeter](https://jmeter.apache.org/)
                * [Postman](https://www.postman.com/)
                * [REST Assured (REST, RPC)](https://rest-assured.io/)
                * [SOAPUI](https://www.soapui.org/)
            * Using RPC/remote processing
                * [Powershell](https://devblogs.microsoft.com/scripting/testing-rpc-ports-with-powershell-and-yes-its-as-much-fun-as-it-sounds/)
                * [PortQry Interactive](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/portqry-command-line-port-scanner-v2#step-2-specialized-tests)
        * For User Interfaces (UIs)
            * [Robot Framework](https://robotframework.org/)
            * [Selenium variants \[Cucumber, etc.\]](https://github.com/SeleniumHQ/selenium)
            * [Cypress](https://www.cypress.io/)
            * [Playwright](https://github.com/microsoft/playwright)
    * For Performance testing
        * [JMeter](https://jmeter.apache.org/)
        * [Robot Framework](https://robotframework.org/)
        * [Cucumber Open](https://cucumber.io/tools/cucumber-open/)
        * [Chaos Monkey](https://netflix.github.io/chaosmonkey/)
    * For Mobile
        * Using all platforms
            * [Appium](https://appium.io/)
        * Using Android
        * [Selenium/Selendroid](http://selendroid.io/)
        * [Espresso](https://developer.android.com/training/testing/espresso)
        * Using iOS
        * [Selenium/ios-driver](http://ios-driver.github.io/ios-driver/)
        * [XCTest](https://developer.apple.com/documentation/xctest)
    * For Reporting
        * For unified analyses (dynamic and static)
            * [SonarQube](https://www.sonarqube.org/)
            * [Scrub/Unified](https://nasa.github.io/scrub/usage.html#supported-cots-tools-and-languages)
        * For status reporting
            * [Testrail API reporting](https://www.gurock.com/testrail/)
            * [Jenkins](https://www.jenkins.io/) using [Code Coverage API Plugin](https://plugins.jenkins.io/code-coverage-api/)
            * [Travis CI](https://travis-ci.org/) using [Code Climate](https://docs.travis-ci.com/user/code-climate/) or [Codecov](https://about.codecov.io/tool/travis-ci/)
        * For real-time validation and stability
            * [Jenkins](https://www.jenkins.io/)
            * [GitHub Actions](https://github.com/features/actions)
            * [Docker Container](https://docs.docker.com/get-started/)
