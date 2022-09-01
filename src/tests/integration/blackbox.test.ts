import * as chai from 'chai';
import {
  AddPayloadParameters,
  MessageParameters,
  Options,
  PayloadParameters,
  SubscriberParameters,
} from "../../blackbox/types";
import { Blackbox } from '../../blackbox';
import {
  Credentials,
  Environments,
} from '../../blaggo/types';
import 'dotenv/config';

const expect = chai.expect;

const clientId = process.env["CLIENT_ID"] || "";
const clientSecret = process.env["CLIENT_SECRET"] || "";

const credentials = {
  client_id: clientId,
  client_secret: clientSecret,
  grant_type: "client_credentials",
} as Credentials;

describe('Blackbox Inbox Test', async () => {
  let blackbox: Blackbox;
  // before each test, create a new instance of Blackbox
  beforeEach(async () => {
    const options = {
      env: Environments.testing,
      credentials: credentials,
    } as Options;

    blackbox = new Blackbox(options);
  })

  it('should get all unread inbox messages', async () => {
    const params = {
      status: "0",
    } as MessageParameters;

    const res = await blackbox.getInboxMessages(params);
    expect(res).to.not.be.null;
  }).timeout(10000);

  it('should update inbox message', async () => {
    const id = process.env["INBOX_MESSAGE_ID"] || "";
    expect(id, "no inbox message id provided").to.not.be.empty;

    const updates = {
      id: id,
      status: "3",
    } as MessageParameters;

    const res = await blackbox.updateInboxMessage(updates)
    expect(res).to.not.be.null;
  }).timeout(10000);

  it('should delete inbox message', async () => {
    const id = process.env["INBOX_MESSAGE_ID"] || "";
    expect(id, "no inbox message id provided").to.not.be.empty;

    const params = {
      id: id,
    } as MessageParameters;

    const res = blackbox.deleteInboxMessage(params)
    expect(res).to.not.be.null;
  }).timeout(10000);
});

describe('Blackbox Payload Test', async () => {
  let blackbox: Blackbox;

  beforeEach(async () => {
    const options = {
      env: Environments.testing,
      credentials: credentials,
    } as Options;

    blackbox = new Blackbox(options);
  })

  it('should create new protocol payload', async () => {
    const payload = {
      aggregator_id: "11111",
      alias: "test alias",
      customer_code: "Hello",
      profile_id: "11111"
    } as AddPayloadParameters;

    const res = await blackbox.createPayload(payload)
    expect(res).to.not.be.null;
  }).timeout(10000);

  it('should delete protocol payload by a given id', async () => {
    const id = process.env["PAYLOAD_ID"] || "";
    expect(id, "no payload id provided").to.not.be.empty;

    const params = {
      id: id,
    } as PayloadParameters;

    const res = await blackbox.deletePayloads(params)
    expect(res).to.not.be.null;
  }).timeout(10000);

  it('should get payload by a given ID', async () => {
    const id = process.env["PAYLOAD_ID"] || "";
    expect(id, "no payload id provided").to.not.be.empty;

    const params = {
      id: id,
    } as PayloadParameters;

    const res = await blackbox.getPayloadById(params)
    expect(res).to.not.be.null;
  }).timeout(10000);

  it('should query protocol payloads by a given query params', async () => {
    const id = process.env["PAYLOAD_ID"] || "";
    expect(id, "no payload id provided").to.not.be.empty;

    const params = {
      id: id,
    } as PayloadParameters;

    const res = await blackbox.queryPayloads(params)
    expect(res).to.not.be.null;
  }).timeout(10000);
});

describe('Blackbox Account/Subscribers Test', async () => {
  let blackbox: Blackbox;

  beforeEach(async () => {
    const options = {
      env: Environments.testing,
      credentials: credentials,
    } as Options;

    blackbox = new Blackbox(options);
  })

  it('should get account info', async () => {
    const subscriberParams = {
      status: "pending",
    } as SubscriberParameters;

    const res = blackbox.querySubscribers(subscriberParams)
    expect(res).to.not.be.null;
  }).timeout(10000);

  it('should delete subscriber', async () => {
    const id = process.env["SUBSCRIPTION_ID"] || "";
    expect(id, "no subscription id provided").to.not.be.empty;

    const res = await blackbox.deleteSubscriber(id)
    expect(res).to.not.be.null;
  }).timeout(10000);
});
