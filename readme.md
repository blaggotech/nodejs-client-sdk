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
   const blaggo = require("blaggo-blackbox");

   // env can either be `test`, `stage`, or `prod`.
   const options = {env: "test"};

   // When `options` is not provided the `env` is considered `prod`
   const res = await blaggo.Authenticate("username", "password", options);

   console.log(res.data);
   ```

### Blackbox Initialization

   ```javascript
   const blaggo = require("blaggo-blackbox");

   // env can either be `test`, `stage`, or `prod`.
   const options = {
    env: "test",
    credentials: {username: "username", password:"password"}
   };

   const blackbox = new blaggo.Blackbox(options);
   ```

### Inbox Messages

   - Getting Inbox Messages

   ```javascript

   // Other values for `status` can be found in the API docs.
   const unreads = await blackbox.getInboxMessages({status: "0"});
   console.log(unreads);
   ```

   - Updating an Inbox Message

   ```javascript
   // Other values for `status` can be found in the API docs.
   const res = await blackbox.updateInboxMessage({
    id: "abb55913-b773-449d-9cb2-9777ded7d062",
    status: "3",
   });

   console.log(res);
   ```

   - Sending Inbox Message

   ```javascript
   // Although `sender_id` is required, the logged in user will automatically
   // as the sender of the message.
   const res = await blackbox.createPayload({
    sender_id: "blaggo user id",
    receiver_id: "blaggo user id",
    subject: "Test",
    body: "Test message",
   });

   console.log(res);
   ```

### Subscription

   - Getting Pending Subscriptions

   ```javascript
   // Other values for `status` can be found in the API docs.
   const res = await blackbox.querySubscribers({
    status: "pending",
   });

   console.log(res);
   ```

   - Updating Subscription

   ```javascript
   const res = await blackbox.createPayload({
    aggregator_id: "blaggo biller id",
    customer_code: "QV2341TG",
    profile_id: "blaggo user id",
    status: "approved",
   });

   console.log(res);
   ```
