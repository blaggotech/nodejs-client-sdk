import { Authenticate } from "./blaggo";

import * as chai from 'chai';

const expect = chai.expect;

describe('Blaggo Authentication', () => {
  const username = process.env["AUTH_USERNAME"] || "";
  const password = process.env["AUTH_PASSWORD"] || "";
  const auth_url = process.env["AUTH_URL"] || "";

	expect(username).to.not.be.empty;
	expect(password).to.not.be.empty;
	expect(auth_url).to.not.be.empty;

  it('should return a response if correct credentials are passed' , async () => {
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
  });

  it('should return auth tokens', async () => {
    const response = await Authenticate(auth_url, username, password);
    expect(response.data.token).to.not.be.empty;
    expect(response.data.tokens.access_token).to.not.be.empty;
  });
});

