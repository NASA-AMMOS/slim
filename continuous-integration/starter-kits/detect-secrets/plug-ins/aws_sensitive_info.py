"""This plugin searches for AWS sensitive information, including
1. AWS account id
2. AWS ARN
3. AWS security group id
4. AWS VPC id
5. AWS subnet id
6. AWS bucket name
7. AWS hostname
"""
import re
from detect_secrets.plugins.base import RegexBasedDetector


class AWSSensitiveInfoDetector(RegexBasedDetector):
    """Scans for AWS sensitive information"""
    secret_type = 'AWS Sensitive Information2'
    denylist = []


    def __init__(self):
        self._add_deny_aws_account_id()
        self._add_deny_aws_arn()
        self._add_deny_sg_id()
        self._add_deny_vpc_id()
        self._add_deny_subnet_id()
        self._add_deny_bucket_name()
        self._add_deny_aws_hostname()


    def _add_deny_aws_account_id(self):
        """Add AWS account id pattern to denylist.
        AWS  account ID is a 12-digit number.
        For example, 123456789012

        Pattern Strategy:
            1. Find the 12-digit number in the string.
            2. Check keyword `aws_account_id` in the string.

        Reference: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html#:~:text=each%20AWS%20account%3A-,AWS%20account%20ID,Amazon%20Resource%20Names%20(ARNs).
        """
        self.denylist.append(re.compile(r'\d{12}'))
        self.denylist.append(re.compile(r'aws_account_id'))

    def _add_deny_aws_arn(self):
        """Add AWS ARN pattern to denylist.
        For more details, check the reference.

        Pattern Strategy:
            1. Find the string that follows this pattern: `arn:partition:service:region:account-id`
             - partition: aws | aws-cn | aws-us-gov
             - service: skiped
             - region: skiped
             - account-id: 12 digits, for example, 123456789012.

             So, the pattern is like: after 1st `:`, it is the partition, and after the 4th `:`, it is the account-id.

        Reference: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
        """
        arn_pattern = r'arn:(aws|aws-cn|aws-us-gov):[^:]*:[^:]*:\d{12}(?::[^:\s]+)*'
        self.denylist.append(re.compile(arn_pattern))

    def _add_deny_sg_id(self):
        """Add AWS security group id pattern to denylist.
        AWS security group id is a string starts with `sg-` and followed by 8 or 17 characters.
        For example, sg-12345678

        Pattern Strategy:
            1. Only find the string that starts with `sg-` and followed by more than 8 characters.

        Reference: https://docs.aws.amazon.com/managedservices/latest/userguide/find-SGs.html
        """
        self.denylist.append(re.compile(r'sg-\w{8,}'))

    def _add_deny_vpc_id(self):
        """Add AWS VPC id pattern to denylist.
        AWS VPC id is a string starts with `vpc-` and followed by 8 or 17 characters.
        For example, vpc-12345678

        Pattern Strategy:
            1. Only find the string that starts with `vpc-` and followed by >= 8 characters.

        Reference: https://docs.aws.amazon.com/vpc/latest/userguide/create-vpc.html
        """
        self.denylist.append(re.compile(r'vpc-\w{8,}'))

    def _add_deny_subnet_id(self):
        """Add AWS subnet id pattern to denylist.
        AWS subnet id is a string starts with `subnet-` and followed by 8 or 17 characters.
        For example, subnet-12345678

        Pattern Strategy:
            1. Only find the string that starts with `subnet-` and followed by >= 8 characters.

        Reference: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
        """
        self.denylist.append(re.compile(r'subnet-\w{8,}'))

    def _add_deny_bucket_name(self):
        """Add AWS bucket name pattern to denylist.
        Note: this function is not implemented yet due to the complexity of the pattern.
        Check the reference for more details.

        Reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
        """
        pass

    def _add_deny_aws_hostname(self):
        """Add AWS hostname pattern to denylist.

        Example IP name:
            e.g. 1: ip-10-24-34-0.ec2.internal
            e.g. 2: ip-10-24-34-0.us-west-2.compute.internal

        Example Resource name:
            e.g. 1: i-0123456789abcdef.ec2.internal
            e.g. 2: i-0123456789abcdef.us-west-2.compute.internal

        Pattern Strategy:
            1. For IP name, check the content of this format: `ip-ip_digit-ip_digit-ip_digit-ip_digit`
            2. For Resource name, check the content of this format: `i-16character`

        The denylist is a list of regular expressions that will be used to match and deny certain patterns.

        Reference: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html
        """
        self.denylist.append(re.compile(r'ip-\d{1,3}-\d{1,3}-\d{1,3}-\d{1,3}'))
        self.denylist.append(re.compile(r'i-\w{16}'))
 