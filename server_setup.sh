#! /bin/bash
const repo = 'https://github.com/bentotten/watermapper.git'  // Repo goes here
const dir = '/var/www/'                                   // Directory for repo goes here
const /var/www/.log.txt= `/var/www/./var/www/.log.txttxt`                              // Path for /var/www/.log.txtfile goes here
const name = 'test-app'                                   // Instance name - must be lowercase
const repo_name = 'watermapper'                              // This will be attached to the end of the dir variable to access your repo, be sure it has correct capitalizations
const time_zone = 'us-west1-b'                                 // time zone your instance will be configured with - very important to remember for ssh/scp purposes

# Start setting root and install updates and tools
mkdir /var/www/
echo "Startup Started" > /var/www/.log.txt
export HOME=/var/www
echo "export HOME=/root" >> /var/www/.log.txt
apt update
apt install -y git nginx build-essential npm
echo "installed dependencies" >> /var/www/.log.txt
apt -y upgrade
echo "Startup complete" >> /var/www/.log.txt
echo "Starting Deployment" >> /var/www/.log.txt
# Install nodejs
echo "Starting nodejs install" >> /var/www/.log.txt
mkdir /var/www/nodejs
curl https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /var/www/nodejs/bin/node /usr/bin/node
ln -s /var/www/nodejs/bin/npm /usr/bin/npm
echo "Installed nodejs" >> /var/www/.log.txt
# Create a nodeapp user
echo "Creating nodeapp user" >> /var/www/.log.txt
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /var/www/
USER = 'nodeapp'
sudo gpasswd -a "$USER" www-data
find /var/www -type f -exec chmod 2775 {} \;
find /var/www -type d -exec chmod 2775 {} \;
echo "Created nodeapp user" >> /var/www/.log.txt
# Make template for githooks
echo "Creating githook configuration" >> /var/www/.log.txt
cat <<EOF >/usr/share/git-core/templates/hooks/post-merge
#!/bin/bash
rm -rf /var/www/watermapper
/usr/local/bin/npm install --prefix /var/www/watermapper
/usr/local/bin/npm run build --prefix /var/www/watermapper
find /var/www/ -type f -exec chmod 2775 {} \;
find /var/www/ -type d -exec chmod 2775 {} \;
systemctl restart nginx
echo "githook config file created" >> /var/www/.log.txt
EOF
chmod 755 /var/www/watermapper.git/hooks/post-merge
echo "githook enabled" >> /var/www/.log.txt
# Fix NPM's version issues
echo "Updating npm" >> /var/www/.log.txt
npm cache clean -f
npm install -g n
n lts
npm update 
echo "Updated npm" >> /var/www/.log.txt
# Configure Cronjob
echo "Creating cronjob" >> /var/www/.log.txt
crontab -l > /tmp/jobs.txt 
echo "* * * * * git -C /var/www/watermapper pull > /dev/null/ 2>&1" >> /tmp/jobs.txt 
crontab /tmp/jobs.txt 
echo crontab -l >> /var/www/.log.txt
echo "Cron created" >> /var/www/.log.txt
# git repo and install dependencies
echo "Clone git repository" >> /var/www/.log.txt
git config --global credential.helper gcloud.sh
git -C /var/www/ clone https://github.com/bentotten/goldfish.git
# Set permissions for new githooks
find /var/www/watermapper.git/hooks -type f -exec chmod 2770 {} \;
echo "Git repository cloned" >> /var/www/.log.txt
#npm install (One of these works :V )
echo "Building application" >> /var/www/.log.txt
bash --/var/www/.log.txtn -c 'cd /var/www/watermapper ; npm i'
npm i --prefix /var/www/watermapper # trying with git hooks instead
npm audit fix --prefix /var/www/watermapper
npm run build --prefix /var/www/watermapper
echo "Application built" >> /var/www/.log.txt
# Build npm
/usr/local/bin/npm run build --prefix /var/www/watermapper
#if [ ! -f /var/www/watermapper/build]; npm run build --prefix /var/www/watermapper
#if [ ! -f /var/www/watermapper/build]; npm run build --prefix /var/www/watermapper >> var/test./var/www/.log.txt>&2
#if [ ! -f /var/www/watermapper/build]; then sudo -u nodeapp npm run build --no-dll --prefix /var/www/watermapper >> /var/www/test./var/www/.log.txt>&2
#if [ ! -f /var/www/watermapper/build]; then npm run build --no-dll --prefix /var/www/watermapper >> /var/www/test./var/www/.log.txt>&2
# Setup nginx
echo "Configuring nginx" >> /var/www/.log.txt
cat <<EOF >/etc/nginx/sites-available/watermapper
server {
    listen 80 default_server;
  root /var/www/watermapper
/build;
  server_name _;
  index index.html;
  location /files/ {
      autoindex on;
    root /var/www/watermapper
;
    }
}
EOF
sudo ln -s /etc/nginx/sites-available/watermapper /etc/nginx/sites-enabled/watermapper
echo "nginx configured" >> /var/www/.log.txt
# Make install script
echo "Configuring npm script" >> /var/www/.log.txt
cat <<EOF > /var/www/install.sh
#!/bin/bash
/usr/local/bin/npm install --prefix /var/www/watermapper
/usr/local/bin/npm run build --prefix /var/www/watermapper
EOF
# Set up nginx folder environment
rm -rf /var/www/html
ln -s /var/www/watermapper/build/ /var/www/html/
rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
echo "Npm script configured" >> /var/www/.log.txt
# Set systemd service for nginx on restart
echo "Starting system service configuration" >> /var/www/.log.txt
cat <<EOF > /etc/systemd/system/nginx.service
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=sys/var/www/.log.txttarget network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target
[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s restart
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true
[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl start nginx
systemctl enable nginx
echo "System service configuration started" >> /var/www/.log.txt
# Last attempt to change permissions for githook
chmod 755 /var/www/goldfish/.git/hooks/post-merge
echo "Done" >> /var/www/.log.txt
echo "Setup Complete" >> /var/www/.log.txt 
echo "Done" >> &1