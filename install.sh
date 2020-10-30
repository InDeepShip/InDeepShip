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


git clone git@github.com:InDeepShip/InDeepShip.git