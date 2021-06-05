# watermapper

CS510 Front End Web Development Project - Maps daily water data from the USGS

https://pdxwater.org

# Setup

Clone the repository:

`git clone https://github.com/bentotten/watermapper`

Change to the project directory:

`cd watermapper`

Install Packages:

`npm install`

Launch project:

`npm start`

# Troubleshooting

This project was created with create-react-app and the webpack configuration for this does not support the latest versions of every library in this project. If you find yourself with a "Use addtional loader" error, delete the node_modules directory and delete package-lock.json, redownload the package.json file, ensure node is either version 14 or version 16, and then rerun `npm install`. 

# The Stack

Languages:
HTML, JSX/Javascript, CSS

Libraries:
React, Chart.js, Leaflet, React-Bootstrap

API:
USGS Daily Values (DV) Web Service REST API
