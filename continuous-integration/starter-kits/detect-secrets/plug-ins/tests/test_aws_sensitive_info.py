import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from detect_secrets.plugins.aws_sensitive_info import AWSSensitiveInfoDetector


class TestAWSSensitiveInfoDetector(unittest.TestCase):
    """
    Testing strategy

    1. Partition on AWS resource type:
      1. AWS account id
      2. AWS ARN
      3. AWS security group id
      4. AWS VPC id
      5. AWS subnet id
      6. AWS bucket name (not implemented)
      7. AWS hostname
      
    2. Partition on presence or absence of keyword (if applicable):
      a. With keyword
      b. Without keyword (Wrong keyword)

    3. Parition by changing order of keyword (if applicable)

    4. Parition by changing length of id number (if applicable)
    """

    def setUp(self):
        self.detector = AWSSensitiveInfoDetector()


    # test account id

    def test_aws_account_id_digit_length_12(self):
        results = self.detector.analyze_line(filename='mock_filename', line='123456789012')
        self.assertEqual(bool(results), True)

    def test_aws_account_id_digit_length_11(self):
        results = self.detector.analyze_line(filename='mock_filename', line='12345678901')
        self.assertEqual(bool(results), False)

    def test_aws_account_id_with_keyword(self):
        results = self.detector.analyze_line(filename='mock_filename', line='aws_account_id: 123456789012')
        self.assertEqual(bool(results), True)

    def test_aws_account_id_with_noise(self):
        content = """
            2. Partition on presence or absence of keyword (if applicable):
            a. With keyword
            b. Without keyword (Wrong keyword)

            3. Parition by changing order of keyword (if applicable)

            4. Parition by changing length of id number (if applicable)

            def setUp(self):
                self.detector = AWSSensitiveInfoDetector()

            # test account id

            def test_aws_account_id_digit_length_12(self):
                results = self.detector.analyze_line(filename='mock_filename', line='123456789012')
                self.assertEqual(bool(results), True)
        """
        results = self.detector.analyze_line(filename='mock_filename', line=content)
        self.assertEqual(bool(results), True)


    # test ARN

    def test_aws_arn_valid_end_by_account_id(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws:iam:us:123456789012')
        self.assertEqual(bool(results), True)

    def test_aws_arn_valid_not_end_by_account_id(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws:iam:cn:123456789012:role')
        self.assertEqual(bool(results), True)

    def test_aws_arn_valid_iam_user(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws:iam::123456789012:user/johndoe')
        self.assertEqual(bool(results), True)

    def test_aws_arn_valid_sns_topic(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws:sns:us-east-1:123456789012:example-sns-topic-name')
        self.assertEqual(bool(results), True)

    def test_aws_arn_valid_vpc(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws:ec2:us-east-1:123456789012:vpc/vpc-0e9801d129EXAMPLE')
        self.assertEqual(bool(results), True)

    def test_aws_arn_invalid_account_id_length(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws:iam::12345678901')
        self.assertEqual(bool(results), False)

    def test_aws_arn_invalid_account_id_wrong_format(self):
        results = self.detector.analyze_line(filename='mock_filename', line='arn:aws')
        self.assertEqual(bool(results), False)

    def test_aws_arn_invalid_single_aws(self):
        results = self.detector.analyze_line(filename='mock_filename', line='aws')
        self.assertEqual(bool(results), False)


    # test security group id

    def test_aws_sg_id_valid_length_8_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sg-12345678')
        self.assertEqual(bool(results), True)

    def test_aws_sg_id_valid_length_8_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sg-1234abcd')
        self.assertEqual(bool(results), True)

    def test_aws_sg_id_valid_length_17_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sg-12345678901234567')
        self.assertEqual(bool(results), True)

    def test_aws_sg_id_valid_length_17_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sg-1234abcd5678efghi czxcx')
        self.assertEqual(bool(results), True)

    def test_aws_sg_id_valid_length_9_chars(self):
        """Special case: valid when length of string >= 8
        """
        results = self.detector.analyze_line(filename='mock_filename', line='sg-12345678a')
        self.assertEqual(bool(results), True)

    def test_aws_sg_id_invalid_length_7_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sg-1234567')
        self.assertEqual(bool(results), False)

    def test_aws_sg_id_invalid_length_7_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sg-1234abc')
        self.assertEqual(bool(results), False)

    def test_aws_sg_id_invalid_wrong_keyword(self):
        results = self.detector.analyze_line(filename='mock_filename', line='sc-12345678')
        self.assertEqual(bool(results), False)

    ## additional tests
    def test_aws_sg_id_valid_other1(self):
        results = self.detector.analyze_line(filename='mock_filename', line='opera-dev-cluster-sg-collinss for keypair collinss')
        self.assertEqual(bool(results), True)

    def test_aws_sg_id_valid_other2(self):
        results = self.detector.analyze_line(filename='mock_filename', line='cluster_security_group_id=sg-037e6de521a3f4854')
        self.assertEqual(bool(results), True)


    # test VPC id

    def test_aws_vpc_id_valid_length_17_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-02676637ea26098a7')
        self.assertEqual(bool(results), True)

    def test_aws_vpc_id_valid_length_17_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-12345678901234567')
        self.assertEqual(bool(results), True)

    def test_aws_vpc_id_valid_length_8_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-1234abcd')
        self.assertEqual(bool(results), True)

    def test_aws_vpc_id_valid_length_8_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-12345678')
        self.assertEqual(bool(results), True)

    def test_aws_vpc_id_valid_length_9_chars(self):
        """Special case: valid when length of string >= 8
        """
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-12345678a')
        self.assertEqual(bool(results), True)

    def test_aws_vpc_id_invalid_length_7_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-1234567')
        self.assertEqual(bool(results), False)

    def test_aws_vpc_id_invalid_length_7_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vpc-1234abc')
        self.assertEqual(bool(results), False)

    def test_aws_vpc_id_invalid_wrong_keyword(self):
        results = self.detector.analyze_line(filename='mock_filename', line='vsc-12345678')
        self.assertEqual(bool(results), False)


    # test subnet id

    def test_aws_subnet_id_valid_length_8_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-12345678')
        self.assertEqual(bool(results), True)

    def test_aws_subnet_id_valid_length_8_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-1234abcd')
        self.assertEqual(bool(results), True)

    def test_aws_subnet_id_valid_length_17_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-12345678901234567')
        self.assertEqual(bool(results), True)

    def test_aws_subnet_id_valid_length_17_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-1234abcd5678efghij')
        self.assertEqual(bool(results), True)

    def test_aws_subnet_id_valid_length_9_chars(self):
        """Special case: valid when length of string >= 8
        """
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-12345678a')
        self.assertEqual(bool(results), True)

    def test_aws_subnet_id_invalid_length_7_digits(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-1234567')
        self.assertEqual(bool(results), False)

    def test_aws_subnet_id_invalid_length_7_chars(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subnet-1234abc')
        self.assertEqual(bool(results), False)

    def test_aws_subnet_id_invalid_wrong_keyword(self):
        results = self.detector.analyze_line(filename='mock_filename', line='subsc-12345678')
        self.assertEqual(bool(results), False)


    # test AWS hostname

    def test_aws_hostname_ip_name_valid1(self):
        results = self.detector.analyze_line(filename='mock_filename', line='ip-10-24-34-0.ec2.internal')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_ip_name_valid2(self):
        results = self.detector.analyze_line(filename='mock_filename', line='ip-10-24-34-0.us-west-2.compute.internal')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_ip_name_valid3_only_ip(self):
        results = self.detector.analyze_line(filename='mock_filename', line='ip-10-24-34-0')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_resource_name_valid1(self):
        results = self.detector.analyze_line(filename='mock_filename', line='i-0123456789abcdef.ec2.internal')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_resource_name_valid2(self):
        results = self.detector.analyze_line(filename='mock_filename', line='i-0123456789abcdef.us-west-2.compute.internal')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_resource_name_valid3_only_resource_id(self):
        results = self.detector.analyze_line(filename='mock_filename', line='i-0123456789abcdef')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_ip_name_invalid_wrong_keyword(self):
        results = self.detector.analyze_line(filename='mock_filename', line='io-10-24-34-0.ec2.internal')
        self.assertEqual(bool(results), False)

    def test_aws_hostname_ip_name_invalid_wrong_ip_format(self):
        results = self.detector.analyze_line(filename='mock_filename', line='ip.10.24.34.0.ec2.internal')
        self.assertEqual(bool(results), False)

    def test_aws_hostname_ip_name_valid_wrong_ip_format(self):
        """256 is not a valid IP address, but it passes the regex since length 3 is allowed
        """
        results = self.detector.analyze_line(filename='mock_filename', line='ip-256-24-34-0.ec2.internal')
        self.assertEqual(bool(results), True)

    def test_aws_hostname_ip_name_invalid_wrong_ip_format_length4(self):
        results = self.detector.analyze_line(filename='mock_filename', line='ip-1024-24-34-0.ec2.internal')
        self.assertEqual(bool(results), False)

    def test_aws_hostname_resource_name_invalid_wrong_keyword(self):
        results = self.detector.analyze_line(filename='mock_filename', line='r-0123456789abcdef.ec2.internal')
        self.assertEqual(bool(results), False)

    def test_aws_hostname_resource_name_invalid_wrong_length(self):
        """Instead of 16 digits, there are 10 digits
        """
        results = self.detector.analyze_line(filename='mock_filename', line='i-0123456789a.ec2.internal')
        self.assertEqual(bool(results), False)
    

if __name__ == '__main__':
    unittest.main()
