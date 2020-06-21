resource "aws_instance" "GoCloudAPI"{
    ami = "ami-0e34e7b9ca0ace12d"
    instance_type = "t2.micro"
    user_data = file("apache.sh")
    key_name = "gocloud"
}

resource "aws_dynamodb_table" "subscriptions" {
  name             = "subscriptions"
  hash_key         = "subscriptionId"
  range_key         = "SK"
  billing_mode     = "PAY_PER_REQUEST"

  attribute {
    name = "subscriptionId"
    type = "S"
  }

   attribute {
    name = "SK"
    type = "S"
  }

}