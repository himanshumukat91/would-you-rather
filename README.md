# WOULD YOU RATHER
This is a project done for Udacity React Nano Degree mentor/reviewer certification 


## Installing the app
Go to the root folder of the app and run:
### `npm install`

## Running the app
Go to the root folder of the app and run:
### `npm start`

Runs the app in the development mode.<br>
A new browser window should automatically open displaying the app.  
If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

## App folder structure

    ├── node_modules            # All project dependencies modules are installed here
    ├── public                  # built app files to be hosted (index.html etc)
    ├── package.json            # all project dependencies, scripts to build/run the app
    ├── src                     # Folder to store all source files (js,ts,tsx)
    │   ├── actions             # Redux actions of the app
    │   ├── assets              # to store icons, images etc used in app
    │   ├── redux               # Reducer and store of the app
    │   ├── utils               # Dataserver file (for now just data json with dummy APIs)
    │   └── components          # React UI components of the app
    └── README.md               # this file, instructions for building/using the app

- This app is developed using mobile view first approach. So the same web app should work 
smoothly on mobile. Through testing is pending though.
- Using Material-UI for this app is an overkill but was done to ease UI development.

Note: This project was created using [Create React App](https://www.npmjs.com/package/create-react-app).

## Things to do
- Include SASS and convert all component level css files to scss
- Test for different display dimensions
