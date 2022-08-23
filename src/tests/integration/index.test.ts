import * as chai from 'chai';
import {
  Options,
} from '../../blackbox/types';
import {
  Environments,
  Options as AuthOptions,
} from '../../blaggo/types';
import {
  Authenticate,
} from '../../blaggo/index';
import 'dotenv/config';

const expect = chai.expect;

const username = process.env["AUTH_USERNAME"] || "";
const password = process.env["AUTH_PASSWORD"] || "";

const options = {
  env: Environments.testing,
} as Options;

describe('Blaggo Password Authentication', () => {
  expect(username).to.not.be.empty;
	expect(password).to.not.be.empty;

  it('should return a response if correct credentials are passed' , () => {
    return new Promise((resolve, reject) => {
      Authenticate(username, password, {env: options.env} as AuthOptions)
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
      Authenticate(username, password, {env: options.env} as AuthOptions)
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

