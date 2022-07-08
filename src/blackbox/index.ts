import got from 'got';
import {
  AddProtocolPayloadParameters,
  Credentials,
  getMessagesURL,
  getPayloadsURL,
  getSubscribersURL,
  InboxResponse,
  MessageParameters,
  Options,
  ProtocolPayloadParameters,
  SubscriberParameters,
  SubscriberResponse,
} from "./types";
import { AuthenticationResponse } from '../blaggo/types';
import 'dotenv/config';
import { Authenticate } from '../blaggo';

export class Blackbox {
  options: Options;

  constructor(options: Options) {
    const authenticator = options.authenticatorFn;
    if (typeof authenticator !== 'undefined' || authenticator === undefined || authenticator === null) {
      // default authenticator function
      const authFn = (url: string, creds: Credentials): Promise<AuthenticationResponse> => {
        return Authenticate(url, creds.username, creds.password);
      }
      options.authenticatorFn = authFn
    }
    this.options = options
  }

  /**
   * MESSAGES Section
   *
   */

  // https://blackboxtest.blaggo.io/docs#tag/Inbox/operation/DeleteMessages
  async deleteInboxMessage(params: MessageParameters): Promise<InboxResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

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

  // https://blackboxtest.blaggo.io/docs#tag/Inbox/operation/GetMessages
  async getInboxMessages(params: MessageParameters): Promise<InboxResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

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

  // https://blackboxtest.blaggo.io/docs#tag/Inbox/operation/UpdateMessage
  async updateInboxMessage(params: MessageParameters): Promise<InboxResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

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

  /**
   * PAYLOADS Section
   *
   */

  // https://blackboxtest.blaggo.io/docs#tag/Payload/operation/DeletePayloads
  async deleteProtocolPayloads(params: ProtocolPayloadParameters) {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

    const deletePayloadUrl = getPayloadsURL(params);
    await got.delete(deletePayloadUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();
  }

  // https://blackboxtest.blaggo.io/docs#tag/Payload/operation/QueryPayloads
  async queryProtocolPayloads(params: ProtocolPayloadParameters): Promise<InboxResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

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

  // TODO::
  // https://blackboxtest.blaggo.io/docs#tag/Payload/operation/AddPayload
  async createProtocolPayload(params: AddProtocolPayloadParameters) {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

    const baseUrl = `${process.env['BLACKBOX_BASE_URL']}/payloads`;
    await got.post(baseUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: {
        ...params,
      }
    }).json();
  }

  // https://blackboxtest.blaggo.io/docs#tag/Payload/operation/GetPayload
  async getPayloadById(params: ProtocolPayloadParameters): Promise<InboxResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

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

  /**
   * ACCOUNTS Section
   *
   */

  // https://blackboxtest.blaggo.io/docs#tag/Account/operation/QueryAccounts
  async querySubscribers(params: SubscriberParameters): Promise<SubscriberResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

    const querySubscribersURL = getSubscribersURL(params);
    const querySubscribersResponse = await got.get(querySubscribersURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(querySubscribersResponse);
        let authResponse: SubscriberResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }

  // https://blackboxtest.blaggo.io/docs#tag/Account/operation/DeleteAccount
  async deleteSubscriber(id: string): Promise<SubscriberResponse> {
    const authenticate = await this.options.authenticatorFn(this.options.authURL, this.options.credentials);
    const accessToken = authenticate.data.tokens.access_token;

    const baseUrl = `${process.env['BLACKBOX_BASE_URL']}/accounts`;
    const deleteSubscriberURL = `${baseUrl}/${id}`;
    const deleteSubscriberResponse = await got.delete(deleteSubscriberURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).json();

    return new Promise((resolve, reject) => {
      try {
        const responseString = JSON.stringify(deleteSubscriberResponse);
        let authResponse: SubscriberResponse = JSON.parse(responseString);
        return resolve(authResponse);
      } catch (error) {
        return reject(error);
      }
    })
  }
}
