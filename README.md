# InDeepShip
Digital Register of Shipping (DRS) for the Island of Navis Album

# Software Requirements
## Aft (Server/Backend Software)
```
python >= 3.8.0
pip >= 19.2.3
```


## Installation (Mac)
You can utilize Homebrew to help you install the required versions of **python** and **pip**

### Homebrew Install
Run the following command to install Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
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

# Run Software
It is good practice to set up a virtual enviornment on your system for your `python` environment. What does that mean?
That basically means to create an environment that will keep track of your prefered version of **python** and **pip**.
And also an enviornment that will keep track of your python packages you will install (e.g. Django)


## Setup Virtual Environment
1. `cd InDeepShip/`
2. `python3 -m venv --system-site-packages ./venv` this will create a directory `InDeepShip/venv` which
contains the python, pip and packages for your virtual environment
3. Now activate your virtual environment with command `source ./venv/bin/activate`
4. Install python packages required for backend software with command `pip install -r requirements.txt`

#### Note: Exit Virtual Environment
1. You can exit your python virtual environment with command `deactivate` (Don't do this if you are trying to run software).

## Start Software
Following commands should be executed where **Setup Virtual Enviornemnt** left off.
1. `InDeepShip/aft` run command `python manage.py runserver`
2. Visit `http://127.0.0.1:8000` in your browser.