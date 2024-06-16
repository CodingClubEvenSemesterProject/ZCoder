to run the site in localhost, first set up the .env file in the backend directory:
CORS_ORIGIN=
PORT=
DB=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
ACCESS_TOKEN_EXPIRY=
EMAIL_PASSWORD=(for nodemailer)
EMAIL=(for nodemailer)

after this install all the necessary npm packages(refer to package.json)

then npm start in backend, this starts the backend in some the PORT.
Then npm start frontend. This starts the frontend in some other url. Copy that url and paste it in CORS_ORIGIN
If you make any requests to CodeEditor then make sure that your local has the language installed
Pyhton-pip
c++-MingiW64
Java-JDK
