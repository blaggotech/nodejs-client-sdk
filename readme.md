# Blaggo Blackbox NodeJS Client SDK

[![Node.js CI](https://github.com/blaggotech/nodejs-client-sdk/actions/workflows/node.js.yml/badge.svg)](https://github.com/blaggotech/nodejs-client-sdk/actions/workflows/node.js.yml)

## Getting Started

### Authentication

   ```javascript
   var blackbox = require("blaggo-blackbox")

   // env can either be `test`, `stage`, or `prod`.
   const options = {env: "test"};

   // When `options` is not provided the `env` is considered `prod`
   var res = await blackbox.Authenticate("username", "password", options)

   console.log(res.data)
   ```
