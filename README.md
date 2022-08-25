# Mesto (frontend + backend)

Responsive development interactive application including frontend and backend parts.

<img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/main.png" width="200" height="250"/> 

## Functionality:
* registration
<div align="left">
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/signup.png" width="200" height="250"/>
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/signup_wrong.png" width="200" height="250"/>
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/signup_sucs.png" width="200" height="250"/>
</div>

* authorization
<div align="left">
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/login.png" width="200" height="250"/> 
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/login_wrong.png" width="200" height="250"/> 
</div>

* edit profile data
<img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/edit.png" width="200" height="250"/> 

* change the avatar
<img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/avatar.png" width="200" height="250"/> 

* add, delete, zoom images
<div align="left">
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/place.png" width="200" height="250"/> 
    <img src="https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/zoom.png" width="200" height="250"/> 
</div>

* put likes
* likes counter
* modals pop-up 

## Technology stack:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![BEM](https://img.shields.io/badge/BEM-ffcd00.svg?style=for-the-badge&logo=bem&logoColor=white)

File structure organization Nested (frontend/scr/blocks) in accordance with BEM methodology.

<details>
<summary>👇 Installed npm.</summary>
    <hr>

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

to include the [Joi](https://joi.dev/api/) validation as a middleware, [celebrate](https://github.com/arb/celebrate) library is used:
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

</details>

## Directory `backend/`:
- `app.js` - includes the main logic of the server, starting and connecting to the database
- `/routes` - folder with router files
- `/controllers` - folder with user and card controllers files
- `/models` - folder with description files for user and card schemes

The auxiliary directories:
- `middlewares` - a folder with files that contains the authorization logic, request and error logger, cors protection

- `.eslintrc` - custom rule file

## Getting Started:
install npm dependencies:
```bash
npm install
```
Frontend. \
build a project for priduction into the dist folder:
```bash
npm run build
```

run the development server:
```bash
npm run start
```

Backend. \
run express-server on port 3005:
```bash
npm run start
```

run server with hot-reload:
```bash
npm run dev
```

<!-- [http://localhost:3000](http://localhost:3000) will be open on your browser to see the result. -->

<!-- ![Main page](https://github.com/lifein2020/mesto-front-back/raw/main/frontend/src/images/main.png) -->