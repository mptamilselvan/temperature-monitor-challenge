# Real-Time Temperature Monitoring System - SETUP 🚀


## 🎯 Back End

Set up Back end temperaturen monitoring api system.

Create database **"tmc"** in mongodb
username is **"tamil"** password is **"password"**
So the connection string will be **"mongodb://tamil:password@localhost:27017/tmc"**

``` 
    cd backend/temperature-api
    cp .env.production .env
    npm install
    npm run start:dev
```
-   It will run in http://localhost:3001
-   You can see swagger in http://localhost:3001/docs

## 🎯 Front End

Set up Front end temperaturen monitoring web app.

```
    cd fronend/temperature-web
    cp .env.production .env.local
    npm install
    npm run dev
```
-   It will run in http://localhost:3000


## 🏗️ System Architecture

![System Architecture]

The system comprises four main components:

-   **Frontend**: ReactJs (Nextjs) 
-   **Backend**: Node.js (Nestjs) service for data generation and processing
-   **Database**: MongoDB for data persistence
-   **Processing**: n8n workflow (preferred) or Node.js processing service

### Processing Method

Used socket connection to transfer data from node

-   Front end web app connect backend app using Socket.io.  
-   Once connected , backend will call external api for weather to get current temperature details.
-   Once get the response, it will emit to the front end react app.
-   Reat app will customize and validate the response from backend and show in the page



