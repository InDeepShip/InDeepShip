#!/usr/bin/env bash

########################################
# Script used to install Ubuntu 20.04 LTS Dependencies
########################################

# Script must be ran as root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be ran as root"
    exit 1
fi


sudo apt update
sudo apt install python3-pip python3-dev nginx curl

curl -sL https://deb.nodesource.com/setup_12.x | bash -
sudo apt-get install -y nodejs

pushd /var

rm -rf InDeepShip
git clone git@github.com:InDeepShip/InDeepShip.git
echo 'REACT_APP_SERVER_ADDRESS="http://206.189.218.111"' > /var/InDeepShip/bow/.env
pushd InDeepShip

########################################
# 1. Need to build Client Code (React Frontend)
########################################
pushd bow
npm install
npm run build
popd

########################################
# 2. Need to build Server Code (Django Backend)
########################################
python3 -m venv --system-site-packages ./venv
source ./venv/bin/activate
pip install -r requirements.txt

pushd aft
python manage.py collectstatic --no-input
popd

cp ./etc/gunicorn.socket /etc/systemd/system/gunicorn.socket
cp ./etc/gunicorn.service /etc/systemd/system/gunicorn.service
systemctl enable gunicorn.socket
systemctl enable gunicorn.service
systemctl daemon-reload
systemctl restart gunicorn

cp ./etc/aft /etc/nginx/sites-available/aft

if [[ -L "/etc/nginx/sites-enabled/aft" ]];
    then
        echo "Symbolic Link Already Exists"
    else
        ln -s /etc/nginx/sites-available/aft /etc/nginx/sites-enabled
fi

nginx -t # check if status is ok
systemctl restart nginx
