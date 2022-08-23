import * as chai from 'chai';
import got from 'got/dist/source';
import {
  Authenticator,
  Credentials,
  Options,
} from '../../blackbox/types';
import {
  AuthenticationResponse,
  Environments,
  Options as AuthOptions,
} from '../../blaggo/types';
import {
  getAuthURL,
} from '../../blaggo/index';
import 'dotenv/config';

const expect = chai.expect;

const username = process.env["AUTH_USERNAME"] || "";
const password = process.env["AUTH_PASSWORD"] || "";

const credentials = {
  username: username,
  password: password,
} as Credentials;

const options = {
  env: Environments.testing,
  credentials: credentials,
} as Options;

describe('Blaggo Authentication', () => {
  expect(credentials.username).to.not.be.empty;
	expect(credentials.password).to.not.be.empty;

  let authenticator: Authenticator;
  beforeEach(async () => {
    authenticator = async (credentials: Credentials, options?: AuthOptions): Promise<AuthenticationResponse> => {
      const url = getAuthURL(options);
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
    options.authenticatorFn = authenticator;
  })


  it('should return a response if correct credentials are passed' , () => {
    return new Promise((resolve, reject) => {
      authenticator(credentials, {env: options.env} as AuthOptions)
        .then(response => {
          expect(response).to.not.be.null;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  });

  it('should return auth tokens', () => {
    return new Promise((resolve, reject) => {
      authenticator(credentials, {env: options.env} as AuthOptions)
        .then(response => {
          expect(response).to.not.be.null;
          expect(response.data.tokens.access_token).to.not.be.empty;
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  });
});

