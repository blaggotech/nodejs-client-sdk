import * as chai from 'chai';
import { Credentials, MessageParameters, ProtocolPayloadParameters, SubscriberParameters } from "./blackbox/types";
import { Blackbox } from './blackbox';
import 'dotenv/config';
import { AuthenticationResponse } from './blaggo/types';
import got from 'got/dist/source';

const expect = chai.expect;

const testGetMessageParams = {
  id: '111111111111111111111111111',
  status: "0",
} as MessageParameters;

const testDeleteProtocolPayloadParams = {
  id: 'aaaa11111111',
} as ProtocolPayloadParameters;

const testPayloadId = "11111"

const getPayloadParams = {
  id: testPayloadId,
} as ProtocolPayloadParameters;

const username = process.env["AUTH_USERNAME"] || "";
const password = process.env["AUTH_PASSWORD"] || "";

const credentials = {
  authURL: "https://auth.blaggo.io/auth/",
  username: username,
  password: password,
} as Credentials;

describe('Blackbox Inbox Test', () => {
  let blackboxInstance: Blackbox;
  // before each test, create a new instance of Blackbox
  beforeEach(async () => {
    async function authenticator(url: string, credentials: Credentials): Promise<AuthenticationResponse> {
      const response = await got.post(url, {
        json: {
          username: credentials.username,
          password: credentials.password,
        }
      }).json();

      return new Promise((resolve, reject) => {
        try {
          const responseString = JSON.stringify(response);
          let authResponse: AuthenticationResponse = JSON.parse(responseString);
          return resolve(authResponse);
        } catch (error) {
          return reject(error);
        }
      });
    }

    blackboxInstance = new Blackbox(credentials, authenticator);
  })

  it('should get all inbox messages', () => {
    return new Promise((resolve, reject) => {
      blackboxInstance.getInboxMessages(testGetMessageParams)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should update inbox message', () => {
    return new Promise((resolve, reject) => {
      blackboxInstance.updateInboxMessage(testGetMessageParams)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  }).timeout(10000);

  it('should delete inbox message', () => {
    return new Promise((resolve, reject) => {
      blackboxInstance.deleteInboxMessage(testGetMessageParams)
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
  let blackboxInstance: Blackbox;

  beforeEach(async () => {
    async function authenticator(url: string, credentials: Credentials): Promise<AuthenticationResponse> {
      const response = await got.post(url, {
        json: {
          username: credentials.username,
          password: credentials.password,
        }
      }).json();

      return new Promise((resolve, reject) => {
        try {
          const responseString = JSON.stringify(response);
          let authResponse: AuthenticationResponse = JSON.parse(responseString);
          return resolve(authResponse);
        } catch (error) {
          return reject(error);
        }
      });
    }

    blackboxInstance = new Blackbox(credentials, authenticator);
  })

  it('should delete protocol payload by a given id', () => {
    return new Promise((resolve, reject) => {
      blackboxInstance.deleteProtocolPayloads(testDeleteProtocolPayloadParams)
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
    return new Promise((resolve, reject) => {
      blackboxInstance.getPayloadById(getPayloadParams)
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
    return new Promise((resolve, reject) => {
      blackboxInstance.queryProtocolPayloads(getPayloadParams)
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
  let blackboxInstance: Blackbox;

  beforeEach(async () => {
    async function authenticator(url: string, credentials: Credentials): Promise<AuthenticationResponse> {
      const response = await got.post(url, {
        json: {
          username: credentials.username,
          password: credentials.password,
        }
      }).json();

      return new Promise((resolve, reject) => {
        try {
          const responseString = JSON.stringify(response);
          let authResponse: AuthenticationResponse = JSON.parse(responseString);
          return resolve(authResponse);
        } catch (error) {
          return reject(error);
        }
      });
    }

    blackboxInstance = new Blackbox(credentials, authenticator);
  })

  it('should get account info', () => {
    return new Promise((resolve, reject) => {
      const subscriberParams = {} as SubscriberParameters;

      blackboxInstance.querySubscribers(subscriberParams)
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
      const id = "111111";

      blackboxInstance.deleteSubscriber(id)
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
