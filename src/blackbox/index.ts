import got from 'got';
import { InboxResponse, MessageParameters, PayloadParameters } from "./types";

export async function GetInboxMessages(params: MessageParameters, blaggoToken: string): Promise<InboxResponse> {
  let url = buildMessageUrl(params);

  const response = await got.get(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    }
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      let authResponse: InboxResponse = JSON.parse(responseString);
      return resolve(authResponse);
    } catch (error) {
      return reject(error);
    }
  })
}

export async function DeleteInboxMessages(params: MessageParameters, blaggoToken: string): Promise<string> {
  let url = buildMessageUrl(params);

  const response = await got.delete(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    }
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      return resolve(JSON.parse(responseString));
    } catch (error) {
      return reject(error);
    }
  })
}

export async function DeleteProtocolPayloads(params: PayloadParameters, blaggoToken: string): Promise<string> {
  let url = buildProtocolUrl(params);

  const response = await got.delete(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    }
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      return resolve(JSON.parse(responseString));
    } catch (error) {
      return reject(error);
    }
  })
}

function buildMessageUrl(params: MessageParameters): string {
  let baseUrl = `${process.env['BLACKBOX_BASE_URL']}/inbox`;

  return `${baseUrl}?id=${params.id}&sender_id=${params.sender_id}
    &sender_name=${params.sender_name}&receiver_id=${params.receiver_id}
    &receiver_name=${params.receiver_name}&status=${params.status}
    &type=${params.type}&types=${params.types}
    &transaction_type=${params.transaction_type}&transaction_last_state_type=${params.transaction_last_state_type}
    &includes=${params.includes}&page=${params.page}&per_page=${params.per_page}`;
}

function buildProtocolUrl(params: PayloadParameters): string {
  let baseUrl = `${process.env['BLACKBOX_BASE_URL']}/inbox`;

  return `${baseUrl}?id=${params.id}&profile_id=${params.profile_id}
    &status=${params.status}&page=${params.page}&per_page=${params.per_page}`;
}
