# InDeepShip
[![Build Status](https://travis-ci.com/InDeepShip/InDeepShip.svg?token=PWR6dqwEGCxtCp45x6eX&branch=main)](https://travis-ci.com/InDeepShip/InDeepShip)

Digital Register of Shipping (DRS) for the Island of Navis Album

<<<<<<< HEAD

=======
>>>>>>> feature/database-bootstrap
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


## Run Client Software
1. `cd InDeepShip/bow`
2. `npm install`
3. `npm start`

## Build Software
1. `cd InDeepShip/bow`
2. `npm install`
3. `npm run build` this builds a deployable software located at directory `./build`


## Aft (Server/Backend Software)
```
python >= 3.8.0
pip >= 19.2.3
```

### Python3 and Pip3 Install
```
brew install python
```
You should now have the correct (or newer) version of python3 and pip3.
```
$ python3 --version
Python 3.8.3

$ pip3 --version
pip 19.2.3 from /Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/site-packages/pip (python 3.8)
```

## Run Server Software
It is good practice to set up a virtual enviornment on your system for your `python` environment. What does that mean?
That basically means to create an environment that will keep track of your prefered version of **python** and **pip**.
And also an enviornment that will keep track of your python packages you will install (e.g. Django)

### Setup Virtual Environment
1. `cd InDeepShip/`
2. `python3 -m venv --system-site-packages ./venv` this will create a directory `InDeepShip/venv` which
contains the python, pip and packages for your virtual environment
3. Now activate your virtual environment with command `source ./venv/bin/activate`
4. Install python packages required for backend software with command `pip install -r requirements.txt`

#### Note: Exit Virtual Environment
1. You can exit your python virtual environment with command `deactivate` (Don't do this if you are trying to run software).

### Start Software
Following commands should be executed where **Setup Virtual Enviornemnt** left off.
1. `cd InDeepShip/aft` run command `python manage.py runserver`
2. Visit `http://127.0.0.1:8000` in your browser.

## Database Software
```
mongodb >= v4.4.1
```

### MongoDB Install
Run the following commands to install mongoDB via command line
```
brew update
brew tap mongo/brew
brew install mongodb-community
```


You should be able to check the version of mongodb installed now
```
$ mongod --version
b version v4.4.1
Build Info: {
    "version": "4.4.1",
    "gitVersion": "ad91a93a5a31e175f5cbf8c69561e788bbc55ce1",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

### Start MongoDB
If you have a Mac with OS version older than **Catalina** the following instructions would work to setup and start
you database. However if you have OS **Catalina** or greater.. see below.
```
$ sudo mkdir -p /data/db
$ sudo chown -R `id -un` /data/db
$ mongod
```

### Start MongoDB (Mac OS Catalina or newer)
If you have Mac OS **Catalina** or greater, you are no longer able to store files or data in
read-only system volume, nor can you write to the 'root' directory (/) from the command line.
So instead you need to create a directory data path in your personal home directory
```
$ cd ~/
$ mkdir MongoData
$ sudo chown -R `id -un` MongoData
```

Next, you need to pass the complete datapath to the **MongoData** directory you created to mongod. For example,
my data path was **/Users/michael/MongoData**
```
$ pwd
/Users/michael/MongoData

$ mongod --dbpath=/Users/michael/MongoData
```
This should result in your mongo database to be up and running.

#### References
* https://www.robinwieruch.de/mongodb-macos-setup
* https://medium.com/@bryantjiminson/fixing-data-db-not-found-error-in-macos-x-when-starting-mongodb-d7b82abb2479


# Run Software
So above we showed how to start the client code only. Or to start the server code. However for
development, you will want to watch modifications mades to your react client code so you can then
build the software and have Django backend render the built static assets and **index.html**.
Follow the instructions below to set this up.

1. Open up a terminal session
2. `cd InDeepShip/bow`
3. Run `npm run watch` this will watch your js and css files in case there are changes
in order to rebundle the client code.

4. Open another terminal session
5. Note: Make sure this terminal session has your **python virtaul enviornment** activated.
6. `cd InDeepShip/aft`
7. Run `python manage.py runserver` The Django Server should now render the react frontend code.
8. Visit `http://127.0.01:8000` to view application.
