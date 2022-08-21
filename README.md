# Mesto (frontend + backend)

Responsive development interactive application including frontend and backend parts.  

## Functionality:
* registration
* authorization
* edit profile data
* change the avatar
* add, delete, zoom images
* put likes
* likes counter
* modals pop-up 

## Technology stack:
* React.js
* CSS
* BEM, file structure organization Nested (frontend/scr/blocks)
* Express.js
* MongoDB
* npm:

install express.js:
    `npm install express`

install [https://www.npmjs.com/package/mongoose](Mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment:
    `npm i mongoose`

so that the server is restarted when the project files are changed:
    `npm install nodemon -D`

to include the [https://joi.dev/api/](Joi) validation as a middleware,[https://github.com/arb/celebrate](celebrate) library is used:
    `npm i celebrate`

[https://www.npmjs.com/package/dotenv.](dotenv) for loading .env file in Node.js:
    `npm install dotenv`

instal a library of string validators and sanitizers [https://www.npmjs.com/package/validator](validator):
    `npm i validator`

an implementation of JSON Web Tokens:
    `npm install jsonwebtoken`

instal [https://www.npmjs.com/package/cors](CORS) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options:
    `npm install cors`

logs assembly using logging library [https://www.npmjs.com/package/winston](Winston):
    `npm install winston --save`
    `npm install winston express-winston`

instal [https://www.npmjs.com/package/eslint](ESLint) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code:
    `npm init @eslint/config`

to make the linter work according to the rules of the Airbnb style guide:
    ``` bash
    eslint-config-airbnb-base
    eslint-plugin-import
    ```

## Directory `backend/`
`app.js` - includes the main logic of the server, starting and connecting to the database
`/routes` - folder with router files
`/controllers` - folder with user and card controllers files
`/models` - folder with description files for user and card schemes

The auxiliary directories:
`middlewares` - a folder with files that contains the authorization logic, request and error logger, cors protection

`.eslintrc` - custom rule file

## Getting Started:

    ```bash
    npm install
    ```
* Frontend
Builds a project for priduction into the dist folder:
    ```bash
    npm run build
    ```

Run the development server:
    ```bash
    npm run start
    ```

* Backend
Run express-server on port 3005:
    `npm run start`

Run server with hot-reload:
    `npm run dev`

[http://localhost:3000](http://localhost:3000) will be open on your browser to see the result.
