import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from detect_secrets.plugins.ip_address import IPAddressDetector


class TestIPAddressesDetector(unittest.TestCase):
    """
    Testing strategy

    Cover the cartesian product of these partitions:

    1. Partition on IP address format:
      a. Valid IPv4 address
      b. Invalid IPv4 address
      c. Valid IPv6 address
      d. Invalid IPv6 address

    2. Partition on IP address type:
      a. Public
      b. Private
    """

    def setUp(self):
        self.detector = IPAddressDetector()

    def test_valid_public_ipv4(self):
        ip = '8.8.8.8'
        results = self.detector.analyze_line(filename='mock_filename', line=ip)
        self.assertEqual(bool(results), True)

    def test_valid_private_ipv4(self):
        ip = '192.168.1.1'
        results = self.detector.analyze_line(filename='mock_filename', line=ip)
        self.assertEqual(bool(results), True)

    def test_invalid_ipv4_but_pass(self):
        ip = '300.12.34.56'
        results = self.detector.analyze_line(filename='mock_filename', line=ip)
        self.assertEqual(bool(results), True)

    def test_valid_public_ipv6(self):
        ip = '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
        results = self.detector.analyze_line(filename='mock_filename', line=ip)
        self.assertEqual(bool(results), True)

    def test_valid_ipv6(self):
        ip = '2001:db8::1'
        results = self.detector.analyze_line(filename='mock_filename', line=ip)
        self.assertEqual(bool(results), True)

    def test_invalid_ipv6(self):
        ip = '2001:0db8:85a3:0000:0000:8a2e:0370:733g'
        results = self.detector.analyze_line(filename='mock_filename', line=ip)
        self.assertEqual(bool(results), False)

    def test_valid_ip_within_text(self):
        line = 'This is a valid IP: 192.168.1.100 within some text.'
        results = self.detector.analyze_line(filename='mock_filename', line=line)
        self.assertEqual(bool(results), True)

    def test_invalid_ip_within_text_but_pass(self):
        line = 'This is an invalid IP: 400.200.100.50 within some text.'
        results = self.detector.analyze_line(filename='mock_filename', line=line)
        self.assertEqual(bool(results), True)

if __name__ == '__main__':
    unittest.main()
