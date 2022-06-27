import got from 'got';
import { InboxResponse, MessageParameters } from "./types";

export async function GetInboxMessages(params: MessageParameters, blaggoToken: string): Promise<InboxResponse> {
  let url = buildUrl(params);

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

export async function DeleteInboxMessages(params: MessageParameters, blaggoToken: string): Promise<InboxResponse> {
  let url = buildUrl(params);

  const response = await got.delete(url, {
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

function buildUrl(params: MessageParameters): string {
  let baseUrl = `${process.env['BLACKBOX_BASE_URL']}/inbox`;

  return `${baseUrl}?id=${params.id}&sender_id=${params.sender_id}
    &sender_name=${params.sender_name}&receiver_id=${params.receiver_id}
    &receiver_name=${params.receiver_name}&status=${params.status}
    &type=${params.type}&types=${params.types}
    &transaction_type=${params.transaction_type}&transaction_last_state_type=${params.transaction_last_state_type}
    &includes=${params.includes}&page=${params.page}&per_page=${params.per_page}`;
}

export async function UpdateInboxMessage(url: string, payload: number, blaggoToken: string): Promise<InboxResponse> {
  const response = await got.patch(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    },
    json: {
      "status": payload
    },
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
