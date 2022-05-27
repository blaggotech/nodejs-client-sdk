import { Authenticate } from "./blaggo";
import { GetInboxMessages } from "./blackbox";

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

describe('Blackbox Test', () => {
  const username = process.env.AUTH_USERNAME || "09266551000";
  const password = process.env.AUTH_PASSWORD || "P@ssw0rd2";

  it('should get all inbox messages', async () => {

    // authenticate
    const response = await Authenticate(username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const messagesResponse = await GetInboxMessages(response.data.tokens.access_token);
    expect(messagesResponse).to.not.be.null;
    expect(messagesResponse.messages).to.not.be.empty;
    expect(messagesResponse.count).to.be.equal(0);
  });
})