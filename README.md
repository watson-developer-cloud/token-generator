# Watson Token Generator

Basic Node.js server with a form that accepts a service's credentials and URL and returns an [auth token](http://www.ibm.com/watson/developercloud/doc/getting_started/gs-tokens.shtml).

May be run from Bluemix, a Raspberry Pi, etc. Automatically redirects to HTTPS when running on Bluemix.


## Running on Bluemix

Click the button to deploy to Bluemix:

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/token-generator)


## Running locally

Requires [Node.js](https://nodejs.org/en/).
Then clone or [download](https://github.com/watson-developer-cloud/token-generator/archive/master.zip) the code, and run:

```sh
npm install
npm start
```

## Security

Due to the security implications, it is recommended that you run your own copy of this code rather than using someone else's,
and that you always use HTTPS.
