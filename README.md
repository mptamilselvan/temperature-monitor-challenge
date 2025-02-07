# Real-Time Temperature Monitoring System - SETUP 🚀


## 🎯 Back End

Set up Back end temperaturen monitoring api system.

- Create database **"tmc"** in mongodb
- username is **"tamil"** password is **"password"**
- So the connection string will be **"mongodb://tamil:password@localhost:27017/tmc"**

``` 
    git clone https://github.com/mptamilselvan/temperature-monitor-challenge.git
    cd temperature-monitor-challenge/backend/temperature-api
    cp .env.production .env
    npm install
    npm run start:dev
```
-   It will run in http://localhost:3001
-   You can see swagger in http://localhost:3001/docs

## 🎯 Front End

Set up Front end temperaturen monitoring web app.

```
    cd temperature-monitor-challenge/fronend/temperature-web
    cp .env.production .env.local
    npm install
    npm run dev
```
-   It will run in http://localhost:3000


## 🏗️ System Architecture


The system comprises three main components:

-   **Frontend**: ReactJs (Nextjs) 
-   **Backend**: Node.js (Nestjs) service for data generation and processing (socket)
-   **Database**: MongoDB for data persistence


### Processing Method

Used socket connection to transfer data from node

-   Front end web app connect to backend api using Socket.io in 3000 port.  
-   Once connected, then backend api will make call to external api (weather) to get current temperature details.
-   Once get the response from the api, It will emit to the front end react app.
-   Reat app will retrive the response using socket.io and validate the content and list in the page



