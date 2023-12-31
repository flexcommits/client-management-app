# Client Management app

A website with student management and invoice generator functions.

#### Features:

- Create student
  ![Create new student](./public/createStudent.gif)
- Create invoices for students
  ![Create Invoice](./public/createInvoice.gif)
  ![Remove items](./public/remove.gif)
- Auto calculate the total invoices and the students
- Login/Logout Functionality
- Export/Print invoice in PDF
  ![PDF](./public/pdf.gif)

#### Instructions:

- Clone with HTTPS

```
git clone: https://github.com/VanVDC/client-management-app.git
```

- `npm install`
- Create a firebase account [Firebase](https://firebase.google.com/)
- Create an `.env` file and add your firebase config

```
REACT_APP_GOOGLE_AUTH_DOMAIN=""
REACT_APP_GOOGLE_DATABASE_URL=""
REACT_APP_GOOGLE_PROJECT_ID=""
REACT_APP_GOOGLE_STORAGE_BUCKET=""
REACT_APP_GOOGLE_MESSAGING_SENDER_ID=""
REACT_APP_GOOGLE_APP_ID=""
REACT_APP_GOOGLE_MEASUREMENT_ID=""
```

- `npm start`
- Visit `localhost:3000`

#### Demo:

- [Demo](https://contacts-keeper-16284.firebaseapp.com/)
- Login

```
user: tom@gmail.com
pass: 123456
```

#### Built With:

- [Create-react-app](https://github.com/facebook/create-react-app)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [React](https://github.com/facebook/react/)
- [Redux](https://github.com/reactjs/redux)
- [Firebase](https://firebase.google.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
