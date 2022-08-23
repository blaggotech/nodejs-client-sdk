import got from 'got';
import {
  AddProtocolPayloadParameters,
  Credentials,
  InboxResponse,
  MessageParameters,
  Options,
  ProtocolPayloadParameters,
  SubscriberParameters,
  SubscriberResponse,
  APIURLs,
  APIURLKey,
} from "./types";
import {
  AuthenticationResponse,
  Options as AuthOptions,
} from '../blaggo/types';
import 'dotenv/config';
import { Authenticate } from '../blaggo';

export class Blackbox {
  options: Options;

  constructor(options: Options) {
    const authenticator = options.authenticatorFn;
    const authOptions = {env: options.env} as AuthOptions;
    if (typeof authenticator === 'undefined' || authenticator === undefined || authenticator === null) {
      // default authenticator function
      const authFn = (creds: Credentials): Promise<AuthenticationResponse> => {
        return Authenticate(creds.username, creds.password, authOptions);
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
    const accessToken = authenticate.data.tokens.access_token;

    const baseUrl = `${getAPIURL(this.options)}/inbox`;
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
    const accessToken = authenticate.data.tokens.access_token;

    const baseUrl = `${getAPIURL(this.options)}/payloads`;
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
    const accessToken = authenticate.data.tokens.access_token;

    const baseUrl = `${getAPIURL(this.options)}/payloads`;
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
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
    const authenticate = await this.options.authenticatorFn(
      this.options.credentials,
      {env: this.options.env} as AuthOptions,
    );
    const accessToken = authenticate.data.tokens.access_token;

    const baseUrl = `${getAPIURL(this.options)}/accounts`;
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

// Source: https://stackoverflow.com/a/1714899
function serialize(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export function getPayloadsURL(params: ProtocolPayloadParameters, options?: Options): string {
  let url = `${getAPIURL(options)}/payloads`;

  const qs = serialize(params);
  if (qs !== "") {
    url = `${url}?${qs}`;
  }

  return url
}

export function getMessagesURL(params: MessageParameters, options?: Options): string {
  let url = `${getAPIURL(options)}/inbox`;

  const qs = serialize(params);
  if (qs !== "") {
    url = `${url}?${qs}`;
  }

  return url
}

export function getSubscribersURL(params: SubscriberParameters, options?: Options): string {
  let url = `${getAPIURL(options)}/accounts`;

  const qs = serialize(params);
  if (qs !== "") {
    url = `${url}?${qs}`;
  }

  // if (params === null) {
  //   return baseUrl
  // }

  // if (params.id) {
  //   url = `${url}id=${params.id}`;
  // }

  // if (params.profile_id) {
  //   url = `${url}&profile_id=${params.profile_id}`;
  // }

  // if (params.aggregator_id) {
  //   url = `${url}&aggregator_id=${params.aggregator_id}`;
  // }

  // if (params.customer_code) {
  //   url = `${url}&customer_code=${params.customer_code}`;
  // }

  // if (params.status) {
  //   url = `${url}&status=${params.status}`;
  // }

  // if (params.page) {
  //   url = `${url}&page=${params.page}`;
  // }

  // if (params.per_page) {
  //   url = `${url}&per_page=${params.per_page}`;
  // }

  // if (params.includes) {
  //   url = `${url}&includes=${params.includes}`;
  // }

  return url
}

export function getAPIURL(options?: Options): string {
  if (typeof options === 'undefined' || options === undefined || options === null) {
    return APIURLs.prod
  }

  if (options.env === "") {
    return APIURLs.prod;
  }

  const apiKey = options.env as APIURLKey;
  return APIURLs[apiKey];
}
