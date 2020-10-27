# InDeepShip
[![Build Status](https://travis-ci.com/InDeepShip/InDeepShip.svg?token=PWR6dqwEGCxtCp45x6eX&branch=main)](https://travis-ci.com/InDeepShip/InDeepShip)

Digital Register of Shipping (DRS) for the Island of Navis Album

# Grab Repository
1. Open Terminal
2. `cd` into whatever folder you want to put this repo in ex: `~/Projects`
3. `git clone git@github.com:InDeepShip/InDeepShip.git`

# Software Requirements
## Bow (Client/Frontend Software)
```
    node == v12.19.0
    npm == v6.14.8
```

## Installation (Mac)
A Few tools that you can utilize in order to install the client code software
requirements is **homebrew** and **nvm**


### Homebrew Install
Run the following command to install Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### NVM Install
Nvm stands for Node Version Manager. Since the creation of Node there has been many version updates
(e.g, Node v6, Node v10, etc). The current Node version that is LTS is Node v12.19.0. So we will use
nvm to install the correct node js version. Install NVM with the following command
```
brew install nvm
```

### Node and NPM Install
```
nvm install v12
```
You should now have the correct version of **node** and **npm** installed. You can verify this on the command prompt
```
$ node --version
v12.19.0
```

## Installation (Windows)
You're on your own bud.

# Run Software
1. `cd InDeepShip/bow`
2. `npm install`
3. `npm start`

# Build Software
1. `cd InDeepShip/bow`
2. `npm install`
3. `npm run build` this builds a deployable software located at directory `./build`

## Aft (Server/Backend Software)