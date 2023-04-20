# Customized Plugins for Detect Secret
This page contains additional customized plugins for the open-source tool [detect secret](https://github.com/Yelp/detect-secrets), to provide additional secret types for the tool to detect. These plugins meet the needs from the [SLIM](https://github.com/NASA-AMMOS/slim) community based on the issue ticket: [Automated checking for general sensitive information within Git](https://github.com/NASA-AMMOS/slim/issues/89).
Please see categories and links below for more details.

## Plugins
* [AWS Sensitive Information detection](#plugin-1---aws-sensitive-information-detection)
* [IP Address detection](#plugin-2---ip-address-detection)
* [Email Address detection](#plugin-3---email-address-detection)
* [Absolute Path detection](#plugin-4---absolute-path-detection)

## Plugin 1 - AWS Sensitive Information detection

This plugin is designed to detect AWS sensitive information mentioned in this [discussion](https://github.com/NASA-AMMOS/slim/issues/89#issuecomment-1433567397). Below is the list of secret types that this plugin can detect:

### Types of Secret
1. [AWS account id](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html#:~:text=each%20AWS%20account%3A-,AWS%20account%20ID,Amazon%20Resource%20Names%20(ARNs).)
   - A 12-digit number, such as 123456789012
2. [AWS ARN](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html)
3. [AWS security group id](https://docs.aws.amazon.com/managedservices/latest/userguide/find-SGs.html)
   - `sg-` followed by 8 or 17 hexadecimal characters
   - For example, `sg-02ce123456e7893c7`
4. [AWS VPC id](https://docs.aws.amazon.com/vpc/latest/userguide/create-vpc.html)
   - `vpc-` followed by [8](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html#:~:text=VPC%2C%20such%20as-,vpc%2D11ad4878,-.) or 17 hexadecimal characters
   - For example, `vpc-1a2b3c4d5e6f1a2b3`
5. [AWS subnet id](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html)
   - `subnet-` followed by 8 or 17 hexadecimal characters
6. [AWS bucket name](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html)
7. [AWS hostname](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html)


Check implementation [here]() to learn more about the regex used in this plugin.

## Plugin 2 - IP Address detection
This plugin is designed to detect IP address mentioned in this [discussion](https://github.com/NASA-AMMOS/slim/issues/89#issuecomment-1433567397)

## Plugin 3 - Email Address detection
This plugin is designed to detect email address.

## Plugin 4 - Absolute Path detection
This plugin is designed to detect absolute path.
