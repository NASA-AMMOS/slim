import re
from detect_secrets.plugins.base import RegexBasedDetector

class AbsolutePathDetector(RegexBasedDetector):
    """Scans for absolute file paths."""
    secret_type = 'Absolute File Path'

    skip_list = [
        'usr/bin/python',
        # Add more paths to skip as needed
    ]

    skip_pattern = '|'.join(f'({re.escape(path)})' for path in skip_list)

    denylist = [
        re.compile(rf'^(?:[A-Z]:|\/)(?!{skip_pattern})[\S\s]+')
    ]
