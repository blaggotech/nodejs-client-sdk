import * as chai from 'chai';
import { MessageParameters, ProtocolPayloadParameters } from "./blackbox/types";
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
  it('should get all inbox messages', async () => {
    const messages = await blackboxInstance.getInboxMessages(testGetMessageParams);
    expect(messages).to.not.be.null;
    expect(messages.messages).to.not.be.null;
    expect(messages.count).to.be.equal(0);
  });

  it('should update inbox message', async () => {
    const response = await blackboxInstance.updateInboxMessage(testGetMessageParams);
    expect(response).to.not.be.null;
  });

  it('should delete inbox message', async () => {
    const response = await blackboxInstance.deleteInboxMessage(testGetMessageParams);
    expect(response).to.not.be.null;
  });
});

describe('Blackbox Payload Test', () => {
  it('should delete protocol payload by a given id', async () => {
    const deleteResponse = await blackboxInstance.deleteProtocolPayloads(testDeleteProtocolPayloadParams);
    expect(deleteResponse).to.not.be.null;
  })

  it('should get payload by a given ID', async () => {
    const payloadResponse = await blackboxInstance.getPayloadById(getPayloadParams);
    expect(payloadResponse).to.not.be.null;
  })

  it('should query protocol payloads by a given query params', async () => {
    const queryResponse = await blackboxInstance.queryProtocolPayloads(getPayloadParams);
    expect(queryResponse).to.not.be.null;
  });
});
