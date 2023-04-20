import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from detect_secrets.plugins.absolute_filepath import AbsolutePathDetector


class TestAbsolutePathDetector(unittest.TestCase):
    """
    Testing strategy

    Cover the cartesian product of these partitions:

    1. Partition on system type:
      a. Unix-like
      b. Windows

    2. Partition on path type:
      a. Absolute
      b. Relative

    3. Partition on special characters in path:
      a. Presence of special characters (e.g., '.', '..', '#')
      b. Absence of special characters
    """

    def setUp(self):
        self.detector = AbsolutePathDetector()

    def test_unix_absolute_no_special(self):
        path = '/home/user/myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), True)

    def test_unix_relative_no_special(self):
        path = './myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    def test_unix_relative_with_special(self):
        path = 'my..file.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    def test_unix_absolute_with_dotdot(self):
        path = '/../etc/passwd'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), True)

    def test_unix_absolute_with_hash(self):
        path = '/home/user/dir/myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), True)

    def test_windows_absolute_no_special(self):
        path = 'C:\\Users\\user\\myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), True)

    def test_windows_relative_no_special(self):
        path = '.\\myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    def test_windows_relative_with_special(self):
        path = 'myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    def test_windows_absolute_with_special(self):
        path = 'C:\\Users\\user\\dir.#2\\myfile.txt'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), True)

    # More tests
    def test_common_used_absolute_path(self):
        """Common used absolute path shoud not be detected as secret
        """
        path = '/usr/bin/python'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    # **/.terraform/* should not be detected as secret because it is not a home directory essentially
    def test_path_in_pattern(self):
        path = 'regex = **/.terraform/*'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    def test_other_path(self):
        path = '157:#   https://python-poetry.org/docs/basic-usage/#commit-your-poetrylock-file-to-version-control'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)

    def test_other_path2(self):
        path = '187:/site'
        results = self.detector.analyze_line(filename='mock_filename', line=path)
        self.assertEqual(bool(results), False)


if __name__ == '__main__':
    unittest.main()
