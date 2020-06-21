#! /bin/bash
sudo su
yum update -y
yum install -y httpd.x86_64
systemctl start httpd.service
systemctl enable httpd.service
#echo "Hello world from $(hostname -f)" > /var/www/html/index.html
cd /var/www/html/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
yum install git -y
git init 
git remote add origin https://github.com/stephaniepinero/gocloud-ec2-api.git
git pull origin master
rm -rf /etc/yum.repos.d/nodesource-el*
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
yum install nodejs --enablerepo=nodesource -y
npm install
node index.js 
