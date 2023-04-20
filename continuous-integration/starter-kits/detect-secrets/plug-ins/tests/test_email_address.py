import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from detect_secrets.plugins.email_address import EmailAddressDetector


class TestEmailAddressDetector(unittest.TestCase):
    """
    Testing strategy

    Cover the cartesian product of these partitions:

    1. Partition on email address format:
      a. Valid email address
      b. Invalid email address
    """

    def setUp(self):
        self.detector = EmailAddressDetector()

    def test_valid_email(self):
        email = 'john.doe@example.com'
        results = self.detector.analyze_line(filename='mock_filename', line=email)
        self.assertEqual(bool(results), True)

    def test_invalid_email(self):
        email = 'john.doe@123123123'
        results = self.detector.analyze_line(filename='mock_filename', line=email)
        self.assertEqual(bool(results), False)

    def test_valid_email_within_text(self):
        line = 'This is a valid email: john.doe@example.com within some text.'
        results = self.detector.analyze_line(filename='mock_filename', line=line)
        self.assertEqual(bool(results), True)

    def test_invalid_email_within_text(self):
        line = 'This is an invalid email: john.doe@123123123 within some text.'
        results = self.detector.analyze_line(filename='mock_filename', line=line)
        self.assertEqual(bool(results), False)

if __name__ == '__main__':
    unittest.main()
