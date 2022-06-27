import got from 'got';
import { Authenticate } from '../blaggo';
import { AuthenticationResponse } from "../blaggo/types";
import { getMessagesURL, getPayloadsURL, InboxResponse, MessageParameters, ProtocolPayloadParameters } from "./types";
import 'dotenv/config';

export class Blackbox {
  username: string;
  password: string;
  blaggoAuthURL: string;

  authResponse: Promise<AuthenticationResponse>;

  constructor(username: string, password: string) {
    this.blaggoAuthURL = "https://auth.blaggo.io/auth/";
    this.username = username;
    this.password = password;

    this.authResponse = this._getAuthResponse();
  }

  async _getAuthResponse(): Promise<AuthenticationResponse> {
    return await Authenticate(this.blaggoAuthURL, this.username, this.password);
  }

  // messages
  async deleteInboxMessage(params: MessageParameters): Promise<InboxResponse> {
    const accessToken = (await this.authResponse).data.tokens.access_token;

    const deleteMessageUrl = getMessagesURL(params)
    const deleteMessageResponse = await got.delete(deleteMessageUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(deleteMessageResponse);
        let authResponse: InboxResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }

  async getInboxMessages(params: MessageParameters): Promise<InboxResponse> {
    const accessToken = (await this.authResponse).data.tokens.access_token;

    const getMessagesUrl = getMessagesURL(params);
    const getMessageResponse = await got.get(getMessagesUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(getMessageResponse);
        let authResponse: InboxResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }

  async updateInboxMessage(params: MessageParameters): Promise<InboxResponse> {
    const accessToken = (await this.authResponse).data.tokens.access_token;

    const baseUrl = `${process.env['BLACKBOX_BASE_URL']}/inbox`;
    const updateMessageUrl = `${baseUrl}/${params.id}`;
    const updateMessageResponse = await got.patch(updateMessageUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: {
        status: parseInt(params.status),
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(updateMessageResponse);
        let authResponse: InboxResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }

  // payload
  async deleteProtocolPayloads(params: ProtocolPayloadParameters) {
    const accessToken = (await this.authResponse).data.tokens.access_token;

    const deletePayloadUrl = getPayloadsURL(params);
    await got.delete(deletePayloadUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();
  }

  async queryProtocolPayloads(params: ProtocolPayloadParameters): Promise<InboxResponse> {
    const accessToken = (await this.authResponse).data.tokens.access_token;

    const queryProtocolPayloadsURL = getPayloadsURL(params);
    const queryProtocolPayloadsResponse = await got.get(queryProtocolPayloadsURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(queryProtocolPayloadsResponse);
        let authResponse: InboxResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }

  async getPayloadById(params: ProtocolPayloadParameters): Promise<InboxResponse> {
    const accessToken = (await this.authResponse).data.tokens.access_token;

    const baseUrl = `${process.env['BLACKBOX_BASE_URL']}/payloads`;
    const getPayloadURL = `${baseUrl}/${params.id}`;
    const getPayloadResponse = await got.get(getPayloadURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(getPayloadResponse);
        let authResponse: InboxResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }
}
