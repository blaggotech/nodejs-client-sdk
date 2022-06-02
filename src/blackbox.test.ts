import { Authenticate } from "./blaggo";
import { AddPayload, DeleteInboxMessages, GetInboxMessages, GetPayload, UpdateInboxMessage } from "./blackbox";
import 'dotenv/config';

import * as chai from 'chai';
import { NewPayloadRequest } from "./blackbox/types";

const expect = chai.expect;

describe('Blackbox Test', () => {
  it('should get all inbox messages', async () => {
	  const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";
	  const blackbox_base_url = process.env["BLACKBOX_BASE_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    // authenticate
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;
    const messagesResponse = await GetInboxMessages(`${blackbox_base_url}/inbox`, access_token);

    expect(messagesResponse).to.not.be.null;
    expect(messagesResponse.messages).to.not.be.empty;
    expect(messagesResponse.count).to.be.equal(0);
  });

  it('should delete inbox message given by a message id', async() => {
    const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";
	  const blackbox_base_url = process.env["BLACKBOX_BASE_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    // authenticate
    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;
    // get inbox message
    const inboxResponse = await GetInboxMessages(`${blackbox_base_url}/inbox`, access_token);
    const inboxId = inboxResponse.messages[0]?.id;
    expect(inboxId).to.not.be.empty;

    // delete the inbox message
    await DeleteInboxMessages(`${blackbox_base_url}/inbox?id=${inboxId}`, access_token);
  })

  it('should update inbox message from a given message id', async () => {
    const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";
	  const blackbox_base_url = process.env["BLACKBOX_BASE_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;
    // get inbox message
    const inboxResponse = await GetInboxMessages(`${blackbox_base_url}/inbox`, access_token);
    const inboxId = inboxResponse.messages[0]?.id;
    expect(inboxId).to.not.be.empty;

    const payload = 0;
    await UpdateInboxMessage(`${blackbox_base_url}/inbox/${inboxId}`, payload, access_token)
  })

  it('should create a new protocol payload', async () => {
    const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";
	  const blackbox_base_url = process.env["BLACKBOX_BASE_URL"] || "";

		expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;

    let payload = {
      aggregator_id: "",
      alias: "",
      customer_code: "",
      profile_id: "",
    } as NewPayloadRequest

    const payloadResponse = await AddPayload(`${blackbox_base_url}/payloads`, payload, access_token);
    expect(payloadResponse).to.not.be.null;
    expect(payloadResponse).to.not.be.empty;
  })

  it('should get a payload using an id', async () => {
    const username = process.env["AUTH_USERNAME"] || "";
  	const password = process.env["AUTH_PASSWORD"] || "";
  	const auth_url = process.env["AUTH_URL"] || "";
	  const blackbox_base_url = process.env["BLACKBOX_BASE_URL"] || "";

    expect(username).to.not.be.empty;
		expect(password).to.not.be.empty;
		expect(auth_url).to.not.be.empty;

    const response = await Authenticate(auth_url, username, password);
    expect(response).to.not.be.null;
    expect(response.data.tokens.access_token);

    const access_token = response.data.tokens.access_token;

    const payloadId = "aaaaaaaaaaaa";

    const payloadResponse = await GetPayload(`${blackbox_base_url}/payloads/${payloadId}`, access_token);
    expect(payloadResponse).to.not.be.null;
    expect(payloadResponse).to.not.be.empty;
  })
})
