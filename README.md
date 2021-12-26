# SuperSourceBrain
SuperSourceBrain javascript user actor

This is a sample for developing Isadora javascript user actors.

##Generating a Isasdora javascript user actor

### Creating a basic project
'''
npm init UserActorName

'''

### Installing the testing framework
'''
npm install --save-dev jasmine

npx jasmint init
'''

### Updating package.json testing framework
change the scripts section to the folowing
'''
...
"scripts": {
    "test": "jasmine"
  },
...
'''

### Creating project structure

'''
mkdir isadora # This folder contains the final Isadora user actor and a sample patch 
mkdir js      # This folder contains the javascript code for the user actor
'''

### Creating the javascript file for the user actor

'''
touch js/SuperSourceBrain.js
'''

### Creating the testing suite file

'''
touch spec/SuperSourceBrainSpec.js
'''

