# Automated Continuous Testing Script Generation

## Motivation

Writing unit tests for large software applications with numerous components can be time-consuming. The process of generating test scripts automatically from the source code is explored.

### Pynguin Exploration

We initially experimented with Pynguin, a popular automatic test code generation tool. However, it is in its early stage, and we found it not ready for practical use.

### Large Language Model (LLM) Approach

Recent studies have shown promise in using LLM-based tools for test code generation. According to a study (https://arxiv.org/pdf/2305.00418.pdf), these models can automatically cover a significant percentage of test methods (~85%). In the example below, an LLM-generated test code for a Calculator class is showcased.

## Example: Calculator

### Calculator Code

```python
# calculator.py
class Calculator:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b
```

### LLM Generated Test Code

```python
import unittest

class TestCalculator(unittest.TestCase):
    def test_divide_correctly_handles_types(self):
        calculator = Calculator()
        self.assertRaises(TypeError, calculator.divide, 1, "not a number")
        self.assertRaises(TypeError, calculator.divide, 1.0, "not a 
number")
        self.assertEqual(calculator.divide(2, 3), 2)

    def test_multiply_correctly_handles_types(self):
        calculator = Calculator()
        self.assertRaises(TypeError, calculator.multiply, 1, "not a 
number")
        self.assertRaises(TypeError, calculator.multiply, 1.0, "not a 
number")
        self.assertEqual(calculator.multiply(2, 3), 6)

    def test_sum_correctly_handles_types(self):
        calculator = Calculator()
        self.assertRaises(TypeError, calculator.sum, 1, "not a number")
        self.assertRaises(TypeError, calculator.sum, 1.0, "not a number")
        self.assertEqual(calculator.sum(2, 3), 5)

    def test_subtract_correctly_handles_types(self):
        calculator = Calculator()
        self.assertRaises(TypeError, calculator.subtract, 1, "not a 
number")
        self.assertRaises(TypeError, calculator.subtract, 1.0, "not a 
number")
        self.assertEqual(calculator.subtract(2, 3), -1)

    def test_divide_raises_zero_division_error(self):
        calculator = Calculator()
        with self.assertRaises(ZeroDivisionError):
            calculator.divide(0, 1)

    def test_multiply_raises_zero_division_error(self):
        calculator = Calculator()
        with self.assertRaises(ZeroDivisionError):
            calculator.multiply(0, 1)
```

## How to Auto-generate Unit Tests Using LLM

1. **Download and Install:**
   - [OLLAMA](https://github.com/ollama/ollama)

2. **Invoke LLM and Generate Test Code:**
   ```bash
   ollama run llama2 "$(cat ~/app_pack_generator/docker.py)" write a unit test code
   ```

3. **Fix Errors and Add Missing Edge Cases:**
   - Review the generated code, fix errors, and include any missing edge cases.

4. **Update Prompt and Obtain Revised Test Code:**
   - If needed, iterate on the prompt and obtain the revised test code. Go back to step 2 if necessary.

## Recommended Prompts for Auto-generated Unit Tests

- **Basic Functionality Testing:**
  "Generate unit tests for a function/method that performs basic arithmetic operations (addition, subtraction, multiplication, division)."

- **Handling Edge Cases:**
  "Create tests for a function that handles edge cases, such as zero division, boundary values, and unexpected input types."

- **String Manipulation:**
  "Generate unit tests for a function that involves string manipulation, including tests for string concatenation, slicing, and length calculations."

- **List/Array Operations:**
  "Create tests for functions that operate on lists/arrays, covering scenarios like element addition, removal, and list comprehensions."

- **Exception Handling:**
  "Generate unit tests to ensure proper exception handling in functions that may encounter errors. Include tests for both expected and unexpected exceptions."
