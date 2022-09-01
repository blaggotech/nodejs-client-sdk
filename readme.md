# Blaggo Blackbox NodeJS Client SDK

[![Node.js CI](https://github.com/blaggotech/nodejs-client-sdk/actions/workflows/node.js.yml/badge.svg)](https://github.com/blaggotech/nodejs-client-sdk/actions/workflows/node.js.yml)

## API Documentation

- Staging Environment

   https://blackboxstage.blaggo.io/blackbox/docs

- Production Environment

   https://blackbox.blaggo.io/blackbox/docs

## Getting Started

### Installation

   ```bash
   npm i blaggo-blackbox
   ```

### Authentication

   ```javascript
   const blaggo = require("blaggo-blackbox")

   // env can either be `test`, `stage`, or `prod`.
   const options = {env: "test"};

   // When `options` is not provided the `env` is considered `prod`
   const res = await blaggo.Authenticate("username", "password", options)

   console.log(res.data)
   ```

### Inbox Messages

   1. Getting Inbox Messages

   ```javascript
   const blaggo = require("blaggo-blackbox")

   // env can either be `test`, `stage`, or `prod`.
   const options = {
    env: "test",
    credentials: {username: "username", password:"password"}
   };

   const blackbox = new blaggo.Blackbox(options)

   // Other values for `status` can be found in the API docs.
   const unreads = await blackbox.getInboxMessages({status: "0"})

   console.log(unreads)
   ```
