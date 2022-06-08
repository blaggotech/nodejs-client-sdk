import { Authenticate } from "./blaggo";
import { DeleteInboxMessages, DeleteProtocolPayloads, GetInboxMessages } from "./blackbox";
import 'dotenv/config';

import * as chai from 'chai';
import { MessageParameters, PayloadParameters } from "./blackbox/types";

const expect = chai.expect;

const testGetMessageParams = {
  id: '111111111111111111111111111',
} as MessageParameters;

describe('Blackbox Test', () => {
  it('should get all inbox messages', async () => {
	  const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    // authenticate
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;

    const messagesResponse = await GetInboxMessages(testGetMessageParams, access_token);

    expect(messagesResponse).to.not.be.null;
    expect(messagesResponse.messages).to.not.be.empty;
    expect(messagesResponse.count).to.be.equal(0);
  });

  it('should delete inbox message given by a message id', async() => {
    const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    // authenticate
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;

    // get inbox message
    const inboxResponse = await GetInboxMessages(testGetMessageParams, access_token);
    const inboxId = inboxResponse.messages[0]?.id;
    expect(inboxId).to.not.be.empty;

    // delete the inbox message
    const deleteParams = {
      id: inboxId,
      status: "1",
    } as MessageParameters;

    await DeleteInboxMessages(deleteParams, access_token);
  })

  it('should delete protocol payload by a given protocol payload ID', async () => {
    const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    // authenticate
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;

    const deleteParams = {
      id: '111111111111111111111111111',
    } as PayloadParameters;

    await DeleteProtocolPayloads(deleteParams, access_token);
  })
})
