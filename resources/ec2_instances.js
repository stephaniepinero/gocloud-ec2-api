const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const instanceParams = {
   ImageId: 'ami-086b16d6badeb5716', 
   InstanceType: 't2.micro',
   KeyName: 'gocloud',
   MinCount: 1,
   MaxCount: 1,
   UserData: `
        sudo su
        yum update -y
        yum install -y httpd.x86_64
        systemctl start httpd   .service
        systemctl enable httpd.service
        echo "Hello world from $(hostname -f)" > /var/www/html/index.html
   `
};

const instancePromise = ec2.runInstances(instanceParams).promise();

instancePromise.then(
  function(data) {
    // console.log("Data on created: ", data);
    const instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    const securityGroup = data.Instances[0].SecurityGroups[0];

    console.log("SG", securityGroup);

    const params = {
        GroupId: securityGroup.GroupId, 
        IpPermissions: [
            {
                FromPort: 22, 
                IpProtocol: "tcp", 
                IpRanges: [
                    {
                    CidrIp: "0.0.0.0/0", 
                    Description: "SSH access for"
                }
                ], 
                ToPort: 22
            },
            {
                FromPort: 80, 
                IpProtocol: 'tcp', 
                IpRanges: [
                    {
                    CidrIp: "0.0.0.0/0", 
                    Description: "HTTP for all"
                }
                ],  
                ToPort: 80
            }
        ]
       };
       ec2.authorizeSecurityGroupIngress(params, function(err, data) {
         if (err){
            console.log(err, err.stack);
         } else {
            console.log("SG Data", data); 
         }            
       });
   
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });