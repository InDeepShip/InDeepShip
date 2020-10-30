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

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm install v12.19.0

git clone git@github.com:InDeepShip/InDeepShip.git
pushd InDeepShip
git checkout production

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