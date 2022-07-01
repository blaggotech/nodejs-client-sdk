import * as chai from 'chai';
import { MessageParameters, ProtocolPayloadParameters, SubscriberParameters } from "./blackbox/types";
import { Blackbox } from './blackbox';
import 'dotenv/config';

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


const blackboxInstance = new Blackbox(username, password);

describe('Blackbox Inbox Test', () => {
  it('should get all inbox messages', async (done) => {
    const messages = await blackboxInstance.getInboxMessages(testGetMessageParams);
    expect(messages).to.not.be.null;
    expect(messages.messages).to.not.be.null;
    expect(messages.count).to.be.equal(0);
    done();
  }).timeout(10000);

  it('should update inbox message', async (done) => {
    const response = await blackboxInstance.updateInboxMessage(testGetMessageParams);
    expect(response).to.not.be.null;
    done();
  }).timeout(10000);

  it('should delete inbox message', async (done) => {
    const response = await blackboxInstance.deleteInboxMessage(testGetMessageParams);
    expect(response).to.not.be.null;
    done();
  }).timeout(10000);
});

describe('Blackbox Payload Test', () => {
  it('should delete protocol payload by a given id', async (done) => {
    const deleteResponse = await blackboxInstance.deleteProtocolPayloads(testDeleteProtocolPayloadParams);
    expect(deleteResponse).to.not.be.null;
    done();
  }).timeout(10000);

  it('should get payload by a given ID', async (done) => {
    const payloadResponse = await blackboxInstance.getPayloadById(getPayloadParams);
    expect(payloadResponse).to.not.be.null;
    done();
  }).timeout(10000);

  it('should query protocol payloads by a given query params', async (done) => {
    const queryResponse = await blackboxInstance.queryProtocolPayloads(getPayloadParams);
    expect(queryResponse).to.not.be.null;
    done();
  }).timeout(10000);
});

describe('Blackbox Account/Subscribers Test', () => {
  it('should get account info', async (done) => {
    const subscriberParams = {} as SubscriberParameters;
    const accountInfo = await blackboxInstance.querySubscribers(subscriberParams);
    expect(accountInfo).to.not.be.null;
    done();
  }).timeout(1000);

  it('should delete subscriber', async (done) => {
    const id = "111111111111111111111111111";
    const deleteRespose = await blackboxInstance.deleteSubscriber(id);
    expect(deleteRespose).to.not.be.null;
    done();
  }).timeout(10000);
});
