import { Authenticate } from "./blaggo";
import { GetInboxMessages } from "./blackbox";

import * as chai from 'chai';

const expect = chai.expect;

describe('Blackbox Test', () => {
  const username = process.env["AUTH_USERNAME"] || "";
  const password = process.env["AUTH_PASSWORD"] || "";
  const auth_url = process.env["AUTH_URL"] || "";

  it('should get all inbox messages', async () => {

    // authenticate
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;
    const messagesResponse = await GetInboxMessages(auth_url, access_token);

    expect(messagesResponse).to.not.be.null;
    expect(messagesResponse.messages).to.not.be.empty;
    expect(messagesResponse.count).to.be.equal(0);
  });
})
