import re
from detect_secrets.plugins.base import RegexBasedDetector


class EmailAddressDetector(RegexBasedDetector):
    """Scans for email addresses."""
    secret_type = 'Email Address'

    denylist = [
        re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'),
    ]
