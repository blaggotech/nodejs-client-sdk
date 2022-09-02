import * as chai from 'chai';
import {
  Options,
} from '../../blackbox/types';
import {
  Credentials,
  Environments,
  Options as AuthOptions,
} from '../../blaggo/types';
import {
  Authenticate,
} from '../../blaggo/index';
import 'dotenv/config';

const expect = chai.expect;

const clientId = process.env["CLIENT_ID"] || "";
const clientSecret = process.env["CLIENT_SECRET"] || "";

const options = {
  env: Environments.testing,
} as Options;

describe('Blaggo OAuth2 Authentication', () => {
  expect(clientId).to.not.be.empty;
	expect(clientSecret).to.not.be.empty;

  const creds = {
    client_id: clientId,
    client_secret: clientSecret,
  } as Credentials

  it('should return a response if correct credentials are passed', async () => {
      const res = await Authenticate(creds, {env: options.env} as AuthOptions);
      expect(res).to.not.be.null;
  });

  it('should return auth tokens', async () => {
      const res = await Authenticate(creds, {env: options.env} as AuthOptions);
      expect(res).to.not.be.null;
      expect(res.access_token).to.not.be.empty;
  });
});

