import * as chai from 'chai';
import {
  AddPayloadParameters,
  Credentials,
  MessageParameters,
  Options,
  PayloadParameters,
  SubscriberParameters,
} from "../../blackbox/types";
import { Blackbox } from '../../blackbox';
import { Environments } from '../../blaggo/types';
import 'dotenv/config';

const expect = chai.expect;

const username = process.env["AUTH_USERNAME"] || "";
const password = process.env["AUTH_PASSWORD"] || "";

const credentials = {
  username: username,
  password: password,
} as Credentials;

describe('Blackbox Inbox Test', () => {
  let blackbox: Blackbox;
  // before each test, create a new instance of Blackbox
  beforeEach(async () => {
    const options = {
      env: Environments.testing,
      credentials: credentials,
    } as Options;

    blackbox = new Blackbox(options);
  })

  it('should get all unread inbox messages', () => {
    const params = {
      status: "0",
    } as MessageParameters;

    return new Promise((resolve, reject) => {
      blackbox.getInboxMessages(params)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should update inbox message', () => {
    const id = process.env["INBOX_MESSAGE_ID"] || "";
    expect(id, "no inbox message id provided").to.not.be.empty;

    const updates = {
      id: id,
      status: "3",
    } as MessageParameters;

    return new Promise((resolve, reject) => {
      blackbox.updateInboxMessage(updates)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should delete inbox message', () => {
    const id = process.env["INBOX_MESSAGE_ID"] || "";
    expect(id, "no inbox message id provided").to.not.be.empty;

    const params = {
      id: id,
    } as MessageParameters;

    return new Promise((resolve, reject) => {
      blackbox.deleteInboxMessage(params)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);
});

describe('Blackbox Payload Test', () => {
  let blackbox: Blackbox;

  beforeEach(async () => {
    const options = {
      env: Environments.testing,
      credentials: credentials,
    } as Options;

    blackbox = new Blackbox(options);
  })

  it('should create new protocol payload', () => {
    const payload = {
      aggregator_id: "11111",
      alias: "test alias",
      customer_code: "Hello",
      profile_id: "11111"
    } as AddPayloadParameters;

    return new Promise((resolve, reject) => {
      blackbox.createPayload(payload)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    })
  }).timeout(10000);

  it('should delete protocol payload by a given id', () => {
    const id = process.env["PAYLOAD_ID"] || "";
    expect(id, "no payload id provided").to.not.be.empty;

    const params = {
      id: id,
    } as PayloadParameters;

    return new Promise((resolve, reject) => {
      blackbox.deletePayloads(params)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should get payload by a given ID', () => {
    const id = process.env["PAYLOAD_ID"] || "";
    expect(id, "no payload id provided").to.not.be.empty;

    const params = {
      id: id,
    } as PayloadParameters;

    return new Promise((resolve, reject) => {
      blackbox.getPayloadById(params)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should query protocol payloads by a given query params', () => {
    const id = process.env["PAYLOAD_ID"] || "";
    expect(id, "no payload id provided").to.not.be.empty;

    const params = {
      id: id,
    } as PayloadParameters;

    return new Promise((resolve, reject) => {
      blackbox.queryPayloads(params)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);
});

describe('Blackbox Account/Subscribers Test', () => {
  let blackbox: Blackbox;

  beforeEach(async () => {
    const options = {
      env: Environments.testing,
      credentials: credentials,
    } as Options;

    blackbox = new Blackbox(options);
  })

  it('should get account info', () => {
    return new Promise((resolve, reject) => {
      const subscriberParams = {
        status: "pending",
      } as SubscriberParameters;

      blackbox.querySubscribers(subscriberParams)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should delete subscriber', () => {
    return new Promise((resolve, reject) => {
      const id = process.env["SUBSCRIPTION_ID"] || "";
      expect(id, "no subscription id provided").to.not.be.empty;

      blackbox.deleteSubscriber(id)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    })
  }).timeout(10000);
});
