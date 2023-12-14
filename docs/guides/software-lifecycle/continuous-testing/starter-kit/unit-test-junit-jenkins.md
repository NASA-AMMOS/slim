# Unit test using Junit and Jenkins for Java
Creating a unit test suite using JUnit and Jenkins involves setting up an environment where you can automate the execution of JUnit tests through Jenkins. Here's a starter kit to get you going:

### Prerequisites:
1. **Java Development Kit (JDK):** Ensure you have JDK installed on the machine where Jenkins is running.

2. **Jenkins:** Set up Jenkins on a server or machine. You can download Jenkins from [here](https://www.jenkins.io/download/).

3. **JUnit:** Include JUnit in your Java project. You can add it to your project's dependencies using a build tool like Maven or Gradle.

### Steps:

#### Step 1: Set up Your Java Project
1. Create a Java project or use an existing one where you have written JUnit tests. 

Here's an example of a simple Java class and its corresponding JUnit test class. We'll create a basic `Calculator` class with some arithmetic methods and write JUnit tests to verify its functionality.

**Calculator.java:**

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero is not allowed.");
        }
        return a / b;
    }
}
```

**CalculatorTest.java (JUnit Test):**

```java
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorTest {
    private Calculator calculator;

    @Before
    public void setUp() {
        calculator = new Calculator();
    }

    @Test
    public void testAdd() {
        assertEquals(4, calculator.add(2, 2));
        assertEquals(-2, calculator.add(-5, 3));
    }

    @Test
    public void testSubtract() {
        assertEquals(3, calculator.subtract(5, 2));
        assertEquals(-4, calculator.subtract(1, 5));
    }

    @Test
    public void testMultiply() {
        assertEquals(10, calculator.multiply(2, 5));
        assertEquals(-15, calculator.multiply(3, -5));
    }

    @Test
    public void testDivide() {
        assertEquals(4, calculator.divide(8, 2));
        assertEquals(-3, calculator.divide(9, -3));
    }

    @Test(expected = ArithmeticException.class)
    public void testDivideByZero() {
        calculator.divide(5, 0);
    }
}
```

2. Ensure that your JUnit tests are correctly written using the JUnit framework. You can use annotations like `@Test` to mark your test methods.

3. Make sure your project can be built using a build tool, and the JUnit library is included in your project's dependencies.

#### Step 2: Configure Jenkins
1. Start Jenkins and open it in a web browser.

2. Install necessary plugins. Go to "Manage Jenkins" -> "Manage Plugins" and install the following:
   - "JUnit Plugin" for test result reporting.
   - "Pipeline" (if not already installed) to create Jenkins pipelines.

3. Create a new Jenkins pipeline job:
   - Click "New Item" -> Enter a name for your project -> Select "Pipeline" and click "OK."

4. In the pipeline configuration, define your pipeline script. You can create a Jenkinsfile in your project's repository and specify the script there. Here's an example Jenkinsfile:

```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout your source code from your version control system
                    checkout scm
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build your project using your build tool (e.g., Maven)
                    sh 'mvn clean compile test'
                }
            }
        }
        stage('Publish JUnit Test Result') {
            steps {
                script {
                    // Publish the JUnit test results to Jenkins
                    junit '**/target/test-reports/*.xml'
                }
            }
        }
    }
}
```

#### Step 3: Run the Jenkins Pipeline
1. Click on your pipeline job and then click "Build Now." Jenkins will execute the pipeline.

2. The pipeline will check out your source code, build the project, and run JUnit tests. Test results will be recorded.

3. You can view test results and build status in Jenkins.

This starter kit helps you set up automated unit testing using JUnit and Jenkins. It checks out your source code, builds your project, and executes JUnit tests, providing test results in the Jenkins interface. Make sure to customize the script and pipeline configuration to fit your project's specific needs.
