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
```bash
npm install express
```

install [Mongoose](https://www.npmjs.com/package/mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment:
```bash
npm i mongoose
```

so that the server is restarted when the project files are changed:
```bash
npm install nodemon -D
```

to include the [Joi](https://joi.dev/api/) validation as a middleware,[celebrate](https://github.com/arb/celebrate) library is used:
```bash
npm i celebrate
```

[dotenv](https://www.npmjs.com/package/dotenv) for loading .env file in Node.js:
```bash
npm install dotenv
```

instal a library of string validators and sanitizers [validator](https://www.npmjs.com/package/validator):
```bash
npm i validator
```

an implementation of JSON Web Tokens:
```bash
npm install jsonwebtoken
```

instal [CORS](https://www.npmjs.com/package/cors) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options:
```bash
npm install cors
```

logs assembly using logging library [Winston](https://www.npmjs.com/package/winston):
``` bash
npm install winston --save
npm install winston express-winston
```

instal [ESLint](https://www.npmjs.com/package/eslint) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code:
``` bash
npm init @eslint/config
```

to make the linter work according to the rules of the Airbnb style guide:
``` bash
npm i eslint-config-airbnb-base
npm i eslint-plugin-import
```

## Directory `backend/`
- `app.js` - includes the main logic of the server, starting and connecting to the database
- `/routes` - folder with router files
- `/controllers` - folder with user and card controllers files
- `/models` - folder with description files for user and card schemes

The auxiliary directories:
- `middlewares` - a folder with files that contains the authorization logic, request and error logger, cors protection

- `.eslintrc` - custom rule file

## Getting Started:
```bash
npm install
```
* Frontend \
build a project for priduction into the dist folder:
```bash
npm run build
```

run the development server:
```bash
npm run start
```

* Backend \
run express-server on port 3005:
```bash
npm run start
```

run server with hot-reload:
```bash
npm run dev
```

<!-- [http://localhost:3000](http://localhost:3000) will be open on your browser to see the result. -->
